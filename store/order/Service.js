import { AXIOS_INSTANCE } from '../../config/Config';
import queryString from 'query-string';
import { getCurrentRole, getUserDetails } from '../../helper/AuthActions';
import { USER_ROLES } from '../../config/Constant';

const getOrerURL = (role, userId) => {
    let url = '';
    switch (role) {
        case USER_ROLES.BUYER.name:
            url = `/e-commerce/orders/retailer-orders/${userId}`;
            break;
        case USER_ROLES.DSP.name:
            url = `/e-commerce/orders/dsp-orders/${userId}`;
            break;
        default:
            url = '/e-commerce/orders/all-orders';
    }
    return url;
};

export const getOrdersListService = async (data) => {
    const url = getOrerURL(getCurrentRole().name, getUserDetails().id);
    return AXIOS_INSTANCE.get(
        `${url}${queryString.stringify(data) ? '?' + queryString.stringify(data) : ''}`
    ).then((res) => {
        return res.data;
    });
};

export const getOrderDetailsService = async (orderId) => {
    return AXIOS_INSTANCE.get(`/e-commerce/orders/order/${orderId}`).then((res) => {
        return res.data.success.data;
    });
};

export const placeOrderService = async (data) => {
    return AXIOS_INSTANCE.post('/e-commerce/checkout/order-submit', data).then((res) => {
        return res.data;
    });
};

export const cancelOrderService = async (data) => {
    return AXIOS_INSTANCE.post('/e-commerce/orders/order-status', data).then((res) => {
        return res.data.success;
    });
};

export const postOrderNotificationService = async (order_ids) => {
    return AXIOS_INSTANCE.get(`/e-commerce/checkout/order-notification?${queryString.stringify(order_ids, {arrayFormat: 'comma'})}`).then((res) => {
        return res.data.success;
    });
};
