import {
    CodeSandboxOutlined,
    CreditCardOutlined,
    EnvironmentOutlined,
    PlusOutlined,
    RightOutlined,
    SnippetsFilled,
    UnorderedListOutlined,
    UserOutlined,
    PicLeftOutlined,
    ClusterOutlined
} from '@ant-design/icons';
import {
    Avatar,
    Button,
    Card,
    Col,
    Drawer,
    List,
    Progress,
    Row,
    Tooltip,
    Typography,
    Space
} from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonWraper from '../../components/common/form/ButtonWrapper';
import ReduxPagination from '../../components/common/pagination';
import Panel, {
    PanelRowItem,
    PanelSeparator,
    PanelTitle,
    PanelBody
} from '../../components/common/panel';
import ReduxFilterTags from '../../components/common/tag/ReduxFilterTags';
import { AXIOS_INSTANCE } from '../../config/Config';
import { USER_ROLES } from '../../config/Constant';
import withAppContext from '../../config/withAppContext';
import { serverCheckIsUserLogin } from '../../helper/AuthActions';
import { convertToSlug, formatToCurrency, getDate, importLoading } from '../../helper/Utils';
import useFilters from '../../hooks/useFilters';
import { langs } from '../../localization';
import { setChild } from '../../store/common/Action';
import { datePopupVisibility, setSelectedRetailer } from '../../store/plan/Action';
import { getRetailerList } from '../../store/retailer/Action';
import { List as VirtualizedList, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

// import PageTitle from '../../components/common/page-title';
// import DocHead from '../../components/common/head';
// import ListHeader from '../../components/common/listHeader';
// import LoadData from '../../components/common/load-data';

const PageTitle = dynamic(() => import('../../components/common/page-title'));
const DocHead = dynamic(() => import('../../components/common/head'));
const ListHeader = dynamic(() => import('../../components/common/listHeader'));
const LoadData = dynamic(() => import('../../components/common/load-data'));
const SelectDatePopup = dynamic(() => import('../../components/plan/partial/SelectDate'));

const RetailerDrawerFilter = dynamic(() => import('../../components/my-retailers/RetailerFilter'), {
    loading: importLoading
});

const { Text, Paragraph } = Typography;

const retailerCategories = [
    {
        value: '+shop_name',
        label: `${langs.labels.shopNameAtoZ}`
    },
    {
        value: '-shop_name',
        label: `${langs.labels.shopNameZtoA}`
    },
    {
        value: '+name',
        label: `${langs.labels.nameAtoZ}`
    },
    {
        value: '-name',
        label: `${langs.labels.nameZtoA}`
    },
    {
        value: '+category',
        label: `${langs.labels.categoryAtoZ}`
    },
    {
        value: '-category',
        label: `${langs.labels.categoryZtoA}`
    }
];

const cache = new CellMeasurerCache({
    defaultHeight: 119.2,
    fixedWidth: true
});

const RenderRetailerItem = ({
    retailer,
    col = 24,
    md = 8,
    xs = 24,
    currentUser,
    handleMoreInfo,
    style,
    measure
}) => {
    const dispatch = useDispatch();
    const [hideInfo, setHideInfo] = useState(false);
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {}, [loading]);
    useEffect(() => {
        measure();
    }, []);
    const openDatePopup = (retailer) => {
        dispatch(datePopupVisibility(true));
        dispatch(setSelectedRetailer(retailer));
    };

    const getInfo = () => {
        setLoading(true);
        AXIOS_INSTANCE.get(`/buyer-transaction-data/${retailer.id}`)
            .then((res) => {
                setInfo(res.data.success);
                setLoading(false);
            })
            .catch(() => {
                setInfo([]);
                setLoading(false);
            });
    };

    return (
        <Col md={col} xs={xs} style={style}>
            <Panel size={false} className="buyer-listed-card">
                <PanelTitle
                    title={
                        <Link
                            href={`/my-retailers/retailer-detail/[retailerId]/[title]`}
                            as={`/my-retailers/retailer-detail/${retailer.id}/${convertToSlug(
                                retailer.shop_name
                            )}`}
                            prefetch={false}>
                            <a>{retailer.shop_name}</a>
                        </Link>
                    }
                    action={[
                        {
                            render: () => (
                                <Button type={'ghost'} onClick={() => handleMoreInfo(retailer)}>
                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                </Button>
                            )
                        }
                    ]}
                />
                <PanelBody>
                    <Space>
                        <div className="category-tag">
                            {retailer.category}
                            <span>{langs.labels.category}</span>
                        </div>
                        <div>
                            <Paragraph className={'m-b0 icon-list'}>
                                <UserOutlined /> <b>{`${retailer.full_name}`}</b>
                            </Paragraph>
                            <Paragraph className={'m-b0 icon-list'}>
                                <EnvironmentOutlined />
                                {`${
                                    retailer.address1
                                        ? `${retailer.address1}, ${retailer.cityName} - ${retailer.pincode}`
                                        : ''
                                }`}
                            </Paragraph>

                            {currentUser.role.name === USER_ROLES.DSP.name && (
                                <Fragment>
                                    <a onClick={() => openDatePopup(retailer)}>
                                        {
                                            <Fragment>
                                                <PlusOutlined />{' '}
                                                {langs.labels.addThisBuyerToMyVisitPlan}
                                            </Fragment>
                                        }
                                    </a>
                                </Fragment>
                            )}
                        </div>
                    </Space>
                </PanelBody>
            </Panel>
        </Col>
    );
};

