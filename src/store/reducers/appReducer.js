import * as appActions from "../actions/appActions";

const initContentOfConfirmModal = {
  isOpen: false,
  messageId: "",
  handleFunc: null,
  dataFunc: null,
};

const initialState = {
  started: true,
  language: "vi",
  systemMenuPath: "/system/user-management",
  contentOfConfirmModal: {
    ...initContentOfConfirmModal,
  },
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case appActions.APP_START_UP_COMPLETE:
      return {
        ...state,
        started: true,
      };
    case appActions.SET_CONTENT_OF_CONFIRM_MODAL:
      return {
        ...state,
        contentOfConfirmModal: {
          ...state.contentOfConfirmModal,
          ...action.contentOfConfirmModal,
        },
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
