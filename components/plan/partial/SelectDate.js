import React, { Fragment, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { DatePicker, Modal, Form } from 'antd';
import dynamic from 'next/dynamic';
import { langs } from '../../../localization';
import { DATE_FORMAT } from '../../../config/Constant';
import ButtonWraper from '../../common/form/ButtonWrapper';
import { POST_VISITS_INITIATE, RE_SCHEDULE_INITIATE } from '../../../store/plan/Action';
import { disabledPastDate } from '../../../helper/Utils';
import { PlanContext } from '../../../contexts/planContext';
import { UserContext } from '../../../contexts/userContext';
const LoadData = dynamic(() => import('../../common/load-data'));
const ModalWrapper = dynamic(() => import('../../common/modal'));
const FormInputWrapper = dynamic(() => import('../../common/form/InputWrapper'));

const SelectDate = (props) => {
    const { visitId, retailerId } = props
    const context = useContext(PlanContext);
    const {  hasAppSettings } = useContext(UserContext);

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.plan.loading);
    const [form] = Form.useForm();

    /**
     * @name onFinish
     * @description add address
     * @param {values}
     * @returns {}
     */
    const onFinish = () => {
        form.validateFields()
            .then((values) => {

                values.planned_date = dayjs(values.planned_date).format('DD-MM-YYYY');
                values.plan_comment = '';
                values.plan_type = 'ONFIELD';
                values.plan_comment = '';
                values.approval_required = hasAppSettings('General','plan_approval_required');
                if (visitId) {
                    values.buyer = [retailerId];
                    const callBack = () => {
                        if (context) {
                            const { planAddCount, setPlanAddCount } = context;
                            setPlanAddCount(planAddCount + 1);
                        }
                    }
                    dispatch({
                        type: RE_SCHEDULE_INITIATE,
                        payload: { values, planDate: props.planDate, visitId, callBack }
                    });

                } else {
                    values.buyer = [props.retailer.id];
                    dispatch({
                        type: POST_VISITS_INITIATE,
                        payload: { values, planDate: props.planDate }
                    });
                }

                form.resetFields();
                closePopup();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const closePopup = () => {
        props.close();
    };

    return (
        <ModalWrapper
            title={visitId ? langs.labels.reschedulePlan : langs.labels.addPlan}
            closable={true}
            onClose={closePopup}
            visible={props.visible}
            key={'plan'}
            onOk={onFinish}
            onCancel={closePopup}
            okText={visitId ? langs.labels.reschedule : langs.labels.add}
            width={400}>
            <Form form={form} name={langs.labels.plan} layout="vertical">
                <FormInputWrapper
                    name="planned_date"
                    rules={[
                        {
                            required: true,
                            message: langs.validationMessages.fieldRequired
                        }
                    ]}>
                    <DatePicker
                        size={'large'}
                        style={{ width: '100%' }}
                        format={DATE_FORMAT}
                        bordered={true}
                        disabledDate={disabledPastDate}
                    />
                </FormInputWrapper>
            </Form>
        </ModalWrapper>
    );
};

export default SelectDate;
