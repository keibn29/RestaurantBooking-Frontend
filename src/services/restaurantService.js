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

export const getRestaurantById = (restaurantId) => {
  return axios.get(`/api/restaurants/${restaurantId}`);
};

export const bulkCreateNewSchedule = (data) => {
  return axios.post(`/api/schedules`, data);
};

export const getScheduleByDate = (data) => {
  return axios.post(`/api/schedules/search`, data);
};

export const getListTableBooking = (data) => {
  return axios.post(`/api/bookings/search`, data);
};

export const confirmBookingTable = (bookingId) => {
  return axios.put(`/api/bookings/confirm/${bookingId}`);
};

export const doneBookingTable = (bookingId, data) => {
  return axios.put(`/api/bookings/done/${bookingId}`, data);
};

export const cancelBookingTable = (bookingId) => {
  return axios.delete(`/api/bookings/${bookingId}`);
};

export const addNewReview = (data) => {
  return axios.post(`/api/reviews`, data);
};

export const searchReview = (data) => {
  return axios.post(`/api/reviews/search`, data);
};

export const getReviewByCustomerAndRestaurant = (restaurantId, customerId) => {
  return axios.get(`/api/reviews/${restaurantId}/${customerId}`);
};

export const editReviewById = (reviewId, data) => {
  return axios.put(`/api/reviews/${reviewId}`, data);
};

export const getListRestaurantScore = (restaurantId) => {
  return axios.get(`/api/score/${restaurantId}`);
};
