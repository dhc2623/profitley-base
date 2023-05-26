import axios from 'axios';
import { API_BASE_URL } from './Constant';
import { getAuthToken } from '../helper/AuthActions';

/** Axios Instance for setting the Auth header to the Axios*/
export const AXIOS_INSTANCE = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        Accept: 'application/json'
    }
});
