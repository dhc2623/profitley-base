import { ArrowLeftOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocHead from '../../../../components/common/head';
import LoadData from '../../../../components/common/load-data';
import PageMenu from '../../../../components/common/page-menu';
import PageTitle from '../../../../components/common/page-title';
import Panel, { PanelTitle, PanelBody } from '../../../../components/common/panel';
import TeamSalesOrders from '../../../../components/my-team/TeamSalesOrders';
import TeamStatistic from '../../../../components/my-team/TeamStatistic';
import TeamVisitInsights from '../../../../components/my-team/TeamVisitInsights';
import  withAppContext  from '../../../../config/withAppContext';
import { serverCheckIsUserLogin } from '../../../../helper/AuthActions';
import { convertToSlug, formatToCurrency, getDate, slugify } from '../../../../helper/Utils';
import { langs } from '../../../../localization';
import { setChild } from '../../../../store/common/Action';
import { GET_DSP_INSIGHTS_INITIATE } from '../../../../store/myTeam/Action';
const { Text, Title, Paragraph } = Typography;

function DSPDetail(props) {
    const dispatch = useDispatch();
    const router = useRouter();

    const dspDetails = useSelector((state) => state.myTeam.dspInsights.user);
    const loading = useSelector((state) => state.myTeam.loading);
    const dspInsights = useSelector((state) => state.myTeam.dspInsights);

    useEffect(() => {
        dispatch(setChild('/my-team'));
    }, []);

    useEffect(() => {
        if (router.query && router.query.dspId) {
            let dspId = router.query.dspId;
            dispatch({ type: GET_DSP_INSIGHTS_INITIATE, dspId });
        }
    }, [router.query]);


    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.retailerDetail} />
            <section className="wrap">
                <div className="back-link-wrap">
                    <Link href="/my-team">
                        <a className="back-link">
                            <ArrowLeftOutlined />
                        </a>
                    </Link>
                    <PageTitle title={slugify(router.query.title)} />
                </div>
                <PageMenu
                    navItem={[
                        {
                            name: `${langs.labels.details}`,
                            slug: 'details',
                            active: true,
                            onClick: () =>
                                router.push(
                                    `/my-team/dsp-details/[dspId]/[title]`,
                                    `/my-team/dsp-details/${router.query.dspId}${router.query.dspId}/${convertToSlug(router.query.title)}`
                                )
                        },
                        {
                            name: `${langs.labels.buyers}`,
                            slug: 'retailers',
                            onClick: () =>
                                router.push(
                                    `/my-team/assign-retailers/[dspId]/[title]`,
                                    `/my-team/assign-retailers/${router.query.dspId}/${convertToSlug(router.query.title)}`
                                )
                        },
                        {
                            name: `${langs.labels.plannedVisits}`,
                            slug: 'planVisit',
                            onClick: () =>
                                router.push(
                                    `/my-team/dsp-plan/[dspId]/[title]`,
                                    `/my-team/dsp-plan/${router.query.dspId}/${convertToSlug(router.query.title)}`
                                )
                        }
                    ]}
                />
                <LoadData loading={loading} data={dspDetails}>
                    <Panel size={false} className="buyer-listed-card">
                        <PanelTitle
                            title={<Fragment><UserOutlined /> <b>{`${dspDetails.name} ${dspDetails.last_name}`}</b></Fragment>}
                            action={[
                                {
                                    onClick: () => window.open(`tel:${dspDetails.phone_number}`),
                                    icon: <PhoneOutlined />,
                                    type: 'link',
                                    size: 'small',
                                    className: 'call-btn'
                                }
                            ]}
                        />
                        <PanelBody>
                            <Fragment>
                                <Text className={'icon-list'}>
                                    <EnvironmentOutlined />
                                    {`${dspDetails.address1
                                        ? `${dspDetails.address1}, ${dspDetails.cityName} - ${dspDetails.pincode}`
                                        : ''
                                        }`}
                                </Text>
                            </Fragment>
                        </PanelBody>
                    </Panel>

                    <div className="team-detail-block">
                        <div className="db-header-title m-t10">
                            <Title level={4}>
                                {langs.labels.tillDate} {getDate(dayjs())}
                            </Title>
                        </div>
                        <Row gutter={16}>
                            <Col lg={6} md={24} xs={12}>
                                <TeamStatistic
                                    icon={'/assets/images/svg/notebook-icon.svg'}
                                    color={'#FEEEF1'}
                                    value={formatToCurrency(dspInsights.totalSalesOrder)}
                                    label={langs.labels.sales}
                                />
                            </Col>
                            <Col lg={6} md={24} xs={12}>
                                <TeamStatistic
                                    icon={'/assets/images/svg/schedule-icon.svg'}
                                    color={'#F0EDFE'}
                                    value={dspInsights.totalOrders}
                                    label={langs.labels.orders}
                                />
                            </Col>
                        </Row>
                        <div className="db-header-title m-t10">
                            <Title level={4}>
                                {dayjs().format('MMM, YYYY')}
                            </Title>
                        </div>
                        <TeamSalesOrders
                            todayOrderAmount={dspInsights.todayAmount}
                            todayOrders={dspInsights.todayOrders}
                            weekOrderAmount={dspInsights.weekOrderAmount}
                            weekOrders={dspInsights.weekOrders}
                            totalSales={dspInsights.monthAmount}
                            totalOrders={dspInsights.monthOrders}
                        />

                        <TeamVisitInsights
                            info={dspInsights.visits}
                            title={langs.labels.visitInsights}
                            className="uppercase"
                        />

                    </div>
                </LoadData>
            </section>
        </Fragment>
    );
}

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(DSPDetail);


