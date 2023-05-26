import { GET_LIST_SUCCESS, GET_LIST_INITIATE, GET_LIST_FAILURE } from './Action';

/** Import constant */

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    invoiceList: []
};

/* Reducer for invoices */
export default function invoiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_LIST_INITIATE:
            return { ...state, loading: true };
        case GET_LIST_SUCCESS:
            return { ...state, invoiceList: action.payload, loading: false };
        case GET_LIST_FAILURE:
            return {
                ...state,
                invoiceList: INITIAL_STATE.invoiceList,
                loading: false
            };
        default:
            return state;
    }
}
