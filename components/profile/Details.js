import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Typography, Row, Col, Descriptions } from 'antd';
import dynamic from 'next/dynamic';
import { getCurrentRole } from '../../helper/AuthActions';
import { USER_ROLES } from '../../config/Constant';
import Panel, { PanelBody, PanelTitle } from '../common/panel';
import { langs } from '../../localization';

const FormInputWrapper = dynamic(() => import('../common/form/InputWrapper'));
const ButtonWraper = dynamic(() => import('../common/form/ButtonWrapper'));
const Loading = dynamic(() => import('../common/loading'));

const { Text } = Typography;

const Details = () => {
    const router = useRouter();
    const profileData = useSelector((state) => state.auth.profile);
    const profileDataLoading = useSelector((state) => state.auth.loading);
    useEffect(() => {}, [profileDataLoading]);

    if (profileDataLoading) {
        return <Loading />;
    }

    const redirectToEditProfile = (key) => {
        router.push('/my-profile/profile-edit/[key]', `/my-profile/profile-edit/${key}`);
    };

    const isRetailer = getCurrentRole() && getCurrentRole().name == USER_ROLES.BUYER.name;

    return (
        <Fragment>
            <Row justify="center">
                <Col md={24} xs={24}>
                    <Panel>
                        <PanelTitle
                            title={langs.labels.personalInformation}
                            action={[
                                {
                                    label: `${langs.labels.edit}`,
                                    type: 'primary',
                                    onClick: () => redirectToEditProfile('general')
                                }
                            ]}
                        />
                        <PanelBody>
                            <Descriptions className={'profile-item'} bordered>
                                <Descriptions.Item label={langs.labels.name}>
                                    {profileData.name} {profileData.last_name}
                                </Descriptions.Item>
                                <Descriptions.Item label={langs.labels.email}>
                                    <Link
                                        href={`mailto:${profileData.email}`}
                                        className="text-link">
                                        <a>{profileData.email}</a>
                                    </Link>
                                </Descriptions.Item>
                                <Descriptions.Item label={langs.labels.mobile}>
                                    <Link
                                        href={`tel:${profileData.phone_number}`}
                                        className="text-link">
                                        <a>{profileData.phone_number}</a>
                                    </Link>
                                </Descriptions.Item>
                                {isRetailer && (
                                    <Descriptions.Item label={langs.labels.shop}>
                                        <Link
                                            href={`tel:${profileData.phone_number}`}
                                            className="text-link">
                                            <a>{profileData.shop_name}</a>
                                        </Link>
                                    </Descriptions.Item>
                                )}
                                <Descriptions.Item label={langs.labels.password}>
                                    <Text>{'****'}</Text>
                                    <ButtonWraper
                                        type="link"
                                        onClick={() => redirectToEditProfile('password')}>
                                        {langs.labels.changePassword}
                                    </ButtonWraper>
                                </Descriptions.Item>
                                <Descriptions.Item label={langs.labels.address}>
                                    <Text>
                                        {profileData.address1}
                                        <br /> <br />
                                        {profileData.cityName}, {profileData.districtName} -{' '}
                                        {profileData.pincode} <br /> <br />
                                        {profileData.stateName} {profileData.country}
                                    </Text>
                                    {isRetailer && (
                                        <ButtonWraper
                                            type="link"
                                            onClick={() => redirectToEditProfile('address')}>
                                            {langs.labels.editAddress}
                                        </ButtonWraper>
                                    )}
                                </Descriptions.Item>

                                {isRetailer && (
                                    <Descriptions.Item>
                                        <FormInputWrapper className="p-t10">
                                            <ButtonWraper
                                                type="primary"
                                                htmlType="submit"
                                                onClick={() => redirectToEditProfile('address')}>
                                                {langs.labels.viewAllAddress}
                                            </ButtonWraper>
                                        </FormInputWrapper>
                                    </Descriptions.Item>
                                )}
                            </Descriptions>
                        </PanelBody>
                    </Panel>
                </Col>
            </Row>
        </Fragment>
    );
};

export default Details;
