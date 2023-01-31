export const APP_START_UP_COMPLETE = "APP_START_UP_COMPLETE";
export const SET_CONTENT_OF_CONFIRM_MODAL = "SET_CONTENT_OF_CONFIRM_MODAL";
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

//không truyền data
export const appStartUpComplete = () => ({
  type: APP_START_UP_COMPLETE,
});

//có truyền data
export const setContentOfConfirmModal = (contentOfConfirmModal) => ({
  type: SET_CONTENT_OF_CONFIRM_MODAL,
  contentOfConfirmModal: contentOfConfirmModal,
});

export const changeLanguageApp = (languageInput) => ({
  type: CHANGE_LANGUAGE,
  language: languageInput,
});
