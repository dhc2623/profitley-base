import { Col, Form, Input, Row, Typography } from 'antd';
import { render } from 'less';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Panel, { PanelTitle, PanelBody } from '../../components/common/panel';
import withAppContext from '../../config/withAppContext';
import { getUserDetails, serverCheckIsUserLogin } from '../../helper/AuthActions';
import { getDate } from '../../helper/Utils';
import { langs } from '../../localization';
import { sanitizedRaw } from '@nozbe/watermelondb/RawRecord';
import { useDatabase } from '@nozbe/watermelondb/hooks';

import {
    getProductsMetaBrands,
    getProductsMetaCategories,
    getProductsMetaManufacturers,
    getProductsMetaModels,
    getProductsMetaSegments
} from '../../store/product/Service';
import { getAllBuyersService } from '../../store/retailer/Service';
import Cookies from 'js-cookie';
import Lottie from 'react-lottie';
import successAnimationData from '../../helper/lottie-json/success-animation.json';
import syncingAnimationData from '../../helper/lottie-json/sync-cloud.json';
import autoSyncAnimationData from '../../helper/lottie-json/cloud.json';
import ModalWrapper from '../../components/common/modal';

const PageTitle = dynamic(() => import('../../components/common/page-title'));
const DocHead = dynamic(() => import('../../components/common/head'));
const ButtonWraper = dynamic(() => import('../../components/common/form/ButtonWrapper'));

const { Title, Text } = Typography;

const syncData = [
    {
        title: `${langs.labels.buyers}`,
        collection: 'buyers',
        service: getAllBuyersService
    },
    {
        title: `${langs.labels.categories}`,
        collection: 'categories',
        service: getProductsMetaCategories
    },
    {
        title: `${langs.labels.brands}`,
        collection: 'brands',
        service: getProductsMetaBrands
    },
    {
        title: `${langs.labels.segments}`,
        collection: 'segments',
        service: getProductsMetaSegments
    },
    {
        title: `${langs.labels.manufacturers}`,
        collection: 'manufacturers',
        service: getProductsMetaManufacturers
    },
    {
        title: `${langs.labels.models}`,
        collection: 'models',
        service: getProductsMetaModels
    }
];

