import * as restaurantActions from "../actions/restaurantActions";

const initialState = {
  listRestaurant: [],
  totalRestaurant: "",
  listSchedule: [],
  listBooking: [],
  totalBooking: "",
  restaurantData: {},
  listReview: [],
  totalReview: "",
  listNumberScore: [],
  averageScore: "",
  isLoadingRestaurant: false,
  isLoadingSchedule: false,
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    //get-list-restaurant-by-page
    case restaurantActions.GET_LIST_RESTAURANT:
      return {
        ...state,
        isLoadingRestaurant: true,
      };
    case restaurantActions.GET_LIST_RESTAURANT_SUCCESS:
      return {
        ...state,
        listRestaurant: action.listRestaurant,
        totalRestaurant: action.totalRestaurant,
        isLoadingRestaurant: false,
      };
    case restaurantActions.GET_LIST_RESTAURANT_FAILED:
      return {
        ...state,
        listRestaurant: [],
        totalRestaurant: "",
        isLoadingRestaurant: false,
      };

    //get-restaurant-by-id
    case restaurantActions.GET_RESTAURANT_BY_ID:
      return {
        ...state,
        isLoadingRestaurant: true,
      };
    case restaurantActions.GET_RESTAURANT_BY_ID_SUCCESS:
      return {
        ...state,
        restaurantData: action.restaurant,
        isLoadingRestaurant: false,
      };
    case restaurantActions.GET_RESTAURANT_BY_ID_FAILED:
      return {
        ...state,
        restaurantData: {},
        isLoadingRestaurant: false,
      };

    //get-schedule-by-date;
    case restaurantActions.GET_SCHEDULE_BY_DATE:
      return {
        ...state,
        isLoadingSchedule: true,
      };
    case restaurantActions.GET_SCHEDULE_BY_DATE_SUCCESS:
      return {
        ...state,
        listSchedule: action.listSchedule,
        isLoadingSchedule: false,
      };
    case restaurantActions.GET_SCHEDULE_BY_DATE_FAILED:
      return {
        ...state,
        listSchedule: [],
        isLoadingSchedule: false,
      };

    //get-list-table-booking;
    case restaurantActions.GET_LIST_BOOKING_SUCCESS:
      return {
        ...state,
        listBooking: action.listBooking,
        totalBooking: action.totalBooking,
      };
    case restaurantActions.GET_LIST_BOOKING_FAILED:
      return {
        ...state,
        listBooking: [],
        totalBooking: "",
      };

    //get-list-review-by-restaurant;
    case restaurantActions.GET_LIST_REVIEW_BY_RESTAURANT_SUCCESS:
      return {
        ...state,
        listReview: action.listReview,
        totalReview: action.totalReview,
      };
    case restaurantActions.GET_LIST_REVIEW_BY_RESTAURANT_FAILED:
      return {
        ...state,
        listReview: [],
        totalReview: "",
      };

    //get-list-score-by-restaurant
    case restaurantActions.GET_LIST_SCORE_BY_RESTAURANT_SUCCESS:
      return {
        ...state,
        listNumberScore: action.listNumberScore,
        averageScore: action.averageScore,
      };
    case restaurantActions.GET_LIST_SCORE_BY_RESTAURANT_FAILED:
      return {
        ...state,
        listNumberScore: [],
        averageScore: "",
      };

    default:
      return state;
  }
};

export default restaurantReducer;
