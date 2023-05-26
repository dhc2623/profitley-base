import queryString from 'query-string';
import { AXIOS_INSTANCE } from '../../config/Config';
import { USER_ROLES } from '../../config/Constant';
import {
    getAuthToken,
    getCurrentRole,
    getRetailerId,
    getUserDetails
} from '../../helper/AuthActions';

const getRetailerURL = (role, userId) => {
    let url = '';
    switch (role) {
        case USER_ROLES.DISTRIBUTOR.name:
            url = '/users-by-type/1';
            break;
        case USER_ROLES.DSP.name:
            url = `/dsp-retailers/${userId}`;
            break;
    }
    return url;
};

export const getCartListService = async () => {
    let id = getRetailerId();
    let url = `/e-commerce/cart`;
    if (id) {
        url += `/${id}`;
    }
    return AXIOS_INSTANCE.get(url).then((res) => {
        return !res.data.success.cart ? res.data.success : res.data.success.cart;
    });
};

export const addToCartService = async (data) => {
    let id = getRetailerId();
    if (id) {
        data.retailer_id = id;
    }
    return AXIOS_INSTANCE.post(`/e-commerce/cart`, data).then((res) => {
        return res.data.success;
    });
};

export const updateToCartService = async (data) => {
    let id = getRetailerId();
    if (id) {
        data.retailer_id = id;
    }
    return AXIOS_INSTANCE.post(`/e-commerce/cart/item-quantity`, data).then((res) => {
        return res.data.success;
    });
};

export const removeFromCartService = async (data) => {
    return AXIOS_INSTANCE.post(`/e-commerce/cart/remove-item`, data).then((res) => {
        return res.data.success;
    });
};

// Get Retailer for place order
export const getRetailerSelectionService = async (data) => {
    let url = getRetailerURL(getCurrentRole().name, getUserDetails().id);
    return AXIOS_INSTANCE.get(
        `${url}${queryString.stringify(data) ? '?' + queryString.stringify(data) : ''}`
    ).then((res) => {
        return res.data.success;
    });
};

export const addMultipleItemsToCartService = async (data) => {
    return AXIOS_INSTANCE.post(`/e-commerce/cart/create-cart`, data).then((res) => {
        return res.data.success;
    });
};

export const clearCartService = async (cartId) => {
    return AXIOS_INSTANCE.delete(`/e-commerce/cart/clear-cart/${cartId}`).then((res) => {
        return res.data.success;
    });
};

export const assignOrganizationService = async (data) => {
    // return AXIOS_INSTANCE.post(`/assign-buyer-organiztion`, data).then((res) => {
    //     return res.data.success;
    // });
};

export const checkBuyerCreditLimit = async (buyer_id) => {
    return AXIOS_INSTANCE.get(`/buyer-credit-limit/${buyer_id}`).then((res) => {
        return res.data.success;
    });
};