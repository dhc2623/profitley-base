import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import { setChild } from '../../../store/common/Action';

import { serverCheckIsUserLogin } from '../../../helper/AuthActions';
import { langs } from '../../../localization';
// import PageTitle from '../../../components/common/page-title';
// import DocHead from '../../../components/common/head';
// import CategoriesList from '../../../components/categoriesList/InventoryCategories';

const PageTitle = dynamic(() => import('../../../components/common/page-title'));
const DocHead = dynamic(() => import('../../../components/common/head'));
const CategoriesList = dynamic(() =>
    import('../../../components/categoriesList/InventoryCategories')
);

function Categories() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setChild(false));
    }, []);

    return (
        <Fragment>
            <DocHead title={langs.labels.categories} />
            <section className="wrap">
                <PageTitle title={langs.labels.categories} />
                <CategoriesList />
            </section>
        </Fragment>
    );
}

export async function getServerSideProps({ req, query }) {
    const props = serverCheckIsUserLogin(req, query);
    return props;
}

export default Categories;
