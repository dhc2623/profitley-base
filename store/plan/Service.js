import { AXIOS_INSTANCE } from '../../config/Config';
import queryString from 'query-string';
import { getCurrentRole, getUserDetails } from '../../helper/AuthActions';
import { USER_ROLES } from '../../config/Constant';
import { errorResponse } from '../../helper/Utils';

export const getVisitService = async (data) => {
    return AXIOS_INSTANCE.get(
        `/visits${data.userId ? '/' + data.userId : ''}?date=${data.planDate}`
    ).then((res) => {
        return res.data;
    });
};

// /api/v1/unapproved-visits/35?is_rejected=1&?date=25-03-2021

export const unapprovedVisitService = async (data) => {
    return AXIOS_INSTANCE.get(
        `/unapproved-visits/${data.userId}${queryString.stringify(data) ? '?' + queryString.stringify(data) : ''}`
    ).then((res) => {
        return res.data.success;
    });
};

export const postVisitService = async (data) => {
    return AXIOS_INSTANCE.post(`/visit`, data).then((res) => {
        return res.data.success;
    });
};

export const checkInService = async (planId, data) => {
    return AXIOS_INSTANCE.post(`/visit/checkin/${planId}`, data).then((res) => {
        return res.data.success.message;
    });
};

export const checkOutService = async (planId, data) => {
    return AXIOS_INSTANCE.post(`/visit/checkout/${planId}`, data).then((res) => {
        return res.data.success.message;
    });
};

export const cancelVisitService = async (planId, data) => {
    return AXIOS_INSTANCE.post(`/visit/cancel/${planId}`, data).then((res) => {
        return res.data.success.message;
    });
};

export const reScheduleService = async (visitId, data) => {
    return AXIOS_INSTANCE.post(`/visit/${visitId}`, data).then((res) => {
        return res.data.success;
    });
};

export const getVisitCalendarService = async (peram) => {
    const data = await AXIOS_INSTANCE.get(`/visit-calendar${peram.userId ? '/' + peram.userId : ''}?${queryString.stringify(peram)}`).then((res) => {
        return res.data.success;
    }).catch(error => {
        errorResponse(error, 'Direact call from service');
        return [];
    });
    return data
};
