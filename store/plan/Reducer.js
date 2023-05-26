import { paginationMeta } from '../../config/Constant';
import {
    GET_VISITS_INITIATE,
    GET_VISITS_SUCCESS,
    GET_VISITS_FAILURE,
    UNAPPROVED_VISITS_INITIATE,
    UNAPPROVED_VISITS_SUCCESS,
    UNAPPROVED_VISITS_FAILURE,
    POST_VISITS_INITIATE,
    POST_VISITS_SUCCESS,
    POST_VISITS_FAILURE,
    CHECK_IN_INITIATE,
    CHECK_IN_SUCCESS,
    CHECK_IN_FAILURE,
    CHECK_OUT_INITIATE,
    CHECK_OUT_SUCCESS,
    CHECK_OUT_FAILURE,
    CANCEL_VISITS_INITIATE,
    CANCEL_VISITS_SUCCESS,
    CANCEL_VISITS_FAILURE,
    VISIT_DATE_SUCCESS,
    DATE_POPUP_VISIBILE,
    SELECTED_RETAILER,
    RE_SCHEDULE_INITIATE,
    RE_SCHEDULE_SUCCESS,
    RE_SCHEDULE_FAILURE
} from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    visitList: [],
    vistMeta: 0,
    visitDate: '',
    selectDatePopup: false,
    selectedRetailer: {},
    planCelebrationCount: 0,
    unapprovedVisitList: [],
    unapprovedVistMeta: paginationMeta
};

/* Reducer for invoices */
export default function invoiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case DATE_POPUP_VISIBILE:
            return { ...state, loading: true, selectDatePopup: action.payload };
        case SELECTED_RETAILER:
            return { ...state, loading: true, selectedRetailer: action.payload };
        case GET_VISITS_INITIATE:
        case UNAPPROVED_VISITS_INITIATE:
        case POST_VISITS_INITIATE:
        case CHECK_IN_INITIATE:
        case CHECK_OUT_INITIATE:
        case CANCEL_VISITS_INITIATE:
        case RE_SCHEDULE_INITIATE:
            return { ...state, loading: true };

        case GET_VISITS_SUCCESS:
            return {
                ...state,
                loading: false,
                visitList: action.payload.data,
                vistMeta: action.payload.count === 0 ? [] : ['x'],
            };
        case UNAPPROVED_VISITS_SUCCESS:
            return {
                ...state,
                loading: false,
                unapprovedVisitList: action.payload.data,
                unapprovedVistMeta: action.payload.meta
            };
        case VISIT_DATE_SUCCESS:
            return { ...state, loading: false, visitDate: action.payload };
        // case CANCEL_VISITS_SUCCESS:
        case POST_VISITS_SUCCESS:
            return {
                ...state,
                planCelebrationCount: state.planCelebrationCount + 1
            };
        // case CHECK_OUT_SUCCESS:
        // case CHECK_IN_SUCCESS:
        //     return { ...state, loading: false };

        case RE_SCHEDULE_SUCCESS:
            return {
                ...state,
                planCelebrationCount: state.planCelebrationCount + 1,
                loading: false
            };
        case RE_SCHEDULE_FAILURE:
        case GET_VISITS_FAILURE:
        case UNAPPROVED_VISITS_FAILURE:
        case POST_VISITS_FAILURE:
        case CHECK_IN_FAILURE:
        case CHECK_OUT_FAILURE:
        case CANCEL_VISITS_FAILURE:
            return { ...state, loading: false, };
        default:
            return state;
    }
}
