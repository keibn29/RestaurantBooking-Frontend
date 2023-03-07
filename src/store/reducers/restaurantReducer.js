import * as restaurantActions from "../actions/restaurantActions";

const initialState = {
  listRestaurant: [],
  totalRestaurant: "",
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    //get-list-user
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

    default:
      return state;
  }
};

export default restaurantReducer;
