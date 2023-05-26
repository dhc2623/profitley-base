import { Fragment, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Select, Drawer, Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { removeEmptyValues } from '../../helper/Utils';
import { setFilterVal } from '../../helper/FilterUtils';
import { getRetailerCategories } from '../../store/master/Action';
import { langs } from '../../localization';
const FormInputWrapper = dynamic(() => import('../common/form/InputWrapper'));
const { Option } = Select;

const RetailerDrawerFilter = ({
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
     * @description handle retailer Filter
     * @param {}
     * @returns {}
     */
    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                values.page = 1;
                values = removeEmptyValues(values);
                setPageQuery({ ...values });
                setfilterVisible(false);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    /**
     * @name onReset
     * @description handle reset Filter
     * @param {}
     * @returns {}
     */
    const onReset = () => {
        form.setFieldsValue({
            shop_name: undefined,
            name: undefined,
            mobile: undefined,
            'retailerCategories[]': undefined
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
                title={langs.labels.buyerFilter}
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
                    <FormInputWrapper label={langs.labels.searchByShopName} name="shop_name">
                        <Input size={'large'} />
                    </FormInputWrapper>
                    <FormInputWrapper label={langs.labels.searchByName} name="name">
                        <Input size={'large'} />
                    </FormInputWrapper>
                    <FormInputWrapper label={langs.labels.searchByMobileNumber} name="mobile">
                        <Input size={'large'} />
                    </FormInputWrapper>
                    <FormInputWrapper label={langs.labels.buyerCategories} name="category">
                        <Select
                            // mode="multiple"
                            allowClear
                            size={'large'}
                            style={{ width: '100%' }}
                            placeholder={langs.labels.selectBuyerCat}>
                            {retailerCategories &&
                                retailerCategories.length &&
                                retailerCategories.map((item) => (
                                    <Option
                                        key={item.id}
                                        value={setFilterVal(
                                            item.retailer_catagory,
                                            item.retailer_catagory
                                        )}>
                                        {item.retailer_catagory}
                                    </Option>
                                ))}
                        </Select>
                    </FormInputWrapper>
                </Form>
            </Drawer>
        </Fragment>
    );
};
export default RetailerDrawerFilter;
