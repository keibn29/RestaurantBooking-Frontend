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

function* restaurantSaga() {
  yield takeLatest(
    restaurantActions.GET_LIST_RESTAURANT,
    getListRestaurantSaga
  );
}

export default restaurantSaga;
