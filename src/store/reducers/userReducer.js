import * as userActions from "../actions/userActions";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  listUser: [],
  totalUser: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    //login
    case userActions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case userActions.LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case userActions.PROCESS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
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

    default:
      return state;
  }
};

export default userReducer;
