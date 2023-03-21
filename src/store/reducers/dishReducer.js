import * as dishActions from "../actions/dishActions";

const initialState = {
  listDish: [],
  totalDish: "",
};

const dishReducer = (state = initialState, action) => {
  switch (action.type) {
    //get-list-dish-by-page
    case dishActions.GET_LIST_DISH_SUCCESS:
      return {
        ...state,
        listDish: action.listDish,
        totalDish: action.totalDish,
      };
    case dishActions.GET_LIST_DISH_FAILED:
      return {
        ...state,
        listDish: [],
        totalDish: "",
      };

    default:
      return state;
  }
};

export default dishReducer;
