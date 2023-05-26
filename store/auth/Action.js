export const ME_INITIATE = 'ME_INITIATE';
export const ME_UPDATE_INITIATE = 'ME_UPDATE_INITIATE';
export const ME_SUCCESS = 'ME_SUCCESS';
export const ME_FAILURE = 'ME_FAILURE';

export const me = (params) => ({
    type: ME_INITIATE,
    params
});

export const meUpdate = (params) => ({
    type: ME_UPDATE_INITIATE,
    params
});

export const meSuccess = (data) => ({
    type: ME_SUCCESS,
    payload: data
});

export const meFailure = (data) => ({
    type: ME_FAILURE,
    payload: data
});
