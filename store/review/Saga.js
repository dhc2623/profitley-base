import { put, call, takeEvery } from 'redux-saga/effects';
import { NOTIFICATION_TYPE } from '../../config/Constant';
import { showNotification } from '../../helper/Utils';
import { langs } from '../../localization';
import {
    POST_REVIEW_INITIATE,
    postReviewSuccess,
    postReviewFailure,
    GET_REVIEW_INITIATE,
    getReviewSuccess,
    getReviewFailure
} from './Action';
import { GET_PRODUCT_DETAILS_INITIATE } from '../product/Action';
import { getReviewService, postReviewService } from './Service';
import { getReview } from './Action';

export function* postReview(action) {
    try {
        const data = yield call(() => postReviewService(action.postData));
        showNotification(NOTIFICATION_TYPE.SUCCESS, langs.notificationMessages.reviewSubmitted);
        action.form.resetFields(['body', 'rating']);
        yield put(
            {
                type: GET_PRODUCT_DETAILS_INITIATE,
                productId: action.postData.slug
            }
        );
        yield put(postReviewSuccess(data));
    } catch (error) {
        yield put(postReviewFailure(error));
    }
}

//watchers
export default function* watchList() {
    yield takeEvery(POST_REVIEW_INITIATE, postReview);
}
