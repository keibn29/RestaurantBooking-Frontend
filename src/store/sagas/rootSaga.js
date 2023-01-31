import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import allCodeSaga from "./allCodeSaga";

export default function* RootSaga() {
  yield all([userSaga(), allCodeSaga()]);
}
