import axios from 'axios';
import { API_BASE_URL } from '../../../config/Constant';
import { AXIOS_TEST_INSTANCE } from '../../config';
import { getHeader } from '../../Login.test';

export const getCartService = async () => {
    let header = {
        headers: getHeader()
    };
    return axios.get(`${API_BASE_URL}/e-commerce/cart`, header).then((res) => {
        return res;
    });
};

export const addToCartService = async (data) => {
    let header = {
        headers: getHeader()
    };
    return axios.post(`${API_BASE_URL}/e-commerce/cart`, data, header).then((res) => {
        return res;
    });
};

export const updateToCartService = async (data) => {
    return AXIOS_TEST_INSTANCE.post(`/e-commerce/cart/item-quantity`, data).then((res) => {
        return res.data.data;
    });
};

export const removeFromCartService = async (data) => {
    return AXIOS_TEST_INSTANCE.post(`/e-commerce/cart/remove-item`, data).then((res) => {
        return res.data.data;
    });
};
