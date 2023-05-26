import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import PageTitle from '../components/common/page-title';
import Collection from '../components/my-retailers/Collection';
import  withAppContext  from '../config/withAppContext';
import { serverCheckIsUserLogin } from '../helper/AuthActions';
import { langs } from '../localization';
const DocHead = dynamic(() => import('../components/common/head'));

function PaymentHistory(props) {
    const userDetail  = props.userMe.profile;
    return (
        <Fragment>
            <DocHead pageTitle="Retailer Ledger" />
            <section className="wrap">
                <PageTitle title={langs.labels.paymentHistory} />
                <Collection retailerId={userDetail.id} userDetail={userDetail} edit={false} />
            </section>
        </Fragment>
    );
}

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(PaymentHistory);
