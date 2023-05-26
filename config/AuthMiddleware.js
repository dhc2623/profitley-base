import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuthToken, getUserDetails } from '../helper/AuthActions';
import { showNotification } from '../helper/Utils';
import { NOTIFICATION_TYPE } from './Constant';
import { langs } from '../localization';
import { useDispatch } from 'react-redux';
import { UPDATE_CURRENT_USER } from '../store/currentUser/Action';

export function ProtectRoute(Component, Guest) {
    return (props) => {
        const [isGuest, setisGuest] = useState(false);
        const [token, setToken] = useState('');
        const router = useRouter();
        const dispatch = useDispatch();

        useEffect(() => {
            let token = getAuthToken();
            let userdata = getUserDetails();
            if (!Guest && !token && !userdata) {
                showNotification(
                    NOTIFICATION_TYPE.WARNING,
                    langs.notificationMessages.unauthorized,
                    langs.notificationMessages.pleaseLogin
                );
                console.log('Authmiddleware debugging if part');
                window.location.assign('/login');
            } else {
                console.log('Authmiddleware debugging else');
                setToken(token);
                dispatch({ type: UPDATE_CURRENT_USER, action: userdata });
                setisGuest(isGuest);
            }
        }, []);

        return !isGuest && !token ? (
            <React.Fragment></React.Fragment>
        ) : (
            <Component {...arguments} {...props} />
        );
    };
}
