import { ArrowLeftOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import RetailerPageMenu from '../../../../components/my-retailers/RetailerPageMenu';
import  withAppContext  from '../../../../config/withAppContext';
import { serverCheckIsUserLogin } from '../../../../helper/AuthActions';
import { slugify } from "../../../../helper/Utils";
import { langs } from '../../../../localization';
import { setChild } from '../../../../store/common/Action';
// import PageTitle from '../../../components/common/page-title';
// import PageMenu from '../../../components/common/page-menu';
// import DocHead from '../../../components/common/head';
// import Ledger from '../../../components/my-retailers/Ledger';

const PageTitle = dynamic(() => import('../../../../components/common/page-title'));
const DocHead = dynamic(() => import('../../../../components/common/head'));
const Collection = dynamic(() => import('../../../../components/my-retailers/Collection'));



export function RetailerPayment(props) {
    const userDetail  = props.userMe.profile;
    const router = useRouter();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setChild('/my-retailers'));
    }, []);
    
    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.retailerPayment} />
            <section className="wrap">
                <div className="back-link-wrap">
                    <Link href="/my-retailers">
                        <a className="back-link">
                            <ArrowLeftOutlined />
                        </a>
                    </Link>
                    <PageTitle title={slugify(router.query.title)} />
                </div>
                <RetailerPageMenu {...router} active={'collection'} />
            </section>
            <Collection retailerId={router.query.retailerId} userDetail={userDetail} />
        </Fragment>
    );
}

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(RetailerPayment);
