export const GET_CART_INITIATE = 'GET_CART_INITIATE';
export const GET_CART_SUCCESS = 'GET_CART_SUCCESS';
export const GET_CART_FAILURE = 'GET_CART_FAILURE';

export const ADD_TO_CART_INITIATE = 'ADD_TO_CART_INITIATE';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';

export const ADD_MULTI_ITEM_INITIATE = 'ADD_MULTI_ITEM_INITIATE';
export const ADD_MULTI_ITEM_SUCCESS = 'ADD_MULTI_ITEM_SUCCESS';
export const ADD_MULTI_ITEM_FAILURE = 'ADD_MULTI_ITEM_FAILURE';

export const UPDATE_TO_CART_INITIATE = 'UPDATE_TO_CART_INITIATE';
export const UPDATE_TO_CART_SUCCESS = 'UPDATE_TO_CART_SUCCESS';
export const UPDATE_TO_CART_FAILURE = 'UPDATE_TO_CART_FAILURE';

export const REMOVE_FROM_CART_INITIATE = 'REMOVE_FROM_CART_INITIATE';
export const REMOVE_FROM_CART_SUCCESS = 'REMOVE_FROM_CART_SUCCESS';
export const REMOVE_FROM_CART_FAILURE = 'REMOVE_FROM_CART_FAILURE';

export const SELECT_RETAILER_INITIATE = 'SELECT_RETAILER_INITIATE';
export const SELECT_RETAILER_SUCCESS = 'SELECT_RETAILER_SUCCESS';
export const SELECT_RETAILER_FAILURE = 'SELECT_RETAILER_FAILURE';

export const SET_RETAILER_DRAWER = 'SET_RETAILER_DRAWER';
export const SET_RETAILER_DRAWER_SUCCESS = 'SET_RETAILER_DRAWER_SUCCESS';

export const CLEAR_CART_INITIATE = 'CLEAR_CART_INITIATE';
export const CLEAR_CART_SUCCESS = 'CLEAR_CART_SUCCESS';
export const CLEAR_CART_FAILURE = 'CLEAR_CART_FAILURE';

export const ASSIGN_ORGANIZATION_INITIATE = 'ASSIGN_ORGANIZATION_INITIATE';
export const ASSIGN_ORGANIZATION_SUCCESS = 'ASSIGN_ORGANIZATION_SUCCESS';
export const ASSIGN_ORGANIZATION_FAILURE = 'ASSIGN_ORGANIZATION_FAILURE';

export const getCart = (params) => ({
    type: GET_CART_INITIATE,
    params
});

export const getCartSuccess = (data) => ({
    type: GET_CART_SUCCESS,
    payload: data
});

export const getCartFailure = (data) => ({
    type: GET_CART_FAILURE,
    payload: data
});

export const addProductToCart = (params) => ({
    type: ADD_TO_CART_INITIATE,
    params
});

export const addToCartSuccess = (data) => ({
    type: ADD_TO_CART_SUCCESS,
    payload: data
});

export const addToCartFailure = (data) => ({
    type: ADD_TO_CART_FAILURE,
    payload: data
});

export const addMultiItem = (params) => ({
    type: ADD_MULTI_ITEM_INITIATE,
    params
});

export const addMultiItemSuccess = (data) => ({
    type: ADD_MULTI_ITEM_SUCCESS,
    payload: data
});

export const addMultiItemFailure = (data) => ({
    type: ADD_MULTI_ITEM_FAILURE,
    payload: data
});

export const updateProductToCart = (params) => ({
    type: UPDATE_TO_CART_INITIATE,
    params
});

export const updateToCartSuccess = (data) => ({
    type: UPDATE_TO_CART_SUCCESS,
    payload: data
});

export const updateToCartFailure = (data) => ({
    type: UPDATE_TO_CART_FAILURE,
    payload: data
});

export const getRetailerForCart = (params) => ({
    type: SELECT_RETAILER_INITIATE,
    params
});

export const getRetailerForCartSuccess = (data) => ({
    type: SELECT_RETAILER_SUCCESS,
    payload: data
});

export const getRetailerForCartFailure = (data) => ({
    type: SELECT_RETAILER_FAILURE,
    payload: data
});

export const setRetailerDrawer = (data) => ({
    type: SET_RETAILER_DRAWER,
    payload: data
});

export const setRetailerDrawerSuccess = (data) => ({
    type: SET_RETAILER_DRAWER_SUCCESS,
    payload: data
});

export const clearCart = (params) => ({
    type: CLEAR_CART_INITIATE,
    params
});

export const clearCartSuccess = (data) => ({
    type: CLEAR_CART_SUCCESS,
    payload: data
});

export const clearCartFailure = (data) => ({
    type: CLEAR_CART_FAILURE,
    payload: data
});

export const assignRetailer = (params) => ({
    type: ASSIGN_ORGANIZATION_INITIATE,
    params
});

export const assignRetailerSuccess = (data) => ({
    type: ASSIGN_ORGANIZATION_SUCCESS,
    payload: data
});

export const assignRetailerFailure = (data) => ({
    type: ASSIGN_ORGANIZATION_FAILURE,
    payload: data
});