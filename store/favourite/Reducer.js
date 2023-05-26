import { logout } from '../../helper/AuthActions';
import {
    SET_FAV_LIST,
    GET_FAV_LIST_INITIATE,
    GET_FAV_LIST_FAILURE,
    GET_FAV_LIST_SUCCESS,
    ADD_TO_FAVOURITE_INITIATE,
    ADD_TO_FAVOURITE_SUCCESS,
    ADD_TO_FAVOURITE_FAILURE,
    REMOVE_FROM_FAVOURITE_INITIATE,
    REMOVE_FROM_FAVOURITE_SUCCESS,
    REMOVE_FROM_FAVOURITE_FAILURE
} from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    favouriteIds: [],
    favourite: []
};

/* Reducer for invoices */
export default function invoiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_FAV_LIST:
            return { ...state, loading: false, favouriteIds: action.payload };
        case GET_FAV_LIST_INITIATE:
        case REMOVE_FROM_FAVOURITE_INITIATE:
        case ADD_TO_FAVOURITE_INITIATE:
            return { ...state, loading: true };
        case GET_FAV_LIST_SUCCESS:
            return { ...state, loading: false, favourite: action.payload };
        case REMOVE_FROM_FAVOURITE_SUCCESS:
            let favouriteListItems = [...state.favourite];
            let ids = [...state.favouriteIds];
            state.favourite.map((item, index) => {
                if (item.id == action.params) {
                    favouriteListItems.splice(index, 1);
                }
            });
            state.favouriteIds.map((item, index) => {
                if (item == action.params) {
                    ids.splice(index, 1);
                }
            });
            return { ...state, loading: false, favourite: favouriteListItems, favouriteIds: ids };
        case ADD_TO_FAVOURITE_SUCCESS:
            return {
                ...state,
                loading: false,
                favouriteIds: action.payload
            };
        case GET_FAV_LIST_FAILURE:
        case ADD_TO_FAVOURITE_FAILURE:
        case REMOVE_FROM_FAVOURITE_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}
