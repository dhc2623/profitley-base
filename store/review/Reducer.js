import {
    POST_REVIEW_INITIATE,
    POST_REVIEW_SUCCESS,
    POST_REVIEW_FAILURE,
    GET_REVIEW_INITIATE,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAILURE
} from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    reviewList: []
};

/* Reducer for invoices */
export default function invoiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case POST_REVIEW_INITIATE:
        case GET_REVIEW_INITIATE:
            return { ...state, loading: true };
        case GET_REVIEW_SUCCESS:
            return { ...state, loading: false, reviewList: action.payload };
        case POST_REVIEW_SUCCESS:
        case POST_REVIEW_FAILURE:
        case GET_REVIEW_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}
