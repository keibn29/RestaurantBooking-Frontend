import * as allCodeActions from "../actions/allCodeActions";

const initialState = {
  listRole: [],
  listProvince: [],
};

const allCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    //get-role
    case allCodeActions.GET_ALL_ROLE_SUCCESS:
      return {
        ...state,
        listRole: action.listCode,
      };
    case allCodeActions.GET_ALL_ROLE_FAILED:
      return {
        ...state,
        listRole: [],
      };

    //get-province
    case allCodeActions.GET_ALL_PROVINCE_SUCCESS:
      return {
        ...state,
        listProvince: action.listCode,
      };
    case allCodeActions.GET_ALL_PROVINCE_FAILED:
      return {
        ...state,
        listProvince: [],
      };

    default:
      return state;
  }
};

export default allCodeReducer;
