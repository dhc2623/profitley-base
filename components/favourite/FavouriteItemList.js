import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Descriptions, Typography, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { ADD_TO_CART_INITIATE } from '../../store/cart/Action';
import { REMOVE_FROM_FAVOURITE_INITIATE } from '../../store/favourite/Action';
import { langs } from '../../localization';
import { convertArrayToString } from '../../helper/Utils';
import useQuantity from '../../hooks/useQuantity';
const StatusTag = dynamic(() => import('../common/tag'));
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));
const { Title } = Typography;

const FavouriteItemList = (props) => {
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
        <div className="favourite-item list">
            <div className="favourite-item-content">
                <span className="favourite-item-photo">
                    <img src={item.main_image} className="product-image" />
                </span>
                <div className="favourite-item-details">
                    <div className="favourite-item-info">
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
                        <Title level={5} className="favourite-item-name">
                            {item.name}
                        </Title>
                    </div>
                </div>
                <div className="favourite-item-actions">
                    <Row gutter={[0, 0]} style={{ width: '100%' }}>
                        <Col span={12}>
                            <div
                                className="add-to-cart-box m-r5"
                                style={{ flex: 1, textAlign: 'center' }}>
                                <ButtonWraper type="danger" onClick={() => remove(item)}>
                                    <span>
                                        <DeleteOutlined />
                                    </span>
                                </ButtonWraper>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div
                                className="add-to-cart-box"
                                style={{ flex: 1, textAlign: 'center' }}>
                                <ButtonWraper
                                    type="default"
                                    disabled={countValidation}
                                    onClick={() => {
                                        addToCart(item);
                                    }}>
                                    <span>
                                        <PlusOutlined />
                                    </span>
                                </ButtonWraper>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};
export default FavouriteItemList;
