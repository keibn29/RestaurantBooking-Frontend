import * as allCodeActions from "../actions/allCodeActions";

const initialState = {
  listRole: [],
  listProvince: [],
  listCountry: [],
  listTime: [],
  listDishType: [],
  listPhoto: [],
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

    //get-country
    case allCodeActions.GET_ALL_COUNTRY_SUCCESS:
      return {
        ...state,
        listCountry: action.listCode,
      };
    case allCodeActions.GET_ALL_COUNTRY_FAILED:
      return {
        ...state,
        listCountry: [],
      };

    //get-time
    case allCodeActions.GET_ALL_TIME_SUCCESS:
      return {
        ...state,
        listTime: action.listCode,
      };
    case allCodeActions.GET_ALL_TIME_FAILED:
      return {
        ...state,
        listTime: [],
      };

    //get-dish-type
    case allCodeActions.GET_ALL_DISH_TYPE_SUCCESS:
      return {
        ...state,
        listDishType: action.listCode,
      };
    case allCodeActions.GET_ALL_DISH_TYPE_FAILED:
      return {
        ...state,
        listDishType: [],
      };

    //get-all-photo-by-object
    case allCodeActions.GET_ALL_PHOTO_BY_OBJECT_SUCCESS:
      return {
        ...state,
        listPhoto: action.listPhoto,
      };
    case allCodeActions.GET_ALL_PHOTO_BY_OBJECT_FAILED:
      return {
        ...state,
        listPhoto: [],
      };

    default:
      return state;
  }
};

export default allCodeReducer;
