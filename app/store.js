import { createStore } from 'redux'
import rootReducer from './reducers'

const enhancer = process.env.NODE_ENV !== 'production' &&
  window.devToolsExtension ?
  window.devToolsExtension() :
  undefined
const store = createStore(rootReducer, undefined, enhancer)

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = rootReducer
    store.replaceReducer(nextRootReducer)
  })
}

export default store
