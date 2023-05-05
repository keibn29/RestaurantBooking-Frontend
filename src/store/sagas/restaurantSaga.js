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

function* getRestaurantByIdSaga(payload) {
  try {
    const res = yield call(
      restaurantService.getRestaurantById,
      payload.restaurantId
    );
    if (res && res.errCode === 0) {
      yield put(restaurantActions.getRestaurantByIdSuccess(res.restaurant));
    } else {
      yield put(restaurantActions.getRestaurantByIdFailed(res.errMessage));
    }
  } catch (e) {
    yield put(restaurantActions.getRestaurantByIdFailed(e));
  }
}

function* getScheduleByDateSaga(payload) {
  try {
    const res = yield call(restaurantService.getScheduleByDate, payload.data);
    if (res && res.errCode === 0) {
      yield put(restaurantActions.getScheduleByDateSuccess(res.listSchedule));
    } else {
      yield put(restaurantActions.getScheduleByDateFailed(res.errMessage));
    }
  } catch (e) {
    yield put(restaurantActions.getScheduleByDateFailed(e));
  }
}

function* getListTableBookingSaga(payload) {
  try {
    const res = yield call(restaurantService.getListTableBooking, payload.data);
    if (res && res.errCode === 0) {
      yield put(
        restaurantActions.getListTableBookingSuccess(
          res.listBooking,
          res.totalBooking
        )
      );
    } else {
      yield put(restaurantActions.getListTableBookingFailed(res.errMessage));
    }
  } catch (e) {
    yield put(restaurantActions.getListTableBookingFailed(e));
  }
}

function* getListReviewByRestaurantSaga(payload) {
  try {
    const res = yield call(restaurantService.searchReview, payload.data);
    if (res && res.errCode === 0) {
      yield put(
        restaurantActions.getListReviewByRestaurantSuccess(
          res.listReview,
          res.totalReview
        )
      );
    } else {
      yield put(
        restaurantActions.getListReviewByRestaurantFailed(res.errMessage)
      );
    }
  } catch (e) {
    yield put(restaurantActions.getListReviewByRestaurantFailed(e));
  }
}

function* getListScoreByRestaurantSaga(payload) {
  try {
    const res = yield call(
      restaurantService.getListRestaurantScore,
      payload.restaurantId
    );
    if (res && res.errCode === 0) {
      yield put(
        restaurantActions.getListScoreByRestaurantSuccess(
          res.listNumberScore,
          res.averageScore
        )
      );
    } else {
      yield put(
        restaurantActions.getListScoreByRestaurantFailed(res.errMessage)
      );
    }
  } catch (e) {
    yield put(restaurantActions.getListReviewByRestaurantFailed(e));
  }
}

function* restaurantSaga() {
  yield takeLatest(
    restaurantActions.GET_LIST_RESTAURANT,
    getListRestaurantSaga
  );
  yield takeLatest(
    restaurantActions.GET_RESTAURANT_BY_ID,
    getRestaurantByIdSaga
  );
  yield takeLatest(
    restaurantActions.GET_SCHEDULE_BY_DATE,
    getScheduleByDateSaga
  );
  yield takeLatest(restaurantActions.GET_LIST_BOOKING, getListTableBookingSaga);
  yield takeLatest(
    restaurantActions.GET_LIST_REVIEW_BY_RESTAURANT,
    getListReviewByRestaurantSaga
  );
  yield takeLatest(
    restaurantActions.GET_LIST_SCORE_BY_RESTAURANT,
    getListScoreByRestaurantSaga
  );
}

export default restaurantSaga;
