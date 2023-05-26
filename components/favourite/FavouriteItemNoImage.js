import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Descriptions, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { ADD_TO_CART_INITIATE } from '../../store/cart/Action';
import { REMOVE_FROM_FAVOURITE_INITIATE } from '../../store/favourite/Action';
import useQuantity from '../../hooks/useQuantity';
import { langs } from '../../localization';
import { convertArrayToString } from '../../helper/Utils';
const StatusTag = dynamic(() => import('../common/tag'));
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));
const { Title, Text } = Typography;

const FavouriteItem = (props) => {
    const { item } = props;
    const [count, setCount, countValidation] = useQuantity(item);
    const [total, setTotal] = useState(1);
    const dispatch = useDispatch();

    /**
     * @name addToCart
     * @description add product into cart
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
     * @param {data}
     * @returns {}
     */
    const remove = (product) => {
        dispatch({
            type: REMOVE_FROM_FAVOURITE_INITIATE,
            id: product.id
        });
    };

    return (
        <div className="favourite-item no-image-item">
            <div className="favourite-item-content">
                <div className="favourite-item-details">
                    <div className="favourite-item-info">
                        <Title level={5} className="favourite-item-name">
                            {item.name}
                        </Title>
                        <StatusTag value={item.part_number} color={'red'} />
                        <Descriptions>
                            <Descriptions.Item label={langs.labels.category}>
                                {convertArrayToString(item.categories)}
                            </Descriptions.Item>
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
                    <div className="favourite-item-action">
                        <ButtonWraper
                            type="danger"
                            onClick={() => remove(item)}
                            block
                            icon={<DeleteOutlined />}>
                            {langs.labels.remove}
                        </ButtonWraper>
                    </div>
                    <div className="favourite-item-action">
                        <ButtonWraper
                            type="default"
                            block
                            icon={<PlusOutlined />}
                            disabled={countValidation}
                            onClick={() => {
                                addToCart(item);
                            }}>
                            {langs.labels.addToCart}
                        </ButtonWraper>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default FavouriteItem;
