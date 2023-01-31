import { logger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import { createStateSyncMiddleware } from "redux-state-sync";
import { persistStore } from "redux-persist";
import rootReducer from "./store/reducers/rootReducer";
import * as appActions from "./store/actions/appActions";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./store/sagas/rootSaga";

const environment = process.env.NODE_ENV || "development";
let isDevelopment = environment === "development";

//hide redux logs
isDevelopment = false;

export const history = createBrowserHistory({
  basename: process.env.REACT_APP_ROUTER_BASE_NAME,
});

const reduxStateSyncConfig = {
  whitelist: [appActions.APP_START_UP_COMPLETE, appActions.CHANGE_LANGUAGE],
};

const sagaMiddleware = createSagaMiddleware();

const middleware = [
  routerMiddleware(history),
  sagaMiddleware,
  thunkMiddleware,
  createStateSyncMiddleware(reduxStateSyncConfig),
];
if (isDevelopment) middleware.push(logger);

const composeEnhancers =
  isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const reduxStore = createStore(
  rootReducer(history),
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export const dispatch = reduxStore.dispatch;

export const persistor = persistStore(reduxStore);

export default reduxStore;
