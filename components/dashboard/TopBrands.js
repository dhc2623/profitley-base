import { Typography } from 'antd';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Link from 'next/link';
import { formatToCurrency } from '../../helper/Utils';
import { PictureOutlined } from '@ant-design/icons';
import { langs } from '../../localization';
const LoadData = dynamic(() => import('../common/load-data'));
const Image = dynamic(() => import('../common/image'));

const { Title, Text } = Typography;
const TopBrands = ({ list = [] }) => {
    useEffect(() => {}, []);

    return (
        <LoadData data={list} loading={false}>
            {list.map((item, index) => (
                <Link href={`/shop/brand/${item.slug}`} key={index}>
                    <a>
                        <div className="db-card light paddingless">
                            <div className="db-card-left">
                                <span
                                    className="icon rounded"
                                    style={{
                                        backgroundColor: '#E8E9FF'
                                    }}>
                                    {item.image != '0' && item.image ? (
                                        <img src={item.image} alt="" width={40} height={40} />
                                    ) : <PictureOutlined />}
                                </span>
                                <div className="content">
                                    <Title level={4} strong className="m-b0">
                                        {item.name}
                                    </Title>
                                    <Text className="m-b0">
                                        {langs.labels.soldItems}:{' '}
                                        <Text className="m-b0" strong>
                                            {item.totalQuantity}
                                        </Text>
                                    </Text>
                                </div>
                            </div>
                            <div className="db-card-right">
                                <div className="content">
                                    <Title level={4} strong type="success" className="m-b0">
                                        {formatToCurrency(item.totalAmount)}
                                    </Title>
                                    {/*<Text className="m-b0 text-blue">
                                        <strong>{item.inventory}</strong> {langs.labels.items}
                                    </Text>*/}
                                </div>
                            </div>
                        </div>
                    </a>
                </Link>
            ))}
        </LoadData>
    );
};

export default TopBrands;
