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
