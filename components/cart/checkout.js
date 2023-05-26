import { LikeOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Alert, Col, Input, InputNumber, Row, Typography } from 'antd';
import { isEmpty } from 'lodash';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductSummary from './Summary';
import Panel, { PanelBody, PanelTitle } from '../common/panel';
import Responsive from '../responsive/Responsive';
import { NOTIFICATION_TYPE, USER_ROLES } from '../../config/Constant';
import { getCurrentRole } from '../../helper/AuthActions';
import {
    getDataInCookies,
    getSettings,
    getUniqueIds,
    removeDataInCookies,
    showNotification
} from '../../helper/Utils';
import { langs } from '../../localization';
import { ASSIGN_ORGANIZATION_INITIATE } from '../../store/cart/Action';
import { POST_ORDER_INITIATE } from '../../store/order/Action';
// import { GET_DISTRIBUTOR_DETAILS_INITIATE } from '../../store/seller/Action';
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));
const CartAddress = dynamic(() => import('./Address'));
const { Title } = Typography;

function Checkout(props) {
    const { userMe, hasAppSettings } = props;
    const userDetail = userMe.profile;

    let selectedBuyer = getDataInCookies('selectedRetailer');

    const selectedRetailerId = useSelector((state) => state.common.selectedRetailerId);
    const [cartBillingAddress, setCartBillingAddress] = useState({});
    const [cartShippingAddress, setCartShippingAddress] = useState({});
    const [selectedRetailer, setSelectedRetailer] = useState(selectedBuyer);
    const [checkoutNotes, setCheckoutNotes] = useState('');
    const [specialDiscount, setSpecialDiscount] = useState(0);

    const user = useSelector((state) => state.auth.profile);
    const cartDetails = useSelector((state) => state.cart.cartDetails);
    const organizations = useSelector((state) => state.auth.usersOrganizations);
    const distributorDetails = useSelector((state) => state.auth.distributorDetails);
    const { placedOrderErrorMessage, placedOrderLoading } = useSelector((state) => state.order);

    const dispatch = useDispatch();
    const router = useRouter();
    const currentRole = getCurrentRole() && getCurrentRole().name;

    useEffect(() => {
        setSelectedRetailer(getDataInCookies('selectedRetailer'));
    }, [selectedRetailerId]);

    // const handleChangeRetailer = () => dispatch(setRetailerDrawer(true));

    /** get Notes*/
    const handleNotes = (e) => {
        setCheckoutNotes(e.target.value);
    };

    /**
     * @name placeOrder
     * @description It will place the order
     * @param {}
     * @returns {}
     */
    const placeOrder = () => {
        let settings = getSettings();
        let ecommerceSettings = settings.Ecommerce;
        if (isEmpty(cartBillingAddress) && isEmpty(cartShippingAddress)) {
            showNotification(
                NOTIFICATION_TYPE.WARNING,
                langs.notificationMessages.billingshippingAddress
            );
        } else if (isEmpty(cartBillingAddress)) {
            showNotification(NOTIFICATION_TYPE.WARNING, langs.notificationMessages.billingAddress);
        } else if (isEmpty(cartShippingAddress)) {
            showNotification(NOTIFICATION_TYPE.WARNING, langs.notificationMessages.shippingAddress);
        } else {
            let totalAmount = 0;
            const itemArray = [];
            cartDetails.order_items.map((item) => {
                let obj = {
                    item_id: item.id,
                    amount: item.price,
                    quantity: item.quantity,
                    sku_code: item.sku_code,
                    organization_id: item.organization_id,
                    moq: item.moq
                };
                itemArray.push(obj);
            });

            let postData = {
                amount: parseFloat(cartDetails.total_amount - specialDiscount),
                currency: 'INR',
                billing_address: cartBillingAddress,
                shipping_address: cartShippingAddress,
                order_items: itemArray,
                notes: checkoutNotes,
                special_discount: specialDiscount,
                order_value_discount: cartDetails.order_value_discount,
                sub_total: cartDetails.sub_total
            };

            if (ecommerceSettings.order_approval.value == 'true') {
                postData.status = 'unapproved';
            } else {
                postData.status = 'accepted';
            }

            if (selectedRetailer && currentRole != USER_ROLES.BUYER.name) {
                postData.retailer_id = selectedRetailer.id;
            }
            if (hasAppSettings('Ecommerce', 'restrict_order_credit_limit') !== false) {
                postData.userIdLimit = postData.retailer_id ? postData.retailer_id : userDetail.id;
            }

            const renderThankyouRoute = (orderData) => {
                if (user.role.name == USER_ROLES.BUYER) {
                    let orderOrganization = orderData.order_organizations;
                    let userOrganizations = organizations;
                    var uniqueOrganization = getUniqueIds(orderOrganization, userOrganizations);
                    let organizationData = {
                        buyer_id: user.id,
                        organizations: uniqueOrganization
                    };
                    dispatch({
                        type: ASSIGN_ORGANIZATION_INITIATE,
                        payload: organizationData
                    });
                }
                router.push('/cart/thankyou');
                removeDataInCookies('selectedRetailer');
                removeDataInCookies('selectedProduct');
            };
            dispatch({
                type: POST_ORDER_INITIATE,
                postData: postData,
                callback: renderThankyouRoute
            });
        }
    };

    const handleSpecialDiscount = () => {
        const value = document.querySelector('#discountValue').value;
        setSpecialDiscount(value);
    };
    // const distributorAddress = distributorDetails.address && distributorDetails.address.billing;

    return (
        <Fragment>
            <Responsive.Mobile>
                <div className={'p-t10'} />
            </Responsive.Mobile>
            <Responsive.Desktop>
                <ProductSummary sDissount={specialDiscount} />
            </Responsive.Desktop>
            {selectedRetailer && currentRole != USER_ROLES.BUYER.name && (
                <Fragment>
                    <div className={'p-t10'} />
                    <Title level={5} strong>
                        {langs.labels.retailerDetail}
                    </Title>
                    <Panel>
                        <PanelTitle
                            title={selectedRetailer.shop_name}
                            action={[
                                {
                                    onClick: () =>
                                        window.open(`tel:${selectedRetailer.phone_number}`),
                                    icon: <PhoneOutlined />,
                                    type: 'link',
                                    size: 'small',
                                    className: 'call-btn'
                                }
                            ]}
                        />
                        <PanelBody>
                            <Typography.Paragraph className={'m-b5 icon-list'}>
                                {selectedRetailer.address1 && (
                                    <Fragment>
                                        <EnvironmentOutlined /> {selectedRetailer.address1},
                                        {selectedRetailer.address2}
                                        {selectedRetailer.cityName},{selectedRetailer.stateName},
                                        {selectedRetailer.country} -{selectedRetailer.pincode}
                                    </Fragment>
                                )}
                            </Typography.Paragraph>
                        </PanelBody>
                    </Panel>
                </Fragment>
            )}
            <div className={'p-t15'} />
            <Title level={5} strong>
                {langs.labels.shippingFrom}
            </Title>
            <Panel>
                <PanelTitle
                    title={distributorDetails.name}
                    action={[
                        {
                            onClick: () => window.open(`tel:${distributorDetails.mobile}`),
                            icon: <PhoneOutlined />,
                            type: 'link',
                            size: 'small',
                            className: 'call-btn'
                        }
                    ]}
                />
                <PanelBody>
                    <Typography.Paragraph className={'m-b5 icon-list'}>
                        <EnvironmentOutlined />{' '}
                        {distributorDetails
                            ? `${distributorDetails.street_1}, ${distributorDetails.cityName}, ${distributorDetails.districtName},${distributorDetails.stateName}-${distributorDetails.pincode}`
                            : ''}
                    </Typography.Paragraph>
                </PanelBody>
            </Panel>

            <CartAddress
                userDetail={userDetail}
                selectedBuyer={selectedBuyer}
                setCartShippingAddress={setCartShippingAddress}
                setCartBillingAddress={setCartBillingAddress}
            />
            {currentRole != USER_ROLES.BUYER.name &&
                hasAppSettings('Ecommerce', 'allow_special_discount') != false && (
                    <div className="hided">
                        <div className={'p-t15'} />
                        <Title level={5} strong>
                            {langs.labels.specialDiscount}
                        </Title>
                        <Panel>
                            <PanelBody>
                                <Row gutter={[10, 0]}>
                                    <Col span={18}>
                                        <InputNumber
                                            placeholder={langs.labels.specialDiscount}
                                            className="w-100"
                                            id={'discountValue'}
                                            max={cartDetails.sub_total}
                                            min={0}
                                        />
                                    </Col>
                                    <Col span={6}>
                                        <ButtonWraper
                                            type="primary"
                                            onClick={() => handleSpecialDiscount()}
                                            block>
                                            {langs.labels.apply}
                                        </ButtonWraper>
                                    </Col>
                                </Row>
                            </PanelBody>
                        </Panel>
                    </div>
                )}
            <div className={'p-t15'} />
            <Title level={5} strong>
                {langs.labels.notes}
            </Title>
            <Panel>
                <Input.TextArea
                    placeholder={langs.labels.writeHere}
                    onBlur={handleNotes}
                    className="notes-textarea"
                />
            </Panel>
            <Responsive.Mobile>
                <div className={'p-t10'} />
                <ProductSummary sDissount={specialDiscount} />
            </Responsive.Mobile>
            {placedOrderErrorMessage && (
                <Alert
                    className={'m-t15'}
                    message="Error"
                    description={placedOrderErrorMessage}
                    type="error"
                    showIcon
                />
            )}
            <div style={{ marginTop: 20, marginBottom: 20 }}>
                <ButtonWraper
                    type="primary"
                    onClick={() => placeOrder()}
                    block
                    size={'large'}
                    loading={placedOrderLoading}
                    icon={<LikeOutlined />}
                    className="btn-confirm-order"
                    disabled={cartDetails.order_items && cartDetails.order_items.length == 0}>
                    {langs.labels.confirmOrder}
                </ButtonWraper>
            </div>
        </Fragment>
    );
}

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default Checkout;
