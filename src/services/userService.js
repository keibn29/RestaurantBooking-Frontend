import axios from "../axios";

export const handleLogin = (data) => {
  return axios.post(`/api/login`, data);
};

export const searchUser = (data) => {
  return axios.post(`/api/users/search`, data);
};

export const addNewUser = (data) => {
  return axios.post(`/api/users`, data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};
