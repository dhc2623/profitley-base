import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Typography, Modal, Row, Col, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { CANCEL_ORDER_INITIATE, GET_ORDER_DETAILS_INITIATE } from '../../../store/order/Action';
import Responsive from '../../../components/responsive/Responsive';
import TableWraper from '../../../components/common/table';
import Panel, { PanelBody, PanelSeparator, PanelTitle } from '../../../components/common/panel';

import { ORDER_STATUS, USER_ROLES } from '../../../config/Constant';
import { getCurrentRole, serverCheckIsUserLogin } from '../../../helper/AuthActions';
import { formatToCurrency, getDataInCookies, getConfirmPromise } from '../../../helper/Utils';
import { setChild } from '../../../store/common/Action';
import { ADD_MULTI_ITEM_INITIATE, setRetailerDrawer } from '../../../store/cart/Action';
import { langs } from '../../../localization';

// import DocHead from '../../../components/common/head';
// import LoadData from '../../../components/common/load-data';
// import PageTitle from '../../../components/common/page-title';
// import InvoiceDetail from '../../../components/invoice/InvoiceDetail';
// import ButtonWraper from '../../../components/common/form/ButtonWrapper';
// import SelectBuyerToggle from '../../../components/cart/select-buyer-toggle';

const DocHead = dynamic(() => import('../../../components/common/head'));
const LoadData = dynamic(() => import('../../../components/common/load-data'));
const PageTitle = dynamic(() => import('../../../components/common/page-title'));
const InvoiceDetail = dynamic(() => import('../../../components/invoice/InvoiceDetail'));
const ButtonWraper = dynamic(() => import('../../../components/common/form/ButtonWrapper'));
const SelectBuyerToggle = dynamic(() => import('../../../components/cart/select-buyer-toggle'));
const Image = dynamic(() => import('../../../components/common/image'));

const { Title, Text, Paragraph } = Typography;

function callback(key) {
    
}

