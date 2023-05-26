import {
    GET_SETTINGS_INITIATE,
    GET_SETTINGS_FAILURE,
    GET_SETTINGS_SUCCESS,
    UPDATE_SETTINGS_INITIATE,
    UPDATE_SETTINGS_SUCCESS,
    UPDATE_SETTINGS_FAILURE
} from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    settings: {}
};

/* Reducer for invoices */
export default function invoiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_SETTINGS_INITIATE:
        case UPDATE_SETTINGS_INITIATE:
            return { ...state, loading: true };
        case GET_SETTINGS_SUCCESS:
        case UPDATE_SETTINGS_SUCCESS:
            return { ...state, loading: false, settings: action.payload };
        case UPDATE_SETTINGS_FAILURE:
        case GET_SETTINGS_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}
