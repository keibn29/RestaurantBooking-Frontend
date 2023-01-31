import { toast } from "react-toastify";

//login
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const PROCESS_LOGOUT = "PROCESS_LOGOUT";

export const login = (data) => {
  return {
    type: LOGIN,
    data,
  };
};

export const loginSuccess = (userInfo) => {
  return {
    type: LOGIN_SUCCESS,
    userInfo,
  };
};

export const loginFailed = (err) => {
  toast.error(err);
  return {
    type: LOGIN_FAILED,
  };
};

export const processLogout = () => {
  return {
    type: PROCESS_LOGOUT,
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
