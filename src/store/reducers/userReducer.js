import * as userActions from "../actions/userActions";

const initialState = {
  isLoggedInSystem: false,
  userInfo: "",
  customerInfo: "",
  isOpenCustomerLoginDialog: true,
  listUser: [],
  totalUser: "",
  listUserByRole: [],
  listFoodOrder: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    //system-login
    case userActions.SYSTEM_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedInSystem: true,
        userInfo: action.userInfo,
      };
    case userActions.SYSTEM_LOGIN_FAILED:
      return {
        ...state,
        isLoggedInSystem: false,
        userInfo: "",
      };
    case userActions.SYSTEM_LOGOUT:
      return {
        ...state,
        isLoggedInSystem: false,
        userInfo: "",
      };

    //customer-login
    case userActions.CUSTOMER_LOGIN_SUCCESS:
      return {
        ...state,
        customerInfo: action.customerInfo,
        isOpenCustomerLoginDialog: false,
      };
    case userActions.CUSTOMER_LOGIN_FAILED:
      return {
        ...state,
        customerInfo: "",
        isOpenCustomerLoginDialog: true,
      };
    case userActions.CUSTOMER_LOGOUT:
      return {
        ...state,
        customerInfo: "",
        listFoodOrder: [],
      };

    //get-list-user
    case userActions.GET_LIST_USER_SUCCESS:
      return {
        ...state,
        listUser: action.listUser,
        totalUser: action.totalUser,
      };
    case userActions.GET_LIST_USER_FAILED:
      return {
        ...state,
        listUser: [],
        totalUser: "",
      };

    //get-all-user-by-role
    case userActions.GET_ALL_USER_BY_ROLE_SUCCESS:
      return {
        ...state,
        listUserByRole: action.listUser,
      };
    case userActions.GET_ALL_USER_BY_ROLE_FAILED:
      return {
        ...state,
        listUserByRole: [],
      };

    //add-food-order
    case userActions.ADD_FOOD_ORDER:
      let foodExist = state.listFoodOrder.find(
        (item) => item.id === action.food.id
      );
      return {
        ...state,
        listFoodOrder: !foodExist
          ? [action.food, ...state.listFoodOrder]
          : [...state.listFoodOrder],
      };

    //update-food-order
    case userActions.UPDATE_FOOD_ORDER:
      return {
        ...state,
        listFoodOrder: state.listFoodOrder.filter(
          (item) => item.id !== action.foodId
        ),
      };

    default:
      return state;
  }
};

export default userReducer;
