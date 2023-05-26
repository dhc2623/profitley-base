import { UPDATE_FILTRES, UPDATE_FILTRES_SUCCESS } from './Action';

/** Import constant */

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    filtersQuery: []
};

/* Reducer for invoices */
export default function storeFilterReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_FILTRES:
            return {
                ...state,
                loading: true
            };
        case UPDATE_FILTRES_SUCCESS:
            return {
                ...state,
                loading: false,
                [action.filterName]: action.payload
            };

        default:
            return state;
    }
}
