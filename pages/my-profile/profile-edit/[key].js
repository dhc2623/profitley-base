import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Tabs } from 'antd';

import { langs } from '../../../localization';
import { setChild } from '../../../store/common/Action';
import { useRouter } from 'next/router';
import { getCurrentRole, serverCheckIsUserLogin } from '../../../helper/AuthActions';
import { USER_ROLES } from '../../../config/Constant';
import { importLoading } from '../../../helper/Utils';
const { TabPane } = Tabs;

import dynamic from 'next/dynamic';
import  withAppContext  from '../../../config/withAppContext';
// import DocHead from '../../../components/common/head';
// import PageTitle from '../../../components/common/page-title';

const DocHead = dynamic(() => import('../../../components/common/head'));
const PageTitle = dynamic(() => import('../../../components/common/page-title'));

const Password = dynamic(() => import('../../../components/profile/Password'), {
    loading: importLoading
});
const Address = dynamic(() => import('../../../components/profile/Address'), {
    loading: importLoading
});
const General = dynamic(() => import('../../../components/profile/General'), {
    loading: importLoading
});

const ProfileEdit = (props) => {
    const userDetail  = props.userMe.profile;

    const dispatch = useDispatch();
    const router = useRouter();
    const [selectedKey, setSelectedKey] = useState('general');

    useEffect(() => {
        if (router && router.query && router.query.key) {
            setSelectedKey(router.query.key);
        }
        dispatch(setChild('/my-profile/profile-view'));
    }, [router.query.key]);

    /**
     * @name updateRoute
     * @description it sets selected tab key in router
     * @param {key}
     * @returns {}
     */
    const updateRoute = (key) => {
        router.push('/my-profile/profile-edit/[key]', `/my-profile/profile-edit/${key}`);
    };
    const isRetailer = userDetail.role.name == USER_ROLES.BUYER.name;
    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.editProfile} />
            <section className="wrap">
                <PageTitle title={langs.labels.editProfile} />
                <Tabs
                    defaultActiveKey={'general'}
                    activeKey={selectedKey}
                    onChange={(e) => updateRoute(e)}
                    className="profile-tab">
                    <TabPane tab={langs.labels.profile} key="general">
                        <General {...props}/>
                    </TabPane>
                    {isRetailer && (
                        <TabPane tab={langs.labels.address} key="address">
                            <Address />
                        </TabPane>
                    )}
                    <TabPane tab={langs.labels.password} key="password">
                        <Password />
                    </TabPane>
                </Tabs>
            </section>
        </Fragment>
    );
};

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(ProfileEdit);