function MyRetailers(props) {
    const { hasAppSettings, userMe } = props;
    const userDetail = userMe.profile;
    const dispatch = useDispatch();
    const router = useRouter();
    const filterName = 'my-order';
    const [filterHook, setFilterHook] = useFilters(filterName);
    const filterStroe = useSelector((state) => state.storeFilter);
    const visibleDatePopup = useSelector((state) => state.plan.selectDatePopup);
    const selectedRetailer = useSelector((state) => state.plan.selectedRetailer);
    let retailerLoading = useSelector((state) => state.retailer.loading);
    let retailerList = useSelector((state) => state.retailer.retailerList);
    let retailerListMeta = useSelector((state) =>
        state.retailer.retailerListMeta ? state.retailer.retailerListMeta.pagination : {}
    );

    const openDatePopup = (retailer) => {
        dispatch(datePopupVisibility(true));
        dispatch(setSelectedRetailer(retailer));
    };

    const [filterVisible, setFilterVisible] = useState(false);

    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(false);

    const getInfo = (data) => {
        setLoading(true);
        AXIOS_INSTANCE.get(`/buyer-transaction-data/${data.id}`)
            .then((res) => {
                const resData = { ...data._raw, ...res.data.success };

                setInfo(resData);
                setLoading(false);
            })
            .catch(() => {
                setInfo([]);
                setLoading(false);
            });
    };
    const [buyersDetailVisible, setBuyersDetailVisible] = useState(false);
    const handleMoreInfo = (item) => {
        setInfo(item);
        setBuyersDetailVisible(true);
        getInfo(item);
    };
    const closeBuyersDetail = () => {
        setBuyersDetailVisible(false);
    };
    const percentage = (usedCredit, totalCredit) => {
        const used = parseInt(usedCredit);
        const total = parseInt(totalCredit);
        if (used >= total) {
            return 100;
        }
        return (used * 100) / total;
    };
    const showPercentage = percentage(info.creditLimit, info.usedLimit);

    useEffect(() => {
        dispatch(setChild(false));
        dispatch(
            getRetailerList({
                data: 'light'
            })
        );
    }, []);

    useEffect(() => {
        filterStroe[filterName] && dispatch(getRetailerList(filterHook));
    }, [filterStroe]);

    const closeDatePopup = () => {
        dispatch(datePopupVisibility(false));
        dispatch(setSelectedRetailer({}));
    };

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.myBuyers} />
            <section className="wrap">
                <PageTitle title={langs.labels.myBuyers} />
                <ListHeader
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                    count={retailerListMeta.total}
                    label={langs.labels.buyers}
                    sortList={retailerCategories}
                    setfilterVisible={() => setFilterVisible(true)}
                    moreRightActions={[
                        {
                            render: () => (
                                <PlusOutlined
                                    style={{ fontSize: '25px', color: 'black' }}
                                    onClick={() => router.push('my-retailers/new-buyer')}
                                />
                            )
                        }
                    ]}
                />
                <ReduxFilterTags setPageQuery={setFilterHook} pageQuery={filterHook} />

                <LoadData data={retailerList} loading={retailerLoading}>
                    <Row gutter={{ xs: 0, sm: 24 }}>
                        <VirtualizedList
                            width={375}
                            height={650}
                            rowCount={retailerList.length}
                            style={{ width: '100%' }}
                            containerStyle={{ width: '100%', maxWidth: '100%' }}
                            deferredMeasurementCache={cache}
                            rowHeight={cache.rowHeight}
                            rowRenderer={(props) => {
                                const { index, style, key, parent } = props;
                                const retailer = retailerList[index];
                                return (
                                    <CellMeasurer
                                        cache={cache}
                                        columnIndex={0}
                                        key={key}
                                        parent={parent}
                                        rowIndex={index}>
                                        {({ measure, registerChild }) => (
                                            <RenderRetailerItem
                                                ref={registerChild}
                                                {...props}
                                                currentUser={userDetail}
                                                retailer={retailer}
                                                md={8}
                                                xs={24}
                                                key={key}
                                                handleMoreInfo={handleMoreInfo}
                                                measure={measure}
                                            />
                                        )}
                                    </CellMeasurer>
                                );
                            }}
                        />
                    </Row>
                </LoadData>
                <ReduxPagination
                    currentPage={retailerListMeta.current_page}
                    totalPages={retailerListMeta.total_pages}
                    loading={retailerLoading}
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                />
            </section>
            {filterVisible && (
                <RetailerDrawerFilter
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                    setfilterVisible={setFilterVisible}
                    filterVisible={filterVisible}
                />
            )}
            {userDetail.role.name === USER_ROLES.DSP.name && visibleDatePopup && (
                <SelectDatePopup
                    visible={visibleDatePopup}
                    close={closeDatePopup}
                    retailer={selectedRetailer}
                />
            )}
            <Drawer
                title={langs.labels.buyerDetails}
                placement="right"
                onClose={closeBuyersDetail}
                visible={buyersDetailVisible}
                width={375}>
                <Panel size={false} className="buyer-detail-drawer-card">
                    <PanelTitle
                        title={
                            <Link
                                href={`/my-retailers/retailer-detail/[retailerId]/[title]`}
                                as={`/my-retailers/retailer-detail/${info.id}/${convertToSlug(
                                    info.shop_name
                                )}`}
                                prefetch={false}>
                                <a>{info.shop_name}</a>
                            </Link>
                        }
                        avatar={
                            <div className="category-tag">
                                {info.category}
                                <span>{langs.labels.category}</span>
                            </div>
                        }
                        subTitle={
                            <React.Fragment>
                                <Text>
                                    <UserOutlined /> <b>{`${info.full_name}`}</b>
                                </Text>
                                <br />
                                <Text>
                                    <EnvironmentOutlined />
                                    {`${
                                        info.address1
                                            ? `${info.address1}, ${info.cityName} - ${info.pincode}`
                                            : ''
                                    }`}
                                </Text>
                            </React.Fragment>
                        }
                    />
                    <LoadData data={info} loading={loading}>
                        <PanelSeparator
                            list={[
                                {
                                    label: `${langs.labels.lastOrderDate}`,
                                    value: getDate(info.lastOrderDate)
                                },
                                {
                                    label: `${langs.labels.lastInvoiceDate}`,
                                    value: getDate(info.lastInvoiceDate)
                                },
                                {
                                    label: `${langs.labels.lastPaymentDate}`,
                                    value: getDate(info.lastPaymentDate)
                                }
                            ]}
                        />
                        <PanelRowItem
                            label={<Text type="secondary">{langs.labels.pendingBackOrders}</Text>}
                            value={
                                <Text type="danger" strong>
                                    {info.pendingBackOrders}
                                </Text>
                            }
                        />
                        <PanelRowItem
                            label={<Text type="secondary">{langs.labels.outstandingPayment}</Text>}
                            value={
                                <Text type="danger" strong>
                                    {info.outstandingPayment}
                                </Text>
                            }
                        />
                        <PanelRowItem
                            label={<Text type="secondary">{langs.labels.currentMonthTarget}</Text>}
                            value={
                                <Text type="success" strong>
                                    {`${formatToCurrency(info.currentMonthTarget)}`}
                                </Text>
                            }
                        />
                        <PanelRowItem
                            label={<Text type="secondary">{langs.labels.targetCompletion}</Text>}
                            value={
                                <div
                                    style={{
                                        width: 90
                                    }}>
                                    <Progress
                                        trailColor="#E1E1E1"
                                        strokeColor="#00A651"
                                        percent={info.targetCompletion}
                                    />
                                </div>
                            }
                        />
                        <PanelRowItem
                            label={<Text type="secondary">{langs.labels.creditLimit}</Text>}
                            value={
                                <Text type="success" strong>
                                    {`${formatToCurrency(info.creditLimit)}`}
                                </Text>
                            }
                        />
                        <PanelRowItem
                            label={<Text type="secondary">{langs.labels.usedCredit}</Text>}
                            value={
                                <Text type="danger" strong>
                                    {`${formatToCurrency(info.usedLimit)}`}
                                </Text>
                            }
                        />
                        <div className="credit-limit-box">
                            <div className="mid p-r0">
                                <Tooltip
                                    title={`${showPercentage.toFixed(2)}% ${
                                        langs.labels.usedCredit
                                    }`}>
                                    <Progress
                                        trailColor="#00A651"
                                        strokeColor="red"
                                        percent={showPercentage}
                                        status={'success'}
                                        format={(percent) => `${percent.toFixed(0)}%`}
                                    />
                                </Tooltip>
                            </div>
                        </div>
                    </LoadData>
                    {userDetail.role.name === USER_ROLES.DSP.name && (
                        <Fragment>
                            <ButtonWraper
                                block
                                disabled={false}
                                type={'primary'}
                                onClick={() => openDatePopup(info)}
                                className={'m-b10'}>
                                <PlusOutlined /> {langs.labels.addThisBuyerToMyVisitPlan}
                            </ButtonWraper>
                        </Fragment>
                    )}
                    <div>
                        <Card className="panel-actions-list-card">
                            <List itemLayout="horizontal">
                                <Link
                                    href={`/my-retailers/retailer-detail/[retailerId]/[title]`}
                                    as={`/my-retailers/retailer-detail/${info.id}/${convertToSlug(
                                        info.shop_name
                                    )}`}>
                                    <a>
                                        <List.Item
                                            // onClick={() => handleLink(item)}
                                            className={'parent_cat'}
                                            extra={<RightOutlined />}>
                                            <List.Item.Meta
                                                avatar={<Avatar icon={<SnippetsFilled />} />}
                                                title={langs.labels.detail}
                                            />
                                        </List.Item>
                                    </a>
                                </Link>
                                <Link
                                    href={`/my-retailers/retailer-orders/[retailerId]/[title]`}
                                    as={`/my-retailers/retailer-orders/${info.id}/${convertToSlug(
                                        info.shop_name
                                    )}`}>
                                    <a>
                                        <List.Item
                                            className={'parent_cat'}
                                            extra={<RightOutlined />}>
                                            <List.Item.Meta
                                                avatar={<Avatar icon={<CodeSandboxOutlined />} />}
                                                title={
                                                    // <Link
                                                    //     href={`/my-retailers/retailer-orders/[retailerId]/[title]`}
                                                    //     as={`/my-retailers/retailer-orders/${info.id}/${convertToSlug(info.shop_name)}`}
                                                    // >
                                                    `${langs.labels.orders}`
                                                    // </Link>
                                                }
                                            />
                                        </List.Item>
                                    </a>
                                </Link>
                                <Link
                                    href={`/my-retailers/retailer-payment/[retailerId]/[title]`}
                                    as={`/my-retailers/retailer-payment/${info.id}/${convertToSlug(
                                        info.shop_name
                                    )}`}>
                                    <a>
                                        <List.Item
                                            // onClick={() => handleLink(item)}
                                            className={'parent_cat'}
                                            extra={<RightOutlined />}>
                                            <List.Item.Meta
                                                avatar={<Avatar icon={<ClusterOutlined />} />}
                                                title={langs.labels.collection}
                                            />
                                        </List.Item>
                                    </a>
                                </Link>
                                {hasAppSettings('Integration', 'tally') && (
                                    <Link
                                        href={`/my-retailers/retailer-ledger/[retailerId]/[title]`}
                                        as={`/my-retailers/retailer-ledger/${
                                            info.id
                                        }/${convertToSlug(info.shop_name)}`}>
                                        <a>
                                            <List.Item
                                                // onClick={() => handleLink(item)}
                                                className={'parent_cat'}
                                                extra={<RightOutlined />}>
                                                <List.Item.Meta
                                                    avatar={
                                                        <Avatar icon={<CreditCardOutlined />} />
                                                    }
                                                    title={langs.labels.ledger}
                                                />
                                            </List.Item>
                                        </a>
                                    </Link>
                                )}
                                <Link
                                    href={`/my-retailers/retailer-visits/[retailerId]/[title]`}
                                    as={`/my-retailers/retailer-visits/${info.id}/${convertToSlug(
                                        info.shop_name
                                    )}`}>
                                    <a>
                                        <List.Item
                                            // onClick={() => handleLink(item)}
                                            className={'parent_cat'}
                                            extra={<RightOutlined />}>
                                            <List.Item.Meta
                                                avatar={<Avatar icon={<UnorderedListOutlined />} />}
                                                title={langs.labels.visits}
                                            />
                                        </List.Item>
                                    </a>
                                </Link>
                                {hasAppSettings('Integration', 'tally') && (
                                    <Link
                                        href={`/my-retailers/retailer-invoices/[retailerId]/[title]`}
                                        as={`/my-retailers/retailer-invoices/${
                                            info.id
                                        }/${convertToSlug(info.shop_name)}`}>
                                        <a>
                                            <List.Item
                                                // onClick={() => handleLink(item)}
                                                className={'parent_cat'}
                                                extra={<RightOutlined />}>
                                                <List.Item.Meta
                                                    avatar={<Avatar icon={<PicLeftOutlined />} />}
                                                    title={langs.labels.invoices}
                                                />
                                            </List.Item>
                                        </a>
                                    </Link>
                                )}
                            </List>
                        </Card>
                    </div>
                </Panel>
            </Drawer>
        </Fragment>
    );
}

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(MyRetailers);
