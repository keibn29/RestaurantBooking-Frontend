import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import appReducer from "./appReducer";
import userReducer from "./userReducer";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import allCodeReducer from "./allCodeReducer";
import restaurantReducer from "./restaurantReducer";
import foodReducer from "./foodReducer";

const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const appPersistConfig = {
  ...persistCommonConfig,
  key: "app",
  whitelist: ["language"],
};

const userPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["isLoggedInSystem", "userInfo", "customerInfo", "listFoodOrder"],
};

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    allCode: allCodeReducer,
    restaurant: restaurantReducer,
    food: foodReducer,
  });

export default rootReducer;
