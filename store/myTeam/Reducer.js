import { paginationMeta } from '../../config/Constant';
import {
    ASSIGN_RETAILER_TO_DSP_INITIATE,
    ASSIGN_RETAILER_TO_DSP_SUCCESS,
    ASSIGN_RETAILER_TO_DSP_FAILURE,
    GET_DSP_LIST_INITIATE,
    GET_DSP_LIST_SUCCESS,
    GET_DSP_LIST_FAILURE,
    GET_DSP_DETAILS_INITIATE,
    GET_DSP_DETAILS_SUCCESS,
    GET_DSP_DETAILS_FAILURE,
    CHANGE_STATUS_INITIATE,
    CHANGE_STATUS_SUCCESS,
    CHANGE_STATUS_FAILURE,
    GET_DSP_INSIGHTS_INITIATE,
    GET_DSP_INSIGHTS_SUCCESS,
    GET_DSP_INSIGHTS_FAILURE
} from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    dspList: [],
    dspListMeta: paginationMeta,
    dspDetails: {},
    dspInsights: {
        user: {},
        visits: {
            cancelledOnFieldVisits: "0",
            completedOnFieldVisits: "0",
            fullDayOffs: "0",
            halfDayOffs: "0",
            ho: "0",
            holidays: "0",
            nonProductive: 0,
            onfield_buyers: '',
            onfield_dates: '',
            pendingOnFieldVisits: "0",
            productive: 0,
            totalOffFieldVisits: "0",
            totalOnFieldVisits: "0",
            totalVisits: 0,
        }
    }
};

/* Reducer for invoices */
export default function retailerReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ASSIGN_RETAILER_TO_DSP_INITIATE:
        case GET_DSP_DETAILS_INITIATE:
        case GET_DSP_LIST_INITIATE:
        case GET_DSP_INSIGHTS_INITIATE:
        case CHANGE_STATUS_INITIATE:
            return { ...state, loading: true };
        case GET_DSP_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                dspList: action.payload.data,
                dspListMeta: action.payload.meta
            };
        case GET_DSP_DETAILS_SUCCESS:
            return { ...state, loading: false, dspDetails: action.payload };
        case GET_DSP_INSIGHTS_SUCCESS:
            return {
                ...state,
                loading: false,
                dspInsights: action.payload
            };
        case ASSIGN_RETAILER_TO_DSP_SUCCESS:
            return { ...state, loading: false };
        case CHANGE_STATUS_SUCCESS:
            let list = [...state.dspList];
            list.map((dsp) => {
                if (dsp.id == action.payload.user_id) {
                    dsp.status = action.payload.status;
                }
            });
            return { ...state, loading: false, dspList: list };
        case ASSIGN_RETAILER_TO_DSP_FAILURE:
        case CHANGE_STATUS_FAILURE:
        case GET_DSP_DETAILS_FAILURE:
        case GET_DSP_INSIGHTS_FAILURE:
        case GET_DSP_LIST_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}
