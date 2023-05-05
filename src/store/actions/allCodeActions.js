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

//get-dish-type
export const GET_ALL_DISH_TYPE = "GET_ALL_DISH_TYPE";
export const GET_ALL_DISH_TYPE_SUCCESS = "GET_ALL_DISH_TYPE_SUCCESS";
export const GET_ALL_DISH_TYPE_FAILED = "GET_ALL_DISH_TYPE_FAILED";

export const getAllDishType = (code) => {
  return {
    type: GET_ALL_DISH_TYPE,
    code,
  };
};

export const getAllDishTypeSuccess = (listCode) => {
  return {
    type: GET_ALL_DISH_TYPE_SUCCESS,
    listCode,
  };
};

export const getAllDishTypeFailed = (err) => {
  toast.error(err);
  return {
    type: GET_ALL_DISH_TYPE_FAILED,
  };
};

//get-all-photo-by-object
export const GET_ALL_PHOTO_BY_OBJECT = "GET_ALL_PHOTO_BY_OBJECT";
export const GET_ALL_PHOTO_BY_OBJECT_SUCCESS =
  "GET_ALL_PHOTO_BY_OBJECT_SUCCESS";
export const GET_ALL_PHOTO_BY_OBJECT_FAILED = "GET_ALL_PHOTO_BY_OBJECT_FAILED";

export const getAllPhotoByObject = (objectId, idMap) => {
  return {
    type: GET_ALL_PHOTO_BY_OBJECT,
    objectId,
    idMap,
  };
};

export const getAllPhotoByObjectSuccess = (listPhoto) => {
  return {
    type: GET_ALL_PHOTO_BY_OBJECT_SUCCESS,
    listPhoto,
  };
};

export const getAllPhotoByObjectFailed = (err) => {
  toast.error(err);
  return {
    type: GET_ALL_PHOTO_BY_OBJECT_FAILED,
  };
};
