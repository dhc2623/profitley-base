import React, { useEffect, useState } from 'react';
import { CollapsePanelContext } from '../../../contexts/collapsePanelContext';

const CollapsePanel = (props) => {
    const [activeKey, setActiveKey] = useState([props.defaultActiveKey]);
    useEffect(() => {

    }, []);

    const onChange = (item) => {
        const arr = activeKey.includes(item)
            ? activeKey.filter((i) => i !== item) // remove item
            : [...activeKey, item]; // add item
        setActiveKey(arr);
    };

    const isActive = (item) => activeKey.includes(item);

    return (
        <CollapsePanelContext.Provider value={{ activeKey, onChange, isActive }}>
            {props.children}
        </CollapsePanelContext.Provider>
    );
};
export default CollapsePanel;
