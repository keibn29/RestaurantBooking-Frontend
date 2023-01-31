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
