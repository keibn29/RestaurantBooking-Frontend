import axios from "../axios";

export const getListHanbook = (data) => {
  return axios.post(`/api/handbooks/search`, data);
};

export const addNewHandbook = (data) => {
  return axios.post(`/api/handbooks`, data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};

export const editHandbookById = (handbookId, data) => {
  return axios.put(`/api/handbooks/${handbookId}`, data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
};

export const deleteHandbookById = (handbookId) => {
  return axios.delete(`/api/handbooks/${handbookId}`);
};

export const getHandbookById = (handbookId) => {
  return axios.get(`/api/handbooks/${handbookId}`);
};
