import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setChild } from '../../store/common/Action';
import dynamic from 'next/dynamic';
// import Details from '../../components/profile/Details';
// import DocHead from '../../components/common/head';
// import PageTitle from '../../components/common/page-title';

const Details = dynamic(() => import('../../components/profile/Details'));
const DocHead = dynamic(() => import('../../components/common/head'));
const PageTitle = dynamic(() => import('../../components/common/page-title'));

import { serverCheckIsUserLogin } from '../../helper/AuthActions';
import  withAppContext  from '../../config/withAppContext';
import { langs } from '../../localization';

const ProfileView = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setChild(false));
    }, []);

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.myProfile} />
            <section className="wrap">
                <PageTitle title={langs.labels.myProfile} />
                <Details />
            </section>
        </Fragment>
    );
};

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(ProfileView);
