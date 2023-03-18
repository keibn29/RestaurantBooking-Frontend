import { toast } from "react-toastify";

//system-login
export const SYSTEM_LOGIN = "SYSTEM_LOGIN";
export const SYSTEM_LOGIN_SUCCESS = "SYSTEM_LOGIN_SUCCESS";
export const SYSTEM_LOGIN_FAILED = "SYSTEM_LOGIN_FAILED";
export const SYSTEM_LOGOUT = "SYSTEM_LOGOUT";

export const systemLogin = (data) => {
  return {
    type: SYSTEM_LOGIN,
    data,
  };
};

export const systemLoginSuccess = (userInfo) => {
  return {
    type: SYSTEM_LOGIN_SUCCESS,
    userInfo,
  };
};

export const systemLoginFailed = (err) => {
  toast.error(err);
  return {
    type: SYSTEM_LOGIN_FAILED,
  };
};

export const systemLogout = () => {
  return {
    type: SYSTEM_LOGOUT,
  };
};

//customer-login
export const CUSTOMER_LOGIN = "CUSTOMER_LOGIN";
export const CUSTOMER_LOGIN_SUCCESS = "CUSTOMER_LOGIN_SUCCESS";
export const CUSTOMER_LOGIN_FAILED = "CUSTOMER_LOGIN_FAILED";
export const CUSTOMER_LOGOUT = "CUSTOMER_LOGOUT";

export const customerLogin = (data) => {
  return {
    type: CUSTOMER_LOGIN,
    data,
  };
};

export const customerLoginSuccess = (customerInfo) => {
  return {
    type: CUSTOMER_LOGIN_SUCCESS,
    customerInfo,
  };
};

export const customerLoginFailed = (err) => {
  toast.error(err);
  return {
    type: CUSTOMER_LOGIN_FAILED,
  };
};

export const customerLogout = () => {
  return {
    type: CUSTOMER_LOGOUT,
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

//add-food-order
export const ADD_FOOD_ORDER = "ADD_FOOD_ORDER";

export const addFoodOrder = (food) => {
  return {
    type: ADD_FOOD_ORDER,
    food,
  };
};

//update-food-order
export const UPDATE_FOOD_ORDER = "UPDATE_FOOD_ORDER";

export const updateFoodOrder = (foodId) => {
  return {
    type: UPDATE_FOOD_ORDER,
    foodId,
  };
};
