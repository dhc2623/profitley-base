import { Fragment, useEffect, useState } from 'react';
import DocHead from '../../components/common/head';
import PageTitle from '../../components/common/page-title';
import  withAppContext  from '../../config/withAppContext';
import { EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { getDate } from '../../helper/Utils';
import { unapprovedVisits } from '../../store/plan/Action';
import Panel, { PanelBody } from '../../components/common/panel';
const LoadData = dynamic(() => import('../../components/common/load-data'));
const { Title, Text, Paragraph } = Typography;

function UnapprovedVisits(props) {
    const { userMe } = props;
    const userId = userMe.profile.id;
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.plan.loading);
    const [unapprovedVisitList, setVisitList] = useState([]);

    const visits = useSelector((state) => state.plan.unapprovedVisitList);

    const unapprovedVistMeta = useSelector((state) => state.plan.unapprovedVistMeta);

    useEffect(() => {
        dispatch(unapprovedVisits({ userId }));
    }, []);

    useEffect(() => {
        const vis = _.chain(visits)
            .groupBy((visits) => visits.planned_date)
            .map((visits, planned_date) => ({ planned_date, visits }))
            .orderBy((group) => new Date(group.planned_date), ['desc'])
            .value();
        setVisitList(vis);
    }, [visits]);

    return (
        <div>
            <DocHead pageTitle={'Unapproved Plans'} />
            <section className="wrap">
                <PageTitle title={'Unapproved Plans'} />

                <div className={'visit-list'}>
                    <LoadData data={unapprovedVistMeta} loading={loading}>
                        {_.map(unapprovedVisitList, (item) => {
                            return (
                                <Fragment key={item.planned_date}>
                                    <Title level={5} className={'p-t10 m-b0'} strong>
                                        {getDate(item.planned_date)}
                                    </Title>
                                    {item.visits.map((value, index) => (
                                        <Panel
                                            key={`${value.planned_date}-${index}`}
                                            className={`visit-panel`}>
                                            <PanelBody>
                                                {value.plan_type === 'OFFFIELD' ? (
                                                    <Fragment>
                                                        <Title level={5}>
                                                                {' '}
                                                                <Text strong className="text-blue">
                                                                    {value.plan}
                                                                </Text>
                                                            </Title>
                                                    </Fragment>
                                                ) : (
                                                    <Fragment>
                                                        {value.shop_name && (
                                                            <Title level={5}>
                                                                {' '}
                                                                <Text strong className="text-blue">
                                                                    {value.shop_name}
                                                                </Text>
                                                            </Title>
                                                        )}
                                                        {value.retailerName && (
                                                            <Paragraph className="icon-list m-b0">
                                                                <UserOutlined />{' '}
                                                                <b>{value.retailerName}</b>
                                                            </Paragraph>
                                                        )}
                                                        {value.address1 && (
                                                            <Paragraph className="icon-list m-b0">
                                                                <EnvironmentOutlined />{' '}
                                                                {`${
                                                                    value.address1
                                                                        ? `${value.address1} ${
                                                                              value.address2
                                                                                  ? value.address2
                                                                                  : ''
                                                                          }, ${value.cityName}, ${
                                                                              value.stateName
                                                                          } - ${value.pincode}`
                                                                        : ''
                                                                }`}
                                                            </Paragraph>
                                                        )}
                                                    </Fragment>
                                                )}

                                                {(value.cancel_comment ||
                                                    value.checkout_comment ||
                                                    value.plan_comment) && (
                                                    <Fragment>
                                                        <Typography.Text>Comment:</Typography.Text>
                                                        <Paragraph
                                                            type="secondary"
                                                            className={'m-b0'}>
                                                            {value.cancel_comment ||
                                                                value.checkout_comment ||
                                                                value.plan_comment ||
                                                                ''}
                                                        </Paragraph>
                                                    </Fragment>
                                                )}
                                            </PanelBody>
                                        </Panel>
                                    ))}
                                </Fragment>
                            );
                        })}
                    </LoadData>
                </div>
            </section>
        </div>
    );
}

export default withAppContext(UnapprovedVisits);
