import { UPDATE_CURRENT_USER, GET_CURRENT_USER, UPDATE_CURRENT_USER_FAVOURITE } from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: false,
    about: null,
    card_brand: null,
    card_last_four: null,
    cartId: '',
    confirmed: true,
    created_at: '',
    email: '',
    expires_at: '',
    full_name: '',
    gateway: null,
    id: null,
    integration_id: null,
    job_title: null,
    last_name: '',
    name: '',
    payment_method_token: null,
    phone_country_code: '',
    phone_number: '',
    picture: '',
    picture_thumb: '',
    role: {},
    updated_at: '',
    favouriteListIds: []
};

/* Reducer for invoices */
export default function currentUser(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_CURRENT_USER:
            return { ...state, loading: true };
        case UPDATE_CURRENT_USER:
            return { ...state, loading: true, ...action.payload };
        default:
            return state;
    }
}
