import { ME_INITIATE, ME_SUCCESS, ME_FAILURE } from './Action';

/** initialize the state */
export const INITIAL_STATE = {
    loading: true,
    profile: {
        organizations_count: 0,
        id: 0
    },
    distributorDetails: {},
    homeSettings: {},
    settings: {
        Ecommerce: [],
        General: []
    }
};

/* Reducer for invoices */
export default function invoiceReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ME_INITIATE:
            return { ...state, loading: true };
        case ME_SUCCESS:
            return {
                ...state,
                loading: false,
                profile: action.payload.user,
                distributorDetails: action.payload.organization,
                homeSettings: action.payload.homeSettings,
                settings: action.payload.settings,
                usersOrganizations: action.payload.usersOrganizations
            };
        case ME_FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}
