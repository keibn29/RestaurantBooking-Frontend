import axios from "../axios";

export const addNewDish = (data) => {
  return axios.post(`/api/dishes`, data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};

export const searchDish = (data, language) => {
  return axios.post(`/api/dishes/search?language=${language}`, data);
};

export const editDishById = (dishId, data) => {
  return axios.put(`/api/dishes/${dishId}`, data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};

export const deleteDishById = (dishId) => {
  return axios.delete(`/api/dishes/${dishId}`);
};
