import {
    GET_BANNERS_DATA_INITIATE,
    GET_BANNERS_DATA_FAILURE,
    GET_BANNERS_DATA_SUCCESS
} from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    bannersData: []
};

/* Reducer for invoices */
export default function invoiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_BANNERS_DATA_INITIATE:
            return { ...state, loading: true };
        case GET_BANNERS_DATA_SUCCESS:
            return { ...state, loading: false, bannersData: action.payload };
        case GET_BANNERS_DATA_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}
