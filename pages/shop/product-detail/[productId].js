import { RightOutlined, StarFilled, TagFilled, UpOutlined } from '@ant-design/icons';
import { Col, Descriptions, Divider, Rate, Row, Tabs, Typography } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import StatusTag from '../../../components/common/tag';
import CalPrice from '../../../components/shop/CalPrice';

// import PageTitle from '../../../components/common/page-title';
// import DocHead from '../../../components/common/head';
// import ButtonWraper from '../../../components/common/form/ButtonWrapper';
// import LoadData from '../../../components/common/load-data';
// import ProductCarousel from '../../../components/shop/ProductCarousel';

const PageTitle = dynamic(() => import('../../../components/common/page-title'));
const DocHead = dynamic(() => import('../../../components/common/head'));
const ButtonWraper = dynamic(() => import('../../../components/common/form/ButtonWrapper'));
const LoadData = dynamic(() => import('../../../components/common/load-data'));
const ProductCarousel = dynamic(() => import('../../../components/shop/ProductCarousel'));
const ShareWithUs = dynamic(() => import('../../../components/common/shareWithUs/index'));
const Image = dynamic(() => import('../../../components/common/image'));

import { useDispatch, useSelector } from 'react-redux';
import Qty from '../../../components/qty';
import Responsive from '../../../components/responsive/Responsive';

import withAppContext from '../../../config/withAppContext';
import { formatToCurrency, importLoading } from '../../../helper/Utils';
import useQuantity from '../../../hooks/useQuantity';
import { langs } from '../../../localization';
import { ADD_TO_CART_INITIATE } from '../../../store/cart/Action';
import { setChild } from '../../../store/common/Action';
import { ADD_TO_FAVOURITE_INITIATE } from '../../../store/favourite/Action';
import { GET_PRODUCT_DETAILS_INITIATE } from '../../../store/product/Action';

const Reviews = dynamic(() => import('../../../components/common/reviews'), {
    loading: importLoading
});

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const descriptionData = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
];

const prdAttributeColumns = [
    {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand'
    },
    {
        title: 'Category',
        dataIndex: 'categories',
        key: 'categories'
    },
    {
        title: 'Model',
        dataIndex: 'model',
        key: 'model'
    },
    {
        title: 'Segments',
        dataIndex: 'segment',
        key: 'segment'
    },
    {
        title: 'Manufacturer',
        dataIndex: 'manufacturer',
        key: 'manufacturer'
    }
];

