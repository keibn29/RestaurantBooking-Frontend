import { toast } from "react-toastify";

//login
export const SYSTEM_LOGIN = "SYSTEM_LOGIN";
export const SYSTEM_LOGIN_SUCCESS = "SYSTEM_LOGIN_SUCCESS";
export const SYSTEM_LOGIN_FAILED = "SYSTEM_LOGIN_FAILED";
export const SYSTEM_LOGOUT_FAILED = "SYSTEM_LOGOUT_FAILED";

export const login = (data) => {
  return {
    type: SYSTEM_LOGIN,
    data,
  };
};

export const loginSuccess = (userInfo) => {
  return {
    type: SYSTEM_LOGIN_SUCCESS,
    userInfo,
  };
};

export const loginFailed = (err) => {
  toast.error(err);
  return {
    type: SYSTEM_LOGIN_FAILED,
  };
};

export const processLogout = () => {
  return {
    type: SYSTEM_LOGOUT_FAILED,
  };
};

//get-list-user
export const GET_LIST_USER = "GET_LIST_USER";
export const GET_LIST_USER_SUCCESS = "GET_LIST_USER_SUCCESS";
export const GET_LIST_USER_FAILED = "GET_LIST_USER_FAILED";

export const getListUser = (data) => {
  return {
    type: GET_LIST_USER,
    data,
  };
};

export const getListUserSuccess = (listUser, totalUser) => {
  return {
    type: GET_LIST_USER_SUCCESS,
    listUser,
    totalUser,
  };
};

export const getListUserFailed = (error) => {
  toast.error(error);
  return {
    type: GET_LIST_USER_FAILED,
  };
};

//get-all-user-by-role
export const GET_ALL_USER_BY_ROLE = "GET_ALL_USER_BY_ROLE";
export const GET_ALL_USER_BY_ROLE_SUCCESS = "GET_ALL_USER_BY_ROLE_SUCCESS";
export const GET_ALL_USER_BY_ROLE_FAILED = "GET_ALL_USER_BY_ROLE_FAILED";

export const getAllUserByRole = (role) => {
  return {
    type: GET_ALL_USER_BY_ROLE,
    role,
  };
};

export const getAllUserByRoleSuccess = (listUser) => {
  return {
    type: GET_ALL_USER_BY_ROLE_SUCCESS,
    listUser,
  };
};

export const getAllUserByRoleFailed = (error) => {
  toast.error(error);
  return {
    type: GET_ALL_USER_BY_ROLE_FAILED,
  };
};
