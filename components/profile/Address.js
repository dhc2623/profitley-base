import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import _ from 'lodash';
import { Card, Button, Popconfirm, Typography, Spin } from 'antd';
import { EnvironmentOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DELETE_ADDRESS_INITIATE } from '../../store/profile/Action';
import { ME_INITIATE } from '../../store/auth/Action';
import { langs } from '../../localization';
import { showNotification } from '../../helper/Utils';
import { NOTIFICATION_TYPE } from '../../config/Constant';
import Panel, { PanelBody, PanelTitle } from '../common/panel';
const AddAddress = dynamic(() => import('./partial/AddAddress'));

const Address = () => {
    const [visiblePopup, setPopupVisibility] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch({ type: ME_INITIATE });
    }, []);

    const user = useSelector((state) => state.auth.profile);
    const loading = useSelector((state) => state.auth.loading);

    /**
     * @name submitForm
     * @description this invokes after add address successfull
     * @param {}
     * @returns {}
     */
    const submitForm = () => {
        showNotification(
            NOTIFICATION_TYPE.SUCCESS,
            selectedData.type
                ? langs.notificationMessages.addressUpdated
                : langs.notificationMessages.addressAdded
        );
        setPopupVisibility(false);
        setSelectedData({});
    };

    const closePopup = () => {
        setPopupVisibility(false);
    };

    /**
     * @name deleteAddress
     * @description delete the address
     * @param {key}
     * @returns {}
     */
    const deleteAddress = (id) => {
        dispatch({
            type: DELETE_ADDRESS_INITIATE,
            id: id,
            callback: () => {
                showNotification(
                    NOTIFICATION_TYPE.SUCCESS,
                    langs.notificationMessages.addressDeleted
                );
                dispatch({ type: ME_INITIATE });
            }
        });
    };

    /**
     * @name getExtra
     * @description returns action buttons
     * @param {data, key}
     * @returns {}
     */
    const getExtra = (data, key) => {
        data.type = key;
        return [
            {
                onClick: () => {
                    setSelectedData(data);
                    setPopupVisibility(true);
                },
                loading: loading,
                icon: <EditOutlined />,
                type: 'primary'
                //label: langs.labels.edit,
            },
            {
                type: 'danger',
                loading: loading,
                icon: (
                    <Popconfirm
                        title={langs.labels.deleteAddressConfirm}
                        onConfirm={() => deleteAddress(data.id)}
                        onCancel={() => {}}
                        okText={langs.labels.yes}
                        cancelText={langs.labels.no}>
                        <DeleteOutlined />
                    </Popconfirm>
                )
            }
        ];
    };

    return (
        <React.Fragment>
            {!!user.addresses &&
                user.addresses.map((data) => {
                    return (
                        <Panel header={data.name.toUpperCase()} key={data.name}>
                            <PanelTitle
                                title={data.name.toUpperCase()}
                                action={getExtra(data, data.address_type)}
                            />
                            <PanelBody>
                                <Typography.Paragraph className="m-b0">
                                    <EnvironmentOutlined /> {data.address1}, {data.city},{' '}
                                    {data.district}, {data.state}, {data.country} - {data.pincode}
                                </Typography.Paragraph>
                            </PanelBody>
                        </Panel>
                    );
                })}
            {visiblePopup && (
                <AddAddress
                    visible={visiblePopup}
                    submit={submitForm}
                    close={closePopup}
                    user={user}
                    selectedData={selectedData}
                />
            )}
            <div className="p-t20 p-b20">
                <Button
                    type="primary"
                    onClick={() => {
                        setPopupVisibility(true);
                        setSelectedData({});
                    }}>
                    {langs.labels.addAddress}
                </Button>
            </div>
        </React.Fragment>
    );
};
export default Address;
