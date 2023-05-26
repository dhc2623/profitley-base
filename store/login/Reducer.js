import {
    LOGIN_SUCCESS,
    LOGIN_INITIATE,
    LOGIN_FAILURE,
    FORGOT_PASSWORD_INITIATE,
    FORGOT_PASSWORD_FAILURE,
    FORGOT_PASSWORD_SUCCESS,
    RETAILER_SIGNUP_INITIATE,
    RETAILER_SIGNUP_SUCCESS,
    RETAILER_SIGNUP_FAILURE
} from './Action';

/** Import constant */

/** initialize the state */
export const INITIAL_STATE = {
    loading: false
};

/* Reducer for invoices */
export default function invoiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGIN_INITIATE:
        case RETAILER_SIGNUP_INITIATE:
            return { ...state, loading: true };
        case LOGIN_SUCCESS:
        case RETAILER_SIGNUP_SUCCESS:
            return { ...state, loading: false };
        case LOGIN_FAILURE:
        case RETAILER_SIGNUP_FAILURE:
            return { ...state, loading: false };
        case FORGOT_PASSWORD_INITIATE:
            return { ...state, loading: true };
        case FORGOT_PASSWORD_SUCCESS:
            return { ...state, loading: false };
        case FORGOT_PASSWORD_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}
