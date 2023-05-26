import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AddBuyerForm from '../../components/addBuyer';
import DocHead from '../../components/common/head';
import PageTitle from '../../components/common/page-title';
import  withAppContext  from '../../config/withAppContext';
import { serverCheckIsUserLogin } from '../../helper/AuthActions';
import { langs } from '../../localization';
import { setChild } from '../../store/common/Action';


function NewBuyer(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setChild('/my-retailers'));
    }, []);

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.newBuyer} />
            <section className="wrap">
                <div className="back-link-wrap">
                    <Link href="/my-retailers">
                        <a className="back-link">
                            <ArrowLeftOutlined />
                        </a>
                    </Link>
                    <PageTitle title={langs.labels.newBuyer} />
                </div>

                <div className="m-t10">
                    <AddBuyerForm {...props} />
                </div>
            </section>
        </Fragment>
    );
}

export default withAppContext(NewBuyer);