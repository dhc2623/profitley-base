import { Typography } from 'antd';
import { useEffect } from 'react';
import { formatToCurrency } from '../../helper/Utils';
import { langs } from '../../localization';
import Panel, { PanelTitle } from '../common/panel';

const { Title, Text } = Typography;
const SalesPerson = ({
    totalDsp = 0,
    dspOrderAmount = 0,
    zeroBillingDsp = 0,
    averageDspOrder = 0,
    targetsAchieved = 0,
    targetsFailed = 0,
    totalOrders = 0,
    typeSummary = false
}) => {
    useEffect(() => {}, []);

    return (
        <Panel className={'db-buyer-sp'}>
            <PanelTitle
                title={langs.labels.dsp}
                className="uppercase"
                headerRight={!typeSummary && <span className="text-orange">{totalDsp}</span>}
                avatar={<img className="m-t5" src={'/assets/images/svg/sale-order.svg'} alt="" />}
            />
            <div className="two-col-row">
                <div className="col">
                    <Title level={5} strong className="m-b0">
                        {formatToCurrency(dspOrderAmount)}
                    </Title>
                    <Text className="label">{langs.labels.sales}</Text>
                </div>
                {typeSummary ? (
                    <div className="col">
                        <Title level={5} strong className="m-b0">
                            {totalOrders}
                        </Title>
                        <Text className="label">{langs.labels.totalOrders}</Text>
                    </div>
                ) : (
                    <div className="col">
                        <Title level={5} strong className="m-b0">
                            {zeroBillingDsp}
                        </Title>
                        <Text className="label">{langs.labels.zeroBilling}</Text>
                    </div>
                )}
            </div>
            <div className="blue-box">
                <Title level={5} className="m-b0">
                    {langs.labels.averageOrderDsp}
                </Title>
                <Title level={5} strong className="m-t0 m-b0">
                    {formatToCurrency(averageDspOrder)}
                </Title>
            </div>
            {!typeSummary && (
                <div className="two-col-row">
                    <div className="col">
                        <Title level={5} strong className="m-b0">
                            {targetsAchieved}
                        </Title>
                        <Text className="label">{langs.labels.targetAchieved}</Text>
                    </div>
                    <div className="col">
                        <Title level={5} strong className="m-b0">
                            {targetsFailed}
                        </Title>
                        <Text className="label">{langs.labels.targetFailed}</Text>
                    </div>
                </div>
            )}
        </Panel>
    );
};

export default SalesPerson;
