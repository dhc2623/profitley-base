import axios from 'axios';
import { API_BASE_URL } from '../../../config/Constant';
import { AXIOS_TEST_INSTANCE } from '../../config';
import { getHeader } from '../../Login.test';

export const addToFavouriteService = async () => {
    let header = {
        headers: getHeader()
    };

    return axios.get(`${API_BASE_URL}/e-commerce/favourite/65`, header).then((res) => {
        return res;
    });
};

export const deleteFromFavouriteService = async () => {
    let header = {
        headers: getHeader()
    };
    return axios.delete(`${API_BASE_URL}/e-commerce/favourite/65`, header).then((res) => {
        return res;
    });
};
