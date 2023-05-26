import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocHead from '../../../../components/common/head';
import PageMenu from '../../../../components/common/page-menu';
import PageTitle from '../../../../components/common/page-title';
import PlanCalendar from '../../../../components/plan/PlanCalendar';
import  withAppContext  from '../../../../config/withAppContext';
import { serverCheckIsUserLogin } from '../../../../helper/AuthActions';
import { convertToSlug, slugify } from '../../../../helper/Utils';
import { langs } from '../../../../localization';
import { setChild } from '../../../../store/common/Action';




function DSPSchedule(props) {
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        dispatch(setChild('/my-team'));
    }, []);
    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.retailerDetail} />
            <section className="wrap">
                <div className="back-link-wrap">
                    <Link href="/my-team">
                        <a className="back-link">
                            <ArrowLeftOutlined />
                        </a>
                    </Link>
                    <PageTitle title={slugify(router.query.title)} />
                </div>
                <PageMenu
                    navItem={[
                        {
                            name: `${langs.labels.details}`,
                            slug: 'details',
                            onClick: () =>
                                router.push(
                                    `/my-team/dsp-details/[dspId]/[title]`,
                                    `/my-team/dsp-details/${router.query.dspId}/${convertToSlug(router.query.title)}`
                                )
                        },
                        {
                            name: `${langs.labels.buyers}`,
                            slug: 'retailers',
                            onClick: () =>
                                router.push(
                                    `/my-team/assign-retailers/[dspId]/[title]`,
                                    `/my-team/assign-retailers/${router.query.dspId}/${convertToSlug(router.query.title)}`
                                )
                        },
                        {
                            name: `${langs.labels.plannedVisits}`,
                            slug: 'planVisit',
                            active: true,
                            onClick: () =>
                                router.push(
                                    `/my-team/dsp-plan/[dspId]/[title]`,
                                    `/my-team/dsp-plan/${router.query.dspId}/${convertToSlug(router.query.title)}`
                                )
                        }

                    ]}
                />
                <PlanCalendar userId={router.query.dspId} />
            </section>
        </Fragment>

    );
}

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(DSPSchedule);