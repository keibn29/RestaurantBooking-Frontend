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

//edit-user-by-id
export const EDIT_CUSTOMER_INFO_BY_ID = "EDIT_CUSTOMER_INFO_BY_ID";
export const EDIT_CUSTOMER_INFO_BY_ID_SUCCESS =
  "EDIT_CUSTOMER_INFO_BY_ID_SUCCESS";
export const EDIT_CUSTOMER_INFO_BY_ID_FAILED =
  "EDIT_CUSTOMER_INFO_BY_ID_FAILED";

export const editCustomerInfoById = (customerId, data) => {
  return {
    type: EDIT_CUSTOMER_INFO_BY_ID,
    customerId,
    data,
  };
};

export const editCustomerInfoByIdSuccess = (userEdited) => {
  toast.success("Cập nhật thông tin thành công");
  return {
    type: EDIT_CUSTOMER_INFO_BY_ID_SUCCESS,
    userEdited,
  };
};

export const editCustomerInfoByIdFailed = (error) => {
  toast.error(error);
  return {
    type: EDIT_CUSTOMER_INFO_BY_ID_FAILED,
  };
};

//add-dish-order
export const ADD_DISH_ORDER = "ADD_DISH_ORDER";

export const addDishOrder = (dish) => {
  return {
    type: ADD_DISH_ORDER,
    dish,
  };
};

//update-dish-order
export const UPDATE_DISH_ORDER = "UPDATE_DISH_ORDER";

export const updateDishOrder = (dishId) => {
  return {
    type: UPDATE_DISH_ORDER,
    dishId,
  };
};

//clear-dish-order
export const CLEAR_DISH_ORDER = "CLEAR_DISH_ORDER";

export const clearDishOrder = () => {
  return {
    type: CLEAR_DISH_ORDER,
  };
};
