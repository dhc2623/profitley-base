import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Descriptions, Button, Typography, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { ADD_TO_CART_INITIATE } from '../../store/cart/Action';
import { REMOVE_FROM_FAVOURITE_INITIATE } from '../../store/favourite/Action';
import { convertArrayToString, formatToCurrency } from '../../helper/Utils';
import { langs } from '../../localization';
import useQuantity from '../../hooks/useQuantity';
const Qty = dynamic(() => import('../qty'));
const StatusTag = dynamic(() => import('../common/tag'));
const CalPrice = dynamic(() => import('../shop/CalPrice'));
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'))
const Image = dynamic(() => import('../common/image'));
const { Title, Text } = Typography;

const FavouriteItemDesktop = (props) => {
    const { item } = props;
    const [count, setCount, countValidation, inventoryValidation] = useQuantity(item);
    const [total, setTotal] = useState(1);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.favourite.loading);

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
     * @name remove
     * @description remove product from cart
     * @param {product}
     * @returns {}
     */
    const remove = (product) => {
        dispatch({
            type: REMOVE_FROM_FAVOURITE_INITIATE,
            id: product.id
        });
    };

    return (
        <div className="favourite-item desktop">
            <div className="favourite-item-content">
                <span className="favourite-item-photo">
                    <Link
                        href={`/shop/product-detail/[productId]`}
                        as={`/shop/product-detail/${item.id}`}>
                        <a>
                            <Image
                                src={item.main_image}
                                className="product-image"
                                width={195}
                                height={195}
                                alt={item.name}
                            />
                        </a>
                    </Link>
                    <Link
                        href={`/shop/product-detail/[productId]`}
                        as={`/shop/product-detail/${item.id}`}>
                        <a className="quick-view-link" title="Quick View">
                            <img src={'/assets/images/svg/quick-view-icon.svg'} alt="Quick View" />
                        </a>
                    </Link>
                </span>
                <div className="favourite-item-details">
                    <div className="favourite-item-info">
                        <StatusTag value={item.part_number} color={'geekblue'} />
                        <Title level={5} className="favourite-item-name">
                            <Link
                                href={`/shop/product-detail/[productId]`}
                                as={`/shop/product-detail/${item.id}`}>
                                <a>{item.name}</a>
                            </Link>
                        </Title>
                        {item.categories && (
                            <Descriptions>
                                <Descriptions.Item label={langs.labels.category}>
                                    {convertArrayToString(item.categories)}
                                </Descriptions.Item>
                            </Descriptions>
                        )}
                        {item.brand && (
                            <Descriptions>
                                <Descriptions.Item label={langs.labels.brand}>{item.brand}</Descriptions.Item>
                            </Descriptions>
                        )}
                        {item.models && (
                            <Descriptions>
                                <Descriptions.Item label={langs.labels.model}>
                                    {convertArrayToString(item.models)}
                                </Descriptions.Item>
                            </Descriptions>
                        )}
                        {item.moq && (
                            <Descriptions>
                                <Descriptions.Item label={langs.labels.moq}>
                                    {item.moq ? item.moq : 1}
                                </Descriptions.Item>
                            </Descriptions>
                        )}
                        {item.unit && (
                            <Descriptions>
                                <Descriptions.Item label={langs.labels.unit}>
                                    {item.unit}
                                </Descriptions.Item>
                            </Descriptions>
                        )}
                        <div className="price-box">
                            <span className="regular-price">{formatToCurrency(item.price)}</span>
                            <span className="old-price">
                                {formatToCurrency(item.regular_price)}
                            </span>
                            {!!item.discount && (
                                <span className="price-off">
                                    {item.discount}% {langs.labels.off}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="favourite-item-footer">
                <div className="qty-wrapper">
                    <Qty moq={item.moq ? item.moq : 1} count={count} setCount={setCount} />
                    <span className="total-price">
                        <CalPrice price={item.price} count={count} />
                    </span>
                </div>
                {inventoryValidation &&
                    <Text type={'danger'} className={'inventory-validation-error'}>{langs.validationMessages.inventoryValidation}</Text>
                }
                <div className="favourite-item-actions">
                    <div className="favourite-item-action">
                        <ButtonWraper
                            type="danger"
                            // disabled={countValidation}
                            onClick={() => {
                                remove(item);
                            }}
                            block
                            icon={<DeleteOutlined />}
                            loading={loading}
                        >
                            {langs.labels.remove}
                        </ButtonWraper>
                    </div>
                    <div className="favourite-item-action">
                        <ButtonWraper
                            type="default"
                            disabled={countValidation}
                            onClick={() => {
                                addToCart(item);
                            }}
                            loading={loading}
                            block
                            icon={<PlusOutlined />}>
                            {langs.labels.addToCart}
                        </ButtonWraper>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FavouriteItemDesktop;
