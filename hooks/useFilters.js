import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../store/storeFilter/Action';

const useFilters = (filterName) => {
    const [filter, setFilter] = useState({ loading: false });
    const filterStroe = useSelector((state) => state.storeFilter);
    const dispatch = useDispatch();

    useEffect(() => {
        const filterStroed = filterStroe[filterName] ? filterStroe[filterName] : {};
        const newFilter = { ...filterStroed, ...filter };
        dispatch(updateFilter(filterName, newFilter));
    }, [filter]);

    return [filter, setFilter];
};
export default useFilters;
