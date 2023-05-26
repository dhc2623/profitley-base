import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import localDb from '../../config/localDb';
import {
    GET_CATEGORIES_LIST_INITIATE,
    getCategoriesListSuccess,
    getCategoriesListFailure,
    GET_PARENT_CATEGORIES_INITIATE,
    getParentCategoriesListSuccess,
    getParentCategoriesListFailure,
    GET_SUB_CATEGORIES_INITIATE,
    getSubCategoriesListSuccess,
    getSubCategoriesListFailure
} from './Action';
import {
    getCategoriesListService,
    getParentCategoriesService,
    getSubCategoriesService
} from './Service';

export function* getCategories(action) {
    try {
        const data = yield call(() => getCategoriesListService());
        yield put(getCategoriesListSuccess(data));
    } catch (error) {
        yield put(getCategoriesListFailure(error));
    }
}

export function* getParentCategories(action) {
    try {
        const db = yield localDb();
        const dbFetch = yield db.get('categories').query().fetch();
        const nest = (items, parent = 0) => {
            const nested = [];
            Object.values(items).forEach((itemx) => {
                const item = itemx._raw;
                // parent can be a string or a number
                /* eslint-disable-next-line eqeqeq */
                if (item.parent_id == parent) {
                    const children = nest(items, item.id);

                    if (children.length) {
                        /* eslint-disable-next-line no-param-reassign */
                        item.children = children;
                    }

                    nested.push(item);
                }
            });

            return nested;
        };
        yield put(getParentCategoriesListSuccess({ success: { data: nest(dbFetch) } }));

        // const data = yield call(() => getParentCategoriesService());
        // yield put(getParentCategoriesListSuccess(data));
    } catch (error) {
        yield put(getParentCategoriesListFailure(error));
    }
}

export function* getSubCategories(action) {
    try {
        const data = yield call(() => getSubCategoriesService(action.parentId));
        yield put(getSubCategoriesListSuccess(data));
    } catch (error) {
        yield put(getSubCategoriesListFailure(error));
    }
}

//watchers
export default function* watchList() {
    yield takeLatest(GET_CATEGORIES_LIST_INITIATE, getCategories);
    yield takeLatest(GET_PARENT_CATEGORIES_INITIATE, getParentCategories);
    yield takeLatest(GET_SUB_CATEGORIES_INITIATE, getSubCategories);
}
