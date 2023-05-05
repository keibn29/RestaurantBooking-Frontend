import { takeLatest, call, put } from "redux-saga/effects";
import * as allCodeService from "../../services/allCodeService";
import * as allCodeActions from "../actions/allCodeActions";

//role
function* getAllRoleSaga(payload) {
  try {
    const res = yield call(allCodeService.getAllCodeByType, payload.code);
    if (res && res.errCode === 0) {
      yield put(allCodeActions.getAllRoleSuccess(res.listCode));
    } else {
      yield put(allCodeActions.getAllRoleFailed(res.errMessage));
    }
  } catch (e) {
    yield put(allCodeActions.getAllRoleFailed(e));
  }
}

//province
function* getAllProvinceSaga(payload) {
  try {
    const res = yield call(allCodeService.getAllCodeByType, payload.code);
    if (res && res.errCode === 0) {
      yield put(allCodeActions.getAllProvinceSuccess(res.listCode));
    } else {
      yield put(allCodeActions.getAllProvinceFailed(res.errMessage));
    }
  } catch (e) {
    yield put(allCodeActions.getAllProvinceFailed(e));
  }
}

//country
function* getAllCountrySaga(payload) {
  try {
    const res = yield call(allCodeService.getAllCodeByType, payload.code);
    if (res && res.errCode === 0) {
      yield put(allCodeActions.getAllCountrySuccess(res.listCode));
    } else {
      yield put(allCodeActions.getAllCountryFailed(res.errMessage));
    }
  } catch (e) {
    yield put(allCodeActions.getAllCountryFailed(e));
  }
}

//time
function* getAllTimeSaga(payload) {
  try {
    const res = yield call(allCodeService.getAllCodeByType, payload.code);
    if (res && res.errCode === 0) {
      yield put(allCodeActions.getAllTimeSuccess(res.listCode));
    } else {
      yield put(allCodeActions.getAllTimeFailed(res.errMessage));
    }
  } catch (e) {
    yield put(allCodeActions.getAllTimeFailed(e));
  }
}
//dish-type
function* getAllDishTypeSaga(payload) {
  try {
    const res = yield call(allCodeService.getAllCodeByType, payload.code);
    if (res && res.errCode === 0) {
      yield put(allCodeActions.getAllDishTypeSuccess(res.listCode));
    } else {
      yield put(allCodeActions.getAllDishTypeFailed(res.errMessage));
    }
  } catch (e) {
    yield put(allCodeActions.getAllDishTypeFailed(e));
  }
}

//dish-type
function* getAllPhotoByObjectSaga(payload) {
  try {
    const res = yield call(
      allCodeService.getAllPhotoByObject,
      payload.objectId,
      payload.idMap
    );
    if (res && res.errCode === 0) {
      yield put(allCodeActions.getAllPhotoByObjectSuccess(res.listPhoto));
    } else {
      yield put(allCodeActions.getAllPhotoByObjectFailed(res.errMessage));
    }
  } catch (e) {
    yield put(allCodeActions.getAllPhotoByObjectFailed(e));
  }
}

function* allCodeSaga() {
  yield takeLatest(allCodeActions.GET_ALL_ROLE, getAllRoleSaga);
  yield takeLatest(allCodeActions.GET_ALL_PROVINCE, getAllProvinceSaga);
  yield takeLatest(allCodeActions.GET_ALL_COUNTRY, getAllCountrySaga);
  yield takeLatest(allCodeActions.GET_ALL_TIME, getAllTimeSaga);
  yield takeLatest(allCodeActions.GET_ALL_DISH_TYPE, getAllDishTypeSaga);
  yield takeLatest(
    allCodeActions.GET_ALL_PHOTO_BY_OBJECT,
    getAllPhotoByObjectSaga
  );
}

export default allCodeSaga;
