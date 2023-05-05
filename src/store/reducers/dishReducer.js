import * as dishActions from "../actions/dishActions";

const initialState = {
  listDish: [],
  totalDish: "",
  isLoadingDish: false,
};

const dishReducer = (state = initialState, action) => {
  switch (action.type) {
    //get-list-dish-by-page
    case dishActions.GET_LIST_DISH:
      return {
        ...state,
        isLoadingDish: true,
      };
    case dishActions.GET_LIST_DISH_SUCCESS:
      return {
        ...state,
        listDish: action.listDish,
        totalDish: action.totalDish,
        isLoadingDish: false,
      };
    case dishActions.GET_LIST_DISH_FAILED:
      return {
        ...state,
        listDish: [],
        totalDish: "",
        isLoadingDish: false,
      };

    default:
      return state;
  }
};

export default dishReducer;
