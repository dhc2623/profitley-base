import { AXIOS_INSTANCE } from '../../config/Config';
import queryString from 'query-string';
import { USER_ROLES } from '../../config/Constant';
import { getCurrentRole, getUserDetails } from '../../helper/AuthActions';

const getRetailerURL = (role, userId) => {
    let url = '';
    switch (role) {
        case USER_ROLES.OWNER.name:
        case USER_ROLES.SELLER.name:
            url = '/users-by-type/1';
            break;
        case USER_ROLES.DSP.name:
            url = `/dsp-retailers/${userId}`;
            break;
    }
    return url;
};

export const getRetailerListService = async (data) => {
    let url = getRetailerURL(getCurrentRole().name, getUserDetails().id);
    return AXIOS_INSTANCE.get(
        `${url}${queryString.stringify(data) ? '?' + queryString.stringify(data) : ''}`
    ).then((res) => {
        return res.data.success;
    });
};

export const getDetailsService = async (userId) => {
    return AXIOS_INSTANCE.get(`/user-details/${userId}`).then((res) => {
        return res.data.success.data;
    });
};

export const getOrdersService = async (data) => {
    return AXIOS_INSTANCE.get(
        `/e-commerce/orders/retailer-orders/${data.retailerId}${queryString.stringify(data) ? '?' + queryString.stringify(data) : ''
        }`
    ).then((res) => {
        return res.data.success;
    });
};

export const getRetailerInsightsService = async (data) => {
    return AXIOS_INSTANCE.get(`/buyer-insights/${data.retailerId}${queryString.stringify(data.date) ? '?' + queryString.stringify(data.date) : ''
        }`).then((res) => {
        return res.data.success;
    });
};

export const getLedgerService = async (data) => {
    return AXIOS_INSTANCE.get(
        `/buyer-ledger/${data.retailerId}${queryString.stringify(data) ? '?' + queryString.stringify(data) : ''
        }`
    ).then((res) => {
        return res.data.success;
    });
};

export const getInvoiceService = async (data) => {
    return AXIOS_INSTANCE.get(
        `/e-commerce/invoices/buyer-invoices/${data.retailerId}${queryString.stringify(data) ? '?' + queryString.stringify(data) : ''
        }`
    ).then((res) => {
        return res.data.success;
    });
};

export const getVisitsService = async (retailerId, data) => {
    return AXIOS_INSTANCE.get(
        `/buyer-visits/${retailerId}${queryString.stringify(data) ? '?' + queryString.stringify(data) : ''
        }`
    ).then((res) => {
        return res.data.success;
    });
};

export const getUserAddressService = async (userId) => {
    return AXIOS_INSTANCE.get(`/users/${userId}/address`).then((res) => {
        return res.data.success.addresses;
    });
};

export const getCollectionService = async (retailerId, data) => {
    return AXIOS_INSTANCE.get(
        `/e-commerce/collections/${retailerId}${queryString.stringify(data) ? '?' + queryString.stringify(data) : ''
        }`
    ).then((res) => {
        return res.data.success;
    });
};

export const postCollectionService = async (data) => {
    return AXIOS_INSTANCE.post(
        `/e-commerce/collections`, data
    ).then((res) => {
        return res.data.success;
    });
};

export const putCollectionService = async (retailerId, data) => {
    return AXIOS_INSTANCE.put(
        `/e-commerce/collections/${retailerId}`, data
    ).then((res) => {
        return res.data.success;
    });
};


export const getAllBuyersService = async (retailerId, data) => {
    return AXIOS_INSTANCE.get(
        `/all-buyers`).then((res) => {
        return res.data;
    });
};
