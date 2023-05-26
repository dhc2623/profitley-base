import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './Sagas';
import rootReducer from './Reducers';

/**
 * @method configureStore
 * @description It Create SAGA middle ware and apply it in the store with reducer.
 */
const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(rootSaga);
    return store;
};

export default configureStore;
