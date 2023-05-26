import { AXIOS_INSTANCE } from '../../config/Config';
import queryString from 'query-string';

export const getDSPListService = async (data) => {
    return AXIOS_INSTANCE.get(
        `/users-by-type/2${queryString.stringify(data) ? '?' + queryString.stringify(data) : ''}`
    ).then((res) => {
        return res.data.success;
    });
};

export const getDetailsService = async (userId) => {
    return AXIOS_INSTANCE.get(`/user-details/${userId}`).then((res) => {
        return res.data.success.data;
    });
};

export const assignRetailersService = async (postData) => {
    return AXIOS_INSTANCE.post('/map-retailers', postData).then((res) => {
        return res.data.data;
    });
};

export const changeStatusService = async (postData) => {
    return AXIOS_INSTANCE.post('/user-status', postData).then((res) => {
        return res.data.data;
    });
};

export const getDSPInsightsService = async (userId) => {
    return AXIOS_INSTANCE.get(`/sp-insights/${userId}`).then((res) => {
        return res.data.success;
    });
};
