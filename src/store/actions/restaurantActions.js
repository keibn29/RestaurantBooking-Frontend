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

//get-schedule-by-date
export const GET_SCHEDULE_BY_DATE = "GET_SCHEDULE_BY_DATE";
export const GET_SCHEDULE_BY_DATE_SUCCESS = "GET_SCHEDULE_BY_DATE_SUCCESS";
export const GET_SCHEDULE_BY_DATE_FAILED = "GET_SCHEDULE_BY_DATE_FAILED";

export const getScheduleByDate = (restaurantId, date) => {
  return {
    type: GET_SCHEDULE_BY_DATE,
    restaurantId,
    date,
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
