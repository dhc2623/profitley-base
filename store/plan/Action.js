export const GET_VISITS_INITIATE = 'GET_VISITS_INITIATE';
export const GET_VISITS_SUCCESS = 'GET_VISITS_SUCCESS';
export const GET_VISITS_FAILURE = 'GET_VISITS_FAILURE';

export const POST_VISITS_INITIATE = 'POST_VISITS_INITIATE';
export const POST_VISITS_SUCCESS = 'POST_VISITS_SUCCESS';
export const POST_VISITS_FAILURE = 'POST_VISITS_FAILURE';

export const CHECK_IN_INITIATE = 'CHECK_IN_INITIATE';
export const CHECK_IN_SUCCESS = 'CHECK_IN_SUCCESS';
export const CHECK_IN_FAILURE = 'CHECK_IN_FAILURE';

export const CHECK_OUT_INITIATE = 'CHECK_OUT_INITIATE';
export const CHECK_OUT_SUCCESS = 'CHECK_OUT_SUCCESS';
export const CHECK_OUT_FAILURE = 'CHECK_OUT_FAILURE';

export const CANCEL_VISITS_INITIATE = 'CANCEL_VISITS_INITIATE';
export const CANCEL_VISITS_SUCCESS = 'CANCEL_VISITS_SUCCESS';
export const CANCEL_VISITS_FAILURE = 'CANCEL_VISITS_FAILURE';

export const VISIT_DATE_SUCCESS = 'VISIT_DATE_SUCCESS';
export const DATE_POPUP_VISIBILE = 'DATE_POPUP_VISIBILE';
export const SELECTED_RETAILER = "SELECTED_RETAILER";

export const RE_SCHEDULE_INITIATE = "RE_SCHEDULE_INITIATE";
export const RE_SCHEDULE_SUCCESS = "RE_SCHEDULE_SUCCESS";
export const RE_SCHEDULE_FAILURE = "RE_SCHEDULE_FAILURE";

export const UNAPPROVED_VISITS_INITIATE = 'UNAPPROVED_VISITS_INITIATE';
export const UNAPPROVED_VISITS_SUCCESS = 'UNAPPROVED_VISITS_SUCCESS';
export const UNAPPROVED_VISITS_FAILURE = 'UNAPPROVED_VISITS_FAILURE';

export const getVisits = (data) => ({
    type: GET_VISITS_INITIATE,
    payload: data
});

export const getVisitsSuccess = (data) => ({
    type: GET_VISITS_SUCCESS,
    payload: data
});

export const getVisitsFailure = (data) => ({
    type: GET_VISITS_FAILURE,
    payload: data
});

export const postVisits = (data) => ({
    type: POST_VISITS_INITIATE,
    payload: data
});

export const postVisitsSuccess = (data) => ({
    type: POST_VISITS_SUCCESS,
    payload: data
});

export const postVisitsFailure = (data) => ({
    type: POST_VISITS_FAILURE,
    payload: data
});

export const checkIn = (data) => ({
    type: CHECK_IN_INITIATE,
    payload: data
});

export const checkInSuccess = (data) => ({
    type: CHECK_IN_SUCCESS,
    payload: data
});

export const checkInFailure = (data) => ({
    type: CHECK_IN_FAILURE,
    payload: data
});

export const checkOut = (data) => ({
    type: CHECK_OUT_INITIATE,
    payload: data
});

export const checkOutSuccess = (data) => ({
    type: CHECK_OUT_SUCCESS,
    payload: data
});

export const checkOutFailure = (data) => ({
    type: CHECK_OUT_FAILURE,
    payload: data
});

export const cancelVisit = (data) => ({
    type: CANCEL_VISITS_INITIATE,
    payload: data
});

export const cancelVisitSuccess = (data) => ({
    type: CANCEL_VISITS_SUCCESS,
    payload: data
});

export const cancelVisitFailure = (data) => ({
    type: CANCEL_VISITS_FAILURE,
    payload: data
});

export const setVisitDate = (data) => ({
    type: VISIT_DATE_SUCCESS,
    payload: data
});

export const datePopupVisibility = (data) => ({
    type: DATE_POPUP_VISIBILE,
    payload: data
});
export const setSelectedRetailer = (data) => ({
    type: SELECTED_RETAILER,
    payload: data
});

export const reScheduleVisit = (data) => ({
    type: RE_SCHEDULE_INITIATE,
    payload: data
});

export const reScheduleVisitSuccess = (data) => ({
    type: RE_SCHEDULE_SUCCESS,
    payload: data
});
export const reScheduleVisitFailure = (data) => ({
    type: RE_SCHEDULE_FAILURE,
    payload: data
});

export const unapprovedVisits = (data) => ({
    type: UNAPPROVED_VISITS_INITIATE,
    payload: data
});

export const unapprovedVisitsSuccess = (data) => ({
    type: UNAPPROVED_VISITS_SUCCESS,
    payload: data
});

export const unapprovedVisitsFailure = (data) => ({
    type: UNAPPROVED_VISITS_FAILURE,
    payload: data
});