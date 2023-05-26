import { Fragment, useEffect, useState } from 'react';
import { Input, Select, Form, InputNumber } from 'antd';
import dynamic from 'next/dynamic';
import { langs } from '../../localization';
import { useDispatch } from 'react-redux';
import { updateRetailerCollection } from '../../store/retailer/Action';
import { getBankService } from '../../store/master/Service';
import { errorResponse } from '../../helper/Utils';
const FormInputWrapper = dynamic(() => import('../common/form/InputWrapper'));
const ModalWrapper = dynamic(() => import('../common/modal'));

export default function CollectionAdd({
    closePopup,
    visible = true,
    retailerID,
    userDetail,
    selectedData
}) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [isCheck, setIsChack] = useState(0);
    const [banks, setbanks] = useState([]);

    useEffect(() => {
        getBankList();
    }, []);

    useEffect(() => {
        form.setFieldsValue(selectedData);
        setIsChack(selectedData.is_cash);
    }, [visible]);

    const getBankList = async () => {
        let banks = [];
        try {
            banks = await getBankService();
        } catch (error) {
            errorResponse(error, 'Bank list call from comp');
        }
        await setbanks(banks.data.success.data);
    };

    /**
     * @name onFinish
     * @description handle retailer Filter
     * @param {}
     * @returns {}
     */
    const onFinish = () =>
        form
            .validateFields()
            .then((values) => {
                values.organization_id = userDetail.organization_id;
                values.retailer_id = retailerID;
                values.collected_by = userDetail.id;
                values.collected_id = selectedData.id;
                dispatch(updateRetailerCollection(retailerID, values));
                closePopup();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });

    return (
        <ModalWrapper
            title={langs.labels.collection}
            visible={visible}
            closable={true}
            okText={langs.labels.submit}
            cancelText={langs.labels.cancel}
            onOk={() => onFinish()}
            onCancel={closePopup}>
            <Form layout={'vertical'} name={'collection'} form={form}>
                <FormInputWrapper
                    label={langs.labels.paymentReceived}
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: langs.validationMessages.fieldRequired
                        }
                    ]}>
                    <InputNumber
                        defaultValue={0}
                        style={{ width: '100%' }}
                        size={'large'}
                        minLength={1} maxLength={7}
                        parser={value => value.replace('-', '')}
                    />
                </FormInputWrapper>
                <FormInputWrapper label={langs.labels.paymentMode} name="is_cash">
                    <Select defaultValue={1} onChange={(e) => setIsChack(e)} size={'large'}>
                        <Select.Option value={1}>{langs.labels.cash}</Select.Option>
                        <Select.Option value={0}>{langs.labels.cheque}</Select.Option>
                    </Select>
                </FormInputWrapper>
                {!isCheck ? (
                    <Fragment>
                        <FormInputWrapper
                            label={langs.labels.bankName}
                            name="bank_name"
                            rules={[
                                {
                                    required: true,
                                    message: langs.validationMessages.fieldRequired
                                }
                            ]}>
                            <Select
                                size={'large'}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }>
                                {banks.map((item) => (
                                    <Select.Option key={item.name} value={item.name}>
                                        {item.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </FormInputWrapper>
                        <FormInputWrapper
                            label={langs.labels.chequeNo}
                            name="cheque_number"
                            rules={[
                                {
                                    required: true,
                                    message: langs.validationMessages.fieldRequired
                                },
                                {
                                    //type: 'number',
                                    pattern: /^[\d]{0,6}$/,
                                    message: `${langs.validationMessages.chequeNumberLength}`,
                                }
                            ]}>
                            <InputNumber size={'large'} style={{ width: '100%' }}/>
                        </FormInputWrapper>
                    </Fragment>
                ) : (
                    ''
                )}
            </Form>
        </ModalWrapper>
    );
}
