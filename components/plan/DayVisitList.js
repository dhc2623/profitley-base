import {
    CloseCircleOutlined, EnvironmentOutlined,
    LoginOutlined,
    LogoutOutlined, PhoneOutlined,
    RetweetOutlined, UserOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import { Button, Modal, Select, Typography } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import dynamic from 'next/dynamic';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DISPLAY_DATE_FORMAT } from '../../config/Constant';
import { getLocation } from '../../helper/Utils';
import {
    CANCEL_VISITS_INITIATE,
    CHECK_IN_INITIATE,
    CHECK_OUT_INITIATE,
    GET_VISITS_INITIATE
} from '../../store/plan/Action';
import Panel, { PanelActions, PanelBody, PanelTitle } from '../common/panel';

const ButtonWrapper = dynamic(() => import('../common/form/ButtonWrapper'));
const LoadData = dynamic(() => import('../common/load-data'));
const Remark = dynamic(() => import('./partial/Remark'));
const SelectDatePopup = dynamic(() => import('./partial/SelectDate'));
const { Option } = Select;
var isToday = require('dayjs/plugin/isToday');
dayjs.extend(isToday);

const extraData = {
    address1: 'address1',
    address2: 'address2',
    cityName: 'cityName',
    stateName: 'stateName',
    pincode: 'pincode',
    shop_name: 'shop_name'
};

const offFieldPlanName = {
    HO: 'Head Office',
    HALF_DAY_LEAVE: 'Half Day Leave',
    FULL_DAY_LEAVE: 'Full Day Leave',
    HOLIDAY: 'Holiday'
};

const groupType = {
    cancelled: 'cancelled',
    checkedIn: 'checkedIn',
    completed: 'completed',
    pending: 'pending',
    unapproved: 'unapproved',
}

