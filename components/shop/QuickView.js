import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Row, Col, Rate, Carousel, Typography, Table, Tabs, Descriptions } from 'antd';
import dynamic from 'next/dynamic';
import useQuantity from '../../hooks/useQuantity';
import { langs } from '../../localization';
import Qty from '../qty';
import ButtonWraper from '../common/form/ButtonWrapper';
import { convertArrayToString, formatToCurrency } from '../../helper/Utils';
import { GET_PRODUCT_DETAILS_INITIATE, quickView } from '../../store/product/Action';
import { ADD_TO_CART_INITIATE } from '../../store/cart/Action';
import StatusTag from '../common/tag';
import LoadData from '../common/load-data';
import ModalWrapper from '../common/modal';
const Image = dynamic(() => import('../common/image'));
const { Title, Text } = Typography;

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

const QuickView = (props) => {
    const { id, visibility } = useSelector((state) => state.product.quickView);

    const router = useRouter();
    const dispatch = useDispatch();
    const [isInventory, setisInventory] = useState(true);
    const productDetails = useSelector((state) => state.product.productDetails);
    const productLoading = useSelector((state) => state.product.loading);
    const [count, setCount, countValidation, inventoryValidation] = useQuantity(productDetails);
    const [total, setTotal] = useState(0);
    const favouriteIds = useSelector((state) => state.favourite.favourite);
    const favouriteLoading = useSelector((state) => state.favourite.loading);
    const loading = useSelector((state) => state.order.loading);
    useEffect(() => {
        if (id) {
            dispatch({
                type: GET_PRODUCT_DETAILS_INITIATE,
                productId: id
            });
        }
    }, [id]);

    useEffect(() => {
        var str = router.pathname;
        var n = str.search('inventory');
        setisInventory(n != -1 ? true : false);
    }, [router.query]);

    useEffect(() => {
        if (productDetails && productDetails.moq) setCount(productDetails.moq);
    }, [productDetails]);

    /**
     * @name addToCart
     * @description add product to cart
     * @param {product}
     * @returns {}
     */
    const addToCart = (data) => {
        data.quantity = count;
        data.totalPrice = total;
        setCount(data.moq);
        dispatch({ type: ADD_TO_CART_INITIATE, product: data });
        dispatch(
            quickView({
                id: undefined,
                visibility: false
            })
        );
    };

    const prdAttributeData = [
        {
            key: '1',
            brand: productDetails.brand,
            categories: convertArrayToString(productDetails.categories),
            model: convertArrayToString(productDetails.models),
            segment: productDetails.segment,
            manufacturer: productDetails.manufacturer
        }
    ];

    /**
     * @name closePopup
     * @description It closes the popup
     * @param {product}
     * @returns {}
     */
    const closePopup = () => {
        dispatch(
            quickView({
                id: undefined,
                visibility: false
            })
        );
    };
    return (
        <ModalWrapper
            width={'100%'}
            title={false}
            visible={visibility}
            closable={true}
            footer={false}
            className="quick-view-modal"
            onCancel={closePopup}>
            <LoadData data={productDetails} loading={productLoading}>
                <div className="quick-view-box">
                    <Row>
                        <Col md={10} xs={24}>
                            <Carousel dotPosition="bottom" className="quick-view-slider">
                                <div>
                                    {/* <img src={productDetails.image} alt="" /> */}
                                    {productDetails.main_image && (
                                        <Image
                                            src={productDetails.main_image}
                                            width={380}
                                            height={380}
                                            alt={productDetails.name}
                                        />
                                    )}
                                </div>
                            </Carousel>
                        </Col>
                        <Col md={14} xs={24}>
                            <div className="quick-view-detail">
                                <div className="product-name">
                                    <Title level={4} className="product-item-name">
                                        {productDetails.name}
                                    </Title>
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
                                                    {productDetails.moq ? productDetails.moq : 1}
                                                </Text>
                                            </div>
                                            <span className="sep">|</span>
                                            <div className="inline-label">
                                                <Text type="secondary" strong>
                                                    {'Unit'}:
                                                </Text>
                                                <Text className="m-l10" strong>
                                                    {productDetails.unit}
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
                                    <span className="sep">|</span>
                                    <div className="inline-label">
                                        <Text type="secondary" strong>
                                            In-stock:
                                        </Text>
                                        <Text className="m-l10" strong>
                                            {productDetails.inventory_value
                                                ? productDetails.inventory_value
                                                : ''}
                                        </Text>
                                    </div>
                                </div>
                                <Descriptions>
                                    {productDetails.brand &&
                                        <Descriptions.Item label="Brand">
                                            {productDetails.brand}
                                        </Descriptions.Item>
                                    }
                                    {productDetails.categories.length > 0 &&
                                        <Descriptions.Item label="Category">
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
                                        <Descriptions.Item label="Model">
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
                                        <Descriptions.Item label="Segment">
                                            {productDetails.segment}
                                        </Descriptions.Item>
                                    }

                                    {productDetails.manufacturer &&
                                        <Descriptions.Item label="Manufacturer">
                                            {productDetails.manufacturer}
                                        </Descriptions.Item>
                                    }

                                </Descriptions>
                                <div className={'p-t15'} />
                                <div className="price-box">
                                    <Text className="regular-price" strong>
                                        {formatToCurrency(productDetails.price)}
                                        {/* <CalPrice
                                        price={productDetails.price}
                                        count={count}
                                    /> */}
                                    </Text>
                                    <Text className="old-price">
                                        {formatToCurrency(productDetails.regular_price)}
                                        {/* <CalPrice
                                        price={productDetails.regular_price}
                                        count={count}
                                    /> */}
                                    </Text>
                                    {!!productDetails.discount && (
                                        <Text className="price-off">
                                            {`${productDetails.discount}% ${langs.labels.off}`}
                                        </Text>
                                    )}
                                </div>
                                {!isInventory && (
                                    <Fragment>
                                    <div className="product-item-actions">
                                        <div className="qty-wrapper">
                                            <div>
                                                <Text type="secondary" strong>
                                                    Quantity
                                                </Text>
                                            </div>
                                            <Qty
                                                moq={productDetails.moq ? productDetails.moq : 1}
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
                                                <span>Add to cart</span>
                                            </ButtonWraper>
                                            <span className="total-price">
                                                {formatToCurrency(productDetails.price)}
                                                {/* <CalPrice
                                            price={productDetails.price}
                                            count={count}
                                        /> */}
                                            </span>
                                        </div>
                                    </div>
                                    {inventoryValidation &&
                                        <Text type={'danger'} className={'inventory-validation-error'}>{langs.validationMessages.inventoryValidation}</Text>
                                    }
                                    </Fragment>
                                )}
                            </div>
                        </Col>
                    </Row>
                </div>
            </LoadData>
        </ModalWrapper>
    );
};
export default QuickView;
