import { Fragment, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import queryString from 'query-string';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Card, Col, Row, Typography } from 'antd';
import Responsive from '../../../components/responsive/Responsive';

import { setChild } from '../../../store/common/Action';

// import PageTitle from '../../../components/common/page-title';
// import DocHead from '../../../components/common/head';
// import ProductList from '../../../components/shop/Products';

const PageTitle = dynamic(() => import('../../../components/common/page-title'));
const DocHead = dynamic(() => import('../../../components/common/head'));
const ProductList = dynamic(() => import('../../../components/shop/Products'));

import { parseCookies, serverCheckIsUserLogin } from '../../../helper/AuthActions';
import { langs } from '../../../localization';

import ProductMobileHeader from '../../../components/shop/ProductMobileHeader';
import LoadData from '../../../components/common/load-data';
import ButtonWraper from '../../../components/common/form/ButtonWrapper';
import ProductFilter from '../../../components/shop/ProductFilter';
import QuickView from '../../../components/shop/QuickView';
import ProductItemNoImage from '../../../components/shop/ProductItemNoImage';
import ProductItemGridMobile from '../../../components/shop/ProductItemGridMobile';
import ProductItemList from '../../../components/shop/ProductItemList';
import ProductItem from '../../../components/shop/ProductItem';
import ProductItemGridDesktop from '../../../components/shop/ProductItemGridDesktop';
import ProductItemListDesktop from '../../../components/shop/ProductItemListDesktop';
import FilterTags from '../../../components/common/tag/FilterTags';
import { paginationMeta, USER_ROLES } from '../../../config/Constant';
import { getFrequentlyOrderProductsListService, getProductsListPropsService } from '../../../store/product/Service';
import { removeLabelFromFilterObj } from '../../../helper/FilterUtils';
import SelectBuyerToggle from '../../../components/cart/select-buyer-toggle';
import { AXIOS_INSTANCE } from '../../../config/Config';
import  withAppContext  from '../../../config/withAppContext';
import MiniCart from '../../../components/shop/MiniCart';
import ProductDesktopHeader from '../../../components/shop/ProductDesktopHeader';

const GridStyle = ({ style, product, isInventory }) => {
    switch (style) {
        case 'grid-no-img':
            return <ProductItemNoImage isInventory={isInventory} product={product} />;
            break;
        case 'grid-view':
            return <ProductItemGridMobile isInventory={isInventory} product={product} />;
            break;
        case 'list':
            return <ProductItemList isInventory={isInventory} product={product} />;
            break;
        default:
            return <ProductItem isInventory={isInventory} product={product} />;
            break;
    }
};
const GridStyleDesktop = ({ style, product, isInventory }) => {
    switch (style) {
        case 'grid':
            return <ProductItemGridDesktop isInventory={isInventory} product={product} />;
            break;
        case 'list':
            return <ProductItemListDesktop isInventory={isInventory} product={product} />;
            break;
        default:
            return <ProductItemGridDesktop isInventory={isInventory} product={product} />;
            break;
    }
};

