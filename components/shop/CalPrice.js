import { Fragment } from 'react';
import { formatToCurrency } from '../../helper/Utils';

const CalPrice = ({ price, count }) => {
    const pricex = parseFloat(price);
    return <Fragment>{formatToCurrency(pricex * count)}</Fragment>;
};

export default CalPrice;
