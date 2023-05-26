import { Tag } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import _ from 'lodash';
import { getFilterLabel } from '../../../helper/FilterUtils';

const removeKeys = ['page', 'sort', 'gridStyle','listType'];

const FilterTags = ({ filterTagPage = '' }) => {
    const router = useRouter();
    const filter = router.query;

    useEffect(() => {}, [router.asPath]);

    const handleRemove = (key, val = '') => {
        const newFilter = router.query;
        if (val) {
            const updateVal = _.remove(newFilter[key], (item) => item !== val);
            newFilter[key] = updateVal;
        } else {
            delete newFilter[key];
        }
        newFilter.page = 1;
        router.push({
            pathname: filterTagPage ? filterTagPage : '/shop/products',
            query: newFilter
        });
    };

    return _.map(filter, (value, key) => {
        if (!_.includes(removeKeys, key)) {
            if (_.isArray(value)) {
                return _.map(value, (item) => (
                    <Tag key={item} closable visible={true} onClose={() => handleRemove(key, item)}>
                        {getFilterLabel(item)}
                    </Tag>
                ));
            } else {
                return (
                    <Tag key={key} closable visible={true} onClose={() => handleRemove(key)}>
                        {getFilterLabel(value)}
                    </Tag>
                );
            }
        }
    });
};
export default FilterTags;
