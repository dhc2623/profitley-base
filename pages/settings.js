import { List, Switch, Tabs, Typography } from 'antd';
import dynamic from 'next/dynamic';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  withAppContext  from '../config/withAppContext';
import { serverCheckIsUserLogin } from '../helper/AuthActions';
import { langs } from '../localization';
import { UPDATE_SETTINGS_INITIATE } from '../store/setting/Action';
const Panel = dynamic(() => import('../components/common/panel'));
const PageTitle = dynamic(() => import('../components/common/page-title'));
const DocHead = dynamic(() => import('../components/common/head'));

const { Title } = Typography;
const { TabPane } = Tabs;

function Settings(props) {
    const dispatch = useDispatch();
    const [settings, setSettings] = useState({});
    const settingList = useSelector((state) => state.auth.homeSettings);
    const loading = useSelector((state) => state.auth.loading);

    // useEffect(() => {
    //     dispatch({ type: GET_SETTINGS_INITIATE });
    // }, []);

    useEffect(() => {
        setSettings(settingList);
    }, [settingList]);

    /**
     * @name onChange
     * @description Sets settings via api
     * @param {checked, key, label}
     * @returns {}
     */
    const onChange = (checked, key, label) => {
        let postData = { ...settings };
        postData[`${key}`] = checked ? 1 : 0;
        setSettings(postData);
        dispatch({
            type: UPDATE_SETTINGS_INITIATE,
            postData,
            notificationMessage: `${label} - ${checked ? 'Activated' : 'Deactivated'}`
        });
    };
    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.settings} />
            <section className="wrap">
                <PageTitle title={langs.labels.settings} />
                <Panel>
                    <List size="small">
                        <List.Item
                            extra={
                                <Switch
                                    loading={loading}
                                    checked={settings.best_seller}
                                    onChange={(e) =>
                                        onChange(
                                            e,
                                            'best_seller',
                                            langs.labels.bestSeller
                                        )
                                    }
                                />
                            }>
                            <Title level={5}>
                                {langs.labels.bestSeller.toUpperCase()}
                            </Title>
                        </List.Item>
                        <List.Item
                            extra={
                                <Switch
                                    loading={loading}
                                    checked={settings.brands}
                                    onChange={(e) =>
                                        onChange(e, 'brands', langs.labels.brands)
                                    }
                                />
                            }>
                            <Title level={5}>{langs.labels.brands.toUpperCase()}</Title>
                        </List.Item>
                        <List.Item
                            extra={
                                <Switch
                                    loading={loading}
                                    checked={settings.featured_product}
                                    onChange={(e) =>
                                        onChange(
                                            e,
                                            'featured_product',
                                            langs.labels.featuredProducts
                                        )
                                    }
                                />
                            }>
                            <Title level={5}>
                                {langs.labels.featuredProducts.toUpperCase()}
                            </Title>
                        </List.Item>
                        <List.Item
                            extra={
                                <Switch
                                    loading={loading}
                                    checked={settings.inventory}
                                    onChange={(e) =>
                                        onChange(e, 'inventory', langs.labels.inventory)
                                    }
                                />
                            }>
                            <Title level={5}>
                                {langs.labels.inventory.toUpperCase()}
                            </Title>
                        </List.Item>
                        {/*<List.Item
                            extra={
                                <Switch
                                    loading={loading}
                                    checked={settings.models}
                                    onChange={(e) =>
                                        onChange(e, 'models', langs.labels.models)
                                    }
                                />
                            }>
                            <Title level={5}>{langs.labels.models.toUpperCase()}</Title>
                        </List.Item>*/}
                        <List.Item
                            extra={
                                <Switch
                                    loading={loading}
                                    checked={settings.new_arrivals}
                                    onChange={(e) =>
                                        onChange(
                                            e,
                                            'new_arrivals',
                                            langs.labels.newArrivals
                                        )
                                    }
                                />
                            }>
                            <Title level={5}>
                                {langs.labels.newArrivals.toUpperCase()}
                            </Title>
                        </List.Item>
                        <List.Item
                            extra={
                                <Switch
                                    loading={loading}
                                    checked={settings.recommended_products}
                                    onChange={(e) =>
                                        onChange(
                                            e,
                                            'recommended_products',
                                            langs.labels.recommendedProducts
                                        )
                                    }
                                />
                            }>
                            <Title level={5}>
                                {langs.labels.recommendedProducts.toUpperCase()}
                            </Title>
                        </List.Item>
                    </List>
                </Panel>
            </section>
        </Fragment>
    );
}

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }
export default withAppContext(Settings);
