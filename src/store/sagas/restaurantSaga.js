import { takeLatest, call, put } from "redux-saga/effects";
import * as restaurantService from "../../services/restaurantService";
import * as restaurantActions from "../actions/restaurantActions";

function* getListRestaurantSaga(payload) {
  try {
    const res = yield call(
      restaurantService.searchRestaurant,
      payload.data,
      payload.language
    );
    if (res && res.errCode === 0) {
      yield put(
        restaurantActions.getListRestaurantSuccess(
          res.listRestaurant,
          res.totalRestaurant
        )
      );
    } else {
      yield put(restaurantActions.getListRestaurantFailed(res.errMessage));
    }
  } catch (e) {
    yield put(restaurantActions.getListRestaurantFailed(e));
  }
}

function* getScheduleByDateSaga(payload) {
  try {
    const res = yield call(
      restaurantService.getScheduleByDate,
      payload.restaurantId,
      payload.date
    );
    if (res && res.errCode === 0) {
      yield put(restaurantActions.getScheduleByDateSuccess(res.listSchedule));
    } else {
      yield put(restaurantActions.getScheduleByDateFailed(res.errMessage));
    }
  } catch (e) {
    yield put(restaurantActions.getScheduleByDateFailed(e));
  }
}

function* restaurantSaga() {
  yield takeLatest(
    restaurantActions.GET_LIST_RESTAURANT,
    getListRestaurantSaga
  );
  yield takeLatest(
    restaurantActions.GET_SCHEDULE_BY_DATE,
    getScheduleByDateSaga
  );
}

export default restaurantSaga;
