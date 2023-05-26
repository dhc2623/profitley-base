import { Fragment, useEffect, useState } from 'react';
import {
    ArrowLeftOutlined,
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Col, Row, Typography, Space, DatePicker } from 'antd';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Panel, { PanelTitle, PanelBody } from '../../../../components/common/panel';
import RetailerPageMenu from '../../../../components/my-retailers/RetailerPageMenu';
import RetailerSalesOrders from '../../../../components/my-retailers/RetailerSalesOrders';
import RetailerStatistic from '../../../../components/my-retailers/RetailerStatistic';
import RetailerTargets from '../../../../components/my-retailers/RetailerTargets';
import withAppContext from '../../../../config/withAppContext';
import { serverCheckIsUserLogin } from '../../../../helper/AuthActions';
import { formatToCurrency, getDate, slugify } from '../../../../helper/Utils';
import { langs } from '../../../../localization';
import { setChild } from '../../../../store/common/Action';
import {
    getRetailerInsights,
    GET_RETAILER_INSIGHTS_INITIATE
} from '../../../../store/retailer/Action';
import OrdersByStatus from '../../../../components/dashboard/OrdersByStatus';
// import PageTitle from '../../../components/common/page-title';
// import PageMenu from '../../../components/common/page-menu';
// import DocHead from '../../../components/common/head';
// import LoadData from '../../../components/common/load-data';

const PageTitle = dynamic(() => import('../../../../components/common/page-title'));
const DocHead = dynamic(() => import('../../../../components/common/head'));
const LoadData = dynamic(() => import('../../../../components/common/load-data'));

const { Text, Title, Paragraph } = Typography;

function RetailerDetail(props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const retailerDetails = useSelector((state) => state.retailer.retailerInsights.user);
    const retailerInsights = useSelector((state) => state.retailer.retailerInsights);
    const [dashboardDate, setDashBoardDate] = useState(dayjs());
    let loading = useSelector((state) => state.retailer.loading);
    useEffect(() => {
        dispatch(setChild('/my-retailers'));
    }, []);
    useEffect(() => {
        if (router.query && router.query.retailerId) {
            getInsights();
        }
    }, [router.query]);

    const getInsights = (parems = {}) => {
        dispatch(getRetailerInsights({ retailerId: router.query.retailerId, ...parems }));
    };

    const handleChangeDashboardMonth = (v) => {
        setDashBoardDate(v);
        getInsights({
            date: {
                month: v.month() + 1,
                year: v.year()
            }
        });
    };

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.retailerDetail} />
            <section className="wrap">
                <div className="back-link-wrap">
                    <Link href="/my-retailers">
                        <a className="back-link">
                            <ArrowLeftOutlined />
                        </a>
                    </Link>
                    <PageTitle title={slugify(router.query.title)} />
                </div>

                <RetailerPageMenu {...router} active={'details'} />
                <LoadData loading={loading} data={retailerDetails}>
                    <Panel size={false} className="buyer-listed-card">
                        <PanelTitle
                            title={retailerDetails.shop_name}
                            action={[
                                {
                                    onClick: () =>
                                        window.open(`tel:${retailerDetails.phone_number}`),
                                    icon: <PhoneOutlined />,
                                    type: 'link',
                                    size: 'small',
                                    className: 'call-btn'
                                }
                            ]}
                        />
                        <PanelBody>
                            <Space>
                                <div className="category-tag">
                                    {retailerDetails.category}
                                    <span>{langs.labels.category}</span>
                                </div>
                                <div>
                                    <Paragraph className={'m-b0 icon-list'}>
                                        <UserOutlined />{' '}
                                        <b>{`${retailerDetails.name} ${retailerDetails.last_name}`}</b>
                                    </Paragraph>
                                    <Paragraph className={'m-b0 icon-list'}>
                                        <EnvironmentOutlined />
                                        {`${
                                            retailerDetails.address1
                                                ? `${retailerDetails.address1}, ${retailerDetails.cityName} - ${retailerDetails.pincode}`
                                                : ''
                                        }`}
                                    </Paragraph>
                                </div>
                            </Space>
                        </PanelBody>
                    </Panel>

                    <div className="retailer-detail-block">
                        <div className="db-header-title m-t10">
                            <Title level={4}>
                                {langs.labels.tillDate} {getDate(dayjs())}
                            </Title>
                        </div>
                        <Row gutter={16}>
                            <Col lg={6} md={24} xs={12}>
                                <RetailerStatistic
                                    icon={'/assets/images/svg/notebook-icon.svg'}
                                    color={'#FEEEF1'}
                                    value={formatToCurrency(retailerInsights.totalSaleAmount)}
                                    label={`${langs.labels.sales} (${langs.labels.completed})`}
                                />
                            </Col>
                            <Col lg={6} md={24} xs={12}>
                                <RetailerStatistic
                                    icon={'/assets/images/svg/schedule-icon.svg'}
                                    color={'#F0EDFE'}
                                    value={retailerInsights.totalSalesOrder}
                                    label={`${langs.labels.orders} (${langs.labels.completed})`}
                                />
                            </Col>
                        </Row>
                        <div className="db-header-title m-t10">
                            <Title level={4}>
                                {dashboardDate.format('MMMM')} {dashboardDate.year()}
                            </Title>
                            <div className="db-date-range">
                                <DatePicker
                                    onChange={handleChangeDashboardMonth}
                                    picker="month"
                                    placeholder={langs.labels.selectMonth}
                                    disabledDate={(date) => date > dayjs()}
                                />
                            </div>
                        </div>

                        <RetailerSalesOrders
                            todayOrderAmount={retailerInsights.todayOrderAmount}
                            todayOrders={retailerInsights.todayOrders}
                            weekOrderAmount={retailerInsights.weekOrderAmount}
                            weekOrders={retailerInsights.weekOrders}
                            totalSales={retailerInsights.monthAmount}
                            totalOrders={retailerInsights.monthOrders}
                            isThisMonth={dayjs().isSame(dashboardDate, 'month', 'year')}
                        />
                        {retailerInsights.target && (
                            <RetailerTargets
                                target={retailerInsights.target}
                                userName={`${'Navdeep'} ${'Saini'}`}
                            />
                        )}
                        <OrdersByStatus
                            defaultActiveKey={'ordersByStatus'}
                            listOrdersByStatus={retailerInsights.orderByStatus}
                            onclick={'/orders/my-orders/'}
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

export default withAppContext(RetailerDetail);
