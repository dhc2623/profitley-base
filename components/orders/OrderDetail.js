import React, { Fragment } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Descriptions, Typography, Collapse } from 'antd';
import { convertArrayToString, formatToCurrency } from '../../helper/Utils';
import { langs } from '../../localization';
const StatusTag = dynamic(() => import('../../components/common/tag'));
const { Title } = Typography;
const { Panel } = Collapse;

const OrderDetail = ({ item }) => {
    return (
        <div className="order-detail-item-wrap">
            <Collapse expandIconPosition={'right'}>
                <Panel 
                    header={
                        <Fragment>
                            <div className="order-detail-item-header">
                                <Link
                                    href={`/shop/product-detail/[productId]`}
                                    as={`/shop/product-detail/${item.id}`}>
                                    <a>
                                        <StatusTag value={item.part_number} color={'geekblue'} />
                                    </a>
                                </Link>
                                <Descriptions style={{ float: 'right' }}>
                                    <Descriptions.Item label={langs.labels.quantity}>{item.quantity}</Descriptions.Item>
                                </Descriptions>
                            </div>
                            <Title level={5} className="product-item-name">
                                <Link
                                    href={`/shop/product-detail/[productId]`}
                                    as={`/shop/product-detail/${item.id}`}>
                                    <a>{item.name}</a>
                                </Link>
                            </Title>
                        </Fragment>
                    }
                    key={item.id}
                >
                    <div className="order-detail-item">
                        <div className="order-detail-item-details">
                            <Descriptions>
                                {item.categories.length > 0 && (
                                    <Descriptions.Item label={langs.labels.category}>
                                        {convertArrayToString(item.categories)}
                                    </Descriptions.Item>
                                )}
                                {item.brand && (
                                    <Descriptions.Item label={langs.labels.brand}>{item.brand}</Descriptions.Item>
                                )}
                            </Descriptions>
                            <div className="price-box">
                                <span className="regular-price">{formatToCurrency(item.price)}</span>
                                <span className="old-price">{formatToCurrency(item.regular_price)}</span>
                                {!!item.discount && (
                                    <span className="price-off">{`${item.discount}% ${langs.labels.off}`}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </Panel>
            </Collapse>
        </div>
    );
};
export default OrderDetail;
