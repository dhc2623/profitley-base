import { Typography } from 'antd';
import { Fragment, useEffect } from 'react';
import { USER_ROLES } from '../../config/Constant';
import { formatToCurrency } from '../../helper/Utils';
import { langs } from '../../localization';
import Panel, { PanelTitle } from '../common/panel';

const { Title, Text } = Typography;
const SalesOrdersSummary = ({
    totalAmount = 0,
    totalOrders = 0,
    directAmount = 0,
    directOrders = 0,
    spAmount = 0,
    spOrders = 0,
    sellerAmount = 0,
    sellerOrders = 0,
    rolesOrder = false,
    userDetail
}) => {
    useEffect(() => { }, []);

    return (
        <Panel>
            <PanelTitle
                title={langs.labels.salesAndOrders}
                className="uppercase"
                avatar={<img className="m-t5" src={'/assets/images/svg/sale-order.svg'} alt="" />}
            />
            <div className="two-col-row">
                <div className="col">
                    <Title level={4} strong className="m-b0 text-orange">
                        {formatToCurrency(totalAmount)}
                    </Title>
                    <Text className="label">{langs.labels.totalSales}</Text>
                </div>
                <div className="col">
                    <Title level={4} strong className="m-b0">
                        {totalOrders}
                    </Title>
                    <Text className="label">{langs.labels.totalOrders}</Text>
                </div>
            </div>
            {!rolesOrder && (
                <div className="col-row">
                    <div className="col">
                        <Title level={5} strong className="m-b0">
                            {formatToCurrency(directAmount)}
                        </Title>
                        <Text className="label">{langs.labels.byBuyers}</Text>
                        <Title level={5} strong className="m-t0">
                            {directOrders}
                        </Title>
                    </div>
                    {userDetail.role.name === USER_ROLES.DSP.name && (
                        <Fragment>
                            <div className="col">
                                <Title level={5} strong className="m-b0">
                                    {formatToCurrency(sellerAmount)}
                                </Title>
                                <Text className="label">{langs.labels.bySeller}</Text>
                                <Title level={5} strong className="m-t0">
                                    {sellerOrders}
                                </Title>
                            </div>
                            <div className="col">
                                <Title level={5} strong className="m-b0">
                                    {formatToCurrency(spAmount)}
                                </Title>
                                <Text className="label">{langs.labels.byMe}</Text>
                                <Title level={5} strong className="m-t0">
                                    {spOrders}
                                </Title>
                            </div>
                        </Fragment>
                    )}
                    {(userDetail.role.name === USER_ROLES.SELLER.name || userDetail.role.name === USER_ROLES.OWNER.name) && (
                        <Fragment>
                            <div className="col">
                                <Title level={5} strong className="m-b0">
                                    {formatToCurrency(spAmount)}
                                </Title>
                                <Text className="label">{langs.labels.bySalesPerson}</Text>
                                <Title level={5} strong className="m-t0">
                                    {spOrders}
                                </Title>
                            </div>
                            <div className="col">
                                <Title level={5} strong className="m-b0">
                                    {formatToCurrency(sellerAmount)}
                                </Title>
                                <Text className="label">{langs.labels.byMe}</Text>
                                <Title level={5} strong className="m-t0">
                                    {sellerOrders}
                                </Title>
                            </div>
                        </Fragment>
                    )}

                </div>
            )}
        </Panel>
    );
};

export default SalesOrdersSummary;
