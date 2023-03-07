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

export const editUserById = (userId, data) => {
  return axios.put(`/api/users/${userId}`, data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};

export const deleteUserById = (userId) => {
  return axios.delete(`/api/users/${userId}`);
};

export const getAllUserByRole = (role) => {
  return axios.get(`/api/users/${role}`);
};