function invoiceDetails() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const orderDetails = useSelector((state) => state.order.orderDetails);
    const cartItems = useSelector((state) => state.cart.cartDetails.total_items);
    const loading = useSelector((state) => state.order.loading);

    useEffect(() => {
        if (router && router.query && router.query.orderId) {
            dispatch(setChild('/shop/products'));
            dispatch({
                type: GET_ORDER_DETAILS_INITIATE,
                orderId: router.query.orderId
            });
        }
    }, [router.query]);

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
                    title: `${langs.labels.reorder}`,
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

    const billingAddress = orderDetails.billing && orderDetails.billing.billing_address;
    const shippingAddress = orderDetails.shipping && orderDetails.shipping.shipping_address;
    const shippingStatus = orderDetails.shipping && orderDetails.shipping.status;
    const shippingTrackingNumber = orderDetails.shipping && orderDetails.shipping.tracking_number;
    const shippingLabelURL = orderDetails.shipping && orderDetails.shipping.label_url;

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.invoiceDetails} />
            <section className="wrap">
                <div className="back-link-wrap">
                    <Link href="/invoice">
                        <a className="back-link">
                            <ArrowLeftOutlined />
                        </a>
                    </Link>
                    <PageTitle title={langs.labels.invoiceDetails} />
                    <ButtonWraper
                        onClick={() => openConfirmationModal(orderDetails.items)}
                        type="primary"
                        htmlType="submit"
                        className="m-t10 m-b10">
                        {'Download Invoice'}
                    </ButtonWraper>
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
                                                {'INV-000011'}
                                            </Title>
                                            <Text type="secondary">{'03 Dec, 2020'}</Text>
                                        </div>
                                    </Col>
                                    <Col span={10}>
                                        <Row>
                                            <Col span={12}>
                                                <div className="p-t15 p-b15 p-l30 shipping-address">
                                                    <Text type="secondary" className="m-b10" strong>
                                                        {langs.labels.billFrom}
                                                    </Text>
                                                    <Paragraph className="m-b5">
                                                        {'Address'}, {'city'}
                                                        <br /> {'district'}, {'state'}
                                                        <br /> {'zip'}
                                                    </Paragraph>
                                                </div>
                                            </Col>
                                            <Col span={12}>
                                                <div className="p-t15 p-b15 p-l30 p-l15 billing-address">
                                                    <Text type="secondary" className="m-b10" strong>
                                                        {langs.labels.billTo}
                                                    </Text>
                                                    <Paragraph className="m-b5">
                                                        {'Address'}, {'city'}
                                                        <br /> {'district'}, {'state'}
                                                        <br /> {'zip'}
                                                    </Paragraph>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </PanelBody>
                        </Panel>

                        <Panel>
                            <PanelTitle title={<Fragment>{'Items'}</Fragment>} />
                            <PanelBody>
                                <TableWraper>
                                    <thead>
                                        <tr>
                                            <th width="120" className="align-right" noWrap>
                                                Product Image
                                            </th>
                                            <th>Part Number</th>
                                            <th width="250">Product Name</th>
                                            <th className="align-right">Price</th>
                                            <th className="align-center">Qty</th>
                                            <th className="align-right">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="align-right">
                                                <Image
                                                    src={'/assets/images/product-34.png'}
                                                    className="product-img"
                                                    width={65}
                                                    height={65}
                                                    alt=""
                                                />
                                            </td>
                                            <td>
                                                <Link
                                                    href={`/shop/product-detail/[productId]`}
                                                    //as={`/shop/product-detail/${item.id}`}
                                                >
                                                    <a>{'745120'}</a>
                                                </Link>
                                            </td>
                                            <td>
                                                <Link
                                                    href={`/shop/product-detail/[productId]`}
                                                    //as={`/shop/product-detail/${item.id}`}
                                                >
                                                    <a>{'iPhone'}</a>
                                                </Link>
                                            </td>
                                            <td className="align-right">
                                                {formatToCurrency('1000.00')}
                                            </td>
                                            <td className="align-center">{'6'}</td>
                                            <td className="align-right">
                                                {formatToCurrency('6000.00')}
                                            </td>
                                        </tr>
                                    </tbody>
                                </TableWraper>
                                <section className="subtotal-box">
                                    <div className="subtotal-box-content">
                                        <div className="subtotal-of-ammount">
                                            <div className="subtotal-item">
                                                <span className="label">Subtotal</span>
                                                <span className="value">
                                                    {formatToCurrency('6000.00')}
                                                </span>
                                            </div>
                                            <div className="tax-info">
                                                <div className="subtotal-item">
                                                    <span className="label">CGST</span>
                                                    <span className="value">
                                                        <span>&#x20B9;</span>00.00
                                                    </span>
                                                </div>
                                                <div className="subtotal-item">
                                                    <span className="label">SGST</span>
                                                    <span className="value">
                                                        <span>&#x20B9;</span>00.00
                                                    </span>
                                                </div>
                                                <div className="subtotal-item">
                                                    <span className="label">Tax</span>
                                                    <span className="value">
                                                        <span>&#x20B9;</span>00.00
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix total-payable">
                                            <Title level={5} className="label strong">
                                                Grand Total (Inclusive of GST Applicable)
                                            </Title>
                                            <Title
                                                level={5}
                                                className="value strong"
                                                type="success">
                                                {formatToCurrency('6000.00')}
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
                        <Panel className="m-t0">
                            <PanelTitle title={'INV-000011'} />
                            <PanelSeparator
                                list={[
                                    {
                                        label: 'Invoice Date',
                                        value: '03 Dec, 2020'
                                    },
                                    {
                                        label: 'No. Of Items',
                                        value: '6'
                                    },
                                    {
                                        label: 'Total Value',
                                        value: (
                                            <Text type="success">
                                                {formatToCurrency('6000.00')}
                                            </Text>
                                        )
                                    }
                                ]}
                            />
                        </Panel>

                        <InvoiceDetail />

                        <Panel>
                            <PanelTitle title={langs.labels.billFrom} />
                            <PanelBody>
                                <Paragraph className="m-b5">
                                    {'Address'}, {'city'}
                                    <br /> {'district'}, {'state'}
                                    <br /> {'zip'}
                                </Paragraph>
                            </PanelBody>
                        </Panel>
                        <Panel>
                            <PanelTitle title={langs.labels.billTo} />
                            <PanelBody>
                                <Paragraph className="m-b0">
                                    {'Address'}, {'city'}
                                    <br /> {'district'}, {'state'}
                                    <br /> {'zip'}
                                </Paragraph>
                            </PanelBody>
                        </Panel>
                    </LoadData>
                </Responsive.Mobile>
            </section>
        </Fragment>
    );
}

export async function getServerSideProps({ req, query }) {
    const props = serverCheckIsUserLogin(req, query);
    return props;
}

export default invoiceDetails;
