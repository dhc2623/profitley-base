export const SET_CHILD = 'SET_CHILD';
export const SET_SELECTED_RETAILER = 'SET_SELECTED_RETAILER';

export const setChild = (params) => ({
    type: SET_CHILD,
    params
});

export const setSelectedRetailerId = (params) => ({
    type: SET_SELECTED_RETAILER,
    params
});
