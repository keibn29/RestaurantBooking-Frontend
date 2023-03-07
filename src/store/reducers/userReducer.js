import * as userActions from "../actions/userActions";

const initialState = {
  isLoggedInSystem: false,
  userInfo: "",
  listUser: [],
  totalUser: "",
  listUserByRole: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    //login
    case userActions.SYSTEM_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedInSystem: true,
        userInfo: action.userInfo,
      };
    case userActions.SYSTEM_LOGIN_FAILED:
      return {
        ...state,
        isLoggedInSystem: false,
        userInfo: "",
      };
    case userActions.SYSTEM_LOGOUT_FAILED:
      return {
        ...state,
        isLoggedInSystem: false,
        userInfo: "",
      };

    //get-list-user
    case userActions.GET_LIST_USER_SUCCESS:
      return {
        ...state,
        listUser: action.listUser,
        totalUser: action.totalUser,
      };
    case userActions.GET_LIST_USER_FAILED:
      return {
        ...state,
        listUser: [],
        totalUser: "",
      };

    //get-all-user-by-role
    case userActions.GET_ALL_USER_BY_ROLE_SUCCESS:
      return {
        ...state,
        listUserByRole: action.listUser,
      };
    case userActions.GET_ALL_USER_BY_ROLE_FAILED:
      return {
        ...state,
        listUserByRole: [],
      };

    default:
      return state;
  }
};

export default userReducer;
