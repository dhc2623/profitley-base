import {
    UPDATE_PROFILE_INITIATE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    ADD_ADDRESS_INITIATE,
    ADD_ADDRESS_SUCCESS,
    ADD_ADDRESS_FAILURE,
    UPDATE_ADDRESS_INITIATE,
    UPDATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAILURE,
    // GET_PROFILE_INITIATE,
    // GET_PROFILE_SUCCESS,
    // GET_PROFILE_FAILURE,
    DELETE_ADDRESS_INITIATE,
    DELETE_ADDRESS_FAILURE,
    DELETE_ADDRESS_SUCCESS,
    UPDATE_PASSWORD_INITIATE,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILURE,
    RESET_PASSWORD_INITIATE,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE
} from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: true,
    profile: {
        organizations_count: 0
    }
};

/* Reducer for invoices */
export default function invoiceReducer(state = INITIAL_STATE, action) {
    console.log('type', action.type);
    switch (action.type) {
        // case GET_PROFILE_INITIATE:
        case UPDATE_PASSWORD_INITIATE:
        case RESET_PASSWORD_INITIATE:
            return { ...state, loading: true };
        // case GET_PROFILE_SUCCESS:
        //     return { ...state, loading: false, profile: action.payload };
        // case GET_PROFILE_FAILURE:
        //     return { ...state, loading: false };
        case UPDATE_PROFILE_INITIATE:
            return { ...state, loading: true };
        case UPDATE_PROFILE_SUCCESS:
            return { ...state, loading: false };
        case UPDATE_PROFILE_FAILURE:
            return { ...state, loading: false };
        case ADD_ADDRESS_INITIATE:
        case UPDATE_ADDRESS_INITIATE:
            return { ...state, loading: true };
        case ADD_ADDRESS_SUCCESS:
        case UPDATE_ADDRESS_SUCCESS:
            return { ...state, loading: false };
        case ADD_ADDRESS_FAILURE:
        case UPDATE_ADDRESS_FAILURE:
            return { ...state, loading: false };
        case DELETE_ADDRESS_INITIATE:
            return { ...state, loading: true };
        case DELETE_ADDRESS_SUCCESS:
            return { ...state, loading: false };
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_PASSWORD_FAILURE:
        case RESET_PASSWORD_SUCCESS:
        case RESET_PASSWORD_FAILURE:
        case DELETE_ADDRESS_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}
