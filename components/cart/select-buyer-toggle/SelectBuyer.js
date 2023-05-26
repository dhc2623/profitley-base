import { Drawer, Radio, Form, Input, Typography } from 'antd';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { clearCart, getRetailerForCart, setRetailerDrawer } from '../../../store/cart/Action';
import { UserOutlined, PhoneOutlined, EnvironmentOutlined, MailOutlined } from '@ant-design/icons';
import { getDataInCookies, setDataInCookies } from '../../../helper/Utils';
import { getCurrentRole } from '../../../helper/AuthActions';
import { USER_ROLES } from '../../../config/Constant';
import { setSelectedRetailerId } from '../../../store/common/Action';
import { langs } from '../../../localization';
import { AutoSizer, List as VirtualizedList } from 'react-virtualized';

const ButtonWraper = dynamic(() => import('../../common/form/ButtonWrapper'));
const FormInputWrapper = dynamic(() => import('../../common/form/InputWrapper'));
const LoadData = dynamic(() => import('../../common/load-data'));

export default function SelectBuyer() {
    const cartItem2 = useSelector((state) => state.cart);

    const { retailerList, retailerLoading, retailerDrawer, cartId } = useSelector((state) => ({
        retailerList: state.cart.getRetailerList,
        retailerMeta: state.cart.getRetailerMeta,
        retailerLoading: state.cart.getRetailerLoading,
        retailerDrawer: state.cart.retailerDrawer,
        cartId: state.cart.cartDetails.id
    }));

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    useEffect(() => {
        if (getCurrentRole().name != USER_ROLES.BUYER.name) {
            dispatch(getRetailerForCart());
        }
    }, []);

    useEffect(() => {}, [retailerDrawer]);

    const onClose = () => {
        dispatch(setRetailerDrawer(false));
        dispatch(getRetailerForCart());
        form.resetFields();
        setTimeout(() => document.body.style.removeProperty('overflow'), 500);
    };

    /**
     * @name onFinish
     * @description handle retailer selection
     * @param {}
     * @returns {}
     */
    const onFinish = () => {
        form.validateFields()
            .then((values) => {
                const selectedRetailerObj = retailerList.filter(
                    (item) => item.id === values.selected_retailer
                )[0]._raw;

                setDataInCookies('selectedRetailer', selectedRetailerObj);

                if (cartId) {
                    dispatch(clearCart(cartId));
                }
                dispatch(setSelectedRetailerId(selectedRetailerObj.id));
                dispatch(setRetailerDrawer(false));
                setTimeout(() => document.body.style.removeProperty('overflow'), 500);
                dispatch(getRetailerForCart());
                form.resetFields();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    /**
     * @name handleSearch
     * @description handle retialer search
     * @param {term}
     * @returns {}
     */
    const handleSearch = (term) => {
        const search = {
            searchKey: term
        };
        dispatch(getRetailerForCart(search));
    };

    return (
        <Fragment>
            <Drawer
                destroyOnClose={true}
                title={langs.labels.selectRetailer}
                placement="right"
                closable={true}
                width={'100%'}
                className="drawer-select-buyer"
                onClose={onClose}
                bodyStyle={{ padding: 0 }}
                visible={retailerDrawer}
                footer={
                    <ButtonWraper
                        block
                        size={'large'}
                        disabled={retailerList && retailerList.length < 1}
                        type={'primary'}
                        onClick={onFinish}>
                        {langs.labels.selectRetailer}
                    </ButtonWraper>
                }>
                {getDataInCookies('selectedRetailer') && (
                    <div className="radio-style selected-retailer">
                        <div className="radio-style-content">
                            <div className="radio-style-category-tag">
                                {getDataInCookies('selectedRetailer').category}
                                <span>{langs.labels.category}</span>
                            </div>
                            <div className="radio-style-right">
                                <Typography.Title level={5}>
                                    {getDataInCookies('selectedRetailer').shop_name} <br />
                                </Typography.Title>

                                <Typography.Paragraph>
                                    <UserOutlined />
                                    {getDataInCookies('selectedRetailer').full_name}
                                </Typography.Paragraph>
                                <Typography.Paragraph>
                                    <EnvironmentOutlined />{' '}
                                    {`${getDataInCookies('selectedRetailer').cityName}`}
                                </Typography.Paragraph>
                                <Typography.Paragraph>
                                    <EnvironmentOutlined />{' '}
                                    {`${
                                        getDataInCookies('selectedRetailer').address1
                                            ? `${getDataInCookies('selectedRetailer').address1}, ${
                                                  getDataInCookies('selectedRetailer').cityName
                                              } - ${getDataInCookies('selectedRetailer').pincode}`
                                            : ''
                                    }`}
                                </Typography.Paragraph>
                            </div>
                        </div>
                    </div>
                )}
                <div className="select-retailer-search">
                    <Input.Search
                        size="large"
                        placeholder={langs.labels.searchByName}
                        onSearch={handleSearch}
                        loading={retailerLoading}
                    />
                </div>
                <LoadData data={retailerList} loading={retailerLoading}>
                    <Form name="filter" form={form} layout={'vertical'}>
                        <FormInputWrapper
                            name={'selected_retailer'}
                            rules={[
                                {
                                    required: true,
                                    message: `${langs.validationMessages.buyerSelectionRequired}`
                                }
                            ]}>
                            <Radio.Group style={{ width: '100%' }}>
                                <VirtualizedList
                                    width={3}
                                    height={650}
                                    rowCount={retailerList.length}
                                    rowHeight={81}
                                    // autoHeight={true}
                                    style={{ width: '100%' }}
                                    containerStyle={{ width: '100%', maxWidth: '100%' }}
                                    rowRenderer={(props) => {
                                        const { index, key, style } = props;
                                        const item = retailerList[index];
                                        return (
                                            <Radio
                                                key={key}
                                                style={{ ...style, width: '100%' }}
                                                value={item.id}
                                                className="radio-style">
                                                <div className="radio-style-content">
                                                    <div className="radio-style-right">
                                                        {item.shop_name && (
                                                            <Typography.Title level={5}>
                                                                {item.shop_name} <br />
                                                            </Typography.Title>
                                                        )}
                                                        <Typography.Paragraph>
                                                            <UserOutlined />
                                                            {item.full_name}
                                                        </Typography.Paragraph>

                                                        <Typography.Paragraph
                                                            className={'buyer-city'}>
                                                            {item.cityName}
                                                        </Typography.Paragraph>
                                                    </div>
                                                </div>
                                            </Radio>
                                        );
                                    }}
                                />
                            </Radio.Group>
                        </FormInputWrapper>
                    </Form>
                </LoadData>
            </Drawer>
        </Fragment>
    );
}
