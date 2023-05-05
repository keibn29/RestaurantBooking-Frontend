import { takeLatest, call, put } from "redux-saga/effects";
import * as handbookService from "../../services/handbookService";
import * as handbookActions from "../actions/handbookActions";

//get-list-handbook
function* getListHandbookSaga(payload) {
  try {
    const res = yield call(handbookService.getListHanbook, payload.data);
    if (res && res.errCode === 0) {
      yield put(
        handbookActions.getListHandbookSuccess(
          res.listHandbook,
          res.totalHandbook
        )
      );
    } else {
      yield put(handbookActions.getListHandbookFailed(res.errMessage));
    }
  } catch (e) {
    yield put(handbookActions.getListHandbookFailed(e));
  }
}

function* handbookSaga() {
  yield takeLatest(handbookActions.GET_LIST_HANBOOK, getListHandbookSaga);
}

export default handbookSaga;
