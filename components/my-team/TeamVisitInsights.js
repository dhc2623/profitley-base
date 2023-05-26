import { Typography } from 'antd';
import { Fragment, useEffect } from 'react';
import { langs } from '../../localization';
import Panel, { PanelSeparator, PanelTitle } from '../common/panel';

const { Title } = Typography;

const TeamVisitInsights = ({ info, title }) => {
    useEffect(() => {
    }, []);
    return (
        <Panel className={'db-buyer-sp'}>
            <PanelTitle
                title={title}
                avatar={
                    <span className="icon rounded">
                        <img src={'/assets/images/svg/location-marker-blue.svg'} width="14" alt="" className="m-t5" />
                    </span>
                }
            />
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

        </Panel>
    );
};

export default TeamVisitInsights;