const FrequentlyOrder = (props) => {
    const {  selectedRetailer, userMe } = props;
    const { profile  } = userMe
    const { pageTitle, removeTags, pageType } = {
        pageTitle: langs.labels.frequentlyOrderedProducts,
        removeTags: false,
        pageType: 'fast_moving'
    };
    const router = useRouter();
    const query = router.query;
    const dispatch = useDispatch();
    const [isInventory, setisInventory] = useState(false);
    const [productStyle, setProductStyle] = useState('grid');
    const [productStyleDesktop, setProductStyleDesktop] = useState('grid');
    const { visibility } = useSelector((state) => state.product.quickView);
    const selectedRetailerId = useSelector((state) => state.common.selectedRetailerId);
    const loading = useSelector((state) => state.product.loading);
    const [productList, setProductList] = useState([]);
    const [productListMeta, setProductListMeta] = useState(paginationMeta.pagination);
    useEffect(() => {
        getProducts();
        // const currentRole = await profile.role.name;
        // let id = '';
        // if (currentRole == USER_ROLES.BUYER.name) {
        //     id = profile.id;
        // } else {
        //     if (selectedRetailer) {
        //         id = selectedRetailer.id;
        //     }
        // }
        
        
        // const url = `/e-commerce/shop/frequently-ordered-items/${id}`;
        // await AXIOS_INSTANCE.get(
        //     `${url}${queryString.stringify(dataQuery) ? '?' + queryString.stringify(dataQuery) : ''}`,
        //     {
        //         headers: {
        //             Authorization: `Bearer ${serverProps.props.token}`,
        //             Accept: 'application/json'
        //         }
        //     }
        // )
        //     .then((res) => {
        //         const request = res.data;
        //         serverProps.props.productList = request.success.data;
        //         serverProps.props.productListMeta = request.success.meta.pagination;
        //         serverProps.props.count = request.success.meta.total;
        //     })
        //     .catch((error) => {
        //         console.log('error', error);
        //         serverProps.props.productListMeta = { pagination: '' };
        //     });
    }, [router.query])

    useEffect(() => {
        const query = router.query;
        router.push({ pathname: router.pathname, query }, router.asPath, {
            slashes: true
        });
    }, [selectedRetailerId]);

    const getProducts = async () => {
        const dataQuery = await removeLabelFromFilterObj(query);
        try {
            const data = await getFrequentlyOrderProductsListService(dataQuery);
            setProductList(data.success.data);
            setProductListMeta(data.success.meta.pagination)
        } catch {
            console.log('error', error);
            setProductListMeta(paginationMeta.pagination);
        }
    }

    /**
     * @name handleNextPrevPage
     * @description handle pagination
     * @param {isNext}
     * @returns {}
     */
    const handleNextPrevPage = (isNext) => {
        let page = 1;
        if (isNext == 'next') {
            page = query.page ? Number(query.page) + 1 : 2;
        } else {
            page = Number(query.page) - 1;
        }
        query.page = page;
        router.push({ pathname: router.pathname, query }, router.asPath, {
            slashes: true
        });
        window.scrollTo(0, 70);
    };

    /**
     * @name handleSortBy
     * @description handle sorting
     * @param {data}
     * @returns {}
     */
    const handleSortBy = (data) => {
        const query = router.query;
        query.page = 1;
        query.sort = data;
        router.push({ pathname: router.pathname, query }, router.asPath, {
            slashes: true
        });
    };

    const checkPageType = (type) => {
        let submitPath = ''
        if (type == 'best_sellers') {
            submitPath = '/shop/best-sellers'
        }else if(type == 'fast_moving'){
            submitPath = '/shop/fast-moving'
        } else {
            submitPath = '/shop/products'
        }
        return submitPath
    }

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.frequentlyOrderedProducts} />
            <div className="wrap">
                <Responsive.Mobile>
                    <PageTitle title={langs.labels.frequentlyOrderedProducts} />
                </Responsive.Mobile>

                {!isInventory && <SelectBuyerToggle />}
                <Responsive.Mobile>
                    <Fragment>
                        <ProductMobileHeader
                            setgridStyle={setProductStyle}
                            gridStyle={productStyle}
                            label={langs.labels.items}
                            viewOption={true}
                            frequentlyOrderCount={productListMeta.total}
                            filterFrequently_order_on={true}
                        />
                        {!removeTags && <FilterTags filterTagPage={'/shop/frequently-order'} />}
                        <LoadData data={productList} loading={loading} verticalHeight={'70vh'}>
                            <div className="products-wrapper grid-desktop">
                                <div className="products-list">
                                    {productList &&
                                        !!productList.length &&
                                        productList.map((product, index) => {
                                            return (
                                                <GridStyle
                                                    key={`product-item-${index}`}
                                                    product={product}
                                                    style={productStyle}
                                                    isInventory={isInventory}
                                                />
                                            );
                                        })}
                                </div>
                            </div>
                        </LoadData>
                        <div className="pagination-actions p-l20 p-r20">
                            <div className="pagination-actions-item">
                                {productListMeta.current_page != 1 && (
                                    <ButtonWraper
                                        onClick={() => handleNextPrevPage('prev')}
                                        loading={loading}
                                        type={'primary'}>
                                        <ArrowLeftOutlined /> {langs.labels.previous}
                                    </ButtonWraper>
                                )}
                            </div>
                            <div className="pagination-actions-item">
                                {productListMeta.total_pages != productListMeta.current_page && (
                                    <ButtonWraper
                                        onClick={() => handleNextPrevPage('next')}
                                        loading={loading}
                                        type={'primary'}>
                                        {langs.labels.next} <ArrowRightOutlined />
                                    </ButtonWraper>
                                )}
                            </div>
                        </div>
                    </Fragment>
                </Responsive.Mobile>
                <Responsive.Desktop>
                    <Row gutter={[16, 0]}>
                        <Col md={18} xs={24}>
                            {!removeTags && <FilterTags filterTagPage={'/shop/frequently-order'} />}
                            <Card
                                title={
                                    <Fragment>
                                        <Typography.Title level={3}>{pageTitle}</Typography.Title>
                                        <span className="items-num">({productListMeta.total} Items)</span>
                                        <ProductDesktopHeader
                                            setgridStyleDesktop={setProductStyleDesktop}
                                            gridStyleDesktop={productStyleDesktop}
                                            label={'Items'}
                                            viewOption={true}
                                        />
                                    </Fragment>
                                }
                                className="product-list-wrap head-block"
                                extra={
                                    <ul className="sortby-filter">
                                        <li>
                                            <span>{langs.labels.sortBy}{':'}</span>
                                        </li>
                                        <li>
                                            <a
                                                className={`${router.query.sort == 'a_z_order' ? 'active' : ''
                                                    }`}
                                                onClick={() => handleSortBy('a_z_order')}>
                                                {langs.labels.productNameAtoZ}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className={`${router.query.sort == 'z_a_order' ? 'active' : ''
                                                    }`}
                                                onClick={() => handleSortBy('z_a_order')}>
                                                {langs.labels.productNameZtoA}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className={`${router.query.sort == 'low_high_price'
                                                    ? 'active'
                                                    : ''
                                                    }`}
                                                onClick={() => handleSortBy('low_high_price')}>
                                                {langs.labels.priceLowtoHigh}
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className={`${router.query.sort == 'high_low_price'
                                                    ? 'active'
                                                    : ''
                                                    }`}
                                                onClick={() => handleSortBy('high_low_price')}>
                                                {langs.labels.priceHightoLow}
                                            </a>
                                        </li>
                                    </ul>
                                }>
                                <LoadData data={productList} loading={loading} verticalHeight={'70vh'}>
                                    <div className="products-wrapper grid-desktop">
                                        <div className={`products-list ${productStyleDesktop}`}>
                                            {productList &&
                                                !!productList.length &&
                                                productList.map((product, index) => {
                                                    return (
                                                        <GridStyleDesktop
                                                    key={`product-item-${index}`}
                                                    product={product}
                                                    style={productStyleDesktop}
                                                    isInventory={isInventory}
                                                />
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </LoadData>
                                <div className="pagination-actions p-l20 p-r20">
                                    <div className="pagination-actions-item">
                                        {productListMeta.current_page != 1 && (
                                            <ButtonWraper
                                                onClick={() => handleNextPrevPage('prev')}
                                                loading={loading}
                                                type={'primary'}>
                                                <ArrowLeftOutlined /> {langs.labels.previous}
                                            </ButtonWraper>
                                        )}
                                    </div>
                                    <div className="pagination-actions-item">
                                        {productListMeta.total_pages !=
                                            productListMeta.current_page && (
                                                <ButtonWraper
                                                    onClick={() => handleNextPrevPage('next')}
                                                    loading={loading}
                                                    type={'primary'}>
                                                    {langs.labels.next} <ArrowRightOutlined />
                                                </ButtonWraper>
                                            )}
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col md={6} xs={24}>
                            <MiniCart filterPage={checkPageType(pageType)} />
                        </Col>
                    </Row>
                </Responsive.Desktop>
                {visibility && <QuickView />}
            </div>
        </Fragment>
    );
};

// export async function getServerSideProps({ req, query }) {
//     const serverProps = await serverCheckIsUserLogin(req, query);
//     if (serverProps.props) {
//         if (serverProps.props.userLogin) {

//         }
//     }
//     return serverProps;
// }

export default withAppContext(FrequentlyOrder);
