import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';

import { askForPermissioToReceiveNotifications } from '../config/FIrebasePushNotification';
import { getAuthToken } from '../helper/AuthActions';
import { getDataInCookies, setDataInCookies } from '../helper/Utils';
import { langs } from '../localization';
import { me } from '../store/auth/Action';
import { INITIAL_STATE } from '../store/auth/Reducer';
import { getLung } from '../store/auth/Service';
import { setChild } from '../store/common/Action';
import { GET_RETAILER_DETAILS_INITIATE } from '../store/retailer/Action';
import localDb from '../config/localDb';

export const UserContext = createContext();
const UserContextProvider = (props) => {
    
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth);
    const [userMe, setUserMe] = useState(INITIAL_STATE);
    const [isLogin, setIsLogin] = useState(false);
    const [database, setDatabase] = useState(null);
    const [appLanguage, setAppLanguage] = useState('');
    const router = useRouter();
    const [selectedRetailer, setSelectedRetailer] = useState(null);
    const selectedRetailerCookies = getDataInCookies('selectedRetailer');

    const setLocalDb = async () => {
        const db = await localDb();
        await setDatabase(db);
    };

    useEffect(() => {
        // return json;
        const token = getAuthToken();
        if (token) {
            setLocalDb();
            askForPermissioToReceiveNotifications(dispatch);

            dispatch(setChild(false));

            setIsLogin(true);
            dispatch(me());
            if (selectedRetailerCookies) {
                const storeData = (selectedRetailerObj) => {
                    setDataInCookies('selectedRetailer', selectedRetailerObj);
                    setSelectedRetailer(selectedRetailerObj);
                };
                dispatch({
                    type: GET_RETAILER_DETAILS_INITIATE,
                    retailerId: selectedRetailerCookies.id,
                    callback: storeData
                });
            }
        } else {
            router.push('/login');
        }
        const lang = Cookies.get('preferredLanguage') ? Cookies.get('preferredLanguage') : 'en';
        setAppLanguage(lang);
    }, []);

    useEffect(() => {
        setUserMe(userData);
    }, [userData]);

    const storeUser = (user) => {
        setUserMe(user);
    };

    const hasAppSettings = (SettingName = 'Ecommerce', settingCode) => {
        const settings = userMe.settings[SettingName].filter((item) => item.code == settingCode);
        if (settings.length > 0) {
            const setting = settings[0];
            if (setting.type === 'BOOLEAN') {
                return setting.value === 'true';
            } else {
                return setting.value;
            }
        } else {
            return undefined;
        }
    };

    const setAppLang = (lang) => {
        Cookies.set('preferredLanguage', lang);
        getLung(lang, () => setAppLanguage(lang));
    };

    return (
        <UserContext.Provider
            value={{
                userMe,
                storeUser,
                hasAppSettings,
                selectedRetailer,
                setSelectedRetailer,
                appLanguage,
                setAppLang
            }}>
            {!userMe.loading && database && (
                <DatabaseProvider database={database}>{props.children}</DatabaseProvider>
            )}
        </UserContext.Provider>
    );
};
export default UserContextProvider;
