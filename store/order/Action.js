export const GET_ORDERS_LIST_INITIATE = 'GET_ORDERS_LIST_INITIATE';
export const GET_ORDERS_LIST_SUCCESS = 'GET_ORDERS_LIST_SUCCESS';
export const GET_ORDERS_LIST_FAILURE = 'GET_ORDERS_LIST_FAILURE';
export const GET_ORDER_DETAILS_INITIATE = 'GET_ORDER_DETAILS_INITIATE';
export const GET_ORDER_DETAILS_SUCCESS = 'GET_ORDER_DETAILS_SUCCESS';
export const GET_ORDER_DETAILS_FAILURE = 'GET_ORDER_DETAILS_FAILURE';
export const POST_ORDER_INITIATE = 'POST_ORDER_INITIATE';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILURE = 'POST_ORDER_FAILURE';
export const POST_ORDER_FAILURE_MESSAGE = 'POST_ORDER_FAILURE_MESSAGE';
export const CANCEL_ORDER_INITIATE = 'CANCEL_ORDER_INITIATE';
export const CANCEL_ORDER_SUCCESS = 'CANCEL_ORDER_SUCCESS';
export const CANCEL_ORDER_FAILURE = 'CANCEL_ORDER_FAILURE';

export const getOrdersList = (data) => ({
    type: GET_ORDERS_LIST_INITIATE,
    payload: data
});

export const getOrdersListSuccess = (data) => ({
    type: GET_ORDERS_LIST_SUCCESS,
    payload: data
});

export const getOrdersListFailure = (data) => ({
    type: GET_ORDERS_LIST_FAILURE,
    payload: data
});

export const getOrderDetails = (params) => ({
    type: GET_ORDER_DETAILS_INITIATE,
    params
});

export const getOrderDetailsSuccess = (data) => ({
    type: GET_ORDER_DETAILS_SUCCESS,
    payload: data
});

export const getOrderDetailsFailure = (data) => ({
    type: GET_ORDER_DETAILS_FAILURE,
    payload: data
});

export const postOrder = (params) => ({
    type: POST_ORDER_INITIATE,
    params
});

export const postOrderSuccess = (data) => ({
    type: POST_ORDER_SUCCESS,
    payload: data
});

export const postOrderFailure = (data) => ({
    type: POST_ORDER_FAILURE,
    payload: data
});

export const cancelOrder = (params) => ({
    type: CANCEL_ORDER_INITIATE,
    params
});

export const cancelOrderSuccess = (data) => ({
    type: CANCEL_ORDER_SUCCESS,
    payload: data
});

export const cancelOrderFailure = (data) => ({
    type: CANCEL_ORDER_FAILURE,
    payload: data
});

export const removeOrderFailureMessage = (data) => ({
    type: POST_ORDER_FAILURE_MESSAGE,
    payload: data
});