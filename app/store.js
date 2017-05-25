import {
  applyMiddleware,
  createStore,
} from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const createStoreWithMiddleware = applyMiddleware(
  sagaMiddleware,
)(createStore)

const enhancer = process.env.NODE_ENV !== 'production' &&
  window.devToolsExtension ?
  window.devToolsExtension() :
  undefined
const store = createStoreWithMiddleware(rootReducer, undefined, enhancer)

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = rootReducer
    store.replaceReducer(nextRootReducer)
  })
}

sagaMiddleware.run(rootSaga)

export default store
