import {
    GET_CATEGORIES_LIST_INITIATE,
    GET_CATEGORIES_LIST_FAILURE,
    GET_CATEGORIES_LIST_SUCCESS,
    GET_PARENT_CATEGORIES_INITIATE,
    GET_PARENT_CATEGORIES_SUCCESS,
    GET_PARENT_CATEGORIES_FAILURE,
    GET_SUB_CATEGORIES_INITIATE,
    GET_SUB_CATEGORIES_SUCCESS,
    GET_SUB_CATEGORIES_FAILURE
} from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    categoryList: [],
    categoryListMeta: {
        pagination: {
            total: 0,
            count: 0,
            per_page: 0,
            current_page: 1,
            total_pages: 1,
            links: {}
        }
    },
    parentCategories: [],
    subCategories: []
};

/* Reducer for invoices */
export default function invoiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_CATEGORIES_LIST_INITIATE:
        case GET_PARENT_CATEGORIES_INITIATE:
        case GET_SUB_CATEGORIES_INITIATE:
            return { ...state, loading: true };
        case GET_CATEGORIES_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                categoryList: action.payload.success.data,
                categoryListMeta: action.payload.success.meta
            };
        case GET_PARENT_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                parentCategories: action.payload.success.data,
                categoryListMeta: action.payload.success.meta
            };
        case GET_SUB_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                subCategories: action.payload.success.data,
                categoryListMeta: action.payload.success.meta
            };
        case GET_CATEGORIES_LIST_FAILURE:
        case GET_PARENT_CATEGORIES_FAILURE:
        case GET_SUB_CATEGORIES_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}
