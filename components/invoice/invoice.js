import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { langs } from '../../localization';
import { getRetailerInvoice } from '../../store/retailer/Action';
import useFilters from '../../hooks/useFilters';
import { importLoading } from '../../helper/Utils';
import Responsive from '../responsive/Responsive';
const ReduxFilterTags = dynamic(() => import('../common/tag/ReduxFilterTags'));
const LoadData = dynamic(() => import('../common/load-data'));
const ListHeader = dynamic(() => import('../common/listHeader'));
const ReduxPagination = dynamic(() => import('../common/pagination'));
const CollapsePanel = dynamic(() => import('../common/collapsePanel'));
const InvoiceDrawerFilter = dynamic(() => import('./InvoiceFilter'), { loading: importLoading });
const InvoiceList = dynamic(() => import('./InvoiceItem'));
const InvoiceRowItem = dynamic(() => import('./InvoiceRowItem'));
const TableWraper = dynamic(() => import('../common/table'));

export default function Invoice(props) {
    const dispatch = useDispatch();
    const filterName = 'retailer-invoice';
    const [filterVisible, setFilterVisible] = useState(false);
    const [filterHook, setFilterHook] = useFilters(filterName);
    let invoiceDetails = useSelector((state) => state.retailer.invoiceDetails);
    const invoiceDetailsData = invoiceDetails.data;
    const loading = useSelector((state) => state.retailer.loading);
    const filterStroe = useSelector((state) => state.storeFilter);
    const invoiceMeta = useSelector((state) =>
        state.retailer.invoiceMeta ? state.retailer.invoiceMeta.pagination : {}
    );

    useEffect(() => {
        if (props.retailerId) {
            dispatch(
                getRetailerInvoice({
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
                getRetailerInvoice({
                    ...filterHook,
                    retailerId: props.retailerId
                })
            );
    }, [filterStroe]);

    return (
        <Fragment>
            <section className="wrap">
                <ListHeader
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                    count={invoiceMeta.total}
                    label={langs.labels.invoices}
                    sortList={[]}
                    setfilterVisible={() => setFilterVisible(true)}
                />
                <div className="m-t10">
                    <ReduxFilterTags setPageQuery={setFilterHook} pageQuery={filterHook} />
                    <Responsive.Desktop>
                        <LoadData data={invoiceDetailsData} loading={loading}>
                            <TableWraper>
                                <thead>
                                    <tr>
                                        <th>{langs.labels.invoice}</th>
                                        <th>{langs.labels.order}</th>
                                        <th className="align-right">{langs.labels.amount}</th>
                                        <th className="align-center">{langs.labels.status}</th>
                                        <th>{langs.labels.invoiceDate}</th>
                                        <th className="align-right" width="1%" nowrap="true">{langs.labels.action}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceDetailsData && invoiceDetailsData.map((data, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <InvoiceRowItem invoice={data} />
                                            </Fragment>
                                        );
                                    })}
                                </tbody>
                            </TableWraper>
                        </LoadData>
                    </Responsive.Desktop>
                    <Responsive.Mobile>
                        <LoadData data={invoiceDetailsData} loading={loading}>
                            {invoiceDetailsData &&
                                <CollapsePanel>
                                    {invoiceDetailsData.map((data, index) => {
                                        return (
                                            <InvoiceList invoice={data} key={index} index={index} />
                                        );
                                    })}
                                </CollapsePanel>
                            }
                        </LoadData>
                    </Responsive.Mobile>
                </div>
                <ReduxPagination
                    currentPage={invoiceMeta.current_page}
                    totalPages={invoiceMeta.total_pages}
                    loading={loading}
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                />
            </section>
            {filterVisible && (
                <InvoiceDrawerFilter
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                    setfilterVisible={setFilterVisible}
                    filterVisible={filterVisible}
                />
            )}
        </Fragment>
    );
}
