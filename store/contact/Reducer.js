import {
    CONTACT_REQUEST_INITIATE,
    CONTACT_REQUEST_SUCCESS,
    CONTACT_REQUEST_FAILURE
} from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: false
};

/* Reducer for invoices */
export default function invoiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CONTACT_REQUEST_INITIATE:
            return { ...state, loading: true };
        case CONTACT_REQUEST_SUCCESS:
            return { ...state, loading: false };
        case CONTACT_REQUEST_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}
