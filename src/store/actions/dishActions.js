import { toast } from "react-toastify";

//get-list-dish-by-page
export const GET_LIST_DISH = "GET_LIST_DISH";
export const GET_LIST_DISH_SUCCESS = "GET_LIST_DISH_SUCCESS";
export const GET_LIST_DISH_FAILED = "GET_LIST_DISH_FAILED";

export const getListDish = (data, language) => {
  return {
    type: GET_LIST_DISH,
    data,
    language,
  };
};

export const getListDishSuccess = (listDish, totalDish) => {
  return {
    type: GET_LIST_DISH_SUCCESS,
    listDish,
    totalDish,
  };
};

export const getListDishFailed = (error) => {
  toast.error(error);
  return {
    type: GET_LIST_DISH_FAILED,
  };
};
