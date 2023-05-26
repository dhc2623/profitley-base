import { Card, Col, Row } from 'antd';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import { serverCheckIsUserLogin } from '../helper/AuthActions';
import { langs } from '../localization';
const PageTitle = dynamic(() => import('../components/common/page-title'));
const DocHead = dynamic(() => import('../components/common/head'));

function termsAndCondition() {
    return (
        <Fragment>
            <DocHead pageTitle="Terms And Condition" />
            <section className="wrap">
                <PageTitle title={'Terms And Condition'} />
                <Row className="m-t10">
                    <Col span={24}>
                        <Card>{langs.labels.comingSoon}...</Card>
                    </Col>
                </Row>
            </section>
        </Fragment>
    );
}


export default termsAndCondition;
