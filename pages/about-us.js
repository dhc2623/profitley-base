import { Row, Col, Card } from 'antd';
import { Fragment } from 'react';
import { langs } from '../localization';
import PageTitle from '../components/common/page-title';
import DocHead from '../components/common/head';

// const PageTitle = dynamic(() => import('../components/common/page-title'));
// const DocHead = dynamic(() => import('../components/common/head'));

function AboutUs() {
    return (
        <Fragment>
            <DocHead pageTitle="About Us" />
            <section className="wrap">
                <PageTitle title={'About Us'} />
                <Row className="m-t10">
                    <Col span={24}>
                        <Card>{langs.labels.comingSoon}...</Card>
                    </Col>
                </Row>
            </section>
        </Fragment>
    );
}

export default AboutUs;
