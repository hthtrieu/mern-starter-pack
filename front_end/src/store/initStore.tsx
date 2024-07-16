import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '@/store/root-reducer';
import rootSaga from '@/store/root-saga';

const sagaMiddleware = createSagaMiddleware();

const initStore = () => {
  const store = configureStore({
    reducer: { ...rootReducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat([
        sagaMiddleware,
      ]),
    devTools: process.env.NODE_ENV !== 'production',
  });

  sagaMiddleware.run(rootSaga);

  return store;
};
export default initStore;
