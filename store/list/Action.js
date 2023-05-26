export const GET_LIST_INITIATE = 'GET_LIST_INITIATE';
export const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';
export const GET_LIST_FAILURE = 'GET_LIST_FAILURE';

export const getList = (params) => ({
    type: GET_LIST_INITIATE,
    params
});

export const getListSuccess = (data) => ({
    type: GET_LIST_SUCCESS,
    payload: data
});

export const getListFailure = (data) => ({
    type: GET_LIST_FAILURE,
    payload: data
});
