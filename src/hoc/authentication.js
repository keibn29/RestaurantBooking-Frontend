import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import { PATH } from "../utils";

const locationHelper = locationHelperBuilder({});

export const userIsAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state) => state.user.isLoggedInSystem,
  wrapperDisplayName: "UserIsAuthenticated",
  redirectPath: PATH.SYSTEM_LOGIN,
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  authenticatedSelector: (state) => !state.user.isLoggedInSystem,
  wrapperDisplayName: "UserIsNotAuthenticated",
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || PATH.SYSTEM,
  allowRedirectBack: false,
});
