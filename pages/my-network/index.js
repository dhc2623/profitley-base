import { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { EnvironmentOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Typography, Row, Col } from 'antd';
import PageTitle from '../../components/common/page-title';
import PageMenu from '../../components/common/page-menu';
import DocHead from '../../components/common/head';
import Panel, { PanelRowItem, PanelSeparator, PanelTitle } from '../../components/common/panel';

import { serverCheckIsUserLogin } from '../../helper/AuthActions';
import  withAppContext  from '../../config/withAppContext';
const { Text } = Typography;

function MyNetwork() {
    const router = useRouter();
    return (
        <Fragment>
            <DocHead pageTitle="MyNetwork" />
            <PageTitle title={'My Network'} />
            <PageMenu
                navItem={[
                    {
                        name: 'Geography Assigned',
                        slug: 'geographyAssigned',
                        active: true
                        //onClick: () => router.push('/my-network')
                    },
                    {
                        name: 'Customers',
                        slug: 'customers'
                        //onClick: () => router.push('/customers')
                    },
                    {
                        name: 'Management',
                        slug: 'management'
                        //onClick: () => router.push('/management')
                    }
                ]}
            />
            <div className="map">
                <img src={'/assets/images/map.png'} alt="" />
            </div>
            <Panel size={false}>
                <PanelTitle
                    title={
                        <Link href="#">
                            <a>{`Dinesh Auto Sales`}</a>
                        </Link>
                    }
                    subTitle={
                        <Fragment>
                            <Typography.Text>
                                <EnvironmentOutlined /> 83 Janki Nagar, Badnagar, Madhya
                                Pradesh-452001
                            </Typography.Text>
                            <br />
                            <Typography.Text>
                                <i className="fas fa-phone-alt m-r5"></i> Call
                            </Typography.Text>
                        </Fragment>
                    }
                    action={[
                        {
                            label: ' Call',
                            icon: <i className="fas fa-phone-alt m-r5"></i>,
                            type: 'link',
                            size: 'small'
                        }
                    ]}
                />
            </Panel>
        </Fragment>
    );
}

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }
export default withAppContext(MyNetwork);

