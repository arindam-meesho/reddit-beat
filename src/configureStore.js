import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import createRootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


const persistConfig = {
    key: 'root',
    storage,
}
  

export const history = createHistory()

const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)

export default function configureStore(preloadedState) {
    const rootReducer = createRootReducer(history)
    const persistedReducer = persistReducer(persistConfig, rootReducer)

    const store = createStore(
        persistedReducer, // root reducer with router state
        preloadedState,
        composedEnhancers,
    )
    let persistor = persistStore(store)

    
    return {store,persistor}
}