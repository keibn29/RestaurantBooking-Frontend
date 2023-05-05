import { takeLatest, call, put } from "redux-saga/effects";
import * as userService from "../../services/userService";
import * as userActions from "../actions/userActions";
import { db } from "../../firebase/config";

function* systemLoginSaga(payload) {
  try {
    const res = yield call(userService.handleLogin, payload.data);
    if (res && res.errCode === 0) {
      yield put(userActions.systemLoginSuccess(res.user));
    } else {
      yield put(userActions.systemLoginFailed(res.errMessage));
    }
  } catch (e) {
    yield put(userActions.systemLoginFailed(e));
  }
}

function* customerLoginSaga(payload) {
  try {
    const res = yield call(userService.handleLogin, payload.data);
    if (res && res.errCode === 0) {
      yield put(userActions.customerLoginSuccess(res.user));
    } else {
      yield put(userActions.customerLoginFailed(res.errMessage));
    }
  } catch (e) {
    yield put(userActions.customerLoginFailed(e));
  }
}

function* getListUserSaga(payload) {
  try {
    const res = yield call(userService.searchUser, payload.data);
    if (res && res.errCode === 0) {
      yield put(userActions.getListUserSuccess(res.listUser, res.totalUser));
    } else {
      yield put(userActions.getListUserFailed(res.errMessage));
    }
  } catch (e) {
    yield put(userActions.getListUserFailed(e));
  }
}

function* editUserByIdSaga(payload) {
  try {
    const res = yield call(
      userService.editUserById,
      payload.customerId,
      payload.data
    );
    if (res && res.errCode === 0) {
      yield put(userActions.editCustomerInfoByIdSuccess(res.userEdited));
    } else {
      yield put(userActions.editCustomerInfoByIdFailed(res.errMessage));
    }
  } catch (e) {
    yield put(userActions.editCustomerInfoByIdFailed(e));
  }
}

function* userSaga() {
  yield takeLatest(userActions.SYSTEM_LOGIN, systemLoginSaga);
  yield takeLatest(userActions.CUSTOMER_LOGIN, customerLoginSaga);
  yield takeLatest(userActions.GET_LIST_USER, getListUserSaga);
  yield takeLatest(userActions.EDIT_CUSTOMER_INFO_BY_ID, editUserByIdSaga);
}

export default userSaga;
