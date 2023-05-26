import React from 'react';
import dynamic from 'next/dynamic';
import { Descriptions, Typography } from 'antd';
import { formatToCurrency } from '../../helper/Utils';
import { langs } from '../../localization';
const StatusTag = dynamic(() => import('../../components/common/tag'));
const Image = dynamic(() => import('../common/image'));
const { Title } = Typography;

const OrderDetail = ({ item }) => {
    return (
        <div className="order-detail-item-wrap">
            <div className="order-detail-item">
                <div className="order-detail-item-photo">
                    <Image
                        src={'/assets/images/product-34.png'}
                        className="product-image"
                        width={80}
                        height={80}
                        alt={''}
                    />
                </div>
                <div className="order-detail-item-details">
                    <StatusTag value={'745120'} color={'geekblue'} />
                    <Descriptions style={{ marginTop: 5, float: 'right' }}>
                        <Descriptions.Item label="Quantity">{'1'}</Descriptions.Item>
                    </Descriptions>

                    <Title level={5} className="product-item-name">
                        <a>{'iPhone'}</a>
                    </Title>
                    <Descriptions>
                        <Descriptions.Item label="Category">{'Uncategorized'}</Descriptions.Item>
                        <Descriptions.Item label="Brand">{'Apple'}</Descriptions.Item>
                        <Descriptions.Item label="Model">{'Model'}</Descriptions.Item>
                        <Descriptions.Item label="MOQ">{'1'}</Descriptions.Item>
                    </Descriptions>
                    <div className="price-box">
                        <span className="regular-price">{formatToCurrency('1000.00')}</span>
                        <span className="old-price">{formatToCurrency('1200.00')}</span>
                        <span className="price-off">{`16.67% ${langs.labels.off}`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default OrderDetail;