function DayVisitList(props) {
    const { actions = true, userId = null } = props;
    const dispatch = useDispatch();
    const [remarkVisible, setRemarkVisible] = useState(false);
    const [checkinPopupVisibility, setCheckinPopupVisibility] = useState(false);
    const [operation, setOperation] = useState({});
    const loading = useSelector((state) => state.plan.loading);
    const [visitList, setVisitList] = useState([]);
    const [filter, setFilter] = useState('All');
    const [selectedDate, setSelectedDate] = useState('');
    const [reschedulePopup, setReschedulePopup] = useState('');
    const [visitId, setVisitId] = useState('');
    const [selectedRetailer, setSelectedRetailer] = useState('');
    const visits = useSelector((state) => state.plan.visitList);
    const vistMeta = useSelector((state) => state.plan.vistMeta);
    const planDate = useSelector((state) => state.plan.visitDate);
    useEffect(() => {
        setVisitList(visits);
    }, [visits]);

    useEffect(() => {
        dispatch({
            type: GET_VISITS_INITIATE,
            payload: { planDate, userId },
        });
    }, [planDate]);

    const onCheckIn = async (id) => {
        let position = await getLocation();
        let flag = false

        _.map(visits, (types, keys) => {
            if (keys == "checkedIn" && types.data.length > 0) {
                flag = true
            }
        })
        if (flag) {
            setCheckinPopupVisibility(true);
        } else {
            dispatch({
                type: CHECK_IN_INITIATE,
                payload: {
                    id,
                    position,
                    dispatch,
                    planDate
                }
            });
        }
    };

    const onCheckOut = (payload) => {
        dispatch({ type: CHECK_OUT_INITIATE, payload });
    };

    const cancelVisit = (payload) => {
        dispatch({ type: CANCEL_VISITS_INITIATE, payload });
    };

    const openRemarkPopup = (id, type) => {
        let operationObject = { id, type };
        setOperation(operationObject);
        setRemarkVisible(true);
    };

    const closeRemarkPopup = () => {
        setOperation('');
        setRemarkVisible(false);
    };

    const submitRemark = (remark) => {
        let payload = {
            id: operation.id,
            remark: {},
            dispatch,
            planDate
        };
        if (operation.type == 'cancel') {
            payload.remark.cancel_comment = remark;
            cancelVisit(payload);
        } else {
            payload.remark.checkout_comment = remark;
            onCheckOut(payload);
        }
    };

    const openReschedulePopup = (visit) => {
        setReschedulePopup(true);
        setVisitId(visit.id);
        setSelectedRetailer(visit.buyer);
    }
    const closeReschedulePopup = () => {
        setReschedulePopup(false);
        setVisitId('');
        setSelectedRetailer('');
    };

    const itemActions = (visit, key) => {
        const actions = [];
        if (key == "offfield") {

            if (visit.cancelled_at) {
                actions.push({
                    render: () => <div className={'action-date cancel'}><CloseCircleOutlined /><Typography.Text
                        type={'danger'}
                        strong
                        className={'action-date'}>
                        {dayjs(visit.cancelled_at).format(
                            DISPLAY_DATE_FORMAT
                        )}
                    </Typography.Text>
                    </div>
                });
            }
            if (!(visit.cancelled_at ||
                dayjs(visit.planned_date).diff(
                    dayjs(),
                    'd'
                ) < 0)) {
                actions.push({
                    render: () => <div className={'plan-action cancel'}><ButtonWrapper
                        onClick={() =>
                            openRemarkPopup(visit.id, 'cancel')
                        }>
                        <CloseCircleOutlined /> Cancel
                    </ButtonWrapper>
                    </div>
                });
            }

        } else if (key == "unapproved") { 
            actions.push({
                render: () => <div className={'action-date unapproved'}>
                    <InfoCircleOutlined />
                    <Typography.Text
                        strong
                    >
                        {'Pending for approval...'}
                    </Typography.Text>
                </div>
            });
        }  else {
            if (visit.checked_in_at) {
                actions.push({
                    render: () => <div className={'action-date check-in'}>
                        <LoginOutlined />
                        <Typography.Text
                            strong
                        >
                            {dayjs(visit.checked_in_at).format(
                                DISPLAY_DATE_FORMAT
                            )}
                        </Typography.Text>
                    </div>
                });
            }

            if (!(visit.checked_in_at ||
                visit.cancelled_at ||
                !dayjs(visit.planned_date).isToday())) {
                actions.push({
                    render: () => <div className={'plan-action check-in'}>

                        <ButtonWrapper
                            onClick={() => onCheckIn(visit.id)}>
                            <LoginOutlined /> Check-In
                        </ButtonWrapper>
                    </div>
                })
            }

            if (visit.checked_out_at) {
                actions.push({
                    render: () => <div className={'action-date check-out'}>
                        <LogoutOutlined />
                        <Typography.Text strong>
                            {dayjs(visit.checked_out_at).format(
                                DISPLAY_DATE_FORMAT
                            )}
                        </Typography.Text>
                    </div>
                })
            }

            if (!(!visit.checked_in_at ||
                visit.checked_out_at ||
                visit.cancelled_at)) {
                actions.push({
                    render: () => <div className={'plan-action check-out'}>
                        <ButtonWrapper
                            onClick={() =>
                                openRemarkPopup(visit.id, 'check-out')
                            }>
                            <LogoutOutlined /> Check-Out
                    </ButtonWrapper>
                    </div>
                })
            }

            if (visit.cancelled_at) {
                actions.push({
                    render: () => <div className={'action-date cancel'}><CloseCircleOutlined /><Typography.Text
                        strong>
                        {dayjs(visit.cancelled_at).format(
                            DISPLAY_DATE_FORMAT
                        )}
                    </Typography.Text>
                    </div>
                })
            }

            if (!(visit.checked_in_at ||
                visit.cancelled_at ||
                dayjs(visit.planned_date).diff(
                    dayjs(),
                    'd'
                ) < 0)) {
                actions.push({
                    render: () => <div className={'plan-action cancel'}><ButtonWrapper
                        onClick={() =>
                            openRemarkPopup(visit.id, 'cancel')
                        }>
                        <CloseCircleOutlined /> Cancel Visit
                </ButtonWrapper>
                    </div>
                })
            }

            if (!(visit.checked_in_at ||
                visit.cancelled_at ||
                dayjs(visit.planned_date).diff(
                    dayjs(),
                    'd'
                ) < 0)) {
                actions.push({
                    render: () => <div className={'plan-action reschedule'}><ButtonWrapper
                        onClick={() =>
                            openReschedulePopup(visit)
                        }
                    >
                        <RetweetOutlined />
                        Reschedule
                </ButtonWrapper>
                    </div>
                })
            }
        }

        return actions
    }

    return (
        <Fragment>
            
                <div className={'visit-list'}>
                <LoadData data={vistMeta} loading={loading}>
                    {
                        _.map(visitList, (value, key) => {
                            return (
                                <Fragment key={value.label}>
                                    {!(_.isEmpty(value.data)) && <Typography.Title level={4} className={groupType[key]} >{value.label}</Typography.Title>}
                                    {value.data.map((visit, index) => {
                                        return (
                                            <Panel key={`${visit.shop_name}-${index}`} className={`visit-panel ${groupType[key]} ${(key == 'offfield' && visit.cancelled_at) ? 'cancelled' : ''}`}>
                                                <PanelTitle
                                                    title={
                                                        visit.plan_type !== 'OFFFIELD'
                                                            ? visit.shop_name
                                                            : offFieldPlanName[visit.plan]
                                                    }
                                                    subTitle={
                                                        visit.buyer !== 0 && (
                                                            <Fragment>
                                                                <Typography.Paragraph className="m-b0">
                                                                    <UserOutlined /> <b>{visit.retailerName}</b>
                                                                </Typography.Paragraph>
                                                                <Typography.Paragraph className="m-b0">
                                                                    <EnvironmentOutlined />{' '}
                                                                    {`${visit.address1
                                                                        ? `${visit.address1} ${visit.address2 ? visit.address2 : ''}, ${visit.cityName}, ${visit.stateName} - ${visit.pincode}`
                                                                        : ''
                                                                        }`}
                                                                </Typography.Paragraph>
                                                            </Fragment>
                                                        )
                                                    }
                                                    action={[
                                                        key !== "offfield" &&
                                                        {
                                                            render: () => <a href={`tel:${'visit.phone'}}`}><PhoneOutlined style={{ fontSize: '24px' }} /></a>
                                                        }
                                                    ]}
                                                />

                                                {(visit.cancel_comment ||
                                                    visit.checkout_comment ||
                                                    visit.plan_comment) && (
                                                        <PanelBody>
                                                            <Typography.Text>Comment:</Typography.Text>
                                                            <Typography.Paragraph type="secondary" className={'m-b0'}>
                                                                {visit.cancel_comment ||
                                                                    visit.checkout_comment ||
                                                                    visit.plan_comment ||
                                                                    ''}
                                                            </Typography.Paragraph>
                                                        </PanelBody>
                                                    )}
                                                {
                                                    actions && itemActions(visit, key).length > 0 &&
                                                    <PanelActions
                                                        actions={itemActions(visit, key)}
                                                    />
                                                }
                                            </Panel>
                                        );
                                    })
                                    }
                                </Fragment>)
                        })}
                        </LoadData>
                </div>
            

            {
                remarkVisible && (
                    <Remark
                        visible={remarkVisible}
                        submit={submitRemark}
                        close={closeRemarkPopup}
                        type={operation.type}
                    />
                )
            }
            {
                checkinPopupVisibility && (
                    <Modal visible={checkinPopupVisibility}
                        footer={[
                            <Button closable={true} key="submit" type="primary" loading={loading} onClick={() => setCheckinPopupVisibility(false)}>
                                Okay
                        </Button>
                        ]}>
                        <p>You have already checked in.</p>
                    </Modal>)
            }

            {
                reschedulePopup && (
                    <SelectDatePopup
                        visible={reschedulePopup}
                        visitId={visitId}
                        close={closeReschedulePopup}
                        retailerId={selectedRetailer}
                        planDate={planDate}
                    />
                )
            }
        </Fragment>
    );
}

export default DayVisitList;
