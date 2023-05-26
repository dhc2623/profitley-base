import { List, Typography } from 'antd';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import { langs } from '../localization';
const PageTitle = dynamic(() => import('../components/common/page-title'));
const DocHead = dynamic(() => import('../components/common/head'));
const { Title } = Typography;

function Reports() {
    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.reports} />
            <section className="wrap">
                <PageTitle title={langs.labels.reports} />
                <div style={{ backgroundColor: '#FFF', margin: '10px 0' }}>
                    <List size="small">
                        <List.Item extra={<i className="fas fa-chevron-right"></i>}>
                            <Title level={5}>{langs.labels.billingReport}</Title>
                        </List.Item>
                        <List.Item extra={<i className="fas fa-chevron-right"></i>}>
                            <Title level={5}>
                                {langs.labels.listedPrice} vs {langs.labels.invoicedPrice}
                            </Title>
                        </List.Item>
                    </List>
                </div>
            </section>
        </Fragment>
    );
}

export default Reports;
