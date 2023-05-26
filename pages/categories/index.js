import dynamic from 'next/dynamic';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  withAppContext  from '../../config/withAppContext';
import { serverCheckIsUserLogin } from '../../helper/AuthActions';
import { langs } from '../../localization';
import { GET_PARENT_CATEGORIES_INITIATE } from '../../store/categories/Action';
import { setChild } from '../../store/common/Action';

// import PageTitle from '../../components/common/page-title';
// import DocHead from '../../components/common/head';
// import CategoriesList from '../../components/categoriesList';

const PageTitle = dynamic(() => import('../../components/common/page-title'));
const DocHead = dynamic(() => import('../../components/common/head'));
const CategoriesList = dynamic(() => import('../../components/categoriesList'));

function Categories(props) {
    const categories = useSelector((state) => state.categories.parentCategories);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: GET_PARENT_CATEGORIES_INITIATE });
        dispatch(setChild(false));
    }, []);

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.categories} />
            <section className="wrap">
                <PageTitle
                    title={`${categories.length} ${langs.labels.categories}`}
                    // itemCount={categories && categories.length ? categories.length : 0}
                />
                <CategoriesList {...props} />
            </section>
        </Fragment>
    );
}
// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(Categories);
