
import logger from 'redux-logger'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import Home from './reducers/home'

let store

const appReducer = combineReducers({
    homeData:Home
})


const rootReducer = (state, action) => {  
    return appReducer(state, action);
}


function initStore(initialState) {
  const middleware = [thunkMiddleware]
  if (typeof window !== 'undefined') middleware.push(logger);
  return createStore(
    appReducer,
    initialState,
    applyMiddleware(...middleware)
  )
  
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = initializeStore(initialState)
  return store
}