import axios from "../axios";

export const getAllCodeByType = (code) => {
  return axios.get(`/api/allcodes/${code}`);
};
