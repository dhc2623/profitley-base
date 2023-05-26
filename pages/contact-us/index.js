import { Col, Form, Input, Row, Typography } from 'antd';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Panel, { PanelBody } from '../../components/common/panel';
import Responsive from '../../components/responsive/Responsive';
import  withAppContext  from '../../config/withAppContext';
import { getUserDetails, serverCheckIsUserLogin } from '../../helper/AuthActions';
import { langs } from '../../localization';
import { CONTACT_REQUEST_INITIATE } from '../../store/contact/Action';

// import PageTitle from '../../components/common/page-title';
// import DocHead from '../../components/common/head';
// import FormInputWrapper from '../../components/common/form/InputWrapper';
// import ButtonWraper from '../../components/common/form/ButtonWrapper';

const PageTitle = dynamic(() => import('../../components/common/page-title'));
const DocHead = dynamic(() => import('../../components/common/head'));
const FormInputWrapper = dynamic(() => import('../../components/common/form/InputWrapper'));
const ButtonWraper = dynamic(() => import('../../components/common/form/ButtonWrapper'));

const { Title } = Typography;

function ContactUs() {
    const [form] = Form.useForm();
    const router = useRouter();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.contact.loading);

    /**
     * @name onFinish
     * @description It submits the user request via contact us form
     * @param {values}
     * @returns {}
     */
    const onFinish = (values) => {
        let user = getUserDetails();
        let postData = {
            name: user.name + ' ' + user.last_name,
            email: user.email,
            phone: user.phone_number,
            company: user.shop_name,
            subject: values.subject,
            message: values.message
        };
        dispatch({ type: CONTACT_REQUEST_INITIATE, postData, form, router });
    };

    /**Invoke on form validation failed */
    const onFinishFailed = () => {
        console.log('Failed');
    };

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.contactUs} />
            <Responsive.Mobile>
                <PageTitle title={langs.labels.contactUs} />
            </Responsive.Mobile>
            <section className="wrap">
                <Panel className="m-t40">
                    <PanelBody>
                        <Title level={3}>{langs.labels.contactUs}</Title>
                        <Form
                            form={form}
                            layout={'vertical'}
                            name={langs.labels.contactUs}
                            initialValues={{
                                remember: true
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}>
                            <Row gutter={[15, 0]}>
                                <Col md={8} xs={24}>
                                    <FormInputWrapper
                                        label={langs.labels.subject}
                                        name="subject"
                                        rules={[
                                            {
                                                required: true,
                                                message: langs.validationMessages.fieldRequired
                                            },
                                            {
                                                max: 100,
                                                message: langs.validationMessages.subjectLength
                                            }
                                        ]}>
                                        <Input size={'large'} />
                                    </FormInputWrapper>
                                </Col>
                                <Col md={24} xs={24}>
                                    <FormInputWrapper
                                        label={langs.labels.whatsOnYourMind}
                                        name="message"
                                        rules={[
                                            {
                                                required: true,
                                                message: langs.validationMessages.fieldRequired
                                            },
                                            {
                                                max: 500,
                                                message: langs.validationMessages.messageLength
                                            }
                                        ]}>
                                        <Input.TextArea size={'large'} rows={3} />
                                    </FormInputWrapper>
                                </Col>
                                <Col md={24} xs={24}>
                                    <FormInputWrapper className="p-t10">
                                        <ButtonWraper
                                            size={'large'}
                                            loading={loading}
                                            type="primary"
                                            htmlType="submit"
                                            block>
                                            {langs.labels.submit}
                                        </ButtonWraper>
                                    </FormInputWrapper>
                                </Col>
                            </Row>
                        </Form>
                    </PanelBody>
                </Panel>
            </section>
        </Fragment>
    );
}

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(ContactUs);
