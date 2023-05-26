import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Typography, Select } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import Panel, { PanelRowItem } from '../common/panel';
import { getRetailerCollection } from '../../store/retailer/Action';
import useFilters from '../../hooks/useFilters';
import { formatToCurrency, getDateWithTime, importLoading } from '../../helper/Utils';
import { USER_ROLES } from '../../config/Constant';
import { langs } from '../../localization';
const ListHeader = dynamic(() => import('../common/listHeader'));
const ReduxPagination = dynamic(() => import('../common/pagination'));
const ReduxFilterTags = dynamic(() => import('../common/tag/ReduxFilterTags'));
const LoadData = dynamic(() => import('../common/load-data'));
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));
const CollectionAdd = dynamic(() => import('./CollectionAdd'));
const LedgerDrawerFilter = dynamic(() => import('./LedgerFilter'), { loading: importLoading });
const { Option } = Select;
const { Text, Title } = Typography;
const collectionData = {
    amount: '',
    bank_name: '',
    cheque_number: '',
    collected_by: '',
    is_cash: 1,
    collected_id: false
};
export default function Collection({ retailerId = '', userDetail, edit = true }) {
    const dispatch = useDispatch();
    const filterName = 'retailer-collection';

    const [filterVisible, setFilterVisible] = useState(false);
    const [visibleCollection, setVisibleCollection] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState(collectionData);
    const [filterHook, setFilterHook] = useFilters(filterName);

    const retailerCollection = useSelector((state) => state.retailer.retailerCollection);
    const retailerCollectionMeta = useSelector(
        (state) => state.retailer.retailerCollectionMeta.pagination
    );
    const loading = useSelector((state) => state.retailer.loading);
    const filterStroe = useSelector((state) => state.storeFilter);

    useEffect(() => { }, []);
    useEffect(() => {
        filterStroe[filterName] && getRetailerList();
    }, [retailerId, filterStroe]);

    const editCollection = (data) => {
        setSelectedCollection(data);
        setVisibleCollection(true);
    };

    const addCollection = () => {
        setSelectedCollection(collectionData);
        setVisibleCollection(true);
    };

    const closeCollection = () => {
        setSelectedCollection(collectionData);
        setVisibleCollection(false);
    };

    const getRetailerList = () =>
        dispatch(
            getRetailerCollection(retailerId, {
                ...filterHook
            })
        );

    return (
        <Fragment>
            <section className="wrap">
                <ListHeader
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                    count={retailerCollectionMeta.total}
                    label={langs.labels.transactions}
                    sortList={[]}
                    setfilterVisible={() => setFilterVisible(true)}
                    moreRightActions={[
                        {
                            click: addCollection,
                            hideItem: userDetail.role.name === USER_ROLES.BUYER.name,
                            render: () => (
                                <PlusOutlined style={{ fontSize: '25px', color: 'black' }} />
                            )
                        }
                    ]}
                />
                <div className="m-t10">
                    <ReduxFilterTags setPageQuery={setFilterHook} pageQuery={filterHook} />

                    <LoadData loading={loading} data={retailerCollection} verticalHeight={'70vh'}>
                        {retailerCollection.map((data, index) => {
                            return (
                                <Panel key={index}>
                                    <PanelRowItem
                                        className="v-center"
                                        label={
                                            <Fragment>
                                                <Text strong>
                                                    {data.is_cash
                                                        ? `${langs.labels.cash}`
                                                        : `${langs.labels.cheque} ${data.cheque_number} (${data.bank_name})`}
                                                </Text>
                                                <br />
                                                <Text type="secondary">{`${langs.labels.asOn} ${getDateWithTime(
                                                    data.created_at
                                                )}`}</Text>
                                                <br />
                                                <Text type="secondary">{`${langs.labels.by} ${data.collectedByName}`}</Text>
                                            </Fragment>
                                        }
                                        value={
                                            <div className={'align-right'}>
                                                <Text type={'success'} strong>
                                                    {formatToCurrency(data.amount)}
                                                </Text>
                                                <br />
                                                {
                                                    edit &&
                                                    <ButtonWraper
                                                        type="primary"
                                                        shape="circle"
                                                        icon={<EditOutlined />}
                                                        onClick={() => editCollection(data)}
                                                    />
                                                }

                                            </div>
                                        }
                                    />
                                </Panel>
                            );
                        })}
                    </LoadData>
                </div>
            </section>
            <ReduxPagination
                currentPage={retailerCollectionMeta.current_page}
                totalPages={retailerCollectionMeta.total_pages}
                loading={loading}
                setPageQuery={setFilterHook}
                pageQuery={filterHook}
            />
            {filterVisible && (
                <LedgerDrawerFilter
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                    setfilterVisible={setFilterVisible}
                    filterVisible={filterVisible}
                />
            )}
            <CollectionAdd
                closePopup={closeCollection}
                visible={visibleCollection}
                retailerID={retailerId}
                userDetail={userDetail}
                selectedData={selectedCollection}
            />
        </Fragment>
    );
}
