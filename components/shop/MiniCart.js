import { Fragment } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { Descriptions, Typography, Card, Button, Row, Col, Anchor } from 'antd';
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import Icon from '../common/customIcons/customIcons';
import useQuantity from '../../hooks/useQuantity';
import { REMOVE_FROM_CART_INITIATE, UPDATE_TO_CART_INITIATE } from '../../store/cart/Action';
import { ADD_TO_FAVOURITE_INITIATE } from '../../store/favourite/Action';
import { convertArrayToString, formatToCurrency } from '../../helper/Utils';
import { langs } from '../../localization';
const Qty = dynamic(() => import('../qty'));
const CalPrice = dynamic(() => import('./CalPrice'));
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));
const Image = dynamic(() => import('../common/image'));
import { useRouter } from 'next/router';
const { Title, Text } = Typography;
const MiniCart = (props) => {
    const cart = useSelector((state) => state.cart.cartDetails.order_items);
    const cartDetails = useSelector((state) => state.cart.cartDetails);
    const router = useRouter();
    const dispatch = useDispatch();
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
    return (
        <Anchor offsetTop={120}>
            <Card
                title={
                    <Typography.Title level={4} className="m-b0">
                        {langs.labels.itemInCart}
                    </Typography.Title>
                }
                className="mini-cart-box"
                extra={
                    <Typography.Text>
                        {cart && !!cart.length && `${cart.length} ${langs.labels.items}`}
                    </Typography.Text>
                }>
                {cart &&
                    !!cart.length &&
                    cart.map((product) => {
                        return (
                            <Fragment key={product.id}>
                                <div className="mini-cart-item">
                                    <span className="product-item-photo">
                                        <Image
                                            src={product.main_image}
                                            className="product-image"
                                            width={60}
                                            height={60}
                                            alt={product.name}
                                        />
                                    </span>
                                    <div className="product-item-details">
                                        <div className="product-item-info">
                                            <Title level={5} className="product-item-name m-b0">
                                                {product.name}
                                            </Title>
                                            <Descriptions>
                                                <Descriptions.Item label={langs.labels.quantity}>
                                                    {product.quantity}
                                                </Descriptions.Item>
                                            </Descriptions>
                                            <div className="price-box p-t0">
                                                <span className="regular-price">
                                                    {formatToCurrency(product.total_amount)}
                                                </span>
                                            </div>
                                        </div>
                                        <a
                                            onClick={() => {
                                                removeFromCart(product);
                                            }}
                                            href="#"
                                            className="remove-item"
                                            title={langs.labels.remove}
                                        >
                                            <Text type="danger" strong>
                                                <Icon icon='close' size='15' />
                                            </Text>
                                        </a>
                                    </div>
                                </div>
                            </Fragment>
                        );
                    })}
                <div className="mini-cart-action">
                    <ButtonWraper type="primary" onClick={() => router.push(`/cart`)} htmlType="submit" block>
                        {langs.labels.checkout}
                    </ButtonWraper>
                </div>
            </Card>
        </Anchor>
    );
};
export default MiniCart;
