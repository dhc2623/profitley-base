import { Button } from 'antd';
import { useEffect } from 'react';

const ButtonWraper = (props) => {
    useEffect(() => { }, [])
    let defaultButton = '';
    if (props.size == undefined) {
        defaultButton = 'default-button-wrapper';
    }
    return (
        <Button
            {...props}
            className={` ${props.className ? props.className : ''} ${defaultButton}`}>
            {props.children}
        </Button>
    );
};

export default ButtonWraper;
