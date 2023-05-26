import React, { Fragment, useEffect, useState } from 'react';
import { Alert, Typography, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { setRetailerDrawer } from '../../../store/cart/Action';
import { getUserDetails } from '../../../helper/AuthActions';
import { USER_ROLES } from '../../../config/Constant';
import { getDataInCookies } from '../../../helper/Utils';
import { langs } from '../../../localization';
const ButtonWraper = dynamic(() => import('../../common/form/ButtonWrapper'));
const { Title, Paragraph, Text } = Typography;

const SelectBuyerToggle = () => {
    const dispatch = useDispatch();
    const handleChangeRetailer = () => dispatch(setRetailerDrawer(true));
    const cartItem = useSelector((state) => state.cart.cartDetails.order_items);
    const cartId = useSelector((state) => state.cart.cartDetails.id);
    const cartItem2 = useSelector((state) => state.cart);
    const [userDetail, setUserDetail] = useState({ role: { name: '' } });
    useEffect(() => {
        setUserDetail(getUserDetails());
    }, []);

    const openClearCartConfirmation = () => {
        if (cartItem && cartItem.length > 0) {
            Modal.confirm({
                title: `${langs.labels.changeRetailer}!`,
                content: `${langs.labels.changeBuyerContent}`,
                okText: `${langs.labels.yes}`,
                cancelText: `${langs.labels.no}`,
                onOk() {
                    dispatch(setRetailerDrawer(true));
                }
            });
        } else {
            dispatch(setRetailerDrawer(true));
        }
    };

    return (
        <Fragment>
            {userDetail.role.name != USER_ROLES.BUYER.name && (
                <div className="select-retailers-strip">
                    {getDataInCookies('selectedRetailer') ? (
                        <Alert
                            message={
                                <Fragment>
                                    <Title level={5}>{getDataInCookies('selectedRetailer').shop_name}</Title>
                                    <ButtonWraper
                                        type="primary"
                                        size="small"
                                        onClick={openClearCartConfirmation}>
                                        {langs.labels.changeRetailer}
                                    </ButtonWraper>
                                </Fragment>
                            }
                            type="info"
                        />
                    ) : (
                        <Alert
                            message={
                                <Fragment>
                                    <Text className={'not-select'}>{langs.labels.pleaseSelectRetailerMessage}</Text>
                                    <ButtonWraper
                                        type="primary"
                                        size="small"
                                        onClick={handleChangeRetailer}>
                                        {langs.labels.selectRetailer}
                                    </ButtonWraper>
                                </Fragment>
                            }
                            type="warning"
                        />
                    )}
                </div>
            )}
        </Fragment>
    );
};

export default SelectBuyerToggle;
