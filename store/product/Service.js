import { AXIOS_INSTANCE } from '../../config/Config';
import queryString from 'query-string';
import { getRetailerId } from '../../helper/AuthActions';

export const getProductsListService = async (data) => {
    let id = getRetailerId();
    let url = '/e-commerce/shop/products-list';
    if (id) {
        url += `/${id}`;
    }
    return AXIOS_INSTANCE.get(
        `${url}${queryString.stringify(data) ? '?' + queryString.stringify(data) : ''}`
    ).then((res) => {
        return res.data;
    });
};

export const getProductDetailsService = async (productId) => {
    let id = getRetailerId();
    let url = `/e-commerce/shop/single-product/${productId}`;
    if (id) {
        url += `/${id}`;
    }
    return AXIOS_INSTANCE.get(`${url}`).then((res) => {
        return res.data;
    });
};

export const getProductsMetaBrands = async (data) => {
    return AXIOS_INSTANCE.get(`/e-commerce/brands`).then((res) => {
        return res.data;
    });
};

export const getProductsMetaCategories = async (data) => {
    return AXIOS_INSTANCE.get(`/e-commerce/categories?pagniation=no`).then((res) => {
        return res.data;
    });
};

export const getProductsMetaModels = async (data) => {
    return AXIOS_INSTANCE.get(`/e-commerce/models`).then((res) => {
        return res.data;
    });
};

export const getProductsMetaSegments = async (data) => {
    return AXIOS_INSTANCE.get(`/e-commerce/segments`).then((res) => {
        return res.data;
    });
};

export const getProductsMetaManufacturers = async (data) => {
    return AXIOS_INSTANCE.get(`/e-commerce/manufacturers`).then((res) => {
        return res.data;
    });
};

export const getProductsMetaTags = async (data) => {
    return AXIOS_INSTANCE.get(`/e-commerce/tags`).then((res) => {
        return res.data;
    });
};


export const getFrequentlyOrderProductsListService = async ( data) => {
    let id = getRetailerId();
    if (id) {
        url += `/${id}`;
    }
    let url = `/e-commerce/shop/frequently-ordered-items/${id}`;
    
    return AXIOS_INSTANCE.get(
        `${url}${queryString.stringify(data) ? '?' + queryString.stringify(data) : ''}`
    ).then((res) => {
        return res.data;
    });
};