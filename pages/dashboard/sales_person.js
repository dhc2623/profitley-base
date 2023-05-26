import { Col, DatePicker, Row, Tabs, Typography } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CollapsePanel from '../../components/common/collapsePanel';
import DocHead from '../../components/common/head';
import LoadData from '../../components/common/load-data';
import Buyers from '../../components/dashboard/Buyers';
import SalesOrders from '../../components/dashboard/SalesOrders';
import SalesOrdersSummary from '../../components/dashboard/SalesOrdersSummary';
import Statistic from '../../components/dashboard/Statistic';
import SalesPersonTargets from '../../components/dashboard/SalesPersonTargets';
import TopBrands from '../../components/dashboard/TopBrands';
import TopBuyers from '../../components/dashboard/TopBuyers';
import TopCategories from '../../components/dashboard/TopCategories';
import VisitInsights from '../../components/dashboard/VisitInsights';
import OrdersByStatus from '../../components/dashboard/OrdersByStatus';

import { DATE_FORMAT, USER_ROLES } from '../../config/Constant';
import { serverCheckIsUserLogin } from '../../helper/AuthActions';
import { formatToCurrency, getDate } from '../../helper/Utils';
import { langs } from '../../localization';
import { getDashboardData, getSummary } from '../../store/dashboard/Action';
import  withAppContext  from '../../config/withAppContext';
import PaymentBlock from '../../components/dashboard/PaymentBlock';
import { useRouter } from 'next/router';
const { Title, Text, Paragraph } = Typography;
const TabPane = Tabs.TabPane;

