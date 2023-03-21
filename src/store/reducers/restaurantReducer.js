import * as restaurantActions from "../actions/restaurantActions";

const initialState = {
  listRestaurant: [],
  totalRestaurant: "",
  listSchedule: [],
  listBooking: [],
  totalBooking: "",
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    //get-list-restaurant-by-page
    case restaurantActions.GET_LIST_RESTAURANT_SUCCESS:
      return {
        ...state,
        listRestaurant: action.listRestaurant,
        totalRestaurant: action.totalRestaurant,
      };
    case restaurantActions.GET_LIST_RESTAURANT_FAILED:
      return {
        ...state,
        listRestaurant: [],
        totalRestaurant: "",
      };

    //get-schedule-by-date;
    case restaurantActions.GET_SCHEDULE_BY_DATE_SUCCESS:
      return {
        ...state,
        listSchedule: action.listSchedule,
      };
    case restaurantActions.GET_SCHEDULE_BY_DATE_FAILED:
      return {
        ...state,
        listSchedule: [],
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

    default:
      return state;
  }
};

export default restaurantReducer;
