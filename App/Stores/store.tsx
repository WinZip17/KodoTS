import {createStore, applyMiddleware, Store as ReduxStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/';

export type Store = ReduxStore;

const middlewares = [thunkMiddleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const store: Store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
