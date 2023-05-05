export const NUMBER_MAX_VALUE = 9999;

export const DOLLAR_TO_VND = 23500;

export const NUMBER_PEOPLE_BOOKING = 12;

export const TABLE_SIZE_PAGINATION = 10;

export const PAGE_SIZE_PAGINATION = 5;

export const PATH = {
  HOME: "/",
  HOMEPAGE: "/home",
  SYSTEM_LOGIN: "/system/login",
  LOG_OUT: "/logout",
  SYSTEM: "/system",
  DETAIL_RESTAURANT: "/restaurant/:restaurantId",
  VERIFY_BOOKING_TABLE: "/verify-booking-table",
  BOOKING_HISTORY: "/customer/profile",
  SEARCHPAGE: "/search",
  DETAIL_HANDBOOK: "/handbook/:handbookId",
  UPDATE_PASSWORD: "/update-password/:customerId",
};

export const SYSTEM_PATH = {
  USER_MANAGEMENT: "/system/user-management",
  RESTAURANT_MANAGEMENT: "/system/restaurant-management",
  DISH_MANAGEMENT: "/system/dish-management",
  SCHEDULE_MANAGEMENT: "/system/schedule-management",
  BOOKING_MANAGEMENT: "/system/booking-management",
  HANDBOOK_MANAGEMENT: "/system/handbook-management",
  CUSTOMER_SUPPORT: "/system/customer-support",
};

export const NAV_DETAIL_RESTAURANT = {
  ABOUT: "#about",
  MENU: "#menu",
  PHOTOS: "#photos",
  REVIEWS: "#reviews",
};

export const NAV_CUSTOMER_PROFILE = {
  RESERVATION: "#reservation",
  ACCOUNT: "#account",
};

export const TABLE_ITEM_NAME = {
  USER: "user",
  RESTAURANT: "restaurant",
  DISH: "dish",
  HANDBOOK: "handbook",
};

export const OBJECT = {
  RESTAURANT: "O1",
  DISH: "O2",
  HANDBOOK: "O3",
};

export const ALLCODES = {
  ROLE: "ROLE",
  PROVINCE: "PROVINCE",
  COUNTRY: "COUNTRY",
  DISH: "DISH",
  TIME: "TIME",
  STATUS: "STATUS",
};

export const TIMETYPE = {
  T01: "T01",
  T07: "T07",
};

export const WORK_TIME_OF_DAY = {
  FULLTIME_VI: "11:00 - 22:00",
  FULLTIME_EN: "11:00 AM - 10:00 PM",
  NOON_VI: "11:00 - 16:00",
  NOON_EN: "11:00 AM - 4:00 PM",
  EVENING_VI: "17:00 - 22:00",
  EVENING_EN: "5:00 PM - 10:00 PM",
  CLOSE_VI: "Đóng cửa",
  CLOSE_EN: "Close",
};

export const LANGUAGES = {
  VI: "vi",
  EN: "en",
};

export const USER_ROLE = {
  ADMIN: "R1",
  RESTAURANT_MANAGER: "R2",
  CUSTOMER: "R3",
};

export const LIST_DISH_TYPE = {
  FOOD: "D1",
  DRINK: "D2",
};

export const PAGE_LOGIN = {
  SYSTEM: "system",
  CUSTOMER: "customer",
};

export const EMITTER_EVENTS = {
  UPDATE_TABLE_DATA: "UPDATE_TABLE_DATA",
  FETCH_LIST_DISH_BY_RESTAURANT: "FETCH_LIST_DISH_BY_RESTAURANT",
};

export const CRUD_ACTIONS = {
  CREATE: "CREATE",
  EDIT: "EDIT",
  DELETE: "DELETE",
  READ: "READ",
};

export const CUSTOMER_ACTIONS = {
  DETAIL: "DETAIL",
  CONFIRM: "CONFIRM",
  DONE: "DONE",
  CANCEL: "CANCEL",
};

export const LIST_STATUS = {
  NEW: "S1",
  VERIFIED: "S2",
  CONFIRMED: "S3",
  DONE: "S4",
  OVERDUE: "S5",
};

export const GENERAL_STATUS = {
  DONE: "DONE",
  SLACKING: "SLACKING",
  OVERDUE: "OVERDUE",
};

export const PRICE_RANGE = {
  MIN_MILESTONE: 0,
  SECOND_MILESTONE_VI: 100000,
  SECOND_MILESTONE_EN: 5,
  THIRD_MILESTONE_VI: 1000000,
  THIRD_MILESTONE_EN: 50,
  MAX_MILESTONE: 9999999999,
};

export const FIRESTORE_COLLECTION_NAME = {
  CUSTOMER: "customers",
  MESSAGES: "messages",
};

export const SOCIAL_NETWORK = {
  FACEBOOK: "FACEBOOK",
  GITHUB: "GITHUB",
};

export const PROVINCES = {
  HANOI: "P1",
  BACNINH: "P2",
  DANANG: "P5",
  HOCHIMINH: "P9",
};

export const PAGE = {
  HOMEPAGE: "homepage",
  SEARCHPAGE: "searchpage",
};
