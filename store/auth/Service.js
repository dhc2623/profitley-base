import axios from 'axios';
import Cookies from 'js-cookie';
import { AXIOS_INSTANCE } from '../../config/Config';
import { API_BASE_URL_BEFORE_LOGIN } from '../../config/Constant';
import { errorResponse } from '../../helper/Utils';
import { langs } from '../../localization';

export const meService = async (token) => {
    if (token) {
        let response = await axios({
            method: 'get',
            url: `${API_BASE_URL_BEFORE_LOGIN()}/me`,
            headers: { Accept: 'application/json', Authorization: `Bearer ${token}` }
        });
        return response.data.success;
    } else {
        return AXIOS_INSTANCE.get('/me')
            .then((res) => {
                return res.data.success;
            })
            .catch((error) => {
                errorResponse(error, 'ME_SERVICE');
            });
    }
};

export const getLung = async (lang = 'en', callback) => {
    try {
        const json = await fetch(`${API_BASE_URL_BEFORE_LOGIN()}/get-language/${lang}`).then(
            (res) => {
                const m = res.json();
                console.log(res);
                return m;
            }
        );
        await Cookies.set('preferredLanguage', lang);
        await window.localStorage.setItem('appLang', JSON.stringify(json.success));
        await setTimeout(async () => {
            await langs.setContent({
                en: { ...json.success }
            });
            if (callback) {
                await callback();
            }
        }, 500);
    } catch (error) {
        console.log('error', error);
    }
};
