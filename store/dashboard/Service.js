import queryString from 'query-string';
import { AXIOS_INSTANCE } from '../../config/Config';
import { getCurrentRole } from '../../helper/AuthActions';

export const getDashboardDataService = async (role, date) => {
    let url = `/dashboard/${role}?${queryString.stringify(date)}`;
    return AXIOS_INSTANCE.get(url).then((res) => {
        return res.data.success;
    });
};

export const getSummaryService = async (role, dateFilter) => {
    let url = `/summary/${role}?date=${dateFilter}`;
    return AXIOS_INSTANCE.get(url).then((res) => {
        return res.data.success;
    });
};

export const getSellerSummaryService = async (dateFilter) => {
    let url = `/seller-overall-summary?startDate=${dateFilter.startDate}&endDate=${dateFilter.endDate}`;
    return AXIOS_INSTANCE.get(url).then((res) => {
        return res.data.success;
    });
};

