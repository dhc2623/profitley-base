import { Typography } from 'antd';
import { useEffect } from 'react';
import { formatToCurrency } from '../../helper/Utils';
import Panel, { PanelTitle, PanelRowItem } from '../common/panel';

const { Title, Text } = Typography;
const PaymentBlock = ({
    title = '',
    labelOne = '',
    valueOne = '',
    labelTwo = '',
    valueTwo = '',
    labelThree = '',
    valueThree = '',
}) => {
    useEffect(() => { }, []);

    return (
        <Panel>
            <PanelTitle
                title={title}
                className={'uppercase'}
                avatar={<img className="m-t5" src={'/assets/images/svg/sale-order.svg'} alt="" />}
            />
            <PanelRowItem
                label={labelOne}
                value={<Text strong>{valueOne}</Text>}
            />
            <PanelRowItem
                label={labelTwo}
                value={<Text strong>{valueTwo}</Text>}
            />
            <PanelRowItem
                label={labelThree}
                value={<Text strong>{valueThree}</Text>}
            />
        </Panel>
    );
};

export default PaymentBlock;
