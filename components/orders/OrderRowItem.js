import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { WhatsAppOutlined, FilePdfOutlined, PrinterOutlined } from '@ant-design/icons';

import dynamic from 'next/dynamic';
import { Typography, Tag, Modal } from 'antd';
import { ORDER_STATUS, SERVER_URL, USER_ROLES } from '../../config/Constant';
import { CANCEL_ORDER_INITIATE } from '../../store/order/Action';
import {
    formatToCurrency,
    getConfirmPromise,
    getDataInCookies,
    getDate,
    getDateWithTime,
    getStatusColor,
    isOrderCancelable,
    whatsAppURL
} from '../../helper/Utils';
import { ADD_MULTI_ITEM_INITIATE, setRetailerDrawer } from '../../store/cart/Action';
import { getCurrentRole } from '../../helper/AuthActions';
import Icon from '../common/customIcons/customIcons';
import { langs } from '../../localization';
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));
const { Text } = Typography;

const OrderRowItem = ({ order, print }) => {
    const cartItems = useSelector((state) => state.cart.cartDetails.total_items);
    const dispatch = useDispatch();
    const route = useRouter();
    const cancelOrder = (orderId, status) => {
        const postData = {
            order_id: orderId,
            status: status
        };
        dispatch({ type: CANCEL_ORDER_INITIATE, postData });
    };

    /**
     * @name openConfirmationModal
     * @description It opens confirmation modal for re-order
     * @param {items}
     * @returns {}
     */
    const openConfirmationModal = async (items) => {
        if (
            getDataInCookies('selectedRetailer') ||
            getCurrentRole().name == USER_ROLES.BUYER.name
        ) {
            if (cartItems > 0) {
                Modal.confirm({
                    title: `${langs.labels.re_order}`,
                    content: `${langs.labels.reorderModalContent}`,
                    okText: `${langs.labels.yes}`,
                    cancelText: `${langs.labels.no}`,
                    onOk() {
                        reOrder(items);
                    }
                });
            } else {
                reOrder(items);
            }
        } else {
            const confi = await getConfirmPromise({
                title: `${langs.labels.selectBuyer}`,
                content: `${langs.labels.selectBuyerReorderContent}`
            });
            if (confi) {
                dispatch(setRetailerDrawer(true));
            }
        }
    };

    /**
     * @name reOrder
     * @description It adds all the items to cart
     * @param {items}
     * @returns {}
     */
    const reOrder = (items) => {
        let newItems = [];
        items.map((item) => {
            let obj = {
                item_id: item.id,
                original_price: item.regular_price,
                price: item.price,
                quantity: item.quantity,
                sku_code: item.sku_code
            };
            newItems.push(obj);
        });

        let postData = {
            items: newItems
        };
        dispatch({ type: ADD_MULTI_ITEM_INITIATE, postData });
    };

    
    const {
        order_number,
        status,
        created_at,
        items,
        amount,
        shop_name,
        created_by_name,
        user_mobile,
        pdfUrl
    } = order;
    return (
        <Fragment>
            <tr>
                <td>
                    {order_number && (
                        <Link
                            href={'/orders/order-details/[orderId]'}
                            as={`/orders/order-details/${order.id}`}>
                            <a>{order_number}</a>
                        </Link>
                    )}
                </td>
                <td>{created_at ? `${getDateWithTime(created_at)}` : 'NA'}</td>
                {getCurrentRole().name != USER_ROLES.BUYER.name && <td>{shop_name}</td>}
                <td>{created_by_name}</td>
                <td className="align-center">{items.length ? `${items.length}` : 'NA'}</td>
                <td className="align-right">
                    <Text type="success">{amount ? `${formatToCurrency(amount)}` : '0.00'}</Text>
                </td>
                <td className="align-center">
                    <Tag color={getStatusColor(status)}> {status}</Tag>
                </td>
                <td className="align-right">
                    {isOrderCancelable(order.status) &&
                    getCurrentRole().name == USER_ROLES.BUYER.name ? (
                        <ButtonWraper
                            type="link"
                            danger
                            onClick={() => cancelOrder(order.id, ORDER_STATUS.CANCELLED)}>
                            Cancel Order
                        </ButtonWraper>
                    ) : getCurrentRole().name == USER_ROLES.BUYER.name ? (
                        <Fragment></Fragment>
                    ) : (
                        <Fragment></Fragment>
                    )}
                    <ButtonWraper onClick={() => openConfirmationModal(order.items)} type={'link'}>
                        Reorder
                    </ButtonWraper>

                    {/* <ButtonWraper
                        type="default"
                        className="inline-flex-btn"
                        onClick={() =>
                            route.push(
                                '/orders/order-details/[orderId]',
                                `/orders/order-details/${order.id}`
                            )
                        }>
                        <span className="m-r10">Order Details</span>
                        <Icon icon='angle-right' color='#FFF' size='14' />
                    </ButtonWraper> */}
                        <a  href={`${SERVER_URL}/ecommerce/orders/print-order/${order.id}?html=true`} target={'_blank'} className="pdf-download-icon">
                            <Typography.Text
                                // type={'danger'}
                                strong
                                className={'action-date'}>
                                <PrinterOutlined
                                    className={'p-t0 p-r10'}
                                    style={{ fontSize: 20, color: '#ff8000' }}
                                />{' '}
                            </Typography.Text>
                        </a>

                    <a
                        href={whatsAppURL(
                            user_mobile,
                            `*Order Details* 
                            %0a Order Number: ${order_number} 
                            %0a Order Amount: ${formatToCurrency(amount)} 
                            %0a Order Date: ${getDate(created_at)}
                            %0a Number Of Items: ${items.length}`
                        )}
                        target={'_blank'}>
                        <WhatsAppOutlined
                            className={'m-l10 p-t0'}
                            style={{ fontSize: 24, color: '#32c971' }}
                        />
                    </a>
                </td>
            </tr>
        </Fragment>
    );
};
export default OrderRowItem;
