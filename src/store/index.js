import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import * as reducer from './reducer'

const store = createStore(
  combineReducers({ ...reducer }),
  compose(
    applyMiddleware(thunk),
    process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
)

export default store
