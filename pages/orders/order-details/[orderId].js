import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Descriptions, Typography, Modal, Row, Col, Tag, Space } from 'antd';
import {
    AimOutlined,
    ArrowLeftOutlined,
    PhoneOutlined,
    UserOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';
import { CANCEL_ORDER_INITIATE, GET_ORDER_DETAILS_INITIATE } from '../../../store/order/Action';
import Responsive from '../../../components/responsive/Responsive';
import Panel, {
    PanelActions,
    PanelBody,
    PanelSeparator,
    PanelTitle,
    PanelRowItem
} from '../../../components/common/panel';

import { ORDER_STATUS, SERVER_URL, USER_ROLES } from '../../../config/Constant';
import { getCurrentRole, serverCheckIsUserLogin } from '../../../helper/AuthActions';
import {
    getStatusColor,
    formatToCurrency,
    getDataInCookies,
    getConfirmPromise,
    isOrderCancelable,
    getDateWithTime,
    getDate,

} from '../../../helper/Utils';
import { setChild } from '../../../store/common/Action';
import { ADD_MULTI_ITEM_INITIATE, setRetailerDrawer } from '../../../store/cart/Action';
import SelectBuyerToggle from '../../../components/cart/select-buyer-toggle';
import { langs } from '../../../localization';
import dynamic from 'next/dynamic';
import  withAppContext  from '../../../config/withAppContext';
// import PageTitle from '../../../components/common/page-title';
// import DocHead from '../../../components/common/head';
// import LoadData from '../../../components/common/load-data';
// import OrderDetail from '../../../components/orders/OrderDetail';
// import TableWraper from '../../../components/common/table';
// import ButtonWraper from '../../../components/common/form/ButtonWrapper';

const PageTitle = dynamic(() => import('../../../components/common/page-title'));
const DocHead = dynamic(() => import('../../../components/common/head'));
const LoadData = dynamic(() => import('../../../components/common/load-data'));
const OrderDetail = dynamic(() => import('../../../components/orders/OrderDetail'));
const TableWraper = dynamic(() => import('../../../components/common/table'));
const ButtonWraper = dynamic(() => import('../../../components/common/form/ButtonWrapper'));
const Image = dynamic(() => import('../../../components/common/image'));
const currentRole = getCurrentRole() && getCurrentRole().name;
const { Title, Text, Paragraph } = Typography;

function callback(key) {}

function orderListing(props) {
    const { query } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const orderDetails = useSelector((state) => state.order.orderDetails);
    const cartItems = useSelector((state) => state.cart.cartDetails.total_items);
    const loading = useSelector((state) => state.order.loading);

    useEffect(() => {
        if (router.query && router.query.orderId) {
            dispatch(setChild('/orders/my-orders'));
            dispatch({
                type: GET_ORDER_DETAILS_INITIATE,
                orderId: router.query.orderId
            });
        }
    }, [router.query.orderId]);

    /**
     * @name cancelOrder
     * @description It changes order status to canceled.
     * @param {orderId,status}
     * @returns {}
     */
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

    const billingAddress = orderDetails.billing;
    const shippingAddress = orderDetails.shipping;
    const shippingStatus = orderDetails.shipping && orderDetails.shipping.status;
    const shippingTrackingNumber = orderDetails.shipping && orderDetails.shipping.tracking_number;
    const shippingLabelURL = orderDetails.shipping && orderDetails.shipping.label_url;

    const printOrder = (id) => {
        window.open(`${SERVER_URL}/ecommerce/orders/print-order/${id}?html=true`, '_blank');
    };

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.orderDetail} />
            <section className="wrap">
                <div className="back-link-wrap">
                    <Link href="/orders/my-orders">
                        <a className="back-link">
                            <ArrowLeftOutlined />
                        </a>
                    </Link>
                    <PageTitle title={langs.labels.orderDetail} />
                </div>
                <SelectBuyerToggle />
                <Responsive.Desktop>
                    <LoadData loading={loading} data={orderDetails}>
                        <Panel className="m-t0">
                            <PanelBody>
                                <Row>
                                    <Col span={4}>
                                        <div className="p-t15 p-b15">
                                            <Title level={2} className="m-b0">
                                                {orderDetails.order_number}
                                            </Title>
                                            <Text type="secondary">
                                                {getDate(orderDetails.created_at)}
                                            </Text>
                                            <div className="m-t0">
                                                {isOrderCancelable(orderDetails.status) &&
                                                    getCurrentRole().name ==
                                                        USER_ROLES.BUYER.name && (
                                                        <ButtonWraper
                                                            type="secondary"
                                                            onClick={() =>
                                                                cancelOrder(
                                                                    orderDetails.id,
                                                                    ORDER_STATUS.CANCELLED
                                                                )
                                                            }
                                                            className="m-t10 m-r10">
                                                            {langs.labels.cancelOrder}
                                                        </ButtonWraper>
                                                    )}
                                                <ButtonWraper
                                                    onClick={() =>
                                                        openConfirmationModal(orderDetails.items)
                                                    }
                                                    type="primary"
                                                    htmlType="submit"
                                                    className="m-t10 m-r10">
                                                    {langs.labels.reorder}
                                                </ButtonWraper>

                                                <ButtonWraper
                                                    onClick={() => printOrder(orderDetails.id)}
                                                    type="primary"
                                                    htmlType="submit"
                                                    className="m-t10">
                                                    {langs.labels.printOrder}
                                                </ButtonWraper>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col span={10}>
                                        <Row>
                                            <Col span={12}>
                                                <div className="p-t15 p-b15 p-l30 shipping-address">
                                                    <Text type="secondary" className="m-b10" strong>
                                                        {langs.labels.shippingAddress}
                                                    </Text>
                                                    {!!shippingAddress && (
                                                        <Paragraph className="m-t10 m-b5">
                                                            <Fragment>
                                                                <span>
                                                                    {shippingAddress.address1}
                                                                </span>
                                                                <br />
                                                                {shippingAddress.address2 && (
                                                                    <Fragment>
                                                                        <span>
                                                                            {
                                                                                shippingAddress.address2
                                                                            }
                                                                        </span>
                                                                        <br />
                                                                    </Fragment>
                                                                )}

                                                                <span>
                                                                    {shippingAddress.city},{' '}
                                                                    {shippingAddress.district}
                                                                </span>
                                                                <br />
                                                                <span>
                                                                    {shippingAddress.state} -{' '}
                                                                    {shippingAddress.pincode}
                                                                </span>
                                                            </Fragment>
                                                        </Paragraph>
                                                    )}

                                                    {!!shippingStatus && (
                                                        <Paragraph className="m-b5">
                                                            <Text
                                                                type="secondary"
                                                                className="m-r10">
                                                                Status:
                                                            </Text>
                                                            {shippingStatus}
                                                        </Paragraph>
                                                    )}
                                                    {!!shippingTrackingNumber && (
                                                        <Paragraph className="m-b0">
                                                            <Text
                                                                type="secondary"
                                                                className="m-r10">
                                                                Tracking Number:
                                                            </Text>
                                                            <Link
                                                                href={`http://${shippingLabelURL}`}>
                                                                <a>{shippingTrackingNumber}</a>
                                                            </Link>
                                                        </Paragraph>
                                                    )}
                                                </div>
                                            </Col>
                                            <Col span={12}>
                                                <div className="p-t15 p-b15 p-l30 p-l15 billing-address">
                                                    <Text type="secondary" className="m-b10" strong>
                                                        {langs.labels.billingAddress}
                                                    </Text>
                                                    {!!billingAddress && (
                                                        <Paragraph className="m-t10">
                                                            <Fragment>
                                                                <span>
                                                                    {billingAddress.address1}
                                                                </span>
                                                                <br />
                                                                {billingAddress.address2 && (
                                                                    <Fragment>
                                                                        <span>
                                                                            {
                                                                                billingAddress.address2
                                                                            }
                                                                        </span>
                                                                        <br />
                                                                    </Fragment>
                                                                )}

                                                                <span>
                                                                    {billingAddress.city},{' '}
                                                                    {billingAddress.district}
                                                                </span>
                                                                <br />
                                                                <span>
                                                                    {billingAddress.state} -{' '}
                                                                    {billingAddress.pincode}
                                                                </span>
                                                            </Fragment>
                                                        </Paragraph>
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col span={10}>
                                        <Row>
                                            <Col span={8}>
                                                <div className="p-t10 p-b15 d-i-b order-payment">
                                                    <Text type="secondary" className="m-b10" strong>
                                                        {langs.labels.orderTotal}
                                                    </Text>
                                                    <Paragraph className="m-t10">
                                                        {formatToCurrency(orderDetails.amount)}
                                                    </Paragraph>
                                                </div>
                                            </Col>
                                            {/*<Col span={8}>
                                                <div className="p-t10 p-b15 d-i-b order-payment">
                                                    <Text type="secondary" className="m-b10" strong>
                                                        {langs.labels.paymentMethod}
                                                    </Text>
                                                    <Paragraph className="m-t10">
                                                        {orderDetails.billing
                                                            ? orderDetails.billing.gateway
                                                            : ''}
                                                    </Paragraph>
                                                </div>
                                                        </Col>*/}
                                            <Col span={8}>
                                                <div className="p-t10 p-b15 d-i-b order-payment">
                                                    <Text type="secondary" className="m-b10" strong>
                                                        {langs.labels.status}
                                                    </Text>
                                                    <Paragraph className="m-t10">
                                                        <Tag
                                                            color={getStatusColor(
                                                                orderDetails.status
                                                            )}>
                                                            {orderDetails.status}
                                                        </Tag>
                                                    </Paragraph>
                                                </div>
                                            </Col>
                                            <Col span={8}>
                                                <Text type="secondary" className="m-b10" strong>
                                                    {langs.labels.notes}
                                                </Text>
                                                <Paragraph className="m-t10">
                                                    {orderDetails.notes}
                                                </Paragraph>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </PanelBody>
                        </Panel>

                        <Panel>
                            <PanelTitle
                                title={
                                    <Fragment>
                                        {orderDetails.shop_name}
                                        <br />
                                        {/* <Text type="secondary"><img src={"/assets/images/svg/location-marker.svg"} alr="location-marker" className="v-a-middle p-r10" />Indore, Madhya Pradesh, 452009 India</Text>*/}
                                    </Fragment>
                                }
                            />
                            <PanelBody className="m-t10">
                                <TableWraper>
                                    <thead>
                                        <tr>
                                            <th width="120" className="align-right" noWrap>
                                                {langs.labels.productImage}
                                            </th>
                                            <th>{langs.labels.partNumber}</th>
                                            <th width="250">{langs.labels.productName}</th>
                                            {/*<th width="150">{langs.labels.shopName}</th>*/}
                                            <th className="align-right">{langs.labels.price}</th>
                                            <th className="align-center">{langs.labels.qty}</th>
                                            <th className="align-right">{langs.labels.subtotal}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderDetails.items.map((item) => (
                                            <tr key={item.sku_code}>
                                                <td className="align-right">
                                                    <Image
                                                        src={item.main_image}
                                                        className="product-img"
                                                        width={65}
                                                        height={65}
                                                        alt={item.name}
                                                    />
                                                </td>
                                                <td>
                                                    <Link
                                                        href={`/shop/product-detail/[productId]`}
                                                        as={`/shop/product-detail/${item.id}`}>
                                                        <a>{item.sku_code}</a>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link
                                                        href={`/shop/product-detail/[productId]`}
                                                        as={`/shop/product-detail/${item.id}`}>
                                                        <a>{item.name}</a>
                                                    </Link>
                                                </td>
                                                {/*<td>Divyansh Spares, Indore</td>*/}
                                                <td className="align-right">
                                                    {formatToCurrency(item.amount)}
                                                </td>
                                                <td className="align-center">{item.quantity}</td>
                                                <td className="align-right">
                                                    {formatToCurrency(item.amount * item.quantity)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </TableWraper>
                                <section className="subtotal-box">
                                    <div className="subtotal-box-content">
                                        <div className="subtotal-of-ammount">
                                            <div className="subtotal-item">
                                                <span className="label">{langs.labels.subtotal}</span>
                                                <span className="value">
                                                    {formatToCurrency(orderDetails.amount)}
                                                </span>
                                            </div>
                                            <div className="tax-info">
                                                <div className="subtotal-item">
                                                    <span className="label">{langs.labels.cgst}</span>
                                                    <span className="value">
                                                        <span>&#x20B9;</span>00.00
                                                    </span>
                                                </div>
                                                <div className="subtotal-item">
                                                    <span className="label">{langs.labels.sgst}</span>
                                                    <span className="value">
                                                        <span>&#x20B9;</span>00.00
                                                    </span>
                                                </div>
                                                <div className="subtotal-item">
                                                    <span className="label">{langs.labels.tax}</span>
                                                    <span className="value">
                                                        <span>&#x20B9;</span>00.00
                                                    </span>
                                                </div>
                                                {orderDetails.special_discount !== '0.00' && (
                                                    <div className="subtotal-item">
                                                        <span className="label">
                                                            {langs.labels.specialDiscount}
                                                        </span>
                                                        <span className="value">
                                                            -{' '}
                                                            {formatToCurrency(
                                                                orderDetails.special_discount
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                                {orderDetails.order_value_discount !== '0.00' && (
                                                    <div className="subtotal-item">
                                                        <span className="label">
                                                            {langs.labels.orderValueDiscount}
                                                        </span>
                                                        <span className="value">
                                                            -{' '}
                                                            {formatToCurrency(
                                                                orderDetails.order_value_discount
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="clearfix total-payable">
                                            <Title level={5} className="label strong">
                                                {langs.labels.grandTotal} ({langs.labels.inclusiveOfGstApplicable})
                                            </Title>
                                            <Title
                                                level={5}
                                                className="value strong"
                                                type="success">
                                                {formatToCurrency(orderDetails.amount)}
                                            </Title>
                                        </div>
                                    </div>
                                </section>
                            </PanelBody>
                        </Panel>
                    </LoadData>
                </Responsive.Desktop>
                <Responsive.Mobile>
                    <LoadData loading={loading} data={orderDetails}>
                        <Panel>
                            <PanelTitle
                                title={orderDetails.order_number}
                                status={orderDetails.status}
                                statusBackground={getStatusColor(orderDetails.status)}
                            />
                            <PanelSeparator
                                list={[
                                    {
                                        label: `${langs.labels.orderDate}`,
                                        value: getDate(orderDetails.created_at)
                                    },
                                    {
                                        label: `${langs.labels.noOfItems}`,
                                        value: orderDetails.items.length
                                    },
                                    {
                                        label: `${langs.labels.totalValue}`,
                                        value: (
                                            <Text type="success">
                                                {formatToCurrency(orderDetails.amount)}
                                            </Text>
                                        )
                                    }
                                ]}
                            />
                            {/* <PanelActions
                                actions={
                                    isOrderCancelable(orderDetails.status) &&
                                        getCurrentRole().name == USER_ROLES.BUYER.name
                                        ? [
                                            {
                                                label: `${langs.labels.cancelOrder}`,
                                                onClick: () =>
                                                    cancelOrder(
                                                        orderDetails.id,
                                                        ORDER_STATUS.CANCELLED
                                                    ),
                                                type: 'danger'
                                            },
                                            {
                                                label: `${orderDetails.items.length > 1
                                                    ? langs.labels.reorderItems
                                                    : langs.labels.reorderItem
                                                    }`,
                                                onClick: () =>
                                                    openConfirmationModal(orderDetails.items),
                                                type: 'primary'
                                            }
                                        ]
                                        : [
                                            {
                                                label: `${orderDetails.items.length > 1
                                                    ? langs.labels.reorderItems
                                                    : langs.labels.reorderItem
                                                    }`,
                                                onClick: () =>
                                                    openConfirmationModal(orderDetails.items),
                                                type: 'primary'
                                            }
                                        ]
                                }
                            /> */}
                        </Panel>
                        {currentRole != USER_ROLES.BUYER.name && (
                            <Panel size={false} className="buyer-listed-card">
                                <PanelTitle
                                    title={orderDetails.shop_name}
                                    action={[
                                        {
                                            onClick: () =>
                                                window.open(`tel:${orderDetails.user_mobile}`),
                                            icon: <PhoneOutlined />,
                                            type: 'link',
                                            size: 'small',
                                            className: 'call-btn'
                                        }
                                    ]}
                                />
                                <PanelBody>
                                    <Space>
                                        <div className="category-tag">
                                            {orderDetails.category}
                                            <span>{langs.labels.category}</span>
                                        </div>
                                        <div>
                                            <Paragraph className={'m-b0 icon-list'}>
                                                <UserOutlined /> <b>{`${orderDetails.username}`}</b>
                                            </Paragraph>
                                            <Paragraph className={'m-b0 icon-list'}>
                                                <EnvironmentOutlined />
                                                {`${
                                                    orderDetails.address1
                                                        ? `${orderDetails.address1}, ${orderDetails.cityName} - ${orderDetails.pincode}`
                                                        : ''
                                                }`}
                                            </Paragraph>
                                        </div>
                                    </Space>
                                </PanelBody>
                                <PanelRowItem
                                    label={langs.labels.placedBy}
                                    value={<strong>{orderDetails.created_by_name}</strong>}
                                />
                            </Panel>
                        )}

                        <Title level={5} strong className={'p-t10'}>
                            {langs.labels.orderItems}
                        </Title>

                        {orderDetails.items.map((item) => (
                            <OrderDetail item={item} key={item.sku_code} />
                        ))}

                        <Row gutter={[10, 0]}>
                            {isOrderCancelable(orderDetails.status) &&
                            getCurrentRole().name == USER_ROLES.BUYER.name ? (
                                <Fragment>
                                    <Col span={12}>
                                        <ButtonWraper
                                            type="danger"
                                            block
                                            onClick={() =>
                                                cancelOrder(orderDetails.id, ORDER_STATUS.CANCELLED)
                                            }
                                            className="m-t10">
                                            {langs.labels.cancelOrder}
                                        </ButtonWraper>
                                    </Col>
                                    <Col span={12}>
                                        <ButtonWraper
                                            type="primary"
                                            block
                                            onClick={() =>
                                                openConfirmationModal(orderDetails.items)
                                            }
                                            className="m-t10">
                                            {`${
                                                orderDetails.items.length > 1
                                                    ? langs.labels.reorderItems
                                                    : langs.labels.reorderItem
                                            }`}
                                        </ButtonWraper>
                                    </Col>
                                </Fragment>
                            ) : (
                                <Col span={24}>
                                    <ButtonWraper
                                        type="primary"
                                        block
                                        onClick={() => openConfirmationModal(orderDetails.items)}
                                        className="m-t10">
                                        {`${
                                            orderDetails.items.length > 1
                                                ? langs.labels.reorderItems
                                                : langs.labels.reorderItem
                                        }`}
                                    </ButtonWraper>

                                    <ButtonWraper
                                        onClick={() => printOrder(orderDetails.id)}
                                        type="primary"
                                        block
                                        className="m-t10">
                                        {langs.labels.printOrder}
                                    </ButtonWraper>
                                </Col>
                            )}
                        </Row>

                        {orderDetails.notes && (
                            <Panel>
                                <PanelTitle title={langs.labels.notes} />
                                <PanelBody>
                                    <Paragraph className="m-b5">{orderDetails.notes}</Paragraph>
                                </PanelBody>
                            </Panel>
                        )}
                        <Panel>
                            <PanelTitle title={langs.labels.shippingAddress} />
                            <PanelBody>
                                {!!shippingAddress && (
                                    <Paragraph className="m-b5">
                                        <Fragment>
                                            <span>{shippingAddress.address1}</span>
                                            <br />
                                            {shippingAddress.address2 && (
                                                <Fragment>
                                                    <span>{shippingAddress.address2}</span>
                                                    <br />
                                                </Fragment>
                                            )}

                                            <span>
                                                {shippingAddress.city}, {shippingAddress.district}
                                            </span>
                                            <br />
                                            <span>
                                                {shippingAddress.state} - {shippingAddress.pincode}
                                            </span>
                                        </Fragment>
                                    </Paragraph>
                                )}
                                {!!shippingStatus && (
                                    <Paragraph className="m-b5">
                                        <Text type="secondary" className="m-r10">
                                            {langs.labels.status}:
                                        </Text>
                                        {shippingStatus}
                                    </Paragraph>
                                )}
                                {!!shippingTrackingNumber && (
                                    <Paragraph className="m-b0">
                                        <Text type="secondary" className="m-r10">
                                            {langs.labels.trackingNumber}:
                                        </Text>
                                        <Link href={`http://${shippingLabelURL}`}>
                                            <a>{shippingTrackingNumber}</a>
                                        </Link>
                                    </Paragraph>
                                )}
                            </PanelBody>
                        </Panel>
                        <Panel>
                            <PanelTitle title={langs.labels.billingAddress} />
                            <PanelBody>
                                {!!billingAddress && (
                                    <Paragraph className="m-b0">
                                        <Fragment>
                                            <span>{billingAddress.address1}</span>
                                            <br />
                                            {billingAddress.address2 && (
                                                <Fragment>
                                                    <span>{billingAddress.address2}</span>
                                                    <br />
                                                </Fragment>
                                            )}

                                            <span>
                                                {billingAddress.city}, {billingAddress.district}
                                            </span>
                                            <br />
                                            <span>
                                                {billingAddress.state} - {billingAddress.pincode}
                                            </span>
                                        </Fragment>
                                    </Paragraph>
                                )}
                            </PanelBody>
                        </Panel>
                        <Panel>
                            <PanelTitle title={langs.labels.totalSummary} />
                            <section className="subtotal-box">
                                <div className="subtotal-box-content">
                                    <div className="subtotal-of-ammount">
                                        <div className="subtotal-item">
                                            <span className="label">{langs.labels.subtotal}</span>
                                            <span className="value">
                                                {formatToCurrency(orderDetails.sub_total)}
                                            </span>
                                        </div>
                                        <div className="tax-info">
                                            <div className="subtotal-item">
                                                <span className="label">{langs.labels.cgst}</span>
                                                <span className="value">
                                                    <span>&#x20B9;</span>00.00
                                                </span>
                                            </div>
                                            <div className="subtotal-item">
                                                <span className="label">{langs.labels.sgst}</span>
                                                <span className="value">
                                                    <span>&#x20B9;</span>00.00
                                                </span>
                                            </div>
                                            <div className="subtotal-item">
                                                <span className="label">{langs.labels.tax}</span>
                                                <span className="value">
                                                    <span>&#x20B9;</span>00.00
                                                </span>
                                            </div>
                                            {orderDetails.special_discount !== '0.00' && (
                                                <div className="subtotal-item">
                                                    <span className="label">{langs.labels.specialDiscount}</span>
                                                    <span className="value">
                                                        -{' '}
                                                        {formatToCurrency(
                                                            orderDetails.special_discount
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                            {orderDetails.order_value_discount !== '0.00' && (
                                                <div className="subtotal-item">
                                                    <span className="label">
                                                        {langs.labels.orderValueDiscount}
                                                    </span>
                                                    <span className="value">
                                                        -{' '}
                                                        {formatToCurrency(
                                                            orderDetails.order_value_discount
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="clearfix total-payable">
                                        <Title level={5} className="label strong">
                                            {langs.labels.grandTotal} ({langs.labels.inclusiveOfGstApplicable})
                                        </Title>
                                        <Title level={5} className="value strong" type="success">
                                            {formatToCurrency(orderDetails.amount)}
                                        </Title>
                                    </div>
                                </div>
                            </section>
                        </Panel>
                    </LoadData>
                </Responsive.Mobile>
            </section>
        </Fragment>
    );
}

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(orderListing);
