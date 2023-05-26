import { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Card, Col, Row, Select, Typography } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Responsive from '../responsive/Responsive';
import { getProductsList } from '../../store/product/Action';
import { GET_CART_INITIATE } from '../../store/cart/Action';
import FilterTags from '../common/tag/FilterTags';
import { getSettings, importLoading } from '../../helper/Utils';
const LoadData = dynamic(() => import('../common/load-data'));
const ProductItem = dynamic(() => import('./ProductItem'));
const ProductItemList = dynamic(() => import('./ProductItemList'));
const SelectBuyerToggle = dynamic(() => import('../cart/select-buyer-toggle'));
const ProductItemGridDesktop = dynamic(() => import('./ProductItemGridDesktop'));
const ProductItemListDesktop = dynamic(() => import('./ProductItemListDesktop'));
const ProductItemGridMobile = dynamic(() => import('./ProductItemGridMobile'));
const ProductItemNoImage = dynamic(() => import('./ProductItemNoImage'));
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));
const ProductMobileHeader = dynamic(() => import('./ProductMobileHeader'));
const ProductDesktopHeader = dynamic(() => import('./ProductDesktopHeader'));
const MiniCart = dynamic(() => import('./MiniCart'));
import { UserContext } from '../../contexts/userContext';
import { getCurrentRole } from '../../helper/AuthActions';
import { USER_ROLES } from '../../config/Constant';
import { langs } from '../../localization';

const QuickView = dynamic(() => import('./QuickView'), { loading: importLoading });

const { Option } = Select;

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

const ProductList = ({ pageTitle, removeTags = false, pageType, pageProps = '' }, props) => {
    const router = useRouter();
    const query = router.query;
    const dispatch = useDispatch();
    const [isInventory, setisInventory] = useState(true);
    const [productStyle, setProductStyle] = useState('list');
    const [productStyleDesktop, setProductStyleDesktop] = useState('grid');
    const { visibility } = useSelector((state) => state.product.quickView);
    const productList = useSelector((state) => state.product.productList);
    const selectedRetailerId = useSelector((state) => state.common.selectedRetailerId);

    const productListMeta = useSelector((state) => state.product.productListMeta.pagination);
    const count = useSelector((state) => state.product.productListMeta.pagination.total);

    const loading = useSelector((state) => state.product.loading);

    useEffect(() => {
        const settings = getSettings();
        const ecommerceSettings = settings.Ecommerce;
        switch (getCurrentRole().name) {
            case USER_ROLES.BUYER.name:
                setisInventory(ecommerceSettings.show_inventory_buyer.value);
                break;
            case USER_ROLES.DSP.name:
                setisInventory(ecommerceSettings.show_inventory_dsp.value);
                break;
            default:
                setisInventory(true);
                break;
        }
    }, []);

    useEffect(() => {
        const query = router.query;

        if (pageType) {
            if (
                pageType == 'best_sellers' ||
                pageType == 'fast_moving' ||
                pageType == 'frequently_order'
            ) {
                query[`listType`] = pageType;
            } else {
                const pageVal = query[pageType];
                delete query[pageType];
                query[`${pageType}[]`] = pageVal ? pageVal : pageProps[pageType];
            }
        }
        dispatch(getProductsList(query));
    }, [router.query, selectedRetailerId]);

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
        // dispatch(getProductsList(router.query));
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
            <SelectBuyerToggle />
            <Responsive.Mobile>
                <Fragment>
                    <ProductMobileHeader
                        setgridStyle={setProductStyle}
                        gridStyle={productStyle}
                        label={langs.labels.items}
                        viewOption={true}
                    />
                    {!removeTags && <FilterTags filterTagPage={checkPageType(pageType)} />}

                    <LoadData data={productList} loading={loading}>
                        <div className="products-wrapper grid-mobile">
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
                    <Row gutter={[12, 0]} className="p-t20 p-b20">
                        <Col span={12}>
                            {productListMeta.current_page != 1 && (
                                <ButtonWraper
                                    onClick={() => handleNextPrevPage('prev')}
                                    loading={loading}
                                    type={'primary'}
                                    block
                                >
                                    <ArrowLeftOutlined /> {langs.labels.previous}
                                </ButtonWraper>
                            )}
                        </Col>
                        <Col span={12}>
                            {productListMeta.total_pages != productListMeta.current_page && (
                                <ButtonWraper
                                    onClick={() => handleNextPrevPage('next')}
                                    loading={loading}
                                    type={'primary'}
                                    block
                                >
                                    {langs.labels.next} <ArrowRightOutlined />
                                </ButtonWraper>
                            )}
                        </Col>
                    </Row>
                </Fragment>
            </Responsive.Mobile>
            <Responsive.Desktop>
                <Row gutter={[16, 0]}>
                    <Col md={18} xs={24}>
                        {!removeTags && <FilterTags />}
                        <Card
                            title={
                                <Fragment>
                                    <Typography.Title level={3}>{pageTitle}</Typography.Title>
                                    <span className="items-num">({count} {langs.labels.items})</span>
                                    <ProductDesktopHeader
                                        setgridStyleDesktop={setProductStyleDesktop}
                                        gridStyleDesktop={productStyleDesktop}
                                        label={langs.labels.items}
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
                                            className={`${
                                                router.query.sort == 'a_z_order' ? 'active' : ''
                                            }`}
                                            onClick={() => handleSortBy('a_z_order')}>
                                            {langs.labels.productNameAtoZ}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className={`${
                                                router.query.sort == 'z_a_order' ? 'active' : ''
                                            }`}
                                            onClick={() => handleSortBy('z_a_order')}>
                                            {langs.labels.productNameZtoA}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className={`${
                                                router.query.sort == 'low_high_price'
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={() => handleSortBy('low_high_price')}>
                                            {langs.labels.priceLowtoHigh}
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className={`${
                                                router.query.sort == 'high_low_price'
                                                    ? 'active'
                                                    : ''
                                            }`}
                                            onClick={() => handleSortBy('high_low_price')}>
                                            {langs.labels.priceHightoLow}
                                        </a>
                                    </li>
                                </ul>
                            }>
                            <LoadData data={productList} loading={loading}>
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
        </Fragment>
    );
};
export default ProductList;
