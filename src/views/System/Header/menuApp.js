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
      {
        name: "system.header.customer-support",
        link: SYSTEM_PATH.CUSTOMER_SUPPORT,
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
    menus: [
      {
        name: "system.header.handbook-management",
        link: SYSTEM_PATH.HANDBOOK_MANAGEMENT,
      },
    ],
  },
];

export const restaurantManagerMenu = [
  {
    //nhà hàng
    name: "system.header.restaurant",
    menus: [
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
];
