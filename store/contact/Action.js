export const CONTACT_REQUEST_INITIATE = 'CONTACT_REQUEST_INITIATE';
export const CONTACT_REQUEST_SUCCESS = 'CONTACT_REQUEST_SUCCESS';
export const CONTACT_REQUEST_FAILURE = 'CONTACT_REQUEST_FAILURE';

export const contactRequest = (params) => ({
    type: CONTACT_REQUEST_INITIATE,
    params
});

export const contactRequestSuccess = (data) => ({
    type: CONTACT_REQUEST_SUCCESS,
    payload: data
});

export const contactRequestFailure = (data) => ({
    type: CONTACT_REQUEST_FAILURE,
    payload: data
});
