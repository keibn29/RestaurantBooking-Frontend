import { toast } from "react-toastify";

//get-list-user
export const GET_LIST_RESTAURANT = "GET_LIST_RESTAURANT";
export const GET_LIST_RESTAURANT_SUCCESS = "GET_LIST_RESTAURANT_SUCCESS";
export const GET_LIST_RESTAURANT_FAILED = "GET_LIST_RESTAURANT_FAILED";

export const getListRestaurant = (data, language) => {
  return {
    type: GET_LIST_RESTAURANT,
    data,
    language,
  };
};

export const getListRestaurantSuccess = (listRestaurant, totalRestaurant) => {
  return {
    type: GET_LIST_RESTAURANT_SUCCESS,
    listRestaurant,
    totalRestaurant,
  };
};

export const getListRestaurantFailed = (error) => {
  toast.error(error);
  return {
    type: GET_LIST_RESTAURANT_FAILED,
  };
};
