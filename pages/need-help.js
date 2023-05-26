import { Card, Col, Row } from 'antd';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import { langs } from '../localization';

const PageTitle = dynamic(() => import('../components/common/page-title'));
const DocHead = dynamic(() => import('../components/common/head'));

function NeedHelp() {
    return (
        <Fragment>
            <DocHead pageTitle="Need Help" />
            <section className="wrap">
                <PageTitle title={'Need Help'} />
                <Row className="m-t10">
                    <Col span={24}>
                        <Card>{langs.labels.comingSoon}...</Card>
                    </Col>
                </Row>
            </section>
        </Fragment>
    );
}

export default NeedHelp;
