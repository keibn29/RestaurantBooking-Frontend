export const APP_START_UP_COMPLETE = "APP_START_UP_COMPLETE";
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

export const appStartUpComplete = () => ({
  type: APP_START_UP_COMPLETE,
});

export const changeLanguageApp = (languageInput) => ({
  type: CHANGE_LANGUAGE,
  language: languageInput,
});
