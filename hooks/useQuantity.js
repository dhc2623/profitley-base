import React, { useState, useEffect } from 'react';
import { getProductInfo } from '../helper/Utils';

const useQuantity = (product) => {
    const { count, moq, max, inventory, inventory_value } = getProductInfo(product);
    const [val, setVal] = useState();
    const [moqVal, setMoqVal] = useState();
    const [maxQtyVal, setMaxQtyVal] = useState();
    const [metaData, setMetaData] = useState({});

    const [inventoryValidation, setInventoryValidation] = useState();
    const [validation, setValidation] = useState(true);

    useEffect(() => {
        setVal(count);
        setMoqVal(moq);
        setMaxQtyVal(max);
        setMetaData({inventory, inventory_value})
        
    }, [count, moq, max, inventory, inventory_value]);

    useEffect(() => {
        const countQty = parseFloat(val);
        const moqQty = parseFloat(moqVal);
        const maxQty = parseFloat(maxQtyVal);
        const inventoryCheck = inventory;
        const inventoryValueCheck = inventory_value != null ? parseFloat(inventory_value) : 0;

        if (!isNaN(countQty) && !isNaN(moqQty)) {
            if (Number.isInteger(countQty)) {
                if (countQty < 1 || countQty < moqVal || countQty > maxQty) {
                    setValidation(true);
                    setInventoryValidation(false);
                } else {
                    if(inventoryCheck == 'finite' && countQty > inventoryValueCheck){
                        setValidation(true);
                        setInventoryValidation(true);
                    }else{
                        setValidation(false);
                        setInventoryValidation(false);
                    }
                }
            } else {
                setValidation(true);
                setInventoryValidation(false);
            }
        } else {
            setValidation(true);
            setInventoryValidation(false);
            // setVal(moqVal);
        }
    }, [val, moqVal, metaData]);

    useEffect(() => { setVal(moq); }, [])

    return [val, setVal, validation, inventoryValidation];
};
export default useQuantity;
