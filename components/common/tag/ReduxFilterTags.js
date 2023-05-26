import { Tag } from 'antd';
import { useEffect } from 'react';
import _ from 'lodash';
import { getFilterLabel } from '../../../helper/FilterUtils';

const removeKeys = ['page', 'sort', 'gridStyle', 'loading'];

const ReduxFilterTags = ({ setPageQuery = '', pageQuery = {} }) => {
    const filter = pageQuery;

    useEffect(() => {
    }, [pageQuery]);

    const handleRemove = (key) => {
        const newFilter = pageQuery;
        delete newFilter[key];
        newFilter.page = 1;
        setPageQuery({ ...newFilter });
    };

    return _.map(filter, (value, key) => {
        if (!_.includes(removeKeys, key)) {
            if (_.isArray(value)) {
                return _.map(value, (item) => (
                    <Tag key={item} closable visible={true} onClose={() => handleRemove(key)}>
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
export default ReduxFilterTags;
