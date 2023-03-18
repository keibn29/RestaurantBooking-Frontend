import axios from "../axios";

export const addNewFood = (data) => {
  return axios.post(`/api/foods`, data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};

export const searchFood = (data, language) => {
  return axios.post(`/api/foods/search?language=${language}`, data);
};

export const editFoodById = (foodId, data) => {
  return axios.put(`/api/foods/${foodId}`, data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};

export const deleteFoodById = (foodId) => {
  return axios.delete(`/api/foods/${foodId}`);
};
