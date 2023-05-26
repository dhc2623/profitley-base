export const POST_REVIEW_INITIATE = 'POST_REVIEW_INITIATE';
export const POST_REVIEW_SUCCESS = 'POST_REVIEW_SUCCESS';
export const POST_REVIEW_FAILURE = 'POST_REVIEW_FAILURE';

export const GET_REVIEW_INITIATE = 'GET_REVIEW_INITIATE';
export const GET_REVIEW_SUCCESS = 'GET_REVIEW_SUCCESS';
export const GET_REVIEW_FAILURE = 'GET_REVIEW_FAILURE';

export const postReview = (params) => ({
    type: POST_REVIEW_INITIATE,
    params
});

export const postReviewSuccess = (data) => ({
    type: POST_REVIEW_SUCCESS,
    payload: data
});

export const postReviewFailure = (data) => ({
    type: POST_REVIEW_FAILURE,
    payload: data
});

export const getReview = (params) => ({
    type: POST_REVIEW_INITIATE,
    params
});

export const getReviewSuccess = (data) => ({
    type: POST_REVIEW_SUCCESS,
    payload: data
});

export const getReviewFailure = (data) => ({
    type: POST_REVIEW_FAILURE,
    payload: data
});
