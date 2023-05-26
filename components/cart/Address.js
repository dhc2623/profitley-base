import { Fragment, useEffect, useState } from 'react';
import { Col, Row, Select, Typography } from 'antd';
import { PlusOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { isEmpty } from 'lodash';
import { langs } from '../../localization';
import Panel, { PanelBody, PanelTitle } from '../common/panel';
import {  USER_ROLES } from '../../config/Constant';
import { getDataInCookies } from '../../helper/Utils';
import { GET_BUYERS_ADDRESS_INITIATE } from '../../store/retailer/Action';
import { getCurrentRole } from '../../helper/AuthActions';
import ButtonWraper from '../common/form/ButtonWrapper';

// import { getCurrentRole, getUserDetails, serverCheckIsUserLogin } from '../../helper/AuthActions';
const AddAddress = dynamic(() => import('../profile/partial/AddAddress'));

const { Title, Text } = Typography;
const { Option } = Select;
const CartAddress = (props) => {
    const { userDetail, selectedBuyer, setCartBillingAddress, setCartShippingAddress } = props;
    const dispatch = useDispatch();

    const [visiblePopup, setVisiblePopup] = useState(false);

    const user = useSelector((state) => state.auth.profile);
    const selectedRetailerId = useSelector((state) => state.common.selectedRetailerId);
    const retailerAddress = useSelector((state) => state.retailer.retailerAddress);

    const [billingAddress, setBillingAddress] = useState({});
    const [shippingAddress, setShippingAddress] = useState({});
    const [selectedRetailer, setSelectedRetailer] = useState(selectedBuyer);
    const [newAddressType, setNewAddressType] = useState(null);

    const currentRole = getCurrentRole() && getCurrentRole().name;

    const addresses =
        userDetail.role.name == USER_ROLES.BUYER.name
            ? user
                ? user.addresses
                : []
            : selectedRetailer
            ? retailerAddress
            : [];

    useEffect(() => {
        if (selectedRetailer && selectedRetailer.id) {
            dispatch({ type: GET_BUYERS_ADDRESS_INITIATE, buyerId: selectedRetailer.id });
        }
    }, []);

    useEffect(() => {
        const billing = addresses.filter((item) => item.address_type === 'Billing')[0];
        const shipping = addresses.filter((item) => item.address_type === 'Shipping')[0];
        if (billing) {
            changeBillingAddress(billing.id);
        }
        if (shipping) {
            changeShippingAddress(shipping.id);
        }
    }, [user, addresses]);

    useEffect(() => {
        setSelectedRetailer(getDataInCookies('selectedRetailer'));
    }, [selectedRetailerId]);
    // const handleChangeRetailer = () => dispatch(setRetailerDrawer(true));

    /**
     * @name changeBillingAddress
     * @description It sets selected billing address in state
     * @param {type}
     * @returns {}
     */
    const changeBillingAddress = (id) => {
        const bill = addresses.filter((item) => item.id === id);
        if (bill.length > 0) {
            const address = bill[0];
            address.type = address.address_type;
            address.email = user.email;
            address.first_name = user.name;
            address.last_name = user.last_name;
            setBillingAddress(address);
            setCartBillingAddress(address);
        }
    };

    /**
     * @name changeShippingAddress
     * @description It sets selected shipping address in state
     * @param {type}
     * @returns {}
     */
    const changeShippingAddress = (id) => {
        const ship = addresses.filter((item) => item.id === id);
        if (ship.length > 0) {
            const address = ship[0];
            address.type = address.address_type;
            address.email = user.email;
            address.first_name = user.name;
            address.last_name = user.last_name;
            setShippingAddress(address);
            setCartShippingAddress(address);
        }
    };

    /**
     * @name submitForm
     * @description It will invoke as an callback on add addres success
     * @param {type}
     * @returns {}
     */
    const submitForm = (newAddress) => {
        // setNewAddress(newAddress);
        // showNotification(NOTIFICATION_TYPE.SUCCESS, langs.notificationMessages.addressAdded);
        if (newAddress.address_type === 'Shipping') {
            changeShippingAddress(newAddress.id);
        } else {
            changeBillingAddress(newAddress.id);
        }
        setVisiblePopup(false);
    };

    /**It closes the add address popup*/
    const closePopup = () => {
        setVisiblePopup(false);
    };

    /** Open add address popup*/
    const openAddressPopup = (action) => {
        setNewAddressType(action);
        setVisiblePopup(true);
    };

    return (
        <Fragment>
            <div className={'p-t15'} />
            <Title level={5} strong>
                {langs.labels.billTo}
            </Title>
            <Panel>
                <PanelTitle
                    title={
                        <Row>
                            <Col span={12}>
                                <Select
                                    placeholder={langs.labels.selectAddress}
                                    onChange={(e) => changeBillingAddress(e)}
                                    style={{ width: 150, fontWeight: 'normal' }}
                                    value={isEmpty(billingAddress) ? null : 'Billing'}
                                    // defaultValue={defaultBillingAddressType}
                                >
                                    {addresses &&
                                        addresses.map((address, key) => {
                                            return (
                                                <Option value={address.id} key={address.id}>
                                                    {address.name}
                                                </Option>
                                            );
                                        })}
                                </Select>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                {currentRole == USER_ROLES.BUYER.name && (
                                    <ButtonWraper type="link" onClick={() => openAddressPopup(1)}>
                                        <PlusOutlined /> {langs.labels.newAddress}
                                    </ButtonWraper>
                                )}
                            </Col>
                        </Row>
                    }
                />
                {billingAddress.address1 && (
                    <PanelBody>
                        <Fragment>
                            <Typography.Paragraph className={'m-b5 icon-list'}>
                                <EnvironmentOutlined /> {billingAddress.address1}{' '}
                                {` ${billingAddress.city} ${billingAddress.state}, ${billingAddress.country} - (${billingAddress.pincode})`}
                            </Typography.Paragraph>
                        </Fragment>
                    </PanelBody>
                )}
            </Panel>
            <div className={'p-t15'} />
            <Title level={5} strong>
                {langs.labels.shipTo}
            </Title>
            <Panel>
                <PanelTitle
                    title={
                        <Row>
                            <Col span={12}>
                                <Select
                                    placeholder={langs.labels.selectAddress}
                                    onChange={(e) => changeShippingAddress(e)}
                                    style={{ width: 150, fontWeight: 'normal' }}
                                    value={isEmpty(shippingAddress) ? null : 'Shipping'}>
                                    {addresses &&
                                        addresses.map((address) => {
                                            return (
                                                <Option value={address.id} key={address.id}>
                                                    {address.name}
                                                </Option>
                                            );
                                        })}
                                </Select>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                {currentRole == USER_ROLES.BUYER.name && (
                                    <ButtonWraper type="link" onClick={() => openAddressPopup(2)}>
                                        <PlusOutlined /> {langs.labels.newAddress}
                                    </ButtonWraper>
                                )}
                            </Col>
                        </Row>
                    }
                />
                {shippingAddress.address1 && (
                    <PanelBody>
                        <Fragment>
                            <Typography.Paragraph className={'m-b5 icon-list'}>
                                <EnvironmentOutlined />{' '}
                                {` ${shippingAddress.address1} ${shippingAddress.city} ${shippingAddress.state}, ${shippingAddress.country} - (${shippingAddress.pincode})`}
                            </Typography.Paragraph>
                        </Fragment>
                    </PanelBody>
                )}
            </Panel>
            {visiblePopup && (
                <AddAddress
                    visible={visiblePopup}
                    submit={submitForm}
                    close={closePopup}
                    user={user}
                    selectedData={{ address_type: newAddressType }}
                />
            )}
        </Fragment>
    );
};
export default CartAddress;
