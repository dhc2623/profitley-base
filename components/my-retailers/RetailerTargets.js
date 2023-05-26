import { Typography } from 'antd';
import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import { formatToCurrency } from '../../helper/Utils';
import Panel, { PanelRowItem, PanelSeparator, PanelTitle } from '../common/panel';

const { Title, Text } = Typography;
const RetailerTargets = ({ userName, target }) => {
    useEffect(() => {}, []);

    return (
        <div className="section-dsp-tar">
            <Title level={4} className={'db-title'}>
                My Target vs Achievement
            </Title>
            <Panel className={'db-buyer-sp'}>
                {/* <PanelTitle
                    title={userName}
                    avatar={
                        <span className="icon rounded">
                            <img src={'/assets/images/seller-img.jpg'} alt="" />
                        </span>
                    }
                    headerRight={<img src={'/assets/images/svg/arrow-red-icon.svg'} alt="" />}
                /> */}
                <div className="col-row">
                    <div className="col">
                        <Title level={5} strong className="m-b0">
                            {formatToCurrency(target.total_sales)}
                        </Title>
                        <Text className="label">Sales</Text>
                        <Title level={5} strong className="m-t0">
                            {formatToCurrency(target.achivedSales)}
                        </Title>
                    </div>
                    <div className="col">
                        <Title level={5} strong className="m-b0">
                            {target.total_orders}
                        </Title>
                        <Text className="label">Orders</Text>
                        <Title level={5} strong className="m-t0">
                            {target.achivedOrders}
                        </Title>
                    </div>
                    <div className="col">
                        <Title level={5} strong className="m-b0">
                            {target.total_line_items}
                        </Title>
                        <Text className="label">Line Items</Text>
                        <Title level={5} strong className="m-t0">
                            {target.achivedItems}
                        </Title>
                    </div>
                </div>
            </Panel>
        </div>
    );
};

export default RetailerTargets;
