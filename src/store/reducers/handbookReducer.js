import * as handbookActions from "../actions/handbookActions";

const initialState = {
  listHandbook: [],
  totalHandbook: "",
  isLoadingHandbook: false,
};

const handbookReducer = (state = initialState, action) => {
  switch (action.type) {
    //get-list-handbook
    case handbookActions.GET_LIST_HANBOOK:
      return {
        ...state,
        isLoadingHandbook: true,
      };
    case handbookActions.GET_LIST_HANBOOK_SUCCESS:
      return {
        ...state,
        listHandbook: action.listHandbook,
        totalHandbook: action.totalHandbook,
        isLoadingHandbook: false,
      };
    case handbookActions.GET_LIST_HANBOOK_FAILED:
      return {
        ...state,
        listHandbook: [],
        totalHandbook: "",
        isLoadingHandbook: false,
      };

    default:
      return state;
  }
};

export default handbookReducer;
