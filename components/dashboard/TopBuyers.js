import { Typography } from 'antd';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Link from 'next/link';
import { formatToCurrency, convertToSlug } from '../../helper/Utils';
import { PictureOutlined } from '@ant-design/icons';
import { langs } from '../../localization';
const LoadData = dynamic(() => import('../common/load-data'));

const { Title, Text } = Typography;
const TopBuyers = ({ list = [] }) => {
    useEffect(() => {}, []);

    return (
        <LoadData data={list} loading={false}>
            {list.map((item, index) => (
                <Link href={`/my-retailers/retailer-detail/${item.id}/${convertToSlug(item.shop_name)}`} key={index}>
                    <a>
                        <div className="db-card light paddingless">
                            <div className="db-card-left">
                                <span
                                    className="icon rounded"
                                    style={{
                                        backgroundColor: 'transparent'
                                    }}>
                                    {item.picture != '0' && item.picture ? (
                                        <img src={item.picture} alt="" width={40} height={40} />
                                    ) : <PictureOutlined />}
                                </span>
                                <div className="content">
                                    <Title level={4} strong className="m-b0">
                                        {item.shop_name}
                                    </Title>
                                    <Text className="m-b0">
                                        <Text className="m-b0" strong>
                                            {item.username} (<a href={`tel:${item.user_mobile}`}>{item.user_mobile}</a>)
                                        </Text>
                                    </Text>
                                </div>
                            </div>
                            <div className="db-card-right">
                                <div className="content">
                                    <Title level={4} strong type="success" className="m-b0">
                                        {formatToCurrency(item.totalAmount)}
                                    </Title>
                                    <Text className="m-b0 text-blue">
                                        <strong>{item.totalOrders}</strong> {langs.labels.orders}
                                    </Text>
                                </div>
                            </div>
                        </div>
                    </a>
                </Link>
            ))}
        </LoadData>
    );
};

export default TopBuyers;
