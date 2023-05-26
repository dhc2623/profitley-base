import axios from 'axios';
import { API_BASE_URL_BEFORE_LOGIN } from '../../config/Constant';

export const postLogin = async (params) => {
    
    let response = await axios({
        method: 'post',
        url: `${API_BASE_URL_BEFORE_LOGIN()}/login`,
        data: params,
        headers: { Accept: 'application/json' }
    });
    return response.data.success.user;
};

export const postForgotPassword = async (params) => {
    let response = await axios({
        method: 'post',
        url: `${API_BASE_URL_BEFORE_LOGIN()}/password/forget-password`,
        data: params,
        headers: { Accept: 'application/json' }
    });
    return response.data;
};


export const retailerSignupService = async (postData) => {
    let response = await axios.post(`${API_BASE_URL_BEFORE_LOGIN()}/register`, postData);
    return response.data.data;
};

// export const retailerSignupService = async () => {
// 	return AXIOS_INSTANCE.get('/users', postData).then((res) => {
// 		return res.data.data;
// 	});
// };
