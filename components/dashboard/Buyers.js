import { Typography } from 'antd';
import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import { formatToCurrency } from '../../helper/Utils';
import { langs } from '../../localization';
import Panel, { PanelRowItem, PanelSeparator, PanelTitle } from '../common/panel';

const { Title, Text } = Typography;
const Buyers = ({
    totalBuyers = 0,
    buyerOrderAmount = 0,
    zeroBillingBuyer = 0,
    averageBuyerOrder = 0,
    categoryBuyers = [],
    newTodayRetailers = 0,
    newWeekRetailers = 0,
    newMonthRetailers = 0,
    newRegistrations = 0,
    totalOrders = 0,
    typeSummary = false
}) => {
    useEffect(() => {}, []);

    return (
        <Panel className={'db-buyer-sp'}>
            <PanelTitle
                title={langs.labels.buyers}
                className={'uppercase'}
                headerRight={
                    !typeSummary && <span className="text-orange">{totalBuyers}</span>
                }
                avatar={<img className="m-t5" src={'/assets/images/svg/sale-order.svg'} alt="" />}
            />
            <div className="two-col-row">
                <div className="col">
                    <Title level={5} strong className="m-b0">
                        {formatToCurrency(buyerOrderAmount)}
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
                            {zeroBillingBuyer}
                        </Title>
                        <Text className="label">{langs.labels.zeroBilling}</Text>
                    </div>
                )}
            </div>
            <div className="blue-box">
                <Title level={5} className="m-b0">
                    {langs.labels.averageOrderBuyer}
                </Title>
                <Title level={5} strong className="m-t0 m-b0">
                    {formatToCurrency(averageBuyerOrder)}
                </Title>
            </div>

            {typeSummary ? (
                <PanelRowItem label={langs.labels.newRegistrations} value={newRegistrations} />
            ) : (
                <Fragment>
                    <PanelRowItem
                        label={langs.labels.categoryWiseBuyers}
                        value={
                            <Link href={'/my-retailers'}>
                                <a>{langs.labels.viewAll}</a>
                            </Link>
                        }
                    />
                    <PanelSeparator
                        list={categoryBuyers}
                        keyFilter={(item) => ({
                            label: item.category,
                            value: item.count
                        })}
                    />
                    <div className="blue-box">
                        <Title level={5} className="m-b0">
                            {langs.labels.newRegistrations}
                        </Title>
                    </div>
                    <PanelSeparator
                        list={[
                            {
                                label: `${langs.labels.today}`,
                                value: newTodayRetailers
                            },
                            {
                                label: `${langs.labels.thisWeek}`,
                                value: newWeekRetailers
                            },
                            {
                                label: `${langs.labels.thisMonth}`,
                                value: newMonthRetailers
                            }
                        ]}
                    />
                </Fragment>
            )}
        </Panel>
    );
};

export default Buyers;
