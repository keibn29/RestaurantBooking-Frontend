import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import allCodeSaga from "./allCodeSaga";
import restaurantSaga from "./restaurantSaga";
import dishSaga from "./dishSaga";

export default function* RootSaga() {
  yield all([userSaga(), allCodeSaga(), restaurantSaga(), dishSaga()]);
}
