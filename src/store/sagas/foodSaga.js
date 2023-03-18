import { takeLatest, call, put } from "redux-saga/effects";
import * as foodService from "../../services/foodService";
import * as foodActions from "../actions/foodActions";

function* getListFoodSaga(payload) {
  try {
    const res = yield call(
      foodService.searchFood,
      payload.data,
      payload.language
    );
    if (res && res.errCode === 0) {
      yield put(foodActions.getListFoodSuccess(res.listFood, res.totalFood));
    } else {
      yield put(foodActions.getListFoodFailed(res.errMessage));
    }
  } catch (e) {
    yield put(foodActions.getListFoodFailed(e));
  }
}

function* foodSaga() {
  yield takeLatest(foodActions.GET_LIST_FOOD, getListFoodSaga);
}

export default foodSaga;
