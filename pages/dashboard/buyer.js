import { Col, DatePicker, Row, Tabs, Typography } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocHead from '../../components/common/head';
import LoadData from '../../components/common/load-data';
import OrdersByStatus from '../../components/dashboard/OrdersByStatus';
import SalesOrders from '../../components/dashboard/SalesOrders';
import SalesOrdersSummary from '../../components/dashboard/SalesOrdersSummary';
import Statistic from '../../components/dashboard/Statistic';
import Targets from '../../components/dashboard/Targets';
import TopBrands from '../../components/dashboard/TopBrands';
import TopBuyers from '../../components/dashboard/TopBuyers';
import TopCategories from '../../components/dashboard/TopCategories';

import { DATE_FORMAT, USER_ROLES } from '../../config/Constant';
import  withAppContext  from '../../config/withAppContext';
import { serverCheckIsUserLogin } from '../../helper/AuthActions';
import { formatToCurrency, getDate } from '../../helper/Utils';
import { langs } from '../../localization';
import { getDashboardData, getSummary } from '../../store/dashboard/Action';
const { Title, Text, Paragraph } = Typography;
const TabPane = Tabs.TabPane;

const BuyerDashboard = (props) => {
    const userDetail  = props.userMe.profile;
    const dispatch = useDispatch();
    const router = useRouter();

    const loading = useSelector((state) => state.dashboard.loading);
    const dashboardData = useSelector((state) => state.dashboard.dashboardData);
    const summaryData = useSelector((state) => state.dashboard.summary);

    const [dashboardDate, setDashBoardDate] = useState(dayjs());
    const [summaryDate, setSummaryDate] = useState(dayjs());
    const [activeTab, setActiveTab] = useState('Dashboard');

    useEffect(() => {
        dispatch(
            getDashboardData({
                date: {
                    month: dayjs().month() + 1,
                    year: dayjs().year()
                },
                role: userDetail.role.name
            })
        );
        dispatch(getSummary({ date: dayjs().format(DATE_FORMAT), role: userDetail.role.name }));
    }, []);

    const handleChangeDashboardMonth = (v) => {
        setDashBoardDate(v);
        dispatch(
            getDashboardData({
                date: {
                    month: v.month() + 1,
                    year: v.year()
                },
                role: userDetail.role.name
            })
        );
    };

    const handleChangeSummaryDate = (v) => {
        setSummaryDate(v);
        dispatch(getSummary({ date: v.format(DATE_FORMAT), role: userDetail.role.name }));
    };

    if (userDetail.role.name !== USER_ROLES.BUYER.name) {
        router.push(`/dashboard/${userDetail.role.name}`);
    }

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.buyer} />

            <section className="wrap page-dashboard">
                <div className="db-tabs">
                    <Tabs activeKey={activeTab} onTabClick={setActiveTab}>
                        <TabPane tab={langs.labels.dashboard} key="Dashboard" className="p-l5 p-r5">
                            <LoadData data={dashboardData} loading={loading}>
                                <div className="db-header-title">
                                    <Title level={4}>
                                        {dashboardDate.format('MMMM')} {dashboardDate.year()}
                                    </Title>
                                    <div className="db-date-range">
                                        <DatePicker
                                            onChange={handleChangeDashboardMonth}
                                            picker="month"
                                            disabledDate={(date) => date > dayjs()}
                                            placeholder={langs.labels.selectMonth}
                                        />
                                    </div>
                                </div>
                                <Row gutter={[15, 0]}>
                                    <Col lg={6} md={12} xs={12}>
                                        <Statistic
                                            icon={'/assets/images/svg/notebook-icon.svg'}
                                            color={'#FEEEF1'}
                                            value={formatToCurrency(dashboardData.totalSales)}
                                            label={langs.labels.sales}
                                            onclick={`/orders/my-orders`}
                                            getQuery={{dateFrom: `01-${dashboardDate.format('MM')}-${dashboardDate.year()}`, dateTo: `30-${dashboardDate.format('MM')}-${dashboardDate.year()}`}}
                                        />
                                    </Col>
                                    <Col lg={6} md={12} xs={12}>
                                        <Statistic
                                            icon={'/assets/images/svg/schedule-icon.svg'}
                                            color={'#F0EDFE'}
                                            value={dashboardData.totalOrders}
                                            label={langs.labels.orders}
                                            onclick={`/orders/my-orders`}
                                            getQuery={{dateFrom: `01-${dashboardDate.format('MM')}-${dashboardDate.year()}`, dateTo: `30-${dashboardDate.format('MM')}-${dashboardDate.year()}`}}
                                        />
                                    </Col>
                                    <Col lg={6} md={12} xs={12}>
                                        <Statistic
                                            icon={'/assets/images/svg/box-icon.svg'}
                                            color={'#ECF6FF'}
                                            value={formatToCurrency(dashboardData.paid)}
                                            label={langs.labels.paid}
                                            onclick={`/payment-history`}
                                        />
                                    </Col>
                                    <Col lg={6} md={12} xs={12}>
                                        <Statistic
                                            icon={'/assets/images/svg/box-icon.svg'}
                                            color={'#ECF6FF'}
                                            value={formatToCurrency(dashboardData.outstanding)}
                                            label={`${langs.labels.outstanding} ${dashboardData.outstanding <= 0 ? '(CR)' : '(DR)'}`}
                                            onclick={`/ledger`}
                                        />
                                    </Col>
                                    {/* <Col lg={5} md={12} xs={12}>
                                        <Statistic
                                            icon={'/assets/images/svg/store-icon.svg'}
                                            color={'#E9F8F3'}
                                            value={formatToCurrency(dashboardData.pending)}
                                            label={langs.labels.pending}
                                        />
                                    </Col> */}
                                </Row>

                                {dayjs(dashboardDate).month() === dayjs().month() && (
                                    <SalesOrders
                                        todayOrderAmount={dashboardData.todayOrderAmount}
                                        todayOrders={dashboardData.todayOrders}
                                        weekOrderAmount={dashboardData.weekOrderAmount}
                                        weekOrders={dashboardData.weekOrders}
                                        totalSales={dashboardData.totalSales}
                                        totalOrders={dashboardData.totalOrders}
                                    />
                                )}

                                <OrdersByStatus
                                    listOrdersByStatus = {dashboardData.orderByStatus}
                                    onclick = {'/orders/my-orders/'}
                                />

                                {dashboardData.target && (
                                    <Targets
                                        target={dashboardData.target}
                                        userName={userDetail.shop_name}
                                    />
                                )}

                                <div className="section-dsp-tar">
                                    <Title level={4} className="db-title">
                                        {langs.labels.top5}
                                    </Title>
                                </div>
                                <div className="db-tabs mt0">
                                    <Tabs defaultActiveKey={'topCategories'}>
                                        <TabPane tab={langs.labels.categories} key="topCategories">
                                            <TopCategories list={dashboardData.topCategories} />
                                        </TabPane>
                                        <TabPane tab={langs.labels.brands} key="topBrands">
                                            <TopBrands list={dashboardData.topBrands} />
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </LoadData>
                        </TabPane>
                        <TabPane tab={langs.labels.daySummary} key="daySummary" className="p-l5 p-r5">
                            <LoadData data={summaryData} loading={loading}>
                                <div className="db-header-title">
                                    <Title level={4}>{summaryDate.format('DD MMMM, YYYY')}</Title>
                                    <div className="db-date-range">
                                        <DatePicker
                                            onChange={handleChangeSummaryDate}
                                            disabledDate={(date) => date > dayjs()}
                                            placeholder={langs.labels.selectDate}
                                        />
                                    </div>
                                </div>
                                <Row gutter={[15, 0]}>
                                    <Col lg={12} md={12} xs={12}>
                                        <Statistic
                                            icon={'/assets/images/svg/box-icon.svg'}
                                            color={'#ECF6FF'}
                                            value={formatToCurrency(summaryData.paid)}
                                            label={langs.labels.paid}
                                        />
                                    </Col>
                                    {/* <Col lg={12} md={12} xs={12}>
                                        <Statistic
                                            icon={'/assets/images/svg/store-icon.svg'}
                                            color={'#E9F8F3'}
                                            value={formatToCurrency(summaryData.pending)}
                                            label={langs.labels.pending}
                                        />
                                    </Col> */}
                                    {/* <Col lg={5} md={12} xs={12}>
                                        <Statistic
                                            icon={'/assets/images/svg/box-icon.svg'}
                                            color={'#ECF6FF'}
                                            value={formatToCurrency(summaryData.paid)}
                                            label={langs.labels.paid}
                                        />
                                    </Col> */}
                                    <Col lg={12} md={12} xs={12}>
                                        <Statistic
                                            icon={'/assets/images/svg/box-icon.svg'}
                                            color={'#ECF6FF'}
                                            value={formatToCurrency(summaryData.outstanding)}
                                            label={`${langs.labels.outstanding} ${dashboardData.outstanding <= 0 ? '(CR)' : '(DR)'}`}
                                        />
                                    </Col>
                                </Row>
                                <SalesOrdersSummary
                                    totalAmount={summaryData.totalAmount}
                                    totalOrders={summaryData.totalOrders}
                                    rolesOrder={true}
                                    userDetail={userDetail}
                                />
                                <OrdersByStatus
                                    listOrdersByStatus = {summaryData.orderByStatus}
                                />
                                {summaryData.myOrders && (
                                    <Fragment>
                                        <div className="section-dsp-tar">
                                            <Title level={4} className={'db-title'}>
                                                {langs.labels.myOrders}
                                            </Title>
                                        </div>
                                        {summaryData.myOrders.map((item, index) => (
                                            <div className="db-card light paddingless mt2" key={index}>
                                                <div className="db-card-left">
                                                    <div className="content">
                                                        <Title level={4} strong className="m-b0">
                                                            {item.order_number}
                                                        </Title>
                                                        <Text className="m-b0">
                                                            {getDate(item.orderDate)} by{' '}
                                                            {item.orderedBy}
                                                        </Text>
                                                    </div>
                                                </div>
                                                <div className="db-card-right">
                                                    <div className="content">
                                                        <Title
                                                            level={4}
                                                            strong
                                                            type="success"
                                                            className="m-b0">
                                                            {formatToCurrency(item.amount)}
                                                        </Title>
                                                        <Text className="m-b0 text-blue">
                                                            <strong>{item.items}</strong> {langs.labels.items}
                                                        </Text>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Fragment>
                                )}
                            </LoadData>
                        </TabPane>
                    </Tabs>
                </div>
            </section>
        </Fragment>
    );
};
// This gets called on every request
// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(BuyerDashboard);
