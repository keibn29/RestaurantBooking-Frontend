import * as foodActions from "../actions/foodActions";

const initialState = {
  listFood: [],
  totalFood: "",
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    //get-list-food-by-page
    case foodActions.GET_LIST_FOOD_SUCCESS:
      return {
        ...state,
        listFood: action.listFood,
        totalFood: action.totalFood,
      };
    case foodActions.GET_LIST_FOOD_FAILED:
      return {
        ...state,
        listFood: [],
        totalFood: "",
      };

    default:
      return state;
  }
};

export default foodReducer;
