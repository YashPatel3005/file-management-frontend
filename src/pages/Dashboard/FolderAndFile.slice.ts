import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ICreateFolder, IUploadFile, STATUS } from "./FolderAndFile.model";
import { createFolder, uploadFile } from "./FolderAndFile.api";
import Toast from "../../components/common/Toast";
import { AppState } from "../../store/store";
import { IAxiosError, Utils } from "../../utils/utils";

export interface ISavedScenario {
  status: STATUS;
  createFolderState: boolean;
  uploadFileState: boolean;
}

const initialState: ISavedScenario = {
  status: STATUS.IDEL,
  createFolderState: false,
  uploadFileState: false,
};

export const createFolderAsync = createAsyncThunk(
  "add/folder",
  async (payload: ICreateFolder) => {
    try {
      const response = await createFolder(payload);
      return response;
    } catch (err: unknown) {
      const errorMessage = err as IAxiosError;
      const errMsg = Utils.handleError(errorMessage.response.data.message);
      Toast({ message: errMsg, type: "error" });
      throw err;
    }
  }
);

export const uploadFileAsync = createAsyncThunk(
  "upload/file",
  async (payload: IUploadFile) => {
    try {
      const response = await uploadFile(payload);
      return response;
    } catch (err: unknown) {
      const errorMessage = err as IAxiosError;
      const errMsg = Utils.handleError(errorMessage.response.data.message);
      Toast({ message: errMsg, type: "error" });
      throw err;
    }
  }
);

const FolderAndFileSlice = createSlice({
  name: "FolderAndFile",
  initialState,
  reducers: {
    FolderAndFile: (state) => {
      return state;
    },

    CreateFolderModalOpen: (state, action) => {
      state.createFolderState = action.payload;
    },
    UploadFileOpen: (state, action) => {
      state.uploadFileState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createFolderAsync.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(createFolderAsync.rejected, (state) => {
        state.status = STATUS.REJECTED;
      })
      .addCase(createFolderAsync.fulfilled, (state, action) => {
        state.status = STATUS.FULFILLED;
        state.createFolderState = false;
        Toast({ message: action.payload.message, type: "success" });
      })
      .addCase(uploadFileAsync.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(uploadFileAsync.rejected, (state) => {
        state.status = STATUS.REJECTED;
      })
      .addCase(uploadFileAsync.fulfilled, (state, action) => {
        state.status = STATUS.FULFILLED;
        state.uploadFileState = false;
        Toast({ message: action.payload.message, type: "success" });
      });
  },
});

export default FolderAndFileSlice.reducer;
export const FolderAndFileState = (state: AppState) => state;
export const FolderAndFileAction = FolderAndFileSlice.actions;
