import { takeLatest, call, put } from "redux-saga/effects";
import * as userService from "../../services/userService";
import * as userActions from "../actions/userActions";

function* loginSaga(payload) {
  try {
    const res = yield call(userService.handleLogin, payload.data);
    if (res && res.errCode === 0) {
      yield put(userActions.loginSuccess(res.user));
    } else {
      yield put(userActions.loginFailed(res.errMessage));
    }
  } catch (e) {
    yield put(userActions.loginFailed(e));
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

function* getAllUserByRoleSaga(payload) {
  try {
    const res = yield call(userService.getAllUserByRole, payload.role);
    if (res && res.errCode === 0) {
      yield put(userActions.getAllUserByRoleSuccess(res.listUser));
    } else {
      yield put(userActions.getAllUserByRoleFailed(res.errMessage));
    }
  } catch (e) {
    yield put(userActions.getAllUserByRoleFailed(e));
  }
}

function* userSaga() {
  yield takeLatest(userActions.SYSTEM_LOGIN, loginSaga);
  yield takeLatest(userActions.GET_LIST_USER, getListUserSaga);
  yield takeLatest(userActions.GET_ALL_USER_BY_ROLE, getAllUserByRoleSaga);
}

export default userSaga;
