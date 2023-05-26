import { ArrowLeftOutlined } from '@ant-design/icons';
import { Col, Row, Table, Typography, Space } from 'antd';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListHeader from '../../../../components/common/listHeader';
import LoadData from '../../../../components/common/load-data';
import ReduxPagination from '../../../../components/common/pagination';
import Panel, { PanelTitle, PanelRowItem, PanelBody } from '../../../../components/common/panel';
import RetailerPageMenu from '../../../../components/my-retailers/RetailerPageMenu';
import Responsive from '../../../../components/responsive/Responsive';
import { DISPLAY_DATE_FORMAT } from '../../../../config/Constant';
import  withAppContext  from '../../../../config/withAppContext';
import { serverCheckIsUserLogin } from '../../../../helper/AuthActions';
import { slugify, getDate, formatToCurrency } from "../../../../helper/Utils";
import useFilters from '../../../../hooks/useFilters';
import { setChild } from '../../../../store/common/Action';
import { getRetailerVisits } from '../../../../store/retailer/Action';

// import PageTitle from '../../../components/common/page-title';
// import PageMenu from '../../../components/common/page-menu';
// import DocHead from '../../../components/common/head';
// import Ledger from '../../../components/my-retailers/Ledger';

const PageTitle = dynamic(() => import('../../../../components/common/page-title'));
const DocHead = dynamic(() => import('../../../../components/common/head'));

const { Text } = Typography;
const prdAttributeColumns = [
    {
        title: 'Visited By',
        dataIndex: 'dsp',
        key: 'dsp'
    },
    {
        title: 'Check In',
        dataIndex: 'checked_in_at',
        render: (checked_in_at) => dayjs(checked_in_at).format(DISPLAY_DATE_FORMAT),
        key: 'checked_in_at'
    },
    {
        title: 'Check Out',
        dataIndex: 'checked_out_at',
        render: (checked_out_at) =>  dayjs(checked_out_at).format(DISPLAY_DATE_FORMAT),
        key: 'checked_out_at'
    },
    {
        title: 'Total Order Amount',
        dataIndex: 'totalOrderAmount',
        render: (totalOrderAmount) =>  formatToCurrency(totalOrderAmount),
        key: 'totalOrderAmount',
        className: 'align-right'
    },
    {
        title: 'Total Order Count',
        dataIndex: 'totalOrderCount',
        key: 'totalOrderCount',
        className: 'align-center'
    },
    {
        title: 'Total Payment Collected',
        dataIndex: 'totalPaymentCollected',
        render: (totalPaymentCollected) =>  formatToCurrency(totalPaymentCollected),
        key: 'totalPaymentCollected',
        className: 'align-right'
    },
    {
        title: 'Comment',
        dataIndex: 'checkout_comment',
        key: 'comment'
    }
];

export function RetailerVisits(props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const loading = useSelector((state) => state.retailer.loading);
    const retailerVisits = useSelector((state) => state.retailer.visitsDetails);
    const retailerVisitsMeta = useSelector((state) => state.retailer.visitsMeta);
    const filterName = 'buyer-visits';
    const [filterHook, setFilterHook] = useFilters(filterName);
    const filterStroe = useSelector((state) => state.storeFilter);

    useEffect(() => {
        dispatch(setChild('/my-retailers'));
    }, []);

    useEffect(() => {
        filterStroe[filterName] &&
            dispatch(
                getRetailerVisits(router.query.retailerId, filterHook)
            );
    }, [filterStroe]);

    return (
        <Fragment>
            <DocHead pageTitle="Retailer Visits" />
            <section className="wrap">
                <div className="back-link-wrap">
                    <Link href="/my-retailers">
                        <a className="back-link">
                            <ArrowLeftOutlined />
                        </a>
                    </Link>
                    <PageTitle title={slugify(router.query.title)} />
                </div>
                <RetailerPageMenu {...router} active={'visits'} />
                <ListHeader
                    count={retailerVisitsMeta.pagination.count}
                    label={'Visits'}
                    sortList={[]}
                    filterOption={false}
                />
                <Responsive.Mobile>
                    <LoadData data={retailerVisits} loading={loading} verticalHeight={'70vh'}>
                    {retailerVisits.map((item, index) => (
                        <Row key={index}>
                            <Col span={24}>
                                <Panel size={false} className="buyer-listed-card">
                                    <PanelTitle
                                        title={
                                            <span>{item.dsp}</span>
                                        }
                                        headerRight={
                                            <Text strong>{getDate(item.checked_in_at)}</Text>
                                        }
                                    />
                                    <PanelBody>
                                        <React.Fragment>
                                            <div className="panel-row-item">
                                                <Text className="p-l0">
                                                    <Text type={'secondary'}>Check In: </Text>
                                                    {dayjs(item.checked_in_at).format('hh:mm A')}
                                                </Text>
                                                <Text className="right">
                                                    <Text type={'secondary'}>Check Out: </Text>
                                                    {dayjs(item.checked_out_at).format('hh:mm A')}
                                                </Text>
                                            </div>
                                            <div className="panel-row-item">
                                                {item.totalOrderAmount != 0 &&
                                                    <Text className="p-l0">
                                                        <Text type={'secondary'}>Order Amount:  </Text>
                                                        <Text type={'success'} strong>
                                                            {`${formatToCurrency(item.totalOrderAmount)}`}
                                                        </Text>
                                                    </Text>
                                                }
                                                {item.totalOrderCount != 0 &&
                                                    <Text className="right align-right">
                                                        <Text type={'secondary'}>Order: </Text>
                                                        {`${item.totalOrderCount}`}
                                                    </Text>
                                                }
                                            </div>
                                            {item.totalPaymentCollected != 0 &&
                                                <div className="panel-row-item">
                                                    <React.Fragment>
                                                        <Text type={'secondary'}>Payment Collected </Text>
                                                        <Text type={'success'} strong>
                                                            {`${formatToCurrency(item.totalPaymentCollected)}`}
                                                        </Text>
                                                    </React.Fragment>
                                                </div>
                                            }
                                            {item.checkout_comment &&
                                                <div className="panel-row-item">
                                                    <Text className="p-l0">
                                                        <Text type={'secondary'}>Comment </Text>
                                                        <br />
                                                        <span style={{fontWeight:400}}>{item.checkout_comment}</span>
                                                    </Text>
                                                </div>
                                            }
                                        </React.Fragment>
                                    </PanelBody>
                                </Panel>
                            </Col>
                        </Row>
                    ))}
                    </LoadData>
                </Responsive.Mobile>
                <Responsive.Desktop>
                    <div className="table-responsive">
                        <Table
                            pagination={false}
                            size={'small'}
                            columns={prdAttributeColumns}
                            dataSource={retailerVisits}
                            bordered
                            className={'m-t10'}
                        />
                    </div>
                </Responsive.Desktop>
                <ReduxPagination
                    currentPage={retailerVisitsMeta.current_page}
                    totalPages={retailerVisitsMeta.total_pages}
                    loading={loading}
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                />
            </section>
        </Fragment>
    );
}

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(RetailerVisits);
