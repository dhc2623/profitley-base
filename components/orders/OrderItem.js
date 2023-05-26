import { WhatsAppOutlined, FilePdfOutlined, PrinterOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import Link from 'next/link';
import React, { Fragment } from 'react';
import { SERVER_URL } from '../../config/Constant';
import {
    formatToCurrency,
    getDate,
    getDateWithTime,
    getStatusColor,
    
    whatsAppURL
} from '../../helper/Utils';
import { langs } from '../../localization';
import Panel, { PanelRowItem, PanelSeparator, PanelTitle } from '../common/panel';
const { Text } = Typography;

const gridStyle = {
    width: '33.33%',
    textAlign: 'center',
    padding: '15px 10px'
};

//{{domain}}/marketplace/orders/my-orders

const ProductItem = ({ order, print }) => {
    const {
        order_number,
        status,
        created_at,
        items = '4',
        amount,
        shop_name,
        created_by_name,
        user_mobile,
        pdfUrl
    } = order;

   
    return (
        <Panel>
            <PanelTitle
                title={
                    order_number && (
                        // <Descriptions>
                        // 	<Descriptions.Item
                        // 		className={"p-b0"}
                        // 	>
                        <Link
                            href={`/orders/order-details/[orderId]`}
                            as={`/orders/order-details/${order.id}`}>
                            <a>{order_number}</a>
                        </Link>
                        // 	</Descriptions.Item>
                        // </Descriptions>
                    )
                }
                status={status}
                statusBackground={getStatusColor(status)}
                headerRight={
                    <Fragment>
                        <a
                            href={`${SERVER_URL}/ecommerce/orders/print-order/${order.id}`}
                            className="pdf-download-icon"
                            target={'_blank'}>
                            <Typography.Text
                                // type={'danger'}
                                strong
                                className={'action-date'}>
                                <FilePdfOutlined
                                    className={'p-t0 p-l10'}
                                    style={{ fontSize: 20, color: '#ff8000' }}
                                />{' '}
                            </Typography.Text>
                        </a>

                        <a
                            href={whatsAppURL(
                                user_mobile,
                                `*${langs.labels.orderDetails}* 
                            %0a ${langs.labels.orderNumber}: ${order_number} 
                            %0a ${langs.labels.orderAmount}: ${formatToCurrency(amount)} 
                            %0a ${langs.labels.orderDate}: ${getDate(created_at)}
                            %0a ${langs.labels.noOfItems}: ${items.length}`
                            )}
                            target={'_blank'}>
                            <WhatsAppOutlined
                                className={'m-l10 p-t0'}
                                style={{ fontSize: 24, color: '#32c971' }}
                            />
                        </a>
                    </Fragment>
                }
            />

            <PanelSeparator
                list={[
                    {
                        label: `${langs.labels.orderDate}`,
                        value: created_at ? `${getDate(created_at)}` : 'NA'
                    },
                    {
                        label: `${langs.labels.noOfItems}`,
                        value: items.length ? `${items.length}` : 'NA'
                    },
                    {
                        label: `${langs.labels.totalValue}`,
                        value: (
                            <Text type="success">
                                {amount ? `${formatToCurrency(amount)}` : '0.00'}
                            </Text>
                        )
                    }
                ]}
            />
            <PanelRowItem label={langs.labels.buyer} value={<strong>{shop_name}</strong>} />
            <PanelRowItem
                label={langs.labels.placedBy}
                value={<strong>{created_by_name}</strong>}
            />
        </Panel>
    );
};
export default ProductItem;
