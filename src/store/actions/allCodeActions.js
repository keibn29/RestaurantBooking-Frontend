import { toast } from "react-toastify";

//get-role
export const GET_ALL_ROLE = "GET_ALL_ROLE";
export const GET_ALL_ROLE_SUCCESS = "GET_ALL_ROLE_SUCCESS";
export const GET_ALL_ROLE_FAILED = "GET_ALL_ROLE_FAILED";

export const getAllRole = (code) => {
  return {
    type: GET_ALL_ROLE,
    code,
  };
};

export const getAllRoleSuccess = (listCode) => {
  return {
    type: GET_ALL_ROLE_SUCCESS,
    listCode,
  };
};

export const getAllRoleFailed = (err) => {
  toast.error(err);
  return {
    type: GET_ALL_ROLE_FAILED,
  };
};

//get-province
export const GET_ALL_PROVINCE = "GET_ALL_PROVINCE";
export const GET_ALL_PROVINCE_SUCCESS = "GET_ALL_PROVINCE_SUCCESS";
export const GET_ALL_PROVINCE_FAILED = "GET_ALL_PROVINCE_FAILED";

export const getAllProvince = (code) => {
  return {
    type: GET_ALL_PROVINCE,
    code,
  };
};

export const getAllProvinceSuccess = (listCode) => {
  return {
    type: GET_ALL_PROVINCE_SUCCESS,
    listCode,
  };
};

export const getAllProvinceFailed = (err) => {
  toast.error(err);
  return {
    type: GET_ALL_PROVINCE_FAILED,
  };
};

//get-country
export const GET_ALL_COUNTRY = "GET_ALL_COUNTRY";
export const GET_ALL_COUNTRY_SUCCESS = "GET_ALL_COUNTRY_SUCCESS";
export const GET_ALL_COUNTRY_FAILED = "GET_ALL_COUNTRY_FAILED";

export const getAllCountry = (code) => {
  return {
    type: GET_ALL_COUNTRY,
    code,
  };
};

export const getAllCountrySuccess = (listCode) => {
  return {
    type: GET_ALL_COUNTRY_SUCCESS,
    listCode,
  };
};

export const getAllCountryFailed = (err) => {
  toast.error(err);
  return {
    type: GET_ALL_COUNTRY_FAILED,
  };
};

//get-time
export const GET_ALL_TIME = "GET_ALL_TIME";
export const GET_ALL_TIME_SUCCESS = "GET_ALL_TIME_SUCCESS";
export const GET_ALL_TIME_FAILED = "GET_ALL_TIME_FAILED";

export const getAllTime = (code) => {
  return {
    type: GET_ALL_TIME,
    code,
  };
};

export const getAllTimeSuccess = (listCode) => {
  return {
    type: GET_ALL_TIME_SUCCESS,
    listCode,
  };
};

export const getAllTimeFailed = (err) => {
  toast.error(err);
  return {
    type: GET_ALL_TIME_FAILED,
  };
};
