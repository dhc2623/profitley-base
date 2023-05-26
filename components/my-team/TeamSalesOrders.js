import { Typography } from 'antd';
import { useEffect } from 'react';
import { formatToCurrency } from '../../helper/Utils';
import { langs } from '../../localization';
import Panel, { PanelTitle } from '../common/panel';

const { Title, Text } = Typography;
const TeamSalesOrders = ({
    todayOrderAmount = 0,
    todayOrders = 0,
    weekOrderAmount = 0,
    weekOrders = 0,
    totalSales = 0,
    totalOrders = 0
}) => {
    useEffect(() => {}, []);

    return (
        <Panel>
            <PanelTitle
                title={langs.labels.salesAndOrders}
                avatar={<img className="m-t5" src={'/assets/images/svg/sale-order.svg'} alt="" />}
            />

            <div className="col-row custom-row">
                <div className="col">
                    <Title level={5} strong className="m-b0">
                        {formatToCurrency(todayOrderAmount)}
                    </Title>
                    <Text className="label">{langs.labels.today}</Text>
                    <Title level={5} strong className="m-t0">
                        {todayOrders}
                    </Title>
                </div>
                <div className="col">
                    <Title level={5} strong className="m-b0">
                        {formatToCurrency(weekOrderAmount)}
                    </Title>
                    <Text className="label">{langs.labels.thisWeek}</Text>
                    <Title level={5} strong className="m-t0">
                        {weekOrders}
                    </Title>
                </div>
                <div className="col">
                    <Title level={5} strong className="m-b0">
                        {formatToCurrency(totalSales)}
                    </Title>
                    <Text className="label">{langs.labels.thisMonth}</Text>
                    <Title level={5} strong className="m-t0">
                        {totalOrders}
                    </Title>
                </div>
            </div>
        </Panel>
    );
};

export default TeamSalesOrders;
