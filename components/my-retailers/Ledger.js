import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import moment from 'moment';
import { Typography, Row, Col } from 'antd';
import Panel, {  PanelTitle } from '../common/panel';
import { getRetailerLedger } from '../../store/retailer/Action';
import useFilters from '../../hooks/useFilters';
import { formatToCurrency, importLoading, getDate } from '../../helper/Utils';
import { langs } from '../../localization';
const ListHeader = dynamic(() => import('../common/listHeader'));
const ReduxPagination = dynamic(() => import('../common/pagination'));
const ReduxFilterTags = dynamic(() => import('../common/tag/ReduxFilterTags'));
const LoadData = dynamic(() => import('../common/load-data'));
const StatusTag = dynamic(() => import('../common/tag'));
const LedgerDrawerFilter = dynamic(() => import('./LedgerFilter'), { loading: importLoading });
const { Text, Title } = Typography;

export default function Ledger(props) {
    const dispatch = useDispatch();
    const router = useRouter();

    const filterName = 'retailer-ledger';

    const [filterVisible, setFilterVisible] = useState(false);
    const [filterHook, setFilterHook] = useFilters(filterName);

    let ledgerDetails = useSelector((state) => state.retailer.ledgerDetails);
    const transactions = ledgerDetails.ledger;
    const summary = ledgerDetails.summary;
    console.log('summary: ', summary);

    const loading = useSelector((state) => state.retailer.loading);
    const filterStroe = useSelector((state) => state.storeFilter);
    const ledgerMeta = useSelector((state) =>
        state.retailer.ledgerMeta ? state.retailer.ledgerMeta.pagination : {}
    );

    useEffect(() => {
        if (props.retailerId) {
            dispatch(
                getRetailerLedger({
                    ...filterHook,
                    retailerId: props.retailerId
                })
            );
        }
    }, [props.retailerId]);

    useEffect(() => {
        filterStroe[filterName] &&
            props.retailerId &&
            dispatch(
                getRetailerLedger({
                    ...filterHook,
                    retailerId: props.retailerId
                })
            );
    }, [filterStroe]);

    return (
        <Fragment>
            <section className="wrap">
                {/* <div className="label-value p-t10 p-b10">
                    <div>
                        <Title level={5} strong>
                            {langs.labels.currentTotalOutstanding}{':'}
                        </Title>
                        <Text type="secondary" strong>{`${langs.labels.asOn}: ${getDate(moment())}`}</Text>
                    </div>
                    <Title level={4} type="danger" strong className={'m-t0 m-b0'}>
                        {formatToCurrency(ledgerDetails.current_outstanding)}
                    </Title>
                </div> */}
                {summary &&
                <Row gutter={[15, 0]} className="m-b10">
                    <Col md={6} xs={12}>
                        <Panel className="bg-light-blue">
                            <PanelTitle
                                title={formatToCurrency(summary.opening_balance)}
                                subTitle={
                                    <Fragment>
                                        <Text className='p-l0 p-r5'>{langs.labels.openingBalance}</Text>
                                    </Fragment>
                                }
                            />
                        </Panel>
                    </Col>
                    <Col md={6} xs={12}>
                        <Panel className="bg-light-yellow">
                            <PanelTitle
                                title={formatToCurrency(summary.closing_balance)}
                                subTitle={
                                    <Fragment>
                                        <Text className='p-l0 p-r5'>{langs.labels.closingBalance}</Text>
                                    </Fragment>
                                }
                            />
                        </Panel>
                    </Col>
                    <Col md={6} xs={12}>
                        <Panel className="bg-light-red">
                            <PanelTitle
                                title={formatToCurrency(summary.totalDr)}
                                subTitle={
                                    <Fragment>
                                        <Text className='p-l0 p-r5'>{langs.labels.totalDebit}</Text>
                                    </Fragment>
                                }
                            />
                        </Panel>
                    </Col>
                    <Col md={6} xs={12}>
                        <Panel className="bg-light-green">
                            <PanelTitle
                                title={formatToCurrency(summary.totalCr)}
                                subTitle={
                                    <Fragment>
                                        <Text className='p-l0 p-r5 fs-14'>{langs.labels.totalCredit}</Text>
                                    </Fragment>
                                }
                            />
                        </Panel>
                    </Col>
                </Row>
                }

                <ListHeader
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                    count={ledgerMeta.total}
                    label={langs.labels.transactions}
                    sortList={[]}
                    setfilterVisible={() => setFilterVisible(true)}
                />
                <div className="m-t10">
                    <ReduxFilterTags setPageQuery={setFilterHook} pageQuery={filterHook} />

                    <LoadData loading={loading} data={transactions}>
                        {transactions.map((data, index) => {
                            return (
                                <Panel key={index}>
                                    <PanelTitle
                                        title={data.particulars}
                                        subTitle={
                                            <Fragment>
                                                <Text className='p-l0 p-r5'>{getDate(data.date)}</Text> |
                                                <Text className='p-l10'>{data.voucher_type}</Text>
                                            </Fragment>
                                        }
                                        headerRight={
                                            <div className='align-right'>
                                                <StatusTag value={data.type} color={data.type == 'CR' ? '#52c41a' : '#ff4d4f'} className='m-t0 m-r0' /><br />
                                                <Text
                                                    //type={data.type == 'CR' ? 'success' : 'danger'}
                                                    strong
                                                >
                                                    {formatToCurrency(data.amount)}
                                                </Text>
                                            </div>
                                        }
                                    />
                                </Panel>
                            );
                        })}
                    </LoadData>
                </div>
                <ReduxPagination
                    currentPage={ledgerMeta.current_page}
                    totalPages={ledgerMeta.total_pages}
                    loading={loading}
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                />
            </section>
            {filterVisible && (
                <LedgerDrawerFilter
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                    setfilterVisible={setFilterVisible}
                    filterVisible={filterVisible}
                />
            )}
        </Fragment>
    );
}
