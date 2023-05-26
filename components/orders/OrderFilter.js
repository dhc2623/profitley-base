import { Fragment, useEffect } from 'react';
import moment from 'moment';
import { Select, Drawer, Button, Form, Input, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { removeEmptyValues } from '../../helper/Utils';
import { setFilterVal } from '../../helper/FilterUtils';
import { getRetailerCategories } from '../../store/master/Action';
import { langs } from '../../localization';
const FormInputWrapper = dynamic(() => import('../common/form/InputWrapper'));

const { Option } = Select;

const OrderDrawerFilter = ({
    setPageQuery = '',
    pageQuery = {},
    toggleElem = '',
    setfilterVisible = () => {},
    filterVisible = false
}) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
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
                if (values.dateRange) {
                    const from = moment(values.dateRange[0]).format('DD-MM-YYYY');
                    const to = moment(values.dateRange[1]).format('DD-MM-YYYY');
                    values.dateFrom = from;
                    values.dateTo = to;
                    delete values.dateRange;
                } else {
                    delete values.dateRange;
                }
                // values.dateRange = `${from} - ${to}`;
                values.page = 1;
                values = removeEmptyValues(values);
                console.warn(values);
                setPageQuery({ ...values });
                setfilterVisible(false);
            })
            .catch((info) => {
                console.error('Validate Failed:', info);
            });
    };

    const onReset = () => {
        form.setFieldsValue({
            amount: undefined,
            status: undefined,
            order_number: undefined,
            dateRange: undefined,
            dateFrom: undefined,
            dateTo: undefined
        });
        setfilterVisible(false);
        setPageQuery({ page: 1 });
    };

    return (
        <Fragment>
            <span onClick={showDrawer} className="filter-icon">
                {toggleElem}
            </span>
            <Drawer
                title={langs.labels.orderFilter}
                placement="right"
                closable={true}
                width={375}
                onClose={onClose}
                visible={filterVisible}
                footer={
                    <div
                        style={{
                            textAlign: 'right'
                        }}>
                        <Button onClick={onReset} style={{ marginRight: 8 }}>
                            {langs.labels.reset}
                        </Button>
                        <Button type="primary" onClick={onFinish}>
                            {langs.labels.submit}
                        </Button>
                    </div>
                }>
                <Form name="filter" form={form} initialValues={pageQuery} layout={'vertical'}>
                    <FormInputWrapper name="dateRange" label={langs.labels.date}>
                        <DatePicker.RangePicker
                            size={'large'}
                            allowClear={true}
                            className="w-100"
                            dropdownClassName="order-date-range"
                            placeholder={[`${langs.labels.startDate}`,`${langs.labels.endDate}`]}
                            ranges={{
                                'This Month': [moment().startOf('month'), moment().endOf('month')]
                            }}
                        />
                    </FormInputWrapper>
                    <FormInputWrapper label={langs.labels.searchByOrderNumber} name="order_number">
                        <Input size={'large'} />
                    </FormInputWrapper>
                    <FormInputWrapper label={langs.labels.searchByAmount} name="amount">
                        <Input size={'large'} />
                    </FormInputWrapper>
                    <FormInputWrapper label={langs.labels.searchByOrderStatus} name="status">
                        <Select
                            size={'large'}
                            allowClear
                            style={{ width: '100%' }}
                            placeholder={langs.labels.pleaseSelectStatus}
                        >
                            <Option key={1} value={setFilterVal('unapproved', 'Unapproved')}>
                                {langs.labels.unapproved}
                            </Option>
                            <Option key={2} value={setFilterVal('accepted', 'Accepted')}>
                                {langs.labels.accepted}
                            </Option>
                            <Option key={3} value={setFilterVal('processing', 'Processing')}>
                                {langs.labels.processing}
                            </Option>
                            <Option key={4} value={setFilterVal('declined', 'Declined')}>
                                {langs.labels.declined}
                            </Option>
                            <Option key={5} value={setFilterVal('cancelled', 'Cancelled')}>
                                {langs.labels.cancelled}
                            </Option>
                            <Option key={6} value={setFilterVal('invoiced', 'Invoiced')}>
                                {langs.labels.invoiced}
                            </Option>
                            <Option key={6} value={setFilterVal('shipped', 'Shipped')}>
                                {langs.labels.shipped}
                            </Option>
                            <Option key={6} value={setFilterVal('completed', 'Completed')}>
                                {langs.labels.completed}
                            </Option>
                        </Select>
                    </FormInputWrapper>
                </Form>
            </Drawer>
        </Fragment>
    );
};
export default OrderDrawerFilter;
