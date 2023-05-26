import { Fragment } from 'react';
import dynamic from 'next/dynamic';
import  withAppContext  from '../config/withAppContext';
import { langs } from '../localization';
// import DocHead from '../components/common/head';
// import Ledger from '../components/my-retailers/Ledger';
const PageTitle = dynamic(() => import('../components/common/page-title'));
const DocHead = dynamic(() => import('../components/common/head'));
const Ledger = dynamic(() => import('../components/my-retailers/Ledger'));

function BuyerLedger(props) {
    const userDetail = props.userMe.profile;
    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.myLedger} />
            <section className="wrap">
                <PageTitle title={langs.labels.myLedger} />
                <Ledger retailerId={userDetail.id} userDetail={userDetail} />
            </section>
        </Fragment>
    );
}
export default withAppContext(BuyerLedger);
