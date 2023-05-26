import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Qty from '../qty';
import useQuantity from '../../hooks/useQuantity';
import { ADD_TO_CART_INITIATE } from '../../store/cart/Action';
import { formatToCurrency } from '../../helper/Utils';
import StatusTag from '../common/tag';
import CalPrice from './CalPrice';
import { langs } from '../../localization';
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'))
const { Title, Text } = Typography;

const ProductItemNoImage = (props) => {
    const { product, isInventory } = props;
    const [count, setCount, countValidation] = useQuantity(product);
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

    return (
        <div className="product-item no-image-item ">
            <div className="product-item-content">
                <div className="product-item-details">
                    <div className="product-item-info">
                        <Title level={5} className="product-item-name">
                            <Link
                                href={`/shop/product-detail/[productId]`}
                                as={`/shop/product-detail/${product.slug}`}>
                                <a>{product.name}</a>
                            </Link>
                        </Title>
                        <StatusTag value={product.part_number} color={'geekblue'} />
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
            </div>
            {isInventory ? (
                <div className="product-item-footer">{`In-stock quantity - ${product.inventory_value}`}</div>
            ) : (
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
                                <span className="m-hide">Add to cart</span>
                                <span className="d-hide">
                                    <img
                                        src="/assets/images/svg/add-icon-white.svg"
                                        alt="Add Icon"
                                    />{' '}
                                    <span>Add</span>
                                </span>
                            </ButtonWraper>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ProductItemNoImage;
