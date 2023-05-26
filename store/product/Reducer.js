import {
    GET_PRODUCTS_LIST_INITIATE,
    GET_PRODUCTS_LIST_FAILURE,
    GET_PRODUCTS_LIST_SUCCESS,
    GET_PRODUCT_DETAILS_INITIATE,
    GET_PRODUCT_DETAILS_SUCCESS,
    GET_PRODUCT_DETAILS_FAILURE,
    GET_PRODUCTS_META_LIST_INITIATE,
    GET_PRODUCTS_META_LIST_FAILURE,
    GET_PRODUCTS_META_LIST_SUCCESS,
    GET_PRODUCTS_LIST_NEXT_PAGE,
    QUICK_VIEW_INITIATE,
    QUICK_VIEW_SUCCESS
} from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    metaLoading: false,
    metaData: {
        brands: [],
        models: [],
        categories: [],
        segments: [],
        manufacturers: [],
        tags: []
    },
    productList: [],
    productListMeta: {
        pagination: {
            total: 0,
            count: 0,
            per_page: 0,
            current_page: 1,
            total_pages: 1,
            links: {}
        }
    },
    productDetails: {
        price: '0',
        image: '',
        brands: [],
        models: [],
        categories: []
    },
    quickView: {
        id: undefined,
        visibility: false
    }
};

/* Reducer for invoices */
export default function invoiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_PRODUCTS_LIST_INITIATE:
            return { ...state, loading: true };
        case GET_PRODUCTS_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                productList: action.payload.success.data,
                productListMeta: action.payload.success.meta
            };
        case GET_PRODUCTS_LIST_NEXT_PAGE:
            return {
                ...state,
                loading: false,
                productList: action.payload.success.data,
                productListMeta: action.payload.success.meta
            };
        case GET_PRODUCTS_LIST_FAILURE:
            return { ...state, loading: false };
        case GET_PRODUCT_DETAILS_INITIATE:
            return { ...state, productDetails: INITIAL_STATE.productDetails, loading: true };
        case GET_PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                productDetails: action.payload.success.data
            };
        case GET_PRODUCT_DETAILS_FAILURE:
            return { ...state, loading: false };
        case GET_PRODUCTS_META_LIST_INITIATE:
            return { ...state, metaLoading: true };
        case GET_PRODUCTS_META_LIST_SUCCESS:
            console.log('action.payload', action.payload.categoriesData.success.data)
            return {
                ...state,
                metaLoading: false,
                metaData: {
                    brands: action.payload.brandsData.success.data,
                    models: action.payload.modelsData.success.data,
                    categories: action.payload.categoriesData.success.data,
                    segments: action.payload.segmentsData.success.data,
                    manufacturers: action.payload.manufacturersData.success.data
                }
            };
        case GET_PRODUCTS_META_LIST_FAILURE:
            return { ...state, metaLoading: false };
        case QUICK_VIEW_INITIATE:
            return {
                ...state,
                quickView: {
                    id: undefined,
                    visibility: false
                }
            };
        case QUICK_VIEW_SUCCESS:
            return {
                ...state,
                quickView: {
                    id: action.payload.id,
                    visibility: action.payload.visibility
                }
            };
        default:
            return state;
    }
}
