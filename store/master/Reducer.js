import {
    GET_STATE_INITIATE,
    GET_CITIES_INITIATE,
    GET_DISTRICT_INITIATE,
    GET_USER_BY_ROLE_INITIATE,
    GET_STATE_SUCCESS,
    GET_CITIES_SUCCESS,
    GET_DISTRICT_SUCCESS,
    GET_DSP_DATA_SUCCESS,
    GET_RETAILER_DATA_SUCCESS,
    FAILURE,
    GET_RETAILER_CATEGORIES_INITIATE,
    GET_RETAILER_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_ALL_CATEGORIES_INITIATE
} from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    states: [],
    cities: [],
    districts: [],
    dspList: [],
    retailerList: [],
    retailerCategories: [],
    allCategories: []
};

/* Reducer for invoices */
export default function masterReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_STATE_INITIATE:
        case GET_CITIES_INITIATE:
        case GET_DISTRICT_INITIATE:
        case GET_ALL_CATEGORIES_INITIATE:
        case GET_USER_BY_ROLE_INITIATE:
        case GET_RETAILER_CATEGORIES_INITIATE:
            return { ...state, loading: true };
        case GET_STATE_SUCCESS:
            return { ...state, loading: false, states: action.payload };
        case GET_CITIES_SUCCESS:
            return { ...state, loading: false, cities: action.payload };
        case GET_DISTRICT_SUCCESS:
            return { ...state, loading: false, districts: action.payload };
        case GET_RETAILER_DATA_SUCCESS:
            return { ...state, loading: false, retailerList: action.payload };
        case GET_RETAILER_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                retailerCategories: action.payload
            };
        case GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                allCategories: action.payload
            };
        case GET_DSP_DATA_SUCCESS:
            return { ...state, loading: false, dspList: action.payload };

        case FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}
