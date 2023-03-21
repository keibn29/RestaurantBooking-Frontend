import { SYSTEM_PATH } from "../../../utils";

export const adminMenu = [
  {
    //người dùng
    name: "system.header.user",
    menus: [
      {
        name: "system.header.user-management",
        link: SYSTEM_PATH.USER_MANAGEMENT,
      },
    ],
  },
  {
    //nhà hàng
    name: "system.header.restaurant",
    menus: [
      {
        name: "system.header.restaurant-management",
        link: SYSTEM_PATH.RESTAURANT_MANAGEMENT,
      },
      {
        name: "system.header.dish-management",
        link: SYSTEM_PATH.DISH_MANAGEMENT,
      },
      {
        name: "system.header.schedule-management",
        link: SYSTEM_PATH.SCHEDULE_MANAGEMENT,
      },
      {
        name: "system.header.booking-management",
        link: SYSTEM_PATH.BOOKING_MANAGEMENT,
      },
    ],
  },
  {
    //bài đăng
    name: "system.header.handbook",
  },
];

export const restaurantManagerMenu = [];
