import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Row, Col } from 'antd';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { langs } from '../../localization';
import { UPDATE_PASSWORD_INITIATE } from '../../store/profile/Action';
import { PASSWORD_WEIGHT_REGX, PASSWORD_MINLENGTH_REGX } from '../../config/Constant';
const FormInputWrapper = dynamic(() => import('../common/form/InputWrapper'));

const ChangePassword = () => {
    const [form] = Form.useForm();
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();

    /**
     * @name onFinish
     * @description change the password
     * @param {values}
     * @returns {}
     */
    const onFinish = (values) => {
        delete values.confirm;
        dispatch({
            type: UPDATE_PASSWORD_INITIATE,
            postData: values,
            router,
            form
        });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    /**
     * @name validPassword
     * @description validate the password
     * @param {rule, name, callback}
     * @returns {}
     */
    const validPassword = (rule, name, callback) => {
        if (name && name != password) {
            callback(`${langs.validationMessages.passwordMatching}`);
        } else {
            callback();
            return;
        }
    };

    return (
        <Form
            form={form}
            layout={'vertical'}
            name={'password'}
            onFinish={(values) => onFinish(values)}
            onFinishFailed={onFinishFailed}>
            <Row gutter={[15, 0]}>
                <Col md={8} xs={24}>
                    <FormInputWrapper
                        label={langs.labels.oldPassword}
                        name="oldPassword"
                        rules={[
                            {
                                required: true,
                                message: langs.validationMessages.fieldRequired
                            }
                        ]}>
                        <Input.Password size={'large'} />
                    </FormInputWrapper>
                </Col>
                <Col md={8} xs={24}>
                    <FormInputWrapper
                        label={langs.labels.newPassword}
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: langs.validationMessages.fieldRequired
                            },
                            {
                                pattern: new RegExp(PASSWORD_MINLENGTH_REGX),
                                message: langs.validationMessages.passwordMinimumPattern
                            }
                        ]}>
                        <Input.Password
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            size={'large'}
                        />
                    </FormInputWrapper>
                </Col>

                <Col md={8} xs={24}>
                    <FormInputWrapper
                        label={langs.labels.confirmPassword}
                        name="confirm"
                        rules={[
                            {
                                required: true,
                                message: langs.validationMessages.fieldRequired
                            },
                            { validator: validPassword }
                        ]}>
                        <Input.Password size={'large'} />
                    </FormInputWrapper>
                </Col>
                <Col md={24} xs={24} className={'align-right'}>
                    <FormInputWrapper>
                        <Button type="primary" htmlType="submit">
                            {langs.labels.update}
                        </Button>
                    </FormInputWrapper>
                </Col>
            </Row>
        </Form>
    );
};

export default ChangePassword;
