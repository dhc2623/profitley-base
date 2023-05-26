import axios from 'axios';
import { API_BASE_URL } from '../../../config/Constant';
import { getHeader } from '../../Login.test';

export const getProfileService = async () => {
    let header = {
        headers: getHeader()
    };
    return axios.get(`${API_BASE_URL}/profile`, header).then((res) => {
        return res;
    });
};
