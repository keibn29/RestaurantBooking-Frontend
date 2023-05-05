import { toast } from "react-toastify";

//get-list-restaurant-by-page
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

//get-restaurant-by-id
export const GET_RESTAURANT_BY_ID = "GET_RESTAURANT_BY_ID";
export const GET_RESTAURANT_BY_ID_SUCCESS = "GET_RESTAURANT_BY_ID_SUCCESS";
export const GET_RESTAURANT_BY_ID_FAILED = "GET_RESTAURANT_BY_ID_FAILED";

export const getRestaurantById = (restaurantId) => {
  return {
    type: GET_RESTAURANT_BY_ID,
    restaurantId,
  };
};

export const getRestaurantByIdSuccess = (restaurant) => {
  return {
    type: GET_RESTAURANT_BY_ID_SUCCESS,
    restaurant,
  };
};

export const getRestaurantByIdFailed = (error) => {
  toast.error(error);
  return {
    type: GET_RESTAURANT_BY_ID_FAILED,
  };
};

//get-schedule-by-date
export const GET_SCHEDULE_BY_DATE = "GET_SCHEDULE_BY_DATE";
export const GET_SCHEDULE_BY_DATE_SUCCESS = "GET_SCHEDULE_BY_DATE_SUCCESS";
export const GET_SCHEDULE_BY_DATE_FAILED = "GET_SCHEDULE_BY_DATE_FAILED";

export const getScheduleByDate = (data) => {
  return {
    type: GET_SCHEDULE_BY_DATE,
    data,
  };
};

export const getScheduleByDateSuccess = (listSchedule) => {
  return {
    type: GET_SCHEDULE_BY_DATE_SUCCESS,
    listSchedule,
  };
};

export const getScheduleByDateFailed = (error) => {
  toast.error(error);
  return {
    type: GET_SCHEDULE_BY_DATE_FAILED,
  };
};

//get-list-booking
export const GET_LIST_BOOKING = "GET_LIST_BOOKING";
export const GET_LIST_BOOKING_SUCCESS = "GET_LIST_BOOKING_SUCCESS";
export const GET_LIST_BOOKING_FAILED = "GET_LIST_BOOKING_FAILED";

export const getListTableBooking = (data) => {
  return {
    type: GET_LIST_BOOKING,
    data,
  };
};

export const getListTableBookingSuccess = (listBooking, totalBooking) => {
  return {
    type: GET_LIST_BOOKING_SUCCESS,
    listBooking,
    totalBooking,
  };
};

export const getListTableBookingFailed = (error) => {
  toast.error(error);
  return {
    type: GET_LIST_BOOKING_FAILED,
  };
};

//get-list-booking
export const GET_LIST_REVIEW_BY_RESTAURANT = "GET_LIST_REVIEW_BY_RESTAURANT";
export const GET_LIST_REVIEW_BY_RESTAURANT_SUCCESS =
  "GET_LIST_REVIEW_BY_RESTAURANT_SUCCESS";
export const GET_LIST_REVIEW_BY_RESTAURANT_FAILED =
  "GET_LIST_REVIEW_BY_RESTAURANT_FAILED";

export const getListReviewByRestaurant = (data) => {
  return {
    type: GET_LIST_REVIEW_BY_RESTAURANT,
    data,
  };
};

export const getListReviewByRestaurantSuccess = (listReview, totalReview) => {
  return {
    type: GET_LIST_REVIEW_BY_RESTAURANT_SUCCESS,
    listReview,
    totalReview,
  };
};

export const getListReviewByRestaurantFailed = (error) => {
  toast.error(error);
  return {
    type: GET_LIST_REVIEW_BY_RESTAURANT_FAILED,
  };
};

//get-list-score-by-restaurant
export const GET_LIST_SCORE_BY_RESTAURANT = "GET_LIST_SCORE_BY_RESTAURANT";
export const GET_LIST_SCORE_BY_RESTAURANT_SUCCESS =
  "GET_LIST_SCORE_BY_RESTAURANT_SUCCESS";
export const GET_LIST_SCORE_BY_RESTAURANT_FAILED =
  "GET_LIST_SCORE_BY_RESTAURANT_FAILED";

export const getListScoreByRestaurant = (restaurantId) => {
  return {
    type: GET_LIST_SCORE_BY_RESTAURANT,
    restaurantId,
  };
};

export const getListScoreByRestaurantSuccess = (
  listNumberScore,
  averageScore
) => {
  return {
    type: GET_LIST_SCORE_BY_RESTAURANT_SUCCESS,
    listNumberScore,
    averageScore,
  };
};

export const getListScoreByRestaurantFailed = (error) => {
  toast.error(error);
  return {
    type: GET_LIST_SCORE_BY_RESTAURANT_FAILED,
  };
};
