import { Typography } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Fragment, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../../contexts/userContext';
import { formatToCurrency } from '../../helper/Utils';
import useQuantity from '../../hooks/useQuantity';
import { langs } from '../../localization';
import { ADD_TO_CART_INITIATE } from '../../store/cart/Action';
import { ADD_TO_FAVOURITE_INITIATE } from '../../store/favourite/Action';
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));
const StatusTag = dynamic(() => import('../common/tag'));
const Qty = dynamic(() => import('../qty'));
const Image = dynamic(() => import('../common/image'));
const { Title, Text } = Typography;

const ProductItemGridMobile = (props) => {
    const { product, isInventory } = props;
    const [count, setCount, countValidation, inventoryValidation] = useQuantity(product);
    const [total, setTotal] = useState(product.price);
    const favouriteIds = useSelector((state) => state.favourite.favouriteIds);
    const dispatch = useDispatch();
    const user = useContext(UserContext)
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
        <div className="product-item grid ">
            <div className="product-item-content">
                <span className="product-item-photo">
                    <Link href={`/shop/product-detail/[productId]`} as={`/shop/product-detail/${product.slug}`}>
                        <a>
                            <Image
                                src={product.thumb_image}
                                className="product-image"
                                width={180}
                                height={180}
                                alt={product.name}
                            />
                        </a>
                    </Link>
                </span>
                <div className="product-item-details">
                    <div className="product-item-info">
                        <div className="clearfix">
                            <StatusTag value={product.part_number} color={'geekblue'} />
                        </div>
                        <Title level={5} className="product-item-name">
                            <Link
                                href={`/shop/product-detail/[productId]`}
                                as={`/shop/product-detail/${product.slug}`}>
                                <a>{product.name}</a>
                            </Link>
                        </Title>
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
                                    {/* {!!product.discount && (
                                        <span className="price-off">
                                            {product.discount}% {langs.labels.off}
                                        </span>
                                    )} */}
                                </Fragment>
                            )}
                        </div>
                    </div>
                </div>
                
                    <div className="product-item-actions">
                        <div className="qty-wrapper">
                            <Qty
                                moq={product.moq ? product.moq : 1}
                                count={count}
                                setCount={setCount}
                            />
                        </div>
                        <div className="add-to-cart-box">
                            <ButtonWraper
                                type="default"
                                disabled={countValidation}
                                onClick={() => {
                                    addToCart(product);
                                }}>
                                <span>
                                    <img
                                        src="/assets/images/svg/add-icon-white.svg"
                                        alt="Add Icon"
                                    />
                                </span>
                            </ButtonWraper>
                        </div>
                    </div>
                    {inventoryValidation &&
                        <Text type={'danger'} className={'inventory-validation-error align-center'}>{langs.validationMessages.inventoryValidation}</Text>
                    }
                
                    <div
                        onClick={() => addProductToFavourite(product)}
                        className={`favourite ${
                            favouriteIds.some((itemSku) => itemSku == product.id) ? 'active' : ''
                        }`}>
                        <i className="fas fa-star"></i>
                    </div>
               
            </div>
        </div>
    );
};
export default ProductItemGridMobile;
