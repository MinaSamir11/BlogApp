import {createStore, applyMiddleware} from 'redux';

import rootReducer from './Reducers';

import thunk from 'redux-thunk';

let middleware = [thunk];

export function getProtectedThing() {
  // grab current state
  const state = store.getState();
}
export default function configureStore(initialState) {
  return createStore(rootReducer, {}, applyMiddleware(...middleware));
}
