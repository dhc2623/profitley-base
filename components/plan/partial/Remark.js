import { Form, Input, Select } from 'antd';
import dynamic from 'next/dynamic';
import React from 'react';
import { useDispatch } from 'react-redux';
import { langs } from '../../../localization';
const FormInputWrapper = dynamic(() => import('../../common/form/InputWrapper'));
const ModalWrapper = dynamic(() => import('../../common/modal'));
const { TextArea } = Input;
const { Option } = Select;
const Remark = (props) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();



    /**
     * @name onFinish
     * @description add address
     * @param {values}
     * @returns {}
     */
    const onFinish = async (values) => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
                props.submit(values.comment);
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
            title="Comment"
            closable={false}
            onClose={closePopup}
            visible={props.visible}
            key={"plan"}
            onOk={onFinish}
            okText={langs.labels.submit}
            onCancel={closePopup}
            >
            <Form
                form={form}
                name={langs.labels.comment}
                layout="vertical"
            >
                <FormInputWrapper
                    label={langs.labels.comment}
                    name="comment"
                    rules={[
                        {
                            required: props && props.type == "cancel" ? true : false,
                            message: langs.validationMessages.fieldRequired
                        }
                    ]}>
                    <TextArea row={3} />
                </FormInputWrapper>
            </Form>
        </ModalWrapper >
    );
};
export default Remark;
