import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import { getOrdersList } from '../../store/order/Action';
import TableWraper from '../../components/common/table';
import Responsive from '../../components/responsive/Responsive';
import useFilters from '../../hooks/useFilters';
import ReduxPagination from '../../components/common/pagination';
import ReduxFilterTags from '../../components/common/tag/ReduxFilterTags';
// import print from 'print-js'

import { setChild } from '../../store/common/Action';
import SelectBuyerToggle from '../../components/cart/select-buyer-toggle';
import { getCurrentRole, serverCheckIsUserLogin } from '../../helper/AuthActions';
import { USER_ROLES } from '../../config/Constant';
import { langs } from '../../localization';
import dynamic from 'next/dynamic';
import { importLoading } from '../../helper/Utils';
import { useRouter } from 'next/router';
import  withAppContext  from '../../config/withAppContext';
const OrderList = dynamic(() => import('../../components/orders/OrderItem'));
const OrderRowItem = dynamic(() => import('../../components/orders/OrderRowItem'));
const PageTitle = dynamic(() => import('../../components/common/page-title'));
const DocHead = dynamic(() => import('../../components/common/head'));
const ListHeader = dynamic(() => import('../../components/common/listHeader'));
const LoadData = dynamic(() => import('../../components/common/load-data'));

const OrderDrawerFilter = dynamic(() => import('../../components/orders/OrderFilter'), {
    loading: importLoading
});

const orderSort = [
    {
        value: '-created_at',
        label: `${langs.labels.orderNewToOld}`
    },
    {
        value: '+created_at',
        label: `${langs.labels.orderOldToNew}`
    },
    {
        value: '+amount',
        label: `${langs.labels.amountLowToHigh}`
    },
    {
        value: '-amount',
        label: `${langs.labels.amountHighToLow}`
    }
];
function MyOrders(props) {
    const userDetail = props.userMe.profile;
    const dispatch = useDispatch();
    const router = useRouter();
    const filterName = 'my-order';
    const [filterVisible, setFilterVisible] = useState(false);
    const [printOrder, setPrintOrder] = useState(null);
    const [filterHook, setFilterHook] = useFilters(filterName);
    const filterStore = useSelector((state) => state.storeFilter);
    const loading = useSelector((state) => state.order.loading);
    const orders = useSelector((state) => state.order.orderList);
    const orderListMeta = useSelector((state) => state.order.orderListMeta.pagination);

    useEffect(() => {
        dispatch(setChild(false));
        setFilterHook(router.query);
    }, []);

    useEffect(() => {
        filterStore[filterName] && dispatch(getOrdersList(filterHook));
    }, [filterStore]);

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.myOrders} />
            <section className="wrap">
                <Responsive.Desktop>
                    <ListHeader
                        setPageQuery={setFilterHook}
                        pageQuery={filterHook}
                        count={orderListMeta.total}
                        label={langs.labels.orders}
                        sortList={orderSort}
                        setfilterVisible={() => setFilterVisible(true)}
                    />
                    <ReduxFilterTags setPageQuery={setFilterHook} pageQuery={filterHook} />
                    <LoadData data={orders} loading={loading} verticalHeight={'70vh'}>
                        <TableWraper>
                            <thead>
                                <tr>
                                    <th>{langs.labels.order}</th>
                                    <th>{langs.labels.date}</th>
                                    {/* <th>{langs.labels.shipTo}</th> */}
                                    {userDetail.role.name != USER_ROLES.BUYER.name && (
                                        <th>{langs.labels.buyer}</th>
                                    )}

                                    <th>{langs.labels.placedBy}</th>
                                    <th className="align-center">{langs.labels.itemsQty}</th>
                                    <th className="align-right">{langs.labels.orderTotal}</th>
                                    <th className="align-center">{langs.labels.status}</th>
                                    <th className="align-right">{langs.labels.action}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => {
                                    return <OrderRowItem order={order} key={index} print={setPrintOrder} />;
                                })}
                            </tbody>
                        </TableWraper>
                    </LoadData>
                </Responsive.Desktop>
                <Responsive.Mobile>
                    <PageTitle title={langs.labels.myOrders} />
                    <ListHeader
                        setPageQuery={setFilterHook}
                        pageQuery={filterHook}
                        count={orderListMeta.total}
                        label={langs.labels.orders}
                        sortList={orderSort}
                        setfilterVisible={() => setFilterVisible(true)}
                    />
                    <ReduxFilterTags setPageQuery={setFilterHook} pageQuery={filterHook} />
                    <LoadData data={orders} loading={loading} verticalHeight={'70vh'}>
                        {orders.map((order, index) => {
                            return <OrderList order={order} key={index} print={setPrintOrder} />;
                        })}
                    </LoadData>
                </Responsive.Mobile>
                <ReduxPagination
                    currentPage={orderListMeta.current_page}
                    totalPages={orderListMeta.total_pages}
                    loading={loading}
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                />
                
            </section>
            {filterVisible && (
                <OrderDrawerFilter
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                    setfilterVisible={setFilterVisible}
                    filterVisible={filterVisible}
                />
            )}
        </Fragment>
    );
}

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(MyOrders);
