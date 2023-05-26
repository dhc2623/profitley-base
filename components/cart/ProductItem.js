import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Descriptions, Typography } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import useQuantity from '../../hooks/useQuantity';
import { ADD_TO_FAVOURITE_INITIATE } from '../../store/favourite/Action';
import { REMOVE_FROM_CART_INITIATE, UPDATE_TO_CART_INITIATE } from '../../store/cart/Action';
import { convertArrayToString, formatToCurrency } from '../../helper/Utils';
import { langs } from '../../localization';
const Qty = dynamic(() => import('../qty'));
const CalPrice = dynamic(() => import('../shop/CalPrice'));
const StatusTag = dynamic(() => import('../common/tag'));
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));
const Image = dynamic(() => import('../common/image'));
const { Title, Text } = Typography;

const ProductItem = (props) => {
    const { product } = props;
    const [count, setCount, countValidation, inventoryValidation] = useQuantity(product);
    const cartDetails = useSelector((state) => state.cart.cartDetails);
    const loading = useSelector((state) => state.cart.loading);
    const favouriteIds = useSelector((state) => state.favourite.favouriteIds);
    const [total, setTotal] = useState(product.totalPrice);
    const favouriteState = useSelector((state) => state);
    const [togglePanel, setTogglePanel] = useState(false);
    const handleTogglePanel = () => setTogglePanel(!togglePanel);

    const dispatch = useDispatch();

    useEffect(() => {
        setCount(product.quantity);
    }, []);

    /**
     * @name updateinCart
     * @description handle update in cart
     * @param {data}
     * @returns {}
     */
    const updateinCart = (data) => {
        const postData = {
            cart_id: cartDetails.id,
            item_sku: data.sku_code,
            quantity: count
        };
        dispatch({ type: UPDATE_TO_CART_INITIATE, postData });
    };

    /**
     * @name removeFromCart
     * @description remove product from cart
     * @param {item}
     * @returns {}
     */
    const removeFromCart = (item) => {
        const postData = {
            cart_id: cartDetails.id,
            item_sku: item.sku_code
        };
        dispatch({ type: REMOVE_FROM_CART_INITIATE, postData });
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
        <div className="product-item-cart ">
            <div className="product-item-content">
                <span className="product-item-photo">
                    <Image
                        src={product.main_image}
                        className="product-image"
                        width={80}
                        height={80}
                        alt={product.name}
                    />
                </span>
                <div className="product-item-details">
                    <div className="product-item-info">
                        <StatusTag value={product.part_number} color={'geekblue'} />

                        <a
                            onClick={handleTogglePanel}
                            className={`toggle-arrow ${togglePanel && 'active'}`}>
                            <DownOutlined />
                        </a>

                        <Title level={5} className={`product-item-name ${!togglePanel && 'm-b0'}`}>
                            <Link
                                href={`/shop/product-detail/[productId]`}
                                as={`/shop/product-detail/${product.slug}`}>
                                <a>{product.name}</a>
                            </Link>
                        </Title>
                        {togglePanel && (
                            <div>
                                <Descriptions>
                                    <Descriptions.Item label={langs.labels.category}>
                                        {convertArrayToString(product.categories)}
                                    </Descriptions.Item>
                                </Descriptions>
                                <Descriptions>
                                    <Descriptions.Item label={langs.labels.brand}>
                                        {product.brand}
                                    </Descriptions.Item>
                                </Descriptions>
                                {product.Model && (
                                    <Descriptions>
                                        <Descriptions.Item label={langs.labels.model}>
                                            {product.Model}
                                        </Descriptions.Item>
                                    </Descriptions>
                                )}
                                {product.moq && (
                                    <Descriptions>
                                        <Descriptions.Item label={langs.labels.moq}>
                                            {product.moq ? product.moq : 1}
                                        </Descriptions.Item>
                                    </Descriptions>
                                )}
                                {product.unit && (
                                    <Descriptions>
                                        <Descriptions.Item label={langs.labels.unit}>
                                            {product.unit}
                                        </Descriptions.Item>
                                    </Descriptions>
                                )}
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
                        )}
                    </div>
                    <div className="p-t5 p-b5 fav-links">
                        {favouriteIds.some((itemSku) => itemSku == product.id) ? (
                            ''
                        ) : (
                            <a onClick={() => addProductToFavourite(product)} className="p-r15">
                                <Text strong className="uppercase">
                                    {langs.labels.addToFavourite}
                                </Text>
                            </a>
                        )}
                        <a
                            onClick={() => {
                                removeFromCart(product);
                            }}
                            href="#">
                            <Text type="danger" strong className="uppercase">
                                {langs.labels.remove}
                            </Text>
                        </a>
                    </div>
                    {inventoryValidation && (
                            <Text type={'danger'} className={'inventory-validation-error'}>
                        {langs.validationMessages.inventoryValidation}
                            </Text>
                        )}
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
                        {/* <ButtonWraper
							type="danger"
							disabled={countValidation}
							onClick={() => {
								removeFromCart(product);
							}}
							block
							icon={<DeleteOutlined />}
							loading={loading}
						>
							{langs.labels.remove}
						</ButtonWraper> */}
                        
                        <ButtonWraper
                            type="primary"
                            disabled={countValidation}
                            onClick={() => {
                                updateinCart(product);
                            }}
                            loading={loading}
                            block>
                            {langs.labels.update}
                        </ButtonWraper>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductItem;
