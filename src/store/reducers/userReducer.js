import * as userActions from "../actions/userActions";

const initialState = {
  isLoggedInSystem: false,
  userInfo: "",
  customerInfo: "",
  isOpenCustomerLoginDialog: true,
  listUser: [],
  totalUser: "",
  listUserByRole: [],
  listDishOrder: [],
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
        listDishOrder: [],
        isOpenCustomerLoginDialog: true,
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

    //edit-user-by-id
    case userActions.EDIT_CUSTOMER_INFO_BY_ID_SUCCESS:
      return {
        ...state,
        customerInfo: action.userEdited,
      };
    case userActions.EDIT_CUSTOMER_INFO_BY_ID_FAILED:
      return {
        ...state,
      };

    //add-dish-order
    case userActions.ADD_DISH_ORDER:
      let dishExist = state.listDishOrder.find(
        (item) => item.id === action.dish.id
      );
      return {
        ...state,
        listDishOrder: !dishExist
          ? [action.dish, ...state.listDishOrder]
          : [...state.listDishOrder],
      };

    //update-dish-order
    case userActions.UPDATE_DISH_ORDER:
      return {
        ...state,
        listDishOrder: state.listDishOrder.filter(
          (item) => item.id !== action.dishId
        ),
      };

    //clear-dish-order
    case userActions.CLEAR_DISH_ORDER:
      return {
        ...state,
        listDishOrder: [],
      };

    default:
      return state;
  }
};

export default userReducer;
