import axios from "../axios";

export const searchRestaurant = (data, language) => {
  return axios.post(`/api/restaurants/search?language=${language}`, data);
};

export const addNewRestaurant = (data) => {
  return axios.post(`/api/restaurants`, data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};

export const editRestaurantById = (restaurantId, data) => {
  return axios.put(`/api/restaurants/${restaurantId}`, data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};

export const deleteRestaurantById = (restaurantId) => {
  return axios.delete(`/api/restaurants/${restaurantId}`);
};

export const bulkCreateNewSchedule = (data) => {
  return axios.post(`/api/schedules`, data);
};

export const getScheduleByDate = (restaurantId, date) => {
  return axios.get(`/api/schedules?restaurantId=${restaurantId}&date=${date}`);
};

export const getListTableBooking = (data) => {
  return axios.post(`/api/bookings/search`, data);
};

export const confirmOrDoneBookingTable = (bookingId, statusId) => {
  return axios.put(`/api/bookings/confirm/${bookingId}?statusId=${statusId}`);
};

export const cancelBookingTable = (bookingId) => {
  return axios.delete(`/api/bookings/${bookingId}`);
};
