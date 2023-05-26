export const LOGIN_INITIATE = 'LOGIN_INITIATE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const FORGOT_PASSWORD_INITIATE = 'FORGOT_PASSWORD_INITIATE';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const RETAILER_SIGNUP_INITIATE = 'RETAILER_SIGNUP_INITIATE';
export const RETAILER_SIGNUP_SUCCESS = 'RETAILER_SIGNUP_SUCCESS';
export const RETAILER_SIGNUP_FAILURE = 'RETAILER_SIGNUP_FAILURE';

export const login = (params) => ({
    type: LOGIN_INITIATE,
    params
});

export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data
});

export const loginFailure = (data) => ({
    type: LOGIN_FAILURE,
    payload: data
});

export const forgotPassword = (params) => ({
    type: FORGOT_PASSWORD_INITIATE,
    params
});

export const forgotPasswordSuccess = (data) => ({
    type: FORGOT_PASSWORD_SUCCESS,
    payload: data
});

export const forgotPasswordFailure = (data) => ({
    type: FORGOT_PASSWORD_FAILURE,
    payload: data
});

export const retailerSignup = (params) => ({
    type: RETAILER_SIGNUP_INITIATE,
    params
});

export const retailerSignupSuccess = (data) => ({
    type: RETAILER_SIGNUP_SUCCESS,
    payload: data
});

export const retailerSignupFailure = (data) => ({
    type: RETAILER_SIGNUP_FAILURE,
    payload: data
});
