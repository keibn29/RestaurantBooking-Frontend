import axios from "../axios";

export const bookingTable = (data) => {
  return axios.post(`/api/bookings`, data);
};

export const checkExistBookByToken = (token) => {
  return axios.get(`/api/bookings/check?token=${token}`);
};

export const verifyBookingTable = (token) => {
  return axios.put(`/api/bookings/verify?token=${token}`);
};

export const forgotPassword = (data) => {
  return axios.post(`/api/forgot`, data);
};

export const updateNewPassword = (customerId, token, data) => {
  return axios.put(`/api/forgot/${customerId}?token=${token}`, data);
};
