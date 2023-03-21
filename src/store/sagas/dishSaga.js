import { takeLatest, call, put } from "redux-saga/effects";
import * as dishService from "../../services/dishService";
import * as dishActions from "../actions/dishActions";

function* getListDishSaga(payload) {
  try {
    const res = yield call(
      dishService.searchDish,
      payload.data,
      payload.language
    );
    if (res && res.errCode === 0) {
      yield put(dishActions.getListDishSuccess(res.listDish, res.totalDish));
    } else {
      yield put(dishActions.getListDishFailed(res.errMessage));
    }
  } catch (e) {
    yield put(dishActions.getListDishFailed(e));
  }
}

function* dishSaga() {
  yield takeLatest(dishActions.GET_LIST_DISH, getListDishSaga);
}

export default dishSaga;