function DSPDashboard(props) {
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

    if (userDetail.role.name !== USER_ROLES.DSP.name) {
        router.push(`/dashboard/${userDetail.role.name}`);
    }

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.salesPerson} />
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
                                            placeholder={langs.labels.selectMonth}
                                            disabledDate={(date) => date > dayjs()}
                                        />
                                    </div>
                                </div>
                                <Row gutter={16}>
                                    <Col lg={12} md={12} xs={12}>
                                        <Statistic
                                            icon={'/assets/images/svg/notebook-icon.svg'}
                                            color={'#FEEEF1'}
                                            value={formatToCurrency(dashboardData.totalSales)}
                                            label={langs.labels.sales}
                                            onclick={`/orders/my-orders`}
                                            getQuery={{dateFrom: `01-${dashboardDate.format('MM')}-${dashboardDate.year()}`, dateTo: `30-${dashboardDate.format('MM')}-${dashboardDate.year()}`}}
                                        />
                                    </Col>
                                    <Col lg={12} md={12} xs={12}>
                                        <Statistic
                                            icon={'/assets/images/svg/schedule-icon.svg'}
                                            color={'#F0EDFE'}
                                            value={dashboardData.totalOrders}
                                            label={langs.labels.orders}
                                            onclick={`/orders/my-orders`}
                                            getQuery={{dateFrom: `01-${dashboardDate.format('MM')}-${dashboardDate.year()}`, dateTo: `30-${dashboardDate.format('MM')}-${dashboardDate.year()}`}}
                                        />
                                    </Col>
                                    {/* <Col lg={5} md={24} xs={12}>
                                        <Statistic
                                            icon={'/assets/images/svg/box-icon.svg'}
                                            color={'#ECF6FF'}
                                            value={formatToCurrency(dashboardData.collection)}
                                            label={langs.labels.collection}
                                        />
                                    </Col>
                                    <Col lg={5} md={24} xs={12}>
                                        <Statistic
                                            icon={'/assets/images/svg/box-icon.svg'}
                                            color={'#ECF6FF'}
                                            value={formatToCurrency(dashboardData.outstanding)}
                                            label={langs.labels.outstanding}
                                        />
                                    </Col>
                                    <Col lg={5} md={24} xs={12}>
                                        <Statistic
                                            icon={'/assets/images/svg/store-icon.svg'}
                                            color={'#E9F8F3'}
                                            value={formatToCurrency(dashboardData.receivale)}
                                            label={langs.labels.receivable}
                                        />
                                    </Col> */}
                                </Row>

                                <PaymentBlock
                                    title={langs.labels.payments}
                                    labelOne={langs.labels.collection}
                                    valueOne={formatToCurrency(dashboardData.collection)}
                                    labelTwo={langs.labels.outstanding}
                                    valueTwo={formatToCurrency(dashboardData.outstanding)}
                                    labelThree={langs.labels.received}
                                    valueThree={formatToCurrency(dashboardData.received)}
                                />

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

                                <Buyers
                                    totalBuyers={dashboardData.totalBuyers}
                                    buyerOrderAmount={dashboardData.buyerOrderAmount}
                                    zeroBillingBuyer={dashboardData.zeroBillingBuyer}
                                    averageBuyerOrder={dashboardData.averageBuyerOrder}
                                    categoryBuyers={dashboardData.categoryBuyers}
                                    newTodayRetailers={dashboardData.newTodayRetailers}
                                    newWeekRetailers={dashboardData.newWeekRetailers}
                                    newMonthRetailers={dashboardData.newMonthRetailers}
                                />

                                {dashboardData.dspVisits && dashboardData.dspVisits.length > 0 && (
                                    <div className="section-dsp-tar">
                                        {dashboardData.dspVisits.map((item, index) => (
                                            <VisitInsights
                                                key={index}
                                                item={item}
                                                dashboardDate={dashboardDate}
                                                title={langs.labels.visitInsights}
                                                defaultLoad={true}
                                            />
                                        ))}
                                    </div>
                                )}

                                {dashboardData.target && (
                                    <SalesPersonTargets
                                        target={dashboardData.target}
                                        userName={`${userDetail.name} ${userDetail.last_name}`}
                                    />
                                )}

                                <div className="section-dsp-tar">
                                    <Title level={4} className={'db-title'}>
                                        {langs.labels.top5} - {langs.labels.overall}
                                    </Title>
                                </div>
                                <div className="db-tabs mt0">
                                    <Tabs defaultActiveKey={'topBrands'}>
                                        <TabPane tab={langs.labels.brands} key="topBrands">
                                            <TopBrands list={dashboardData.topBrands} />
                                        </TabPane>
                                        <TabPane tab={langs.labels.categories} key="topCategories">
                                            <TopCategories list={dashboardData.topCategories} />
                                        </TabPane>
                                        <TabPane tab={langs.labels.buyers} key="topBuyers">
                                            <TopBuyers list={dashboardData.topBuyers} />
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </LoadData>
                        </TabPane>
                        <TabPane tab={langs.labels.daySummary} key="daySummary" className="p-l5 p-r5">
                            <LoadData data={summaryData} loading={loading}>
                                <div className="db-header-title">
                                    <Title level={4}>{getDate(summaryDate)}</Title>
                                    <div className="db-date-range">
                                        <DatePicker
                                            onChange={handleChangeSummaryDate}
                                            placeholder={langs.labels.selectDate}
                                            disabledDate={(date) => date > dayjs()}
                                        />
                                    </div>
                                </div>
                                <SalesOrdersSummary
                                    totalAmount={summaryData.totalAmount}
                                    totalOrders={summaryData.totalOrders}
                                    directAmount={summaryData.directAmount}
                                    directOrders={summaryData.directOrders}
                                    spAmount={summaryData.spAmount}
                                    spOrders={summaryData.spOrders}
                                    sellerAmount={summaryData.sellerAmount}
                                    sellerOrders={summaryData.sellerOrders}
                                    userDetail={userDetail}
                                />
                                <PaymentBlock
                                    title={langs.labels.payments}
                                    labelOne={langs.labels.collection}
                                    valueOne={formatToCurrency(summaryData.collection)}
                                    labelTwo={langs.labels.outstanding}
                                    valueTwo={formatToCurrency(summaryData.outstanding)}
                                    labelThree={langs.labels.received}
                                    valueThree={formatToCurrency(summaryData.received)}
                                />

                                <OrdersByStatus
                                    listOrdersByStatus = {summaryData.orderByStatus}
                                />
                                <Buyers
                                    totalBuyerOrders={summaryData.directOrders}
                                    buyerOrderAmount={summaryData.buyerTotalAmount}
                                    zeroBillingBuyer={summaryData.zeroBillingBuyer}
                                    averageBuyerOrder={summaryData.buyerAverageOrder}
                                    newRegistrations={summaryData.newRegistrations}
                                    totalOrders={summaryData.buyerTotalOrders}
                                    typeSummary={true}
                                />

                                {summaryData.dspVisits && summaryData.dspVisits.length > 0 && (
                                    <div className="section-dsp-tar">
                                        {summaryData.dspVisits.map((item, index) => (
                                            <VisitInsights
                                                item={item}
                                                key={index}
                                                summaryDate={summaryDate}
                                                isSummary={true}
                                                title={langs.labels.visitInsights}
                                                defaultLoad={true}
                                            />
                                        ))}
                                    </div>
                                )}

                                {summaryData.myOrders && (
                                    <Fragment>
                                        <div className="section-dsp-tar">
                                            <Title level={4} className={'db-title'}>
                                                {langs.labels.buyersOrder}
                                            </Title>
                                        </div>
                                        {summaryData.myOrders.map((item, index) => (
                                            <div className="db-card light paddingless mt2" key={index}>
                                                <div className="db-card-left">
                                                    <span
                                                        className="icon rounded"
                                                        style={{ backgroundColor: 'transparent' }}>
                                                        <img
                                                            src="/assets/images/seller-img.jpg"
                                                            alt=""
                                                        />
                                                    </span>
                                                    <div className="content">
                                                        <Title level={4} strong className="m-b0">
                                                            {item.shop_name}
                                                        </Title>
                                                        <Text className="m-b0">
                                                            <Text className="m-b0" strong>
                                                                {item.username}
                                                            </Text>
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
                                                            {formatToCurrency(item.totalAmount)}
                                                        </Title>
                                                        <Text className="m-b0 text-blue">
                                                            <strong>{item.totalItems}</strong> {langs.labels.items}
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

export default withAppContext(DSPDashboard);
