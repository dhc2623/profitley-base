import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, DatePicker, Radio } from 'antd';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { removeEmptyValues, showNotification } from '../../helper/Utils';
import { getRetailerCategories } from '../../store/master/Action';
import { NOTIFICATION_TYPE } from '../../config/Constant';
import { langs } from '../../localization';
const FormInputWrapper = dynamic(() => import('../common/form/InputWrapper'));
const ModalWrapper = dynamic(() => import('../common/modal'));

const LedgerDrawerFilter = ({
    setPageQuery = '',
    pageQuery = {},
    toggleElem = '',
    setfilterVisible = () => {},
    filterVisible = false
}) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [dateType, setDateType] = useState('');
    const retailerCategories = useSelector((state) => state.master.retailerCategories);

    useEffect(() => {
        dispatch(getRetailerCategories());
    }, []);

    useEffect(() => {
        form.setFieldsValue(pageQuery);
    }, [pageQuery]);

    const showDrawer = () => {
        setfilterVisible(true);
    };
    const onClose = () => {
        setfilterVisible(false);
    };

    /**
     * @name onFinish
     * @description handle order Filter
     * @param {}
     * @returns {}
     */
    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                if (values.date == 'current') {
                    const to = moment().format('DD-MM-YYYY');
                    const from = moment().startOf('M').format('DD-MM-YYYY');
                    values.dateFrom = from;
                    values.dateTo = to;
                } else if (values.date == 'three') {
                    const to = moment().format('DD-MM-YYYY');
                    const from = moment().subtract(3, 'months').startOf('M').format('DD-MM-YYYY');
                    values.dateFrom = from;
                    values.dateTo = to;
                } else if (values.date == 'six') {
                    const to = moment().format('DD-MM-YYYY');
                    const from = moment().subtract(6, 'months').startOf('M').format('DD-MM-YYYY');
                    values.dateFrom = from;
                    values.dateTo = to;
                } else if (values.date == 'custom') {
                    if (values.dateRange && values.dateRange.length > 0) {
                        const from = moment(values.dateRange[0]).format('DD-MM-YYYY');
                        const to = moment(values.dateRange[1]).format('DD-MM-YYYY');
                        values.dateFrom = from;
                        values.dateTo = to;
                    } else {
                        showNotification(NOTIFICATION_TYPE.WARNING, `${langs.validationMessages.pleaseSelectDate}`);
                        return '';
                    }
                }

                if (values.dateFrom && values.dateTo) {
                    delete values.date;
                    delete values.dateRange;
                    values.page = 1;
                    values = removeEmptyValues(values);
                    console.warn(values);
                    setPageQuery({ ...values });
                    setfilterVisible(false);
                } else {
                    showNotification(NOTIFICATION_TYPE.WARNING, `${langs.validationMessages.pleaseSelectDate}`);
                }
            })
            .catch((info) => {
                console.error('Validate Failed:', info);
            });
    };

    const onReset = () => {
        form.setFieldsValue({
            dateRange: undefined,
            dateFrom: undefined,
            dateTo: undefined,
            date: ''
        });
        setfilterVisible(false);
        setPageQuery({ page: 1 });
    };

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
    };

    return (
        <Fragment>
            <span onClick={showDrawer} className="filter-icon">
                {toggleElem}
            </span>
            <ModalWrapper
                title={langs.labels.filter}
                placement="right"
                closable={true}
                width={375}
                onClose={onClose}
                onCancel={onClose}
                visible={filterVisible}
                footer={
                    <div
                        style={{
                            textAlign: 'right'
                        }}>
                        <Button onClick={onReset} style={{ marginRight: 8 }} type={'ghost'}>
                            {langs.labels.reset}
                        </Button>
                        <Button type="primary" onClick={onFinish}>
                            {langs.labels.submit}
                        </Button>
                    </div>
                }>
                <Form name="filter" form={form} initialValues={pageQuery} layout={'vertical'}>
                    <FormInputWrapper name="date">
                        <Radio.Group value={dateType} onChange={(e) => setDateType(e.target.value)}>
                            <Radio style={radioStyle} value={'current'}>
                                {langs.labels.currentMonth}
                            </Radio>
                            <Radio style={radioStyle} value={'three'}>
                                {langs.labels.last3Months}
                            </Radio>
                            <Radio style={radioStyle} value={'six'}>
                                {langs.labels.last6Months}
                            </Radio>
                            <Radio style={radioStyle} value={'custom'}>
                                {langs.labels.selectCustomDates}
                            </Radio>
                        </Radio.Group>
                    </FormInputWrapper>
                    <FormInputWrapper name="dateRange" label={langs.labels.date}>
                        <DatePicker.RangePicker
                            disabled={dateType != 'custom'}
                            // allowClear={true}
                            placeholder={[`${langs.labels.startDate}`,`${langs.labels.endDate}`]}
                            className="w-100"
                            dropdownClassName="order-date-range"
                            ranges={{
                                'This Month': [moment().startOf('month'), moment().endOf('month')]
                            }}
                        />
                    </FormInputWrapper>
                </Form>
            </ModalWrapper>
        </Fragment>
    );
};
export default LedgerDrawerFilter;
