export const GET_PRODUCTS_LIST_INITIATE = 'GET_PRODUCTS_LIST_INITIATE';
export const GET_PRODUCTS_LIST_SUCCESS = 'GET_PRODUCTS_LIST_SUCCESS';
export const GET_PRODUCTS_LIST_NEXT_PAGE = 'GET_PRODUCTS_LIST_NEXT_PAGE';
export const GET_PRODUCTS_LIST_FAILURE = 'GET_PRODUCTS_LIST_FAILURE';
export const GET_PRODUCT_DETAILS_INITIATE = 'GET_PRODUCT_DETAILS_INITIATE';
export const GET_PRODUCT_DETAILS_SUCCESS = 'GET_PRODUCT_DETAILS_SUCCESS';
export const GET_PRODUCT_DETAILS_FAILURE = 'GET_PRODUCT_DETAILS_FAILURE';
export const GET_PRODUCTS_META_LIST_INITIATE = 'GET_PRODUCTS_META_LIST_INITIATE';
export const GET_PRODUCTS_META_LIST_SUCCESS = 'GET_PRODUCTS_META_LIST_SUCCESS';
export const GET_PRODUCTS_META_LIST_FAILURE = 'GET_PRODUCTS_META_LIST_FAILURE';

export const QUICK_VIEW_INITIATE = 'QUICK_VIEW_INITIATE';
export const QUICK_VIEW_SUCCESS = 'QUICK_VIEW_SUCCESS';

export const getProductsList = (data = {}) => ({
    type: GET_PRODUCTS_LIST_INITIATE,
    payload: data
});

export const getProductsListSuccess = (data) => ({
    type: GET_PRODUCTS_LIST_SUCCESS,
    payload: data
});

export const getProductsListNextPage = (data) => ({
    type: GET_PRODUCTS_LIST_NEXT_PAGE,
    payload: data
});

export const getProductsListFailure = (data) => ({
    type: GET_PRODUCTS_LIST_FAILURE,
    payload: data
});

export const getProductDetails = (params) => ({
    type: GET_PRODUCT_DETAILS_INITIATE,
    params
});

export const getProductDetailsSuccess = (data) => ({
    type: GET_PRODUCT_DETAILS_SUCCESS,
    payload: data
});

export const getProductDetailsFailure = (data) => ({
    type: GET_PRODUCT_DETAILS_FAILURE,
    payload: data
});

export const getProductsMeta = () => ({
    type: GET_PRODUCTS_META_LIST_INITIATE
    //payload: data,
});

export const getProductsMetaSuccess = (data) => ({
    type: GET_PRODUCTS_META_LIST_SUCCESS,
    payload: data
});

export const getProductsMetaFailure = (data) => ({
    type: GET_PRODUCTS_META_LIST_FAILURE,
    payload: data
});

export const quickView = (data) => ({
    type: QUICK_VIEW_INITIATE,
    payload: data
});

export const quickViewSuccess = (data) => ({
    type: QUICK_VIEW_SUCCESS,
    payload: data
});
