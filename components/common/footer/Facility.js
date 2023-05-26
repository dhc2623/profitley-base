import React, { Fragment } from 'react';
import { Typography, Row, Col } from 'antd';
import { langs } from '../../../localization';
const Image = dynamic(() => import('../../common/image'));

const AppFacility = () => {
    return (
        <Fragment>
            <section className="section-facility ">
                <div className="wrap">
                    <div className="section-facility-wrapper ">
                        <Row>
                            <Col span={6}>
                                <div className="icon">
                                    <Image
                                        src={'/assets/images/genuine-part.png'}
                                        width={50}
                                        height={50}
                                        alt={langs.labels.genuineParts}
                                    />
                                </div>
                                <div className="p-l10">
                                    <Typography.Title level={5} className={'m-b0'}>
                                        {langs.labels.genuineParts}
                                    </Typography.Title>
                                    {/* <Typography.Text>100 % {langs.labels.verified}</Typography.Text> */}
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="icon">
                                    <Image
                                        src={'/assets/images/delivery.png'}
                                        width={50}
                                        height={50}
                                        alt={langs.labels.onTimeDelivery}
                                    />
                                </div>
                                <div className="p-l10">
                                    <Typography.Title level={5} className={'m-b0'}>
                                        {langs.labels.onTimeDelivery}
                                    </Typography.Title>
                                    {/* <Typography.Text> {langs.labels.allOrderDeliveredOnTime}</Typography.Text> */}
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="icon">
                                    <Image
                                        src={'/assets/images/visibility.png'}
                                        width={50}
                                        height={50}
                                        alt={langs.labels.highVisibility}
                                    />
                                </div>
                                <div className="p-l10">
                                    <Typography.Title level={5} className={'m-b0'}>
                                        {langs.labels.highVisibility}
                                    </Typography.Title>
                                    {/* <Typography.Text>{langs.labels.comingSoon}...</Typography.Text> */}
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="icon">
                                    <Image
                                        src={'/assets/images/support.png'}
                                        width={50}
                                        height={50}
                                        alt={langs.labels.support}
                                    />
                                </div>
                                <div className="p-l10">
                                    <Typography.Title level={5} className={'m-b0'}>
                                        {langs.labels.support} 24/7
                                    </Typography.Title>
                                    {/* <Typography.Text>{langs.labels.callAnyTime} 24/7</Typography.Text> */}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default AppFacility;
