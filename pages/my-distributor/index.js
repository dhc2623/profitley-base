import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Typography } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import Panel, { PanelTitle, PanelBody } from '../../components/common/panel';
import { GET_DISTRIBUTOR_DETAILS_INITIATE } from '../../store/seller/Action';


// import PageMenu from '../../components/common/page-menu';
// import DocHead from '../../components/common/head';
// import LoadData from '../../components/common/load-data';

const PageMenu = dynamic(() => import('../../components/common/page-menu'));
const DocHead = dynamic(() => import('../../components/common/head'));
const LoadData = dynamic(() => import('../../components/common/load-data'));

import { serverCheckIsUserLogin } from '../../helper/AuthActions';
const { Text } = Typography;

function MyDistributor() {
    const dispatch = useDispatch();
    const router = useRouter();
    // let distributorDetails = useSelector((state) => state.distributor.distributorDetails);
    // let loading = useSelector((state) => state.distributor.loading);
    let distributorDetails = {};
    let loading = false;
    useEffect(() => {
        dispatch({ type: GET_DISTRIBUTOR_DETAILS_INITIATE });
    }, []);

    // const billingAddress = distributorDetails.address ? distributorDetails.address.billing : {};
    const billingAddress = {};

    return (
        <Fragment>
            <DocHead pageTitle="Retailer Detail" />
            <section className="wrap">
                {/* <div className="back-link-wrap">
                    <Link href="/my-retailers">
                        <a className="back-link">
                            <ArrowLeftOutlined />
                        </a>
                    </Link>
                    <PageTitle title={"full_name"} />
    </div>*/}

                <PageMenu
                    navItem={[
                        {
                            name: 'Details',
                            slug: 'details',
                            active: true
                        }
                    ]}
                />
                <LoadData loading={loading} data={distributorDetails}>
                    <Panel size={false}>
                        <PanelTitle
                            title={distributorDetails.full_name}
                            subTitle={
                                <Text type="secondary">
                                    <img
                                        src={'/assets/images/svg/user-icon1.svg'}
                                        alt=""
                                        className="m-r5"
                                    />
                                    {distributorDetails.email}
                                </Text>
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
                        <PanelBody className="border-none p-t0">
                            <Text type="secondary">
                                <EnvironmentOutlined />
                                {`${billingAddress.address_1}, ${billingAddress.city}, ${billingAddress.district}, ${billingAddress.state}, ${billingAddress.zip}`}
                            </Text>
                        </PanelBody>
                    </Panel>
                </LoadData>
            </section>
        </Fragment>
    );
}

export async function getServerSideProps({ req, query }) {
    const props = serverCheckIsUserLogin(req, query);
    return props;
}

export default MyDistributor;