function Sync(props) {
    const {userMe} = props;
    const database = useDatabase();
    const router = useRouter();
    const lastSyncedDate = Cookies.get('lastSync') ? JSON.parse(Cookies.get('lastSync')) : {};
    const successAnimation = {
        loop: false,
        autoplay: true,
        animationData: successAnimationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const autoSyncAnimation = {
        loop: true,
        autoplay: true,
        animationData: autoSyncAnimationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const syncingAnimation = {
        loop: true,
        autoplay: true,
        animationData: syncingAnimationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(()=>{
        Cookies.set('lastSyncId', userMe.profile.id, { expires: 365 });
    }, [])

    const [autoSyncCollection, setAutoSyncCollection] = useState(false);

    const [syncLoading, setSyncLoading] = useState({
        all: {
            loading: false,
            success: false,
            lastSynced: lastSyncedDate.all
        },
        buyers: {
            loading: false,
            success: false,
            lastSynced: lastSyncedDate.buyers
        },
        categories: {
            loading: false,
            success: false,
            lastSynced: lastSyncedDate.categories
        },
        brands: {
            loading: false,
            success: false,
            lastSynced: lastSyncedDate.brands
        },
        segments: {
            loading: false,
            success: false,
            lastSynced: lastSyncedDate.segments
        },
        manufacturers: {
            loading: false,
            success: false,
            lastSynced: lastSyncedDate.manufacturers
        },
        models: {
            loading: false,
            success: false,
            lastSynced: lastSyncedDate.models
        }
    });

    const syncCollection = async (tableName, service) => {
        const collections = await database.get(tableName);
        return await database.action(async () => {
            await setSyncLoading((item) => {
                item[tableName].loading = true;
                return { ...item };
            });
            const fetchData = await service();
            const data = fetchData.success.data;

            await collections.query().destroyAllPermanently();
            const newCollection = await data.map(
                async (item) =>
                    await collections.create((record) => {
                        const newRecord = { ...item };

                        record._raw = sanitizedRaw(
                            {
                                id: `${item.id}`,
                                ...newRecord
                            },
                            collections.schema
                        );
                        record._raw.id = `${item.id}`;
                        // console.log('record',record)
                    })
            );
            await setSyncLoading((item) => {
                item[tableName].loading = false;
                item[tableName].success = true;
                item[tableName].lastSynced = new Date();
                return { ...item };
            });

            const syncDate = (await Cookies.get('lastSync'))
                ? JSON.parse(Cookies.get('lastSync'))
                : {};

            syncDate[tableName] = new Date();
            Cookies.set('lastSync', syncDate, { expires: 365 });

            return newCollection;
        });
    };

    const syncAllCollection = async () => {
        await setSyncLoading((item) => {
            item.all.loading = true;
            return { ...item };
        });
        await Promise.all(
            syncData.map(async (item) => {
                if (item.collection === 'buyers' && props.userMe.profile.role.name === 'buyer') {
                    return '';
                } else {
                    return await syncCollection(item.collection, item.service);
                }
            })
        );
        await setSyncLoading((item) => {
            item.all.loading = false;
            item.all.success = true;
            item.all.lastSynced = new Date();
            return { ...item };
        });
        const syncDate = await JSON.parse(Cookies.get('lastSync'));
        syncDate.all = new Date();
        Cookies.set('lastSync', syncDate, { expires: 365 });
    };

    const autoSync = async () => {
        await setAutoSyncCollection(true);
        await syncAllCollection();
        setTimeout(() => (window.location = '/'), 1000);
    };

    useEffect(() => {
        if(router.query.autoSync){
            autoSync();
        }
    }, []);

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.sync} />
            <section className="wrap">
                <PageTitle title={langs.labels.sync} />
                {autoSyncCollection && (
                    <div>
                        <Lottie options={autoSyncAnimation} height={200} width={200} />
                        <h3 className={'align-center'}>
                            Please wait while we synchronize your data from Seller.
                        </h3>
                    </div>
                )}

                <Panel>
                    <PanelTitle
                        title={'Sync All'}
                        subTitle={
                            <Fragment>
                                <Text type={'secondary'} className="p-l0 p-r5">
                                    {langs.labels.lastSynced}:{' '}
                                    {getDate(
                                        syncLoading.all.lastSynced ? syncLoading.all.lastSynced : ''
                                    )}
                                </Text>
                            </Fragment>
                        }
                        headerRight={
                            <div className="align-right" style={{ display: 'flex' }}>
                                {syncLoading.all.loading && (
                                    <div className={'p-r10'}>
                                        <Lottie options={syncingAnimation} height={55} width={55} />
                                    </div>
                                )}

                                {(!syncLoading.all.loading &&  syncLoading.all.success) && (
                                    <div className={'p-r10'}>
                                        <Lottie options={successAnimation} height={55} width={55} />
                                    </div>
                                )}

                                {!autoSyncCollection && (
                                    <ButtonWraper
                                        size={'large'}
                                        type="primary"
                                        htmlType="submit"
                                        loading={syncLoading.all.loading}
                                        onClick={syncAllCollection}
                                        block>
                                        {langs.labels.sync}
                                    </ButtonWraper>
                                )}
                            </div>
                        }
                    />
                </Panel>
                {syncData.map((data, index) => {
                    const date = syncLoading[data.collection].lastSynced
                        ? syncLoading[data.collection].lastSynced
                        : '';
                    if (
                        data.collection === 'buyers' &&
                        props.userMe.profile.role.name === 'buyer'
                    ) {
                        return '';
                    }
                    return (
                        <Fragment key={index}>
                            <Panel>
                                <PanelTitle
                                    title={data.title}
                                    subTitle={
                                        <Fragment>
                                            <Text type={'secondary'} className="p-l0 p-r5">
                                                {langs.labels.lastSynced}: {getDate(date)}
                                            </Text>
                                        </Fragment>
                                    }
                                    headerRight={
                                        <div className="align-right" style={{ display: 'flex' }}>
                                            {syncLoading[data.collection].loading && (
                                                <div className={'p-r10'}>
                                                    <Lottie
                                                        options={syncingAnimation}
                                                        height={55}
                                                        width={55}
                                                    />
                                                </div>
                                            )}

                                            {( !syncLoading[data.collection].loading && syncLoading[data.collection].success) && (
                                                <div className={'p-r10'}>
                                                    <Lottie
                                                        options={successAnimation}
                                                        height={55}
                                                        width={55}
                                                    />
                                                </div>
                                            )}
                                            {!autoSyncCollection && (
                                                <ButtonWraper
                                                    size={'large'}
                                                    type="primary"
                                                    htmlType="submit"
                                                    disabled={syncLoading.all.loading}
                                                    loading={syncLoading[data.collection].loading}
                                                    onClick={() =>
                                                        syncCollection(
                                                            data.collection,
                                                            data.service
                                                        )
                                                    }
                                                    block>
                                                    {langs.labels.sync}
                                                </ButtonWraper>
                                            )}
                                        </div>
                                    }
                                />
                            </Panel>
                        </Fragment>
                    );
                })}
            </section>
            <ModalWrapper
                // title={'mp'}
                placement="right"
                closable={true}
                width={375}
                // onClose={onClose}
                // onCancel={onClose}
                footer={false}
                visible={autoSyncCollection && syncLoading.all.success}>
                <Lottie options={successAnimation} height={200} width={200} />
                <h2 className={'align-center p-t20'}>Successfully Synced</h2>
            </ModalWrapper>
        </Fragment>
    );
}

export default withAppContext(Sync, true);
