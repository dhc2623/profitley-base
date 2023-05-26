import { Typography } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { AXIOS_INSTANCE } from '../../config/Config';
import { DATE_FORMAT } from '../../config/Constant';
import { formatToCurrency } from '../../helper/Utils';
import { langs } from '../../localization';
import { getVisitInsightsService } from '../../store/dashboard/Service';
import Panel, { PanelHidden, PanelRowItem, PanelSeparator, PanelTitle } from '../common/panel';
const LoadData = dynamic(() => import('../common/load-data'));
const { Title, Text } = Typography;

const ViewData = ({ info, loading }) => {
    return (
        <LoadData data={info} loading={loading}>
            <Fragment>
                <div className="blue-box">
                    <Title level={5} className="m-b0">
                        {langs.labels.onField}
                    </Title>
                    <Title level={5} strong className="m-t0 m-b0">
                        {info.totalOnFieldVisits}
                    </Title>
                </div>
                <PanelSeparator
                    list={[
                        {
                            label: `${langs.labels.planned}`,
                            value: info.totalOnFieldVisits
                        },
                        {
                            label: `${langs.labels.completed}`,
                            value: info.completedOnFieldVisits
                        },
                        {
                            label: `${langs.labels.cancelled}`,
                            value: info.cancelledOnFieldVisits
                        }
                    ]}
                />
                <div className="blue-box">
                    <Title level={5} className="m-b0">
                        {langs.labels.offField}
                    </Title>
                    <Title level={5} strong className="m-t0 m-b0">
                        {info.totalOffFieldVisits}
                    </Title>
                </div>
                <PanelSeparator
                    list={[
                        {
                            label: `${langs.labels.holiday}`,
                            value: info.holidays
                        },
                        {
                            label: `${langs.labels.fullDayOff}`,
                            value: info.fullDayOffs
                        },
                        {
                            label: `${langs.labels.halfDayOff}`,
                            value: info.halfDayOffs
                        },
                        {
                            label: `${langs.labels.ho}`,
                            value: info.ho
                        }
                    ]}
                />
                <div className="blue-box">
                    <Title level={5} className="m-b0">
                        {langs.labels.productivity}
                    </Title>
                </div>
                <PanelSeparator
                    list={[
                        {
                            label: `${langs.labels.productive}`,
                            value: (
                                <Typography.Text type={'success'}>
                                    {info.productive}
                                </Typography.Text>
                            )
                        },
                        {
                            label: `${langs.labels.nonProductive}`,
                            value: (
                                <Typography.Text type={'danger'}>
                                    {info.nonProductive}
                                </Typography.Text>
                            )
                        }
                    ]}
                />
            </Fragment>
        </LoadData>
    );
};

const VisitInsights = ({ item, dashboardDate, summaryDate, title, isSummary, defaultLoad }) => {
    const [info, setInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        defaultLoad && getInfo();
    }, []);

    const getInfo = () => {
        setLoading(true);
        const getURLPerams = isSummary
            ? `?date=${summaryDate.format(DATE_FORMAT)}`
            : `?month=${dashboardDate.month() + 1}&year=${dashboardDate.year()}`;

        AXIOS_INSTANCE.get(`/visit-insights/${item.sp_id}${getURLPerams}`)
            .then((res) => {
                setInfo(res.data.success);
                setLoading(false);
            })
            .catch(() => {
                setInfo([]);
                setLoading(false);
            });
    };

    const handleInfo = () => {
        info.length == 0 && getInfo();
    };

    return (
        <Panel className={'db-buyer-sp'}>
            <PanelTitle
                collapseKey={item.dspName}
                title={title ? title : item.dspName}
                className={title ? 'uppercase' : ''}
                avatar={
                    <span className="icon rounded">
                        <img src={'/assets/images/svg/location-marker-blue.svg'} width="14" alt="" className="m-t5" />
                    </span>
                }
                // headerRight={<span className="text-orange">{item.totalVisits}</span>}
                onCollapse={handleInfo}
            />
            {defaultLoad ? (
                <ViewData info={info} loading={loading} />
            ) : (
                <PanelHidden collapseKey={item.dspName}>
                    <ViewData info={info} loading={loading} />
                </PanelHidden>
            )}
        </Panel>
    );
};

export default VisitInsights;
