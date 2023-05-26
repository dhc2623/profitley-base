import { ArrowLeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Modal, Typography } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReduxPagination from '../../../../components/common/pagination';
import Panel, {
    PanelRowItem,
    PanelSeparator,
    PanelTitle
} from '../../../../components/common/panel';
import StatusTag from '../../../../components/common/tag';
import ReduxFilterTags from '../../../../components/common/tag/ReduxFilterTags';
import RetailerPageMenu from '../../../../components/my-retailers/RetailerPageMenu';
import Responsive from '../../../../components/responsive/Responsive';
import { USER_ROLES } from '../../../../config/Constant';
import  withAppContext  from '../../../../config/withAppContext';
import { getCurrentRole, serverCheckIsUserLogin } from '../../../../helper/AuthActions';
import {
    formatToCurrency,
    getConfirmPromise, getDataInCookies,
    getDate,
    getDateWithTime, getStatusColor, importLoading,
    slugify
} from '../../../../helper/Utils';
import useFilters from '../../../../hooks/useFilters';
import { langs } from '../../../../localization';
import { ADD_MULTI_ITEM_INITIATE, setRetailerDrawer } from '../../../../store/cart/Action';
import { setChild } from '../../../../store/common/Action';
import { getRetailerOrders } from '../../../../store/retailer/Action';
// import PageTitle from '../../../components/common/page-title';
// import PageMenu from '../../../components/common/page-menu';
// import DocHead from '../../../components/common/head';
// import LoadData from '../../../components/common/load-data';
// import ListHeader from '../../../components/common/listHeader';
// import TableWraper from '../../../components/common/table';
const PageTitle = dynamic(() => import('../../../../components/common/page-title'));
const DocHead = dynamic(() => import('../../../../components/common/head'));
const LoadData = dynamic(() => import('../../../../components/common/load-data'));
const ListHeader = dynamic(() => import('../../../../components/common/listHeader'));
const TableWraper = dynamic(() => import('../../../../components/common/table'));

const OrderDrawerFilter = dynamic(() => import('../../../../components/orders/OrderFilter'), {
    loading: importLoading
});
const { Text } = Typography;

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

