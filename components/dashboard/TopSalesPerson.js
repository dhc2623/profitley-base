import { Typography } from 'antd';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { formatToCurrency, convertToSlug } from '../../helper/Utils';
import { langs } from '../../localization';
const LoadData = dynamic(() => import('../common/load-data'));

const { Title, Text } = Typography;
const TopSalesPerson = ({ list = [] }) => {
    useEffect(() => {}, []);

    return (
        <LoadData data={list} loading={false}>
            {list.map((item, index) => (
                <Link href={`/my-team/dsp-details/${item.id}/${convertToSlug(item.username)}`} key={index}>
                    <a>
                        <div className="db-card light paddingless" key={index}>
                            <div className="db-card-left">
                                <span
                                    className="icon rounded"
                                    style={{
                                        backgroundColor: 'transparent'
                                    }}>
                                    {item.picture != '0' && item.picture && (
                                        <img src={item.picture} alt="" width={40} height={40} />
                                    )}
                                </span>
                                <div className="content">
                                    <Title level={4} strong className="m-b0">
                                        {item.username}
                                    </Title>
                                    <Text className="m-b0">
                                        <Text className="m-b0" strong>
                                        <a href={`tel:${item.user_mobile}`}>{item.user_mobile}</a>
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

export default TopSalesPerson;
