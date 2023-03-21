import axios from "../axios";

export const bookingTable = (data) => {
  return axios.post(`/api/bookings`, data);
};

export const verifyBookingTable = (token) => {
  return axios.put(`/api/bookings/verify?token=${token}`);
};
