import axios from "../axios";

export const getAllCodeByType = (code) => {
  return axios.get(`/api/allcodes/${code}`);
};

export const getAllPhotoByObject = (objectId, idMap) => {
  return axios.get(`/api/photos/${objectId}/${idMap}`);
};

export const getPaypalConfig = () => {
  return axios.get(`/api/paypal/config`);
};
