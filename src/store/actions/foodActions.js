import { toast } from "react-toastify";

//get-list-food-by-page
export const GET_LIST_FOOD = "GET_LIST_FOOD";
export const GET_LIST_FOOD_SUCCESS = "GET_LIST_FOOD_SUCCESS";
export const GET_LIST_FOOD_FAILED = "GET_LIST_FOOD_FAILED";

export const getListFood = (data, language) => {
  return {
    type: GET_LIST_FOOD,
    data,
    language,
  };
};

export const getListFoodSuccess = (listFood, totalFood) => {
  return {
    type: GET_LIST_FOOD_SUCCESS,
    listFood,
    totalFood,
  };
};

export const getListFoodFailed = (error) => {
  toast.error(error);
  return {
    type: GET_LIST_FOOD_FAILED,
  };
};
