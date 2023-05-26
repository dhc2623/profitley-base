import { Card, Col, Row } from 'antd';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import { langs } from '../localization';
// import PageTitle from '../components/common/page-title';
// import DocHead from '../components/common/head';

const PageTitle = dynamic(() => import('../components/common/page-title'));
const DocHead = dynamic(() => import('../components/common/head'));

function FAQs() {
    return (
        <Fragment>
            <DocHead pageTitle="FAQs" />
            <section className="wrap">
                <PageTitle title={'FAQs'} />
                <Row className="m-t10">
                    <Col span={24}>
                        <Card>{langs.labels.comingSoon}...</Card>
                    </Col>
                </Row>
            </section>
        </Fragment>
    );
}

export default FAQs;
