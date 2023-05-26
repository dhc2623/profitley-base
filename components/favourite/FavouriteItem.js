import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Descriptions, Typography } from 'antd';
import dynamic from 'next/dynamic';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { ADD_TO_CART_INITIATE } from '../../store/cart/Action';
import { REMOVE_FROM_FAVOURITE_INITIATE } from '../../store/favourite/Action';
import { langs } from '../../localization';
import { convertArrayToString } from '../../helper/Utils';
import useQuantity from '../../hooks/useQuantity';
const Qty = dynamic(() => import('../qty'));
const StatusTag = dynamic(() => import('../common/tag'));
const CalPrice = dynamic(() => import('../shop/CalPrice'));
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));
const Image = dynamic(() => import('../common/image'));
const { Title, Text } = Typography;

const FavouriteItem = (props) => {
    const { item } = props;
    const [count, setCount, countValidation] = useQuantity(item);
    const [total, setTotal] = useState(1);
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
        <div className="favourite-item">
            <div className="favourite-item-content">
                <span className="favourite-item-photo">
                    <Image
                        src={item.main_image}
                        className="product-image"
                        width={80}
                        height={80}
                        alt={item.name}
                    />
                </span>
                <div className="favourite-item-details">
                    <div className="favourite-item-info">
                        <StatusTag value={item.part_number} color={'geekblue'} />
                        <Title level={5} className="favourite-item-name">
                            {item.name}
                        </Title>
                        <Descriptions>
                            <Descriptions.Item label="Brand">{item.brand}</Descriptions.Item>
                            <Descriptions.Item label={langs.labels.category}>
                                {convertArrayToString(item.categories)}
                            </Descriptions.Item>
                            {item.moq && (
                                <Descriptions.Item label={langs.labels.moq}>
                                    {item.moq ? item.moq : 1}
                                </Descriptions.Item>
                            )}
                            {item.unit && (
                                <Descriptions.Item label={langs.labels.unit}>
                                    {item.unit}
                                </Descriptions.Item>
                            )}
                        </Descriptions>
                        <div className="price-box">
                            <span className="regular-price">{item.price}</span>
                            <span className="old-price">$ {item.regular_price}</span>
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
                <div className="favourite-item-actions">
                    <div className="qty-wrapper">
                        <Qty moq={item.moq ? item.moq : 1} count={count} setCount={setCount} />
                    </div>
                    <span className="total-price">
                        <CalPrice price={item.price} count={count} />
                    </span>
                    <div className="favourite-item-action">
                        <div className="qty-wrapper" style={{ flex: 1, textAlign: 'center' }}>
                            <ButtonWraper
                                onClick={() => remove(item)}
                                type="danger"
                                block
                                icon={<DeleteOutlined />}>
                                {langs.labels.remove}
                            </ButtonWraper>
                        </div>
                    </div>
                    <div className="favourite-item-action">
                        <div className="add-to-cart-box" style={{ flex: 1, textAlign: 'center' }}>
                            <ButtonWraper
                                type="default"
                                disabled={countValidation}
                                onClick={() => {
                                    addToCart(item);
                                }}
                                block
                                icon={<PlusOutlined />}>
                                {langs.labels.add}
                            </ButtonWraper>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FavouriteItem;
