export const UPDATE_FILTRES = 'UPDATE_FILTRES';
export const UPDATE_FILTRES_SUCCESS = 'UPDATE_FILTRES_SUCCESS';

export const updateFilter = (filterName, filter) => ({
    type: UPDATE_FILTRES,
    payload: filter,
    filterName
});

export const updateFilterSuccess = (filterName, filter) => ({
    type: UPDATE_FILTRES_SUCCESS,
    payload: filter,
    filterName
});
