import { GET_ITEM_LIST_SUCCESS, GET_ITEM_LIST_INITIATE, GET_ITEM_LIST_FAILURE } from './Action';

/** Import constant */

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    itemList: []
};

/* Reducer for invoices */
export default function invoiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_ITEM_LIST_INITIATE:
            return { ...state, loading: true };
        case GET_ITEM_LIST_SUCCESS:
            return { ...state, itemList: action.payload, loading: false };
        case GET_ITEM_LIST_FAILURE:
            return {
                ...state,
                itemList: INITIAL_STATE.invoiceList,
                loading: false
            };
        default:
            return state;
    }
}
