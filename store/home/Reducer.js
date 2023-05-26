import { GET_HOME_DATA_INITIATE, GET_HOME_DATA_FAILURE, GET_HOME_DATA_SUCCESS } from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    homeData: []
};

/* Reducer for invoices */
export default function invoiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_HOME_DATA_INITIATE:
            return { ...state, loading: true };
        case GET_HOME_DATA_SUCCESS:
            return { ...state, loading: false, homeData: action.payload };
        case GET_HOME_DATA_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}