function RetailerOrders(props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const orders = useSelector((state) => state.retailer.retailerOrderList);
    const retailerOrderListMeta = useSelector((state) =>
        state.retailer.retailerOrderListMeta ? state.retailer.retailerOrderListMeta.pagination : {}
    );

    const loading = useSelector((state) => state.retailer.loading);

    const filterName = 'my-order';
    const [filterVisible, setFilterVisible] = useState(false);

    const [filterHook, setFilterHook] = useFilters(filterName);
    const filterStroe = useSelector((state) => state.storeFilter);
    const cartItems = useSelector((state) => state.cart.cartDetails.total_items);

    useEffect(() => {
        if (router.query && router.query.retailerId) {
            dispatch(setChild('/my-retailers'));
            dispatch(
                getRetailerOrders({
                    ...filterHook,
                    retailerId: router.query.retailerId
                })
            );
        }
    }, [router.query]);

    useEffect(() => {
        filterStroe[filterName] &&
            dispatch(
                getRetailerOrders({
                    ...filterHook,
                    retailerId: router.query.retailerId
                })
            );
    }, [filterStroe]);

    /**
     * @name openConfirmationModal
     * @description It opens confirmation modal for re-order
     * @param {items}
     * @returns {}
     */
    const openConfirmationModal = async (items) => {
        if (
            getDataInCookies('selectedRetailer') ||
            getCurrentRole().name == USER_ROLES.BUYER.name
        ) {
            if (cartItems > 0) {
                Modal.confirm({
                    title: `${langs.labels.reorder}`,
                    content:`${langs.labels.reorderModalContent}`,
                    okText: `${langs.labels.yes}`,
                    cancelText: `${langs.labels.no}`,
                    onOk() {
                        reOrder(items);
                    }
                });
            } else {
                reOrder(items);
            }
        } else {
            const confi = await getConfirmPromise({
                title: `${langs.labels.selectRetailer}`,
                content: `${langs.labels.selectBuyerReorderContent}`,
            });
            if (confi) {
                dispatch(setRetailerDrawer(true));
            }
        }
    };

    /**
     * @name reOrder
     * @description It adds all the items to cart
     * @param {items}
     * @returns {}
     */
    const reOrder = (items) => {
        let newItems = [];
        items.map((item) => {
            let obj = {
                item_id: item.id,
                original_price: item.regular_price,
                price: item.price,
                quantity: item.quantity,
                sku_code: item.sku_code
            };
            newItems.push(obj);
        });

        let postData = {
            items: newItems
        };
        dispatch({ type: ADD_MULTI_ITEM_INITIATE, postData });
    };

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.retailerOrders} />
            <section className="wrap">
                <div className="back-link-wrap">
                    <Link href="/my-retailers">
                        <a className="back-link">
                            <ArrowLeftOutlined />
                        </a>
                    </Link>
                    <PageTitle title={slugify(router.query.title)} />
                </div>
                <RetailerPageMenu {...router} active={'orders'} />
                <ListHeader
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                    count={retailerOrderListMeta.total}
                    label={langs.labels.orders}
                    sortList={orderSort}
                    setfilterVisible={() => setFilterVisible(true)}
                />
                <ReduxFilterTags setPageQuery={setFilterHook} pageQuery={filterHook} />
                <LoadData loading={loading} data={orders} verticalHeight={'70vh'}>
                    <Responsive.Desktop>
                        <TableWraper>
                            <thead>
                                <tr>
                                    <th>{langs.labels.order}</th>
                                    <th>{langs.labels.date}</th>
                                    <th>{langs.labels.placedBy}</th>
                                    <th className="align-center">{langs.labels.itemsQty}.</th>
                                    <th className="align-right">{langs.labels.orderTotal}</th>
                                    <th className="align-center">{langs.labels.status}</th>
                                    <th className="align-right">{langs.labels.action}</th>
                                    <th width="1%" nowrap="true"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders &&
                                    orders.length > 0 &&
                                    orders.map((order) => {
                                        const {
                                            order_number,
                                            status,
                                            created_at,
                                            items,
                                            amount,
                                            created_by_name
                                        } = order;
                                        return (
                                            <tr key={order_number}>
                                                <td>
                                                    <Link
                                                        href={`/orders/order-details/[orderId]`}
                                                        as={`/orders/order-details/${order.id}`}>
                                                        {order_number}
                                                    </Link>
                                                </td>
                                                <td>{getDateWithTime(created_at)}</td>
                                                <td>{created_by_name}</td>
                                                <td className="align-center">
                                                    {items.length ? `${items.length}` : 'NA'}
                                                </td>
                                                <td className="align-right">
                                                    <Text type="success">
                                                        {formatToCurrency(amount)}
                                                    </Text>
                                                </td>
                                                <td className="align-center">
                                                    <StatusTag
                                                        value={status}
                                                        color={getStatusColor(status)}
                                                    />
                                                </td>
                                                <td className="align-right">
                                                    <a
                                                        onClick={() =>
                                                            openConfirmationModal(order.items)
                                                        }
                                                        href="#"
                                                        className="text-red fs-12 tr-upp">
                                                        {langs.labels.reorder}
                                                    </a>
                                                </td>
                                                <td>
                                                    <Link
                                                        href={`/orders/order-details/[orderId]`}
                                                        as={`/orders/order-details/${order.id}`}>
                                                        <Button type="default">
                                                            <span className="m-r10">
                                                                {langs.labels.orderDetails}
                                                            </span>{' '}
                                                            <RightOutlined />
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </TableWraper>
                    </Responsive.Desktop>

                    <Responsive.Mobile>
                        {orders &&
                            orders.length > 0 &&
                            orders.map((order) => {
                                const {
                                    order_number,
                                    status,
                                    created_at,
                                    items = '4',
                                    amount,
                                    created_by_name
                                } = order;
                                return (
                                    <Panel key={order_number}>
                                        <PanelTitle
                                            title={
                                                <Link
                                                    href={`/orders/order-details/[orderId]`}
                                                    as={`/orders/order-details/${order.id}`}>
                                                    {order_number}
                                                </Link>
                                            }
                                            status={status}
                                            statusBackground={getStatusColor(status)}
                                        />
                                        <PanelSeparator
                                            list={[
                                                {
                                                    label: `${langs.labels.orderDate}`,
                                                    value: created_at
                                                        ? `${getDate(created_at)}`
                                                        : 'NA'
                                                },
                                                {
                                                    label: `${langs.labels.totalLineItems}`,
                                                    value: items.length ? `${items.length}` : 'NA'
                                                },
                                                {
                                                    label: `${langs.labels.totalValue}`,
                                                    value: (
                                                        <Text type="success">
                                                            {formatToCurrency(amount)}
                                                        </Text>
                                                    )
                                                }
                                            ]}
                                        />

                                        <PanelRowItem
                                            label={langs.labels.placedBy}
                                            value={<strong>{created_by_name}</strong>}
                                        />
                                    </Panel>
                                );
                            })}
                    </Responsive.Mobile>
                </LoadData>
                <ReduxPagination
                    currentPage={retailerOrderListMeta.current_page}
                    totalPages={retailerOrderListMeta.total_pages}
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

export default withAppContext(RetailerOrders);
