import { axiosInstance } from "../../config/axios-interceptor";
import { API_ROUTES } from "../../utils/constants";
import { ICreateFolder, IUploadFile } from "./FolderAndFile.model";

export const getFolder = async () => {
  try {
    const res = await axiosInstance({
      method: "get",
      url: API_ROUTES.GET_FOLDER,
    });
    console.log(res);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createFolder = async (payload: ICreateFolder) => {
  try {
    const res = await axiosInstance({
      method: "post",
      url: API_ROUTES.CREATE_FOLDER,
      data: payload,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const uploadFile = async (payload: IUploadFile) => {
  try {
    const formData = new FormData();
    if (payload.file) {
      formData.append("file", payload.file);
    }

    const res = await axiosInstance({
      method: "post",
      url: API_ROUTES.UPLOAD_FILE,
      data: formData,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
