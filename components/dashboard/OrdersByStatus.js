import { Typography } from 'antd';
import { Fragment, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { formatToCurrency } from '../../helper/Utils';
import Panel, { PanelHidden, PanelRowItem, PanelTitle } from '../common/panel';
import { langs } from '../../localization';
const CollapsePanel = dynamic(() => import('../common/collapsePanel'));
const { Title, Text } = Typography;
const OrdersByStatus = ({ listOrdersByStatus = {}, onclick = '', defaultActiveKey = '' }) => {
    useEffect(() => {}, []);
    return (
        <CollapsePanel defaultActiveKey={defaultActiveKey}>
            <Panel className={'dashboard-orders-by-status'}>
                <PanelTitle
                    title={langs.labels.ordersByStatus}
                    avatar={
                        <img className="m-t5" src={'/assets/images/svg/sale-order.svg'} alt="" />
                    }
                    collapseKey={'ordersByStatus'}
                    className="uppercase"
                />
                <PanelHidden collapseKey={'ordersByStatus'}>
                    {Object.keys(listOrdersByStatus).map((item, index) => (
                        <a
                            href={onclick + `?status=${item}`}
                            key={'ordersByStatus' + index}
                            className={onclick ? '' : 'eventnone'}>
                            <PanelRowItem
                                className={`status-${item}`}
                                label={item}
                                value={
                                    <Fragment>
                                        <Text className={'price'}>
                                            {formatToCurrency(listOrdersByStatus[item].amount)} /{' '}
                                        </Text>
                                        <Text className={'status'}>
                                            {' '}
                                            {listOrdersByStatus[item].orders}
                                        </Text>
                                    </Fragment>
                                }
                            />
                        </a>
                    ))}
                </PanelHidden>
            </Panel>
        </CollapsePanel>
    );
};
export default OrdersByStatus;
