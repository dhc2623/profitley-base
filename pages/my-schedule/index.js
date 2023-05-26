import React from 'react';
import DocHead from '../../components/common/head';
import PageTitle from '../../components/common/page-title';
import PlanCalendar from '../../components/plan/PlanCalendar';
import withAppContext from '../../config/withAppContext';
import { langs } from '../../localization';



function MySchedule(props) {
    const { userMe } = props
    return (
        <div>
            <DocHead pageTitle={langs.labels.myMonthlySchedule} />
            <section className="wrap">
                <PageTitle title={langs.labels.myMonthlySchedule} />
                <PlanCalendar userId={userMe.profile.id} />
            </section>
        </div>
    );
}

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(MySchedule);