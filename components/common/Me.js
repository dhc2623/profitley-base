import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { askForPermissioToReceiveNotifications } from '../../config/FIrebasePushNotification';
import { getAuthToken } from '../../helper/AuthActions';
import { getDataInCookies, setDataInCookies } from '../../helper/Utils';
import { GET_CART_INITIATE } from '../../store/cart/Action';
import { setChild } from '../../store/common/Action';
import { ME_INITIATE } from '../../store/auth/Action';
import { GET_RETAILER_DETAILS_INITIATE } from '../../store/retailer/Action';

const Me = () => {
    const dispatch = useDispatch();
    const selectedRetailer = getDataInCookies('selectedRetailer');
    useEffect(() => {
        askForPermissioToReceiveNotifications(dispatch);
        const token = getAuthToken();
        dispatch(setChild(false));
        if (token) {
            setTimeout(() => {
                // dispatch({ type: ME_INITIATE });
                // dispatch({ type: GET_CART_INITIATE });
            }, 1000);
        }
        if (selectedRetailer) {
            const storeData = (selectedRetailerObj) => {
                setDataInCookies('selectedRetailer', selectedRetailerObj);
            };
            dispatch({
                type: GET_RETAILER_DETAILS_INITIATE,
                retailerId: selectedRetailer.id,
                callback: storeData
            });
        }
    }, []);
    return <React.Fragment />;
};
export default Me;
