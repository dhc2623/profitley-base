import { Checkbox, Col, DatePicker, Drawer, Form, Input, List, Radio, Row, Select, Typography } from 'antd';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { DATE_FORMAT, OFF_FIELD_OPTIONS } from '../../../config/Constant';
import { PlanContext } from '../../../contexts/planContext';
import { disabledPastDate } from '../../../helper/Utils';
import { langs } from '../../../localization';
import { POST_VISITS_INITIATE } from '../../../store/plan/Action';
import { getRetailerList } from '../../../store/retailer/Action';
import moment from 'moment';
import { UserContext } from '../../../contexts/userContext';
const ButtonWraper = dynamic(() => import('../../common/form/ButtonWrapper'));
const LoadData = dynamic(() => import('../../common/load-data'));
const FormInputWrapper = dynamic(() => import('../../common/form/InputWrapper'));
const { TextArea } = Input;
const { Option } = Select;
const AddPlan = (props) => {
    const { planDate, close, visible } = props;
    const context = useContext(PlanContext);
    const {  hasAppSettings } = useContext(UserContext);
    const { planAddCount, setPlanAddCount } = context;
    const dispatch = useDispatch();
    const [selectedBuyer, setSelectedBuyer] = useState('');
    const [retailerList, setRetailerList] = useState([]);
    const [planType, setPlanType] = useState('ONFIELD');
    const [value, setValue] = React.useState('ONFIELD');
    const planLoading = useSelector((state) => state.plan.loading);
    const retailerLoading = useSelector((state) => state.retailer.loading);
    const loading = planLoading || retailerLoading;
    const retailers = useSelector((state) => state.retailer.retailerList);

    const [form] = Form.useForm();

    const dateFormat = 'YYYY/MM/DD';

    useEffect(() => {
        const selectedDate = moment(planDate, dateFormat);
        !moment(selectedDate).isBefore(moment(), "day") &&
            form.setFieldsValue({
                planned_date: selectedDate,
            });
    }, [planDate]);

    useEffect(() => {
        dispatch(getRetailerList({ data: 'light', pagniation: 0 }));
    }, []);

    useEffect(() => {
        setRetailerList(retailers)
    }, [retailers])

    /**
     * @name onFinish
     * @description add address
     * @param {values}
     * @returns {}
     */
    const onFinish = async (values) => {
        values.planned_date = dayjs(values.planned_date).format('DD-MM-YYYY');

        if (planType == 'ONFIELD') {
            values.plan_comment = '';
        }
        values.approval_required = hasAppSettings('General','plan_approval_required');
        const callBack = () => setPlanAddCount(planAddCount + 1);
        await dispatch({
            type: POST_VISITS_INITIATE,
            payload: { values, planDate, callBack }
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    const handleSearch = (e) => {
        const substr = e.target.value;
        const array = retailers;
        const flowFilter = () => {
            return _.filter(
                array,
                (item) => {
                    const shopName = _.toLower(item.shop_name)
                    return shopName.includes(_.toLower(substr))
                }
                // _.flow(_.identity, _.values, _.join, _.toLower, _.partialRight(_.includes, substr))
            );
        };
        if (substr.length >= 0) {
            setRetailerList(flowFilter);
        } else {
            setRetailerList(retailers);
        }
    };

    const closePopup = () => {
        close();
    };

    const onTypeChange = (value) => {
        setPlanType(value);
    };

    const onChangeBuyer = (ids) => {
        const buyers = retailerList.filter(item => ids.includes(item.id))
        setSelectedBuyer(buyers);
    };

    const handleremoveSelectedBuyer = (id) => {
        const removeIndex = selectedBuyer.map(function (item) { return item.id; }).indexOf(id);
        selectedBuyer.splice(removeIndex, 1);
        setSelectedBuyer([...selectedBuyer]);
        const ids = []
        selectedBuyer.map(item => ids.push(item.id));
        form.setFieldsValue({ 'buyer': ids })
    }

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };
    return (
        <Drawer
            title="Add Plan"
            placement={'right'}
            closable={true}
            onClose={closePopup}
            visible={visible}
            key={'plan'}
            width={'100%'}
            className={'add-plan-drawer'}
            footer={
                <ButtonWraper
                    block
                    disabled={false}
                    type={'primary'}
                    size={'large'}
                    onClick={() => {
                        form.validateFields()
                            .then((values) => {
                                form.resetFields();
                                onFinish(values);
                                closePopup();
                            })
                            .catch((info) => {
                                console.log('Validate Failed:', info);
                            });
                    }}>
                    {langs.labels.addPlan}
                </ButtonWraper>
            }>
            <LoadData data={retailers} loading={loading}>
                <Form
                    form={form}
                    name={langs.labels.address}
                    layout="vertical"
                    initialValues={{
                        plan_type: planType,
                    }}>
                    <div className="form-block">
                        <Row>
                            <Col span={16}>
                                <FormInputWrapper
                                    label={langs.labels.date}
                                    name="planned_date"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        }
                                    ]}>
                                    <DatePicker
                                        format={DATE_FORMAT}
                                        size={'large'}
                                        disabledDate={disabledPastDate}
                                    />
                                </FormInputWrapper>
                            </Col>
                            <Col span={8}>
                                <FormInputWrapper
                                    label={langs.labels.type}
                                    name="plan_type"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        }
                                    ]}>
                                    <Select
                                        defaultValue={planType}
                                        size={'large'}
                                        onChange={onTypeChange}
                                        value={planType}>
                                        <Select.Option value={'ONFIELD'}>On-Field</Select.Option>
                                        <Select.Option value={'OFFFIELD'}>Off-Field</Select.Option>
                                    </Select>
                                </FormInputWrapper>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-block-bottom">
                        {planType == 'ONFIELD' ? (
                            <Fragment>
                                <FormInputWrapper
                                    label={'Select Buyers'}
                                    name="buyer"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        }
                                    ]}>
                                    <Select
                                        mode="multiple"
                                        size={'large'}
                                        placeholder="Please select buyers"
                                        onChange={onChangeBuyer}
                                        className="multiple-select-buyers"
                                        style={{ width: '100%' }}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {retailerList.map(item => (<Select.Option key={item.id} value={item.id}>{item.shop_name}</Select.Option>))}
                                    </Select>
                                </FormInputWrapper>
                                <div className="list-block">
                                    <Typography.Title level={5} className={'m-t10 m-b0'}>Selected Buyers</Typography.Title>
                                    <List
                                        dataSource={selectedBuyer}
                                        renderItem={(item) => (
                                            <List.Item
                                                actions={[<a key="list-remove" className="icon-close" onClick={() => handleremoveSelectedBuyer(item.id)}><CloseOutlined /></a>]}
                                            >
                                                <List.Item.Meta
                                                    // avatar={<Checkbox value={item.id}></Checkbox>}
                                                    title={item.shop_name}
                                                    description={`${item.full_name} - ${item.cityName}`}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <FormInputWrapper
                                    label={'Select Plan'}
                                    name="plan"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        }
                                    ]}>
                                    <Radio.Group onChange={() => { }} value={value} layout={'vertical'}>
                                        {OFF_FIELD_OPTIONS &&
                                            OFF_FIELD_OPTIONS.map((data) => {
                                                return (
                                                    <Radio
                                                        onChange={(e) => console.log(e.target.value)}
                                                        value={`${data.value}`}
                                                        key={`${data.value}`}
                                                        style={radioStyle}
                                                    >
                                                        {data.name}
                                                    </Radio>
                                                );
                                            })}
                                    </Radio.Group>
                                </FormInputWrapper>
                                <FormInputWrapper
                                    label={'Your Comments'}
                                    name="plan_comment"
                                    rules={[
                                        {
                                            required: true,
                                            message: langs.validationMessages.fieldRequired
                                        }
                                    ]}>
                                    <TextArea row={3} />
                                </FormInputWrapper>
                            </Fragment>
                        )}
                    </div>

                </Form>
            </LoadData>
        </Drawer>
    );
};
export default AddPlan;