const ProductDetail = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.product.productDetails);
    
    const productLoading = useSelector((state) => state.product.loading);
    const [count, setCount, countValidation, inventoryValidation] = useQuantity(productDetails);
    const [total, setTotal] = useState(0);
    const favouriteIds = useSelector((state) => state.favourite.favouriteIds);
    const favouriteLoading = useSelector((state) => state.favourite.loading);
    const loading = useSelector((state) => state.order.loading);
    const [isInventory, setisInventory] = useState(true);

    const [isAdditionalInfo, setIsAdditionalInfo] = useState(false);
    const additionalInfoToggle = () => {
        setIsAdditionalInfo(wasAdditionalInfo => !wasAdditionalInfo);
    }

    useEffect(() => {
        if (router.query && router.query.productId) {
            dispatch(setChild(true));
            dispatch({
                type: GET_PRODUCT_DETAILS_INITIATE,
                productId: router.query.productId
            });
        }
        var str = router.pathname;
        var n = str.search('inventory');
        setisInventory(n != -1 ? true : false);
    }, [router.query]);

    useEffect(() => {
        if (productDetails && productDetails.moq) setCount(productDetails.moq);
    }, [productDetails]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    

    /**
     * @name addToCart
     * @description It will add item to the cart
     * @param {data}
     * @returns {}
     */
    const addToCart = (data) => {
        data.quantity = count;
        data.totalPrice = total;
        setCount(data.moq);
        dispatch({ type: ADD_TO_CART_INITIATE, product: data });
    };

    const addProductToFavourite = (product) => {
        dispatch({
            type: ADD_TO_FAVOURITE_INITIATE,
            payload: product.id,
            favouriteIds
        });
    };
    return (
        <Fragment>
            <DocHead pageTitle={productDetails.name} />
            <LoadData data={productDetails} loading={productLoading}>
                <Responsive.Mobile>
                    <div className="product-detail-box">
                        <Row>
                            <Col md={12} xs={24}>
                                <Fragment>
                                    <div
                                        onClick={() => addProductToFavourite(productDetails)}
                                        className={`favourite ${favouriteIds.some(
                                            (itemSku) => itemSku == productDetails.id
                                        )
                                            ? 'active'
                                            : ''
                                            }`}>
                                        <StarFilled />
                                    </div>
                                    <ProductCarousel
                                        mainImages={
                                            productDetails.gallery_images ?
                                            productDetails.gallery_images.map((item, index) => {
                                                return (
                                                    <div key={`${index}-dd`} className="max100">
                                                        <Image
                                                            src={item}
                                                            unsized={true}
                                                            alt={productDetails.name}
                                                            responsive
                                                            layout={'responsive'}
                                                            key={`${index}-vv`}
                                                        />
                                                        
                                                    </div>
                                                );
                                            }):
                                                <img
                                                    src={productDetails.main_image}
                                                    unsized={true}
                                                    alt={productDetails.name}
                                                    responsive
                                                    layout={'responsive'}
                                                />
                                        }
                                        thumbImages={
                                            productDetails.gallery_images &&
                                            productDetails.gallery_images.map((item, index) => {
                                                return (
                                                    <Image
                                                        src={item}
                                                        unsized={true}
                                                        alt={productDetails.name}
                                                        responsive
                                                        layout={'responsive'}
                                                        key={`${index}-vv`}
                                                    />
                                                );
                                            })
                                        }
                                    />
                                </Fragment>
                            </Col>
                            <Col md={12} xs={24}>
                                <div className="product-detail">
                                    <Title level={4} className="product-item-name">
                                        {productDetails.name}
                                    </Title>
                                    <div className="p-num">
                                        {productDetails.part_number && (
                                            <Fragment>
                                                <div className="inline-label">
                                                    <StatusTag
                                                        value={productDetails.part_number}
                                                        color={'geekblue'}
                                                    />
                                                </div>
                                                <span className="sep">|</span>
                                                <div className="inline-label">
                                                    <Text type="secondary" strong>
                                                        {langs.labels.moq}:
                                                    </Text>
                                                    <Text className="m-l10" strong>
                                                        {productDetails.moq
                                                            ? productDetails.moq
                                                            : 1}
                                                    </Text>
                                                </div>
                                                <span className="sep">|</span>
                                                <div className="inline-label">
                                                    <Text type="secondary" strong>
                                                        {langs.labels.unit}:
                                                    </Text>
                                                    <Text className="m-l10" strong>
                                                        {productDetails.unit
                                                            ? productDetails.unit
                                                            : 1}
                                                    </Text>
                                                </div>
                                                <span className="sep">|</span>
                                            </Fragment>
                                        )}
                                        {productDetails.reviews && (
                                            <Fragment>
                                                <div className="inline-label">
                                                    <Text type="secondary" strong>
                                                        {langs.labels.rating}:
                                                    </Text>
                                                </div>

                                                <Rate
                                                    defaultValue={0}
                                                    value={
                                                        productDetails.averageRating == null
                                                            ? 0
                                                            : productDetails.averageRating
                                                    }
                                                    style={{ fontSize: 14, marginLeft: 8 }}
                                                />

                                                <span className="sep">|</span>
                                                <div className="inline-label">
                                                    <Text type="secondary" strong>
                                                        {langs.labels.reviews}:
                                                    </Text>
                                                    <Text className="m-l10" strong>
                                                        {productDetails.reviews.length > 0
                                                            ? productDetails.reviews.length
                                                            : '0'}
                                                    </Text>
                                                </div>
                                            </Fragment>
                                        )}
                                    </div>
                                    <Descriptions bordered className={'product-attr'} size="small">

                                        {productDetails.brand &&
                                            <Descriptions.Item label={langs.labels.brand}>
                                                {productDetails.brand}
                                            </Descriptions.Item>
                                        }
                                        {
                                            productDetails.categories.length > 0 &&
                                            <Descriptions.Item label={langs.labels.category}>
                                                {productDetails.categories.map((item) => {
                                                    return (
                                                        <span className="categories-item" key={item}>
                                                            {item}
                                                        </span>
                                                    );
                                                })}
                                            </Descriptions.Item>
                                        }

                                        {productDetails.models.length > 0 && (
                                            <Descriptions.Item label={langs.labels.model}>
                                                {productDetails.models.map((model) => {
                                                    return (
                                                        <span
                                                            className="categories-item"
                                                            key={model}>
                                                            {model}
                                                        </span>
                                                    );
                                                })}
                                            </Descriptions.Item>
                                        )}
                                        {productDetails.segment && (
                                            <Descriptions.Item label={langs.labels.segment}>
                                                {productDetails.segment}
                                            </Descriptions.Item>
                                        )}
                                        {productDetails.manufacturer && (
                                            <Descriptions.Item label={langs.labels.manufacturer}>
                                                {productDetails.manufacturer}
                                            </Descriptions.Item>
                                        )}
                                    </Descriptions>

                                    <div className={'p-t15'} />
                                    <div className="price-box">
                                        {productDetails.discount == 0 ? (
                                            <Text className="regular-price" strong>
                                                {formatToCurrency(productDetails.price)}
                                            </Text>
                                        ) : (
                                            <Fragment>
                                                <Text className="regular-price" strong>
                                                    {formatToCurrency(productDetails.price)}
                                                </Text>
                                                <Text className="old-price">
                                                    {formatToCurrency(productDetails.regular_price)}
                                                </Text>
                                                {!!productDetails.discount && (
                                                    <Text className="price-off">{`${productDetails.discount}% ${langs.labels.off}`}</Text>
                                                )}
                                            </Fragment>
                                        )}
                                    </div>
                                    <div className="product-item-actions">
                                        <div className="qty-wrapper">
                                            <Qty
                                                moq={productDetails.moq ? productDetails.moq : 1}
                                                count={count}
                                                setCount={setCount}
                                            />
                                        </div>
                                        <div className="add-to-cart-box">
                                            <span className="total-price">
                                                <CalPrice
                                                    price={productDetails.price}
                                                    count={count}
                                                />
                                            </span>
                                            <ButtonWraper
                                                type="default"
                                                disabled={countValidation}
                                                onClick={() => {
                                                    addToCart(productDetails);
                                                }}>
                                                <span className="m-hide">
                                                    {langs.labels.addToCart}
                                                </span>
                                                <span className="d-hide">
                                                    <img
                                                        src="/assets/images/svg/add-icon-white.svg"
                                                        alt="Add Icon"
                                                    />
                                                    <span>{langs.labels.add}</span>
                                                </span>
                                            </ButtonWraper>
                                        </div>
                                    </div>
                                    {inventoryValidation &&
                                        <Text type={'danger'} className="inventory-validation-error">{langs.validationMessages.inventoryValidation}</Text>
                                    }
                                    <Divider className="custom-divider" />
                                    {productDetails.offer &&
                                        <div className="m-t10">
                                            <Title level={5} strong>{langs.labels.availableOffers}</Title>
                                            <div className="d-flex align-items-center">
                                                <TagFilled style={{color: '#05a754', fontSize: '16px'}} />
                                                <Text className="m-l10">{productDetails.offer}</Text>
                                            </div>
                                            <Divider className="custom-divider" />
                                        </div>
                                    }
                                    {productDetails.delivery_period &&
                                        <div className="m-t15">
                                            <Text type="secondary" strong>{langs.labels.deliveryPeriod}: </Text>
                                            <Text strong>{productDetails.delivery_period}</Text>
                                        </div>
                                    }
                                    {productDetails.additional_info &&
                                        <Fragment>
                                            <Divider className="custom-divider" />
                                            <div className="product-additional-info">
                                                <div className="product-additional-info-header" onClick={additionalInfoToggle}>
                                                    <Title level={5} strong>{langs.label.additionalInfo}</Title>
                                                    {isAdditionalInfo ? <UpOutlined /> : <RightOutlined />}
                                                </div>
                                                {isAdditionalInfo && (
                                                    <div className="product-additional-info-content">
                                                        {productDetails.additional_info}
                                                    </div>
                                                )}
                                            </div>
                                        </Fragment>
                                    }
                                </div>

                                <ShareWithUs
                                    product_link={router.asPath}
                                    name={productDetails.name} 
                                    price={formatToCurrency(productDetails.price)} 
                                    discount={`${productDetails.discount}% ${langs.labels.off}`} 
                                    category={productDetails.categories} 
                                    brand={productDetails.brand} 
                                    moq={productDetails.moq}
                                    image={productDetails.main_image}
                                />

                                <Tabs defaultActiveKey="1" className="product-detail-tab">
                                    <TabPane tab={`${langs.labels.description}`} key="1">
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: productDetails.description
                                            }}
                                        />
                                    </TabPane>
                                    {!isInventory && (
                                        <TabPane
                                            tab={`${langs.labels.reviews} (${productDetails.reviews
                                                ? productDetails.reviews.length
                                                : 0
                                                })`}
                                            key="2">
                                            <Reviews productDetails={productDetails} />
                                        </TabPane>
                                    )}
                                </Tabs>
                            </Col>
                        </Row>
                    </div>
                </Responsive.Mobile>

                <div className="wrap">
                    <Responsive.Desktop>
                        <div className="product-detail-box">
                            <Row>
                                <Col md={10} xs={24}>
                                    <div className="product-detail-box-img">
                                        <div
                                            onClick={() => addProductToFavourite(productDetails)}
                                            className={`favourite ${favouriteIds.some(
                                                (itemSku) => itemSku == productDetails.id
                                            )
                                                ? 'active'
                                                : ''
                                                }`}>
                                            <StarFilled />
                                        </div>
                                        <Fragment>
                                            <ProductCarousel
                                                mainImages={
                                                    productDetails.gallery_images ?
                                                    productDetails.gallery_images.map(
                                                        (item, index) => {
                                                            return (
                                                                <div key={`${index}-mm`}>
                                                                    <ReactImageMagnify
                                                                        {...{
                                                                            // enlargedImageContainerStyle: {
                                                                            //     background: 'white'
                                                                            // },
                                                                            lensStyle: {
                                                                                backgroundColor:
                                                                                    'rgba(0,0,0,.6)'
                                                                            },
                                                                            isHintEnabled: true,
                                                                            hintTextMouse:
                                                                                'Hover to Zoom',
                                                                            imageClassName:
                                                                                'product-view-image',
                                                                            smallImage: {
                                                                                alt: name,
                                                                                isFluidWidth: true,
                                                                                src: item
                                                                                // width: 400,
                                                                                // height: 400
                                                                            },
                                                                            largeImage: {
                                                                                src: item,
                                                                                width: 1200,
                                                                                height: 1200
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            );
                                                        }
                                                    ):
                                                    <Image
                                                        src={productDetails.main_image}
                                                        unsized={true}
                                                        alt={productDetails.name}
                                                        responsive
                                                        layout={'responsive'}
                                                    />
                                                }
                                                thumbImages={
                                                    productDetails.gallery_images &&
                                                    productDetails.gallery_images.map(
                                                        (item, index) => {
                                                            return (
                                                                <Image
                                                                    src={item}
                                                                    unsized={true}
                                                                    alt="{product.name}"
                                                                    layout={'responsive'}
                                                                    key={`${index}-mp`}
                                                                />
                                                            );
                                                        }
                                                    )
                                                }
                                            />
                                        </Fragment>
                                    </div>
                                </Col>
                                <Col md={14} xs={24}>
                                    <div className="product-detail">
                                        <div className="product-name">
                                            <Title level={4} className="product-item-name">
                                                {productDetails.name}
                                            </Title>

                                            <ShareWithUs
                                                product_link={router.asPath}
                                                name={productDetails.name} 
                                                price={formatToCurrency(productDetails.price)} 
                                                discount={`${productDetails.discount}% ${langs.labels.off}`} 
                                                category={productDetails.categories} 
                                                brand={productDetails.brand} 
                                                moq={productDetails.moq}
                                                image={productDetails.main_image}
                                            />
                                        </div>
                                        <div className="p-num">
                                            {productDetails.part_number && (
                                                <Fragment>
                                                    <div className="inline-label">
                                                        <StatusTag
                                                            value={productDetails.part_number}
                                                            color={'geekblue'}
                                                        />
                                                    </div>
                                                    <span className="sep">|</span>
                                                    <div className="inline-label">
                                                        <Text type="secondary" strong>
                                                            {langs.labels.moq}:
                                                        </Text>
                                                        <Text className="m-l10" strong>
                                                            {productDetails.moq
                                                                ? productDetails.moq
                                                                : 1}
                                                        </Text>
                                                    </div>
                                                    <span className="sep">|</span>
                                                    <div className="inline-label">
                                                        <Text type="secondary" strong>
                                                            {langs.labels.unit}:
                                                        </Text>
                                                        <Text className="m-l10" strong>
                                                            {productDetails.unit
                                                                ? productDetails.unit
                                                                : 1}
                                                        </Text>
                                                    </div>
                                                </Fragment>
                                            )}
                                            {productDetails.reviews && (
                                                <Fragment>
                                                    <span className="sep">|</span>
                                                    <div className="inline-label">
                                                        <Text type="secondary" strong>
                                                            {langs.labels.rating}:
                                                        </Text>
                                                    </div>

                                                    <Rate
                                                        defaultValue={0}
                                                        value={
                                                            productDetails.averageRating == null
                                                                ? 0
                                                                : productDetails.averageRating
                                                        }
                                                        style={{ fontSize: 14, marginLeft: 8 }}
                                                    />

                                                    <span className="sep">|</span>
                                                    <div className="inline-label">
                                                        <Text type="secondary" strong>
                                                            {langs.labels.reviews}:
                                                        </Text>
                                                        <Text className="m-l10" strong>
                                                            {productDetails.reviews.length > 0
                                                                ? productDetails.reviews.length
                                                                : '0'}
                                                        </Text>
                                                    </div>
                                                </Fragment>
                                            )}
                                        </div>
                                        <br />
                                        <Descriptions>
                                            {productDetails.brand &&
                                                <Descriptions.Item label={langs.labels.brand}>
                                                    {productDetails.brand}
                                                </Descriptions.Item>
                                            }
                                            {productDetails.categories.length > 0 &&
                                                <Descriptions.Item label={langs.labels.category}>
                                                    {productDetails.categories.map((item) => {
                                                        return (
                                                            <span
                                                                className="categories-item"
                                                                key={item}>
                                                                {item}
                                                            </span>
                                                        );
                                                    })}
                                                </Descriptions.Item>
                                            }
                                            {productDetails.models.length > 0 &&
                                                <Descriptions.Item label={langs.labels.model}>
                                                    {productDetails.models.map((model) => {
                                                        return (
                                                            <span
                                                                className="categories-item"
                                                                key={model}>
                                                                {model}
                                                            </span>
                                                        );
                                                    })}
                                                </Descriptions.Item>
                                            }
                                            {productDetails.segment &&
                                                <Descriptions.Item label={langs.labels.segment}>
                                                    {productDetails.segment}
                                                </Descriptions.Item>
                                            }

                                            {productDetails.manufacturer &&
                                                <Descriptions.Item label={langs.labels.manufacturer}>
                                                    {productDetails.manufacturer}
                                                </Descriptions.Item>
                                            }

                                        </Descriptions>
                                        <div className={'p-t15'} />
                                        <div className="price-box">
                                            {productDetails.discount == 0 ? (
                                                <Text className="regular-price" strong>
                                                    {formatToCurrency(productDetails.price)}
                                                </Text>
                                            ) : (
                                                <Fragment>
                                                    <Text className="regular-price" strong>
                                                        {formatToCurrency(productDetails.price)}
                                                    </Text>
                                                    <Text className="old-price">
                                                        {formatToCurrency(productDetails.regular_price)}
                                                    </Text>
                                                    {!!productDetails.discount && (
                                                        <Text className="price-off">{`${productDetails.discount}% ${langs.labels.off}`}</Text>
                                                    )}
                                                </Fragment>
                                            )}
                                        </div>
                                        <div className="product-item-actions">
                                            <div className="qty-wrapper">
                                                <div>
                                                    <Text type="secondary" strong>
                                                        {langs.labels.quantity}
                                                    </Text>
                                                </div>
                                                <Qty
                                                    moq={
                                                        productDetails.moq ? productDetails.moq : 1
                                                    }
                                                    count={count}
                                                    setCount={setCount}
                                                />
                                            </div>
                                            <div className="add-to-cart-box">
                                                <ButtonWraper
                                                    type="default"
                                                    disabled={countValidation}
                                                    onClick={() => {
                                                        addToCart(productDetails);
                                                    }}
                                                    size={'large'}>
                                                    <span className="m-hide">{langs.labels.addToCart}</span>
                                                    <span className="d-hide">
                                                        <img
                                                            src="/assets/images/svg/add-icon-white.svg"
                                                            alt="Add Icon"
                                                        />
                                                        <span>{langs.labels.add}</span>
                                                    </span>
                                                </ButtonWraper>
                                                <span className="total-price">
                                                    <CalPrice
                                                        price={productDetails.price}
                                                        count={count}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                        {inventoryValidation &&
                                            <Text type={'danger'} className="inventory-validation-error">{langs.validationMessages.inventoryValidation}</Text>
                                        }
                                        {productDetails.offer &&
                                            <div className="m-t15">
                                                <Title level={5} strong>{langs.labels.availableOffers}</Title>
                                                <div className="d-flex align-items-center">
                                                    <TagFilled style={{color: '#05a754', fontSize: '16px'}} />
                                                    <Text className="m-l10">{productDetails.offer}</Text>
                                                </div>
                                                <Divider className="custom-divider" />
                                            </div>
                                        }
                                        {productDetails.delivery_period &&
                                            <div className="m-t15">
                                                <Text type="secondary" strong>{langs.labels.deliveryPeriod}: </Text>
                                                <Text strong>{productDetails.delivery_period}</Text>
                                            </div>
                                        }
                                        {productDetails.additional_info &&
                                            <Fragment>
                                                <Divider className="custom-divider" />
                                                <div className="product-additional-info">
                                                    <div className="product-additional-info-header" onClick={additionalInfoToggle}>
                                                        <Title level={5} strong>{langs.labels.additionalInfo}</Title>
                                                        {isAdditionalInfo ? <UpOutlined /> : <RightOutlined />}
                                                    </div>
                                                    {isAdditionalInfo && (
                                                        <div className="product-additional-info-content">
                                                            {productDetails.additional_info}
                                                        </div>
                                                    )}
                                                </div>
                                            </Fragment>
                                        }
                                        <Tabs defaultActiveKey="1" className="product-detail-tab">
                                            <TabPane tab={langs.labels.description} key="1">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: productDetails.description
                                                    }}
                                                />
                                            </TabPane>
                                            {!isInventory && (
                                                <TabPane
                                                    tab={`${langs.labels.reviews} (${productDetails.reviews
                                                        ? productDetails.reviews.length
                                                        : 0
                                                        })`}
                                                    key="2">
                                                    <Reviews productDetails={productDetails} />
                                                </TabPane>
                                            )}
                                        </Tabs>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Responsive.Desktop>
                </div>
            </LoadData>
        </Fragment>
    );
};

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

// export default ProductDetail;
export default withAppContext(ProductDetail);