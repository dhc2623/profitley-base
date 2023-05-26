import {
    ArrowLeftOutlined,
    EnvironmentOutlined,
    MailOutlined,
    UserOutlined,
    PhoneOutlined
} from '@ant-design/icons';
import { List as VirtualizedList, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

import { Col, notification, Row, Typography, Space } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonWraper from '../../../../components/common/form/ButtonWrapper';
import FormInputWrapper from '../../../../components/common/form/InputWrapper';
import DocHead from '../../../../components/common/head';
import ListHeader from '../../../../components/common/listHeader';
import LoadData from '../../../../components/common/load-data';
import PageMenu from '../../../../components/common/page-menu';
import PageTitle from '../../../../components/common/page-title';
import ReduxPagination from '../../../../components/common/pagination';
import Panel, { PanelBody, PanelTitle } from '../../../../components/common/panel';
import ReduxFilterTags from '../../../../components/common/tag/ReduxFilterTags';
import withAppContext from '../../../../config/withAppContext';
import { serverCheckIsUserLogin } from '../../../../helper/AuthActions';
import { convertToSlug, importLoading } from '../../../../helper/Utils';
import useFilters from '../../../../hooks/useFilters';
import { langs } from '../../../../localization';
import { setChild } from '../../../../store/common/Action';
import {
    ASSIGN_RETAILER_TO_DSP_INITIATE,
    GET_DSP_DETAILS_INITIATE
} from '../../../../store/myTeam/Action';
import { getRetailerList, GET_RETAILER_LIST_INITIATE } from '../../../../store/retailer/Action';
const RetailerDrawerFilter = dynamic(
    () => import('../../../../components/my-retailers/RetailerFilter'),
    { loading: importLoading }
);

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

const BuyerItem = ({ retailer, style, measure, selectedRetailers, onRetailerSelection  }) => {
    useEffect(() => {
        measure();
    }, []);
    return (
        <Col md={24} xs={24} style={style}>
            <Panel size={false}>
                <PanelTitle
                    title={
                        <Link
                            href={`/my-retailers/retailer-detail/[retailerId]/[title]`}
                            as={`/my-retailers/retailer-detail/${retailer.id}/${retailer.shop_name}`}
                            prefetch={false}>
                            <a>{retailer.shop_name}</a>
                        </Link>
                    }
                    selection
                    selectionCenterV={true}
                    selectionValue={selectedRetailers.indexOf(retailer.id.toString()) > -1}
                    onSelectionChange={(e) =>
                        onRetailerSelection(e.target.checked, retailer.id.toString())
                    }
                    action={[
                        {
                            onClick: () => window.open(`tel:${retailer.phone_number}`),
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
                            {retailer.category}
                            <span>{langs.labels.category}</span>
                        </div>
                        <div>
                            <Typography.Paragraph className="m-b0">
                                <UserOutlined /> {retailer.full_name}
                            </Typography.Paragraph>
                            <Typography.Paragraph className="m-b0">
                                <EnvironmentOutlined />
                                {`${
                                    retailer.address1
                                        ? `${retailer.address1}, ${retailer.cityName} - ${retailer.pincode}`
                                        : ''
                                }`}
                            </Typography.Paragraph>
                        </div>
                    </Space>
                </PanelBody>
            </Panel>
        </Col>
    );
};

const AssignRetailers = (props) => {
    const filterName = 'assign-retailers';
    const [filterHook, setFilterHook] = useFilters(filterName);
    const filterStroe = useSelector((state) => state.storeFilter);
    const dispatch = useDispatch();
    const router = useRouter();
    const [dspDetails, setDSPDetails] = useState('');
    const [selectedRetailers, setSelectedRetailers] = useState([]);
    const [filterVisible, setFilterVisible] = useState(false);
    const retailerLoading = useSelector((state) => state.retailer.loading);
    const retailerList = useSelector((state) => state.retailer.retailerList);
    const retailerListMeta = useSelector((state) => state.retailer.retailerListMeta.pagination);

    let myTeam = useSelector((state) => state.myTeam);

    let loading = useSelector((state) => state.myTeam.loading);

    useEffect(() => {
        dispatch(setChild('/my-team'));
    }, []);

    useEffect(() => {
        if (router.query && router.query.dspId) {
            let dspId = router.query.dspId;
            dispatch({ type: GET_DSP_DETAILS_INITIATE, dspId });
            dispatch({ type: GET_RETAILER_LIST_INITIATE });
        }
    }, [router.query]);

    useEffect(() => {
        if (myTeam.dspDetails) {
            setDSPDetails(myTeam.dspDetails);

            setSelectedRetailers(myTeam.dspDetails.retailers ? myTeam.dspDetails.retailers : []);
        }
    }, [myTeam.dspDetails]);

    useEffect(() => {
        filterStroe[filterName] && dispatch(getRetailerList(filterHook));
    }, [filterStroe]);

    /**
     * @name onRetailerSelection
     * @description It handles retailer selection
     * @param {checked, id}
     * @returns {}
     */
    const onRetailerSelection = (checked, id) => {
        let retailers = [...selectedRetailers];
        if (checked) {
            retailers.push(id);
        } else {
            let index = selectedRetailers.indexOf(id);
            if (index > -1) retailers.splice(index, 1);
        }
        setSelectedRetailers(retailers);
    };

    /**
     * @name assignRetailers
     * @description It assigns retailer to DSP
     * @param {checked, id}
     * @returns {}
     */
    const assignRetailers = (e) => {
        let retailers = '';
        if (selectedRetailers.length > 0) {
            selectedRetailers.map((id, index) => {
                if (index) {
                    retailers += `,${id}`;
                } else {
                    retailers = `${id}`;
                }
            });
            const postData = {
                dsp: dspDetails.id,
                retailers: retailers
            };
            dispatch({ type: ASSIGN_RETAILER_TO_DSP_INITIATE, postData });
        } else {
            notification['warning']({
                message: `${langs.labels.warning}`,
                description: `${langs.labels.selectAtleastOneBuyer}`
            });
        }
    };

    /**
     * @name resetSelectedRetailers
     * @description It resets selected retailer
     * @param {checked, id}
     * @returns {}
     */
    const resetSelectedRetailers = () => {
        setSelectedRetailers(dspDetails.retailers);
    };

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.assignBuyers} />
            <section className="wrap">
                <div className="back-link-wrap">
                    <Link href="/my-team">
                        <a className="back-link">
                            <ArrowLeftOutlined />
                        </a>
                    </Link>
                    <PageTitle title={dspDetails.full_name} />
                </div>
                <PageMenu
                    navItem={[
                        {
                            name: `${langs.labels.details}`,
                            slug: 'details',
                            onClick: () =>
                                router.push(
                                    `/my-team/dsp-details/[dspId]/[title]`,
                                    `/my-team/dsp-details/${router.query.dspId}/${convertToSlug(
                                        router.query.title
                                    )}`
                                )
                        },
                        {
                            name: `${langs.labels.buyers}`,
                            slug: 'retailers',
                            active: true,
                            onClick: () =>
                                router.push(
                                    `/my-team/assign-retailers/[dspId]/[title]`,
                                    `/my-team/assign-retailers/${
                                        router.query.dspId
                                    }/${convertToSlug(router.query.title)}`
                                )
                        },
                        {
                            name: `${langs.labels.plannedVisits}`,
                            slug: 'planVisit',
                            onClick: () =>
                                router.push(
                                    `/my-team/dsp-plan/[dspId]/[title]`,
                                    `/my-team/dsp-plan/${router.query.dspId}/${convertToSlug(
                                        router.query.title
                                    )}`
                                )
                        }
                    ]}
                />
                <ListHeader
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                    count={retailerListMeta.total}
                    label={langs.labels.buyers}
                    sortList={retailerCategories}
                    setfilterVisible={() => setFilterVisible(true)}
                />
                <div className={'p-t5'} />
                {langs.labels.checkAndUncheckForAssigningBuyersTo} "{dspDetails.full_name}"
                <ReduxFilterTags setPageQuery={setFilterHook} pageQuery={filterHook} />
                <LoadData data={retailerList} loading={loading}>
                    <Row gutter={[16, 0]}>
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
                                            <BuyerItem
                                                ref={registerChild}
                                                measure={measure}
                                                retailer={retailer}
                                                selectedRetailers={selectedRetailers}
                                                onRetailerSelection={onRetailerSelection}
                                                {...props}
                                            />
                                        )}
                                    </CellMeasurer>
                                );
                            }}
                        />
                    </Row>
                    <div className="m-t0">
                        <ReduxPagination
                            currentPage={retailerListMeta.current_page}
                            totalPages={retailerListMeta.total_pages}
                            loading={retailerLoading}
                            setPageQuery={setFilterHook}
                            pageQuery={filterHook}
                        />
                        <FormInputWrapper>
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <ButtonWraper
                                        loading={loading}
                                        type="primary"
                                        ghost
                                        block
                                        onClick={resetSelectedRetailers}>
                                        {langs.labels.reset}
                                    </ButtonWraper>
                                </Col>
                                <Col span={12}>
                                    <ButtonWraper
                                        loading={loading}
                                        type="primary"
                                        htmlType="submit"
                                        // disabled={!selectedRetailers.length}
                                        onClick={assignRetailers}
                                        block>
                                        {langs.labels.assignBuyers}
                                    </ButtonWraper>
                                </Col>
                            </Row>
                        </FormInputWrapper>
                    </div>
                </LoadData>
            </section>
            {filterVisible && (
                <RetailerDrawerFilter
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                    setfilterVisible={setFilterVisible}
                    filterVisible={filterVisible}
                />
            )}
        </Fragment>
    );
};

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(AssignRetailers);
