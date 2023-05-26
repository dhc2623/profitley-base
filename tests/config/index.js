import axios from 'axios';
import { API_BASE_URL } from '../../config/Constant';
import { SELLER_TOKEN } from '../helper/Constant';
import { getValueToMockStore } from '../Login.test';

/** Axios Instance for setting the Auth header to the Axios*/
export const AXIOS_TEST_INSTANCE = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: getValueToMockStore(SELLER_TOKEN),
        Accept: 'application/json'
    }
});
