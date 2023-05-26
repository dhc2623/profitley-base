import { Typography } from 'antd';
import { useEffect } from 'react';
import Panel, { PanelBody } from '../common/panel';

const { Title, Text } = Typography;
const TeamStatistic = ({
    icon = '/assets/images/svg/notebook-icon.svg',
    color = '#FEEEF1',
    value = 0,
    label = ''
}) => {
    useEffect(() => { }, []);

    return (
        <Panel className="retailer-statistic p-t15 p-r15 p-b15 p-l15" >
            <span className="icon" style={{ backgroundColor: color }}>
                <img src={icon} alt="" />
            </span>

            <Title level={4} strong className="m-b0">
                {value}
            </Title>
            <Text className="label">{label}</Text>
        </Panel>
    );
};

export default TeamStatistic;
