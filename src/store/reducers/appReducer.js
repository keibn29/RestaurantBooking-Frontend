import { LANGUAGES } from "../../utils";
import * as appActions from "../actions/appActions";

const initialState = {
  started: true,
  language: LANGUAGES.VI,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case appActions.APP_START_UP_COMPLETE:
      return {
        ...state,
        started: true,
      };

    case appActions.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };

    default:
      return state;
  }
};

export default appReducer;
