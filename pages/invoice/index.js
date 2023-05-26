import { Fragment } from 'react';
import dynamic from 'next/dynamic';
import  withAppContext  from '../../config/withAppContext';
import { langs } from '../../localization';
const PageTitle = dynamic(() => import('../../components/common/page-title'));
const DocHead = dynamic(() => import('../../components/common/head'));
const InvoiceData = dynamic(() => import('../../components/invoice/invoice'));

function Invoices(props) {
    const userDetail = props.userMe.profile;
    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.invoices} />
            <section className="wrap">
                <PageTitle title={langs.labels.invoices} />
                <InvoiceData retailerId={userDetail.id} userDetail={userDetail} />
            </section>
        </Fragment>
    );
}
export default withAppContext(Invoices);
