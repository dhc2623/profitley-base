import { Descriptions, Button, Typography, Space } from 'antd';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Fragment, useState } from 'react';
import useQuantity from '../../hooks/useQuantity';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_FAVOURITE_INITIATE } from '../../store/favourite/Action';
import { ADD_TO_CART_INITIATE } from '../../store/cart/Action';
import { convertArrayToString, formatToCurrency } from '../../helper/Utils';
import { useRouter } from 'next/router';
import { langs } from '../../localization';
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));
const Qty = dynamic(() => import('../qty'));
const StatusTag = dynamic(() => import('../common/tag'));
const CalPrice = dynamic(() => import('./CalPrice'));
const Image = dynamic(() => import('../common/image'));
const { Title, Text } = Typography;

const ProductItem = (props) => {
    const { product, isInventory } = props;
    const router = useRouter();
    const [count, setCount, countValidation, inventoryValidation] = useQuantity(product);
    const [total, setTotal] = useState(product.price);
    const favouriteIds = useSelector((state) => state.favourite.favouriteIds);
    const favouriteLoading = useSelector((state) => state.favourite.loading);
    const dispatch = useDispatch();

    /**
     * @name addToCart
     * @description add product to cart
     * @param {data}
     * @returns {}
     */
    const addToCart = (data) => {
        data.quantity = count;
        data.totalPrice = total;
        setCount(data.moq);
        dispatch({ type: ADD_TO_CART_INITIATE, product: data });
    };

    /**
     * @name addProductToFavourite
     * @description add product to favourite
     * @param {product}
     * @returns {}
     */
    const addProductToFavourite = (product) => {
        dispatch({
            type: ADD_TO_FAVOURITE_INITIATE,
            payload: product.id,
            favouriteIds
        });
    };

    return (
        <div className="product-item list-with-img ">
            <div className="product-item-content">
                <span className="product-item-photo">
                    <Link href={`/shop/product-detail/[productId]`} as={`/shop/product-detail/${product.slug}`}>
                        <a>
                            <Image
                                src={product.thumb_image}
                                className="product-image"
                                width={120}
                                height={120}
                                alt={product.name}
                            />
                        </a>
                    </Link>
                </span>
                <div className="product-item-details">
                    <div className="product-item-info">
                        <Space size={[2, 0]} align="start">
                            <StatusTag value={product.part_number} color={'geekblue'} />
                            {isInventory != "true" && product.inventory == "finite" &&
                                <div className={'inventory'}>
                                    <Typography.Text type={product.inventory_value ? 'success' : 'danger'}>
                                        <small>
                                            <small>
                                                {product.inventory_value ? `${langs.labels.inStock} : ` : `${langs.labels.outOfStock}`}{' '}
                                                {product.inventory_value}
                                            </small>
                                        </small>
                                    </Typography.Text>
                                </div>
                            }
                        </Space>

                        <Title level={5} className="product-item-name">
                            <Link
                                href={`/shop/product-detail/[productId]`}
                                as={`/shop/product-detail/${product.slug}`}>
                                <a>{product.name}</a>
                            </Link>
                        </Title>
                        <Descriptions>
                            {product.categories.length > 0 && (
                                <Descriptions.Item label={langs.labels.category}>
                                    {product.categories.map((item) => {
                                        return (
                                            <span className="categories-item" key={item}>
                                                {item}
                                            </span>
                                        );
                                    })}
                                </Descriptions.Item>
                            )}
                            {product.brand && (
                                <Descriptions.Item label={langs.labels.brand}>{product.brand}</Descriptions.Item>
                            )}
                            {product.models && (
                                <Descriptions.Item label={langs.labels.model}>
                                    {convertArrayToString(product.models)}
                                </Descriptions.Item>
                            )}
                            {product.moq && (
                                <Descriptions.Item label={langs.labels.moq}>
                                    {product.moq ? product.moq : 1}
                                </Descriptions.Item>
                            )}
                            {/* {product.unit && (
                                <Descriptions.Item label={langs.labels.unit}>
                                    {product.unit}
                                </Descriptions.Item>
                            )} */}
                        </Descriptions>
                        <div className="price-box">
                            {product.discount == 0 ? (
                                <Fragment>
                                    <span className="regular-price">
                                        {formatToCurrency(product.price)}
                                    </span>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <span className="regular-price">
                                        {formatToCurrency(product.price)}
                                    </span>
                                    <span className="old-price">
                                        {formatToCurrency(product.regular_price)}
                                    </span>
                                    {!!product.discount && (
                                        <span className="price-off">
                                            {product.discount}% {langs.labels.off}
                                        </span>
                                    )}
                                </Fragment>
                            )}
                        </div>
                    </div>
                </div>
                <a className="quick-view-link" title={langs.labels.quickView}>
                    <img src={'/assets/images/svg/quick-view-icon.svg'} alt={langs.labels.quickView} />
                </a>
                
                <div
                    onClick={() => addProductToFavourite(product)}
                    className={`favourite ${
                        favouriteIds.some((itemSku) => itemSku == product.id) ? 'active' : ''
                    }`}>
                    <i className="fas fa-star"></i>
                </div>
                
            </div>
            
                <div className="product-item-footer">
                    <div className="product-item-actions">
                        <div className="qty-wrapper">
                            <Qty
                                moq={product.moq ? product.moq : 1}
                                count={count}
                                setCount={setCount}
                            />
                        </div>
                        <div className="add-to-cart-box">
                            <span className="total-price">
                                <CalPrice price={product.price} count={count} />
                            </span>
                            <ButtonWraper
                                type="default"
                                disabled={countValidation}
                                onClick={() => {
                                    addToCart(product);
                                }}>
                                <span className="m-hide">{langs.labels.addToCart}</span>
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
                        <Text type={'danger'} className={'inventory-validation-error align-center'}>{langs.validationMessages.inventoryValidation}</Text>
                    }
                </div>
            
        </div>
    );
};
export default ProductItem;
