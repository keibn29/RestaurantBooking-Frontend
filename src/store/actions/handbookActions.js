import { toast } from "react-toastify";

//get-list-handbook
export const GET_LIST_HANBOOK = "GET_LIST_HANBOOK";
export const GET_LIST_HANBOOK_SUCCESS = "GET_LIST_HANBOOK_SUCCESS";
export const GET_LIST_HANBOOK_FAILED = "GET_LIST_HANBOOK_FAILED";

export const getListHandbook = (data) => {
  return {
    type: GET_LIST_HANBOOK,
    data,
  };
};

export const getListHandbookSuccess = (listHandbook, totalHandbook) => {
  return {
    type: GET_LIST_HANBOOK_SUCCESS,
    listHandbook,
    totalHandbook,
  };
};

export const getListHandbookFailed = (err) => {
  toast.error(err);
  return {
    type: GET_LIST_HANBOOK_FAILED,
  };
};
