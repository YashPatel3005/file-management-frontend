import { axiosInstance } from "../../config/axios-interceptor";
import { API_ROUTES } from "../../utils/constants";
import { ICreateFolder } from "./FolderAndFile.model";

export const createFolder = async (payload: ICreateFolder) => {
  try {
    const res = await axiosInstance({
      method: "get",
      url: API_ROUTES.CREATE_FOLDER,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
