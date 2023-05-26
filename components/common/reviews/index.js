import React, { createElement, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { Typography, Row, Col, Form, Input, Select, Comment, Tooltip, Avatar, Rate } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { langs } from '../../../localization';
import { POST_REVIEW_INITIATE } from '../../../store/review/Action';
import { getCurrentRole } from '../../../helper/AuthActions';
import { USER_ROLES } from '../../../config/Constant';
import { getDateWithTime } from '../../../helper/Utils';
import moment from 'moment';
const FormInputWrapper = dynamic(() => import('../form/InputWrapper'));
const ButtonWraper = dynamic(() => import('../form/ButtonWrapper'));
const { Title } = Typography;
const { Option } = Select;
const ratingList = [
    {
        id: 5,
        name: '5 Stars'
    },
    {
        id: 4,
        name: '4 Stars'
    },
    {
        id: 3,
        name: '3 Stars'
    },
    {
        id: 2,
        name: '2 Stars'
    },
    {
        id: 1,
        name: '1 Star'
    }
];

const Reviews = ({productDetails}) => {
    const [likes, setLikes] = useState(0);
    const [form] = Form.useForm();
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const dispatch = useDispatch();
    const reviewList = useSelector((state) => state.review.reviewList);
    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const submitReview = (values) => {
        if (values) {
            values.product_id = productDetails.id;
            values.slug = productDetails.slug;
            dispatch({ type: POST_REVIEW_INITIATE, form, postData: values });
        }
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={like}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={dislike}>
                {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                <span className="comment-action">{dislikes}</span>
            </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">{langs.labels.replyTo}</span>
    ];

    const currentRole = getCurrentRole() && getCurrentRole().name;

    return (
        <div className="reviews-box">
            <div className="reviews-box-comments">
                {productDetails.reviews &&
                    productDetails.reviews.reverse().map((review) => {
                        return (
                            <Comment
                                // actions={actions}
                                // author={<a>Han Solo</a>}
                                avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                    />
                                }
                                content={review.body}
                                datetime={
                                    <Fragment>
                                        <Tooltip title={getDateWithTime(review.created_at)}>
                                            <span>{moment(review.created_at).fromNow()}</span>
                                        </Tooltip>
                                        <Rate
                                            allowHalf
                                            value={review.rating}
                                            style={{ fontSize: 12, marginLeft: 'auto' }}
                                        />
                                    </Fragment>
                                }
                            />
                        );
                    })}
            </div>
            {currentRole == USER_ROLES.BUYER.name && (
                <Fragment>
                    <Title level={5} strong>
                        {langs.labels.leaveReview}
                    </Title>
                    <Form
                        layout={'vertical'}
                        name={'reviews'}
                        initialValues={{ title: `Review-${productDetails.name}` }}
                        onFinish={submitReview}
                        form={form}>
                        <Row gutter={[15, 0]}>
                            <Col md={12} xs={24}>
                                <FormInputWrapper label={langs.labels.title} name="title">
                                    <Input size={'large'} disabled={true} />
                                </FormInputWrapper>
                            </Col>
                            <Col md={12} xs={24}>
                                <FormInputWrapper label={langs.labels.rating} name="rating">
                                    <Select
                                        size={'large'}
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder={langs.labels.selectRating}>
                                        {ratingList &&
                                            ratingList.map((item) => (
                                                <Option key={item.id} value={item.slug}>
                                                    {item.name}
                                                </Option>
                                            ))}
                                    </Select>
                                </FormInputWrapper>
                            </Col>
                            <Col md={24} xs={24}>
                                <FormInputWrapper label={langs.labels.review} name="body">
                                    <Input.TextArea rows={3} />
                                </FormInputWrapper>
                            </Col>
                            <Col md={24} xs={24}>
                                <ButtonWraper type="primary" htmlType="submit" block>
                                    {langs.labels.submit}
                                </ButtonWraper>
                            </Col>
                        </Row>
                    </Form>
                </Fragment>
            )}
        </div>
    );
};

export default Reviews;
