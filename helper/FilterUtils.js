import _ from 'lodash';
export const getFilterVal = (data) => {
    try {
        return data && decodeURI(data).split('__')[0];
    } catch {
        return data;
    }
};
export const getFilterLabel = (data) =>
    data && _.includes(data, '__') ? decodeURI(data).split('__')[1] : data;
export const setFilterVal = (val, label) => encodeURI(`${val}__${label}`);

export const removeLabelFromFilterObj = (data) => {
    const newData = data;
    _.each(data, (value, key) => {
        if (_.isArray(value)) {
            newData[key] = value.map((item) => getFilterVal(item));
        } else if (_.isString(value)) {
            newData[key] = getFilterVal(value);
        }
    });
    return newData;
};
