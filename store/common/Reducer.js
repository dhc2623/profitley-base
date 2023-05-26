import { SET_CHILD, SET_SELECTED_RETAILER } from './Action';
import { getDataInCookies } from '../../helper/Utils';
/** initialize the state */
export const INITIAL_STATE = {
    backButton: false,
    selectedRetailerId: getDataInCookies('selectedRetailer')
        ? getDataInCookies('selectedRetailer').id
        : 0
};

/* Reducer for invoices */
export default function commonReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_CHILD:
            return { backButton: action.params };
        case SET_SELECTED_RETAILER:
            return { selectedRetailerId: action.params };
        default:
            return state;
    }
}
