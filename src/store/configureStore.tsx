import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from 'reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas';

const middleware: any[] = [];

const sagaMiddleware = createSagaMiddleware();
const store = (function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware, ...middleware),
  );
  return store;
})();
sagaMiddleware.run(rootSaga);

export function reduxProvider(Component: any): any {
  return (props: any) => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}
export {store};
