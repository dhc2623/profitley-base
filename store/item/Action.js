export const GET_ITEM_LIST_INITIATE = 'GET_ITEM_LIST_INITIATE';
export const GET_ITEM_LIST_SUCCESS = 'GET_ITEM_LIST_SUCCESS';
export const GET_ITEM_LIST_FAILURE = 'GET_ITEM_LIST_FAILURE';

export const getList = (params) => ({
    type: GET_ITEM_LIST_INITIATE,
    params
});

export const getListSuccess = (data) => ({
    type: GET_ITEM_LIST_SUCCESS,
    payload: data
});

export const getListFailure = (data) => ({
    type: GET_ITEM_LIST_FAILURE,
    payload: data
});
