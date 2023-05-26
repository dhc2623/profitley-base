import axios from 'axios';
import { API_BASE_URL } from '../../../config/Constant';
import { getHeader } from '../../Login.test';

export const orderPlacementService = async (data) => {
    let header = {
        headers: getHeader()
    };
    return axios
        .post(`${API_BASE_URL}/e-commerce/checkout/order-submit`, data, header)
        .then((res) => {
            return res;
        });
};
