import React from 'react';
import { NOTIFICATION_TYPE } from '../../config/Constant';
import { showNotification } from '../../helper/Utils';

const Qty = ({
    count,
    setCount,
    maxQuantity = 10000000000,
    moq,
    setActiveUpdateButton = '',
    disabledInput,
    size
}) => {
    const moqQTY = moq;
    const countQTY = count;
    const setMinusCount = () => {
        setCount(countQTY - 1);
    };

    const setPlusCount = () => {
        setCount(countQTY + 1);
        if(isNaN(countQTY) || countQTY == 0){
            const countQTY = moqQTY;
            setCount(countQTY);
        }
    };

    const handleInputChange = (val) => {
        if (val > maxQuantity) {
            showNotification(NOTIFICATION_TYPE.WARNING, 'You have reached maximum quantity.');
            setCount(maxQuantity);
        } else {
            // if (val < moqQTY) {
            //     setCount(moqQTY);
            // } else {
            //     val ? setCount(parseInt(val)) : setCount(moqQTY);
            // }
            setCount(parseInt(val))
        }
    };

    return (
        <div className="qty-box">
            <button
                type="button"
                onClick={setMinusCount}
                className="qty-button increase"
                disabled={countQTY <= moqQTY}>
                <img
                    src="https://d8sx2zg51gh7b.cloudfront.net/static/media/minus-icon.9323747c.svg"
                    alt="Minus Icon"
                />
            </button>
            <input
                type={'number'}
                className={'qty'}
                disabled={disabledInput}
                value={countQTY ? parseInt(countQTY) : ''}
                onChange={(e) => handleInputChange(e.target.value)}
                min={moqQTY}
                max={maxQuantity}
            />
            <button
                type="button"
                className="qty-button decrease"
                onClick={setPlusCount}
                disabled={countQTY >= maxQuantity}>
                <img
                    src="https://d8sx2zg51gh7b.cloudfront.net/static/media/plus-icon.483f5628.svg"
                    alt="Plus Icon"
                />
            </button>
        </div>
    );
};

export default Qty;
