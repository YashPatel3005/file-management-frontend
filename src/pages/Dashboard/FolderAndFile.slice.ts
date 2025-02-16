import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  ICreateFolder,
  IFolderResponse,
  IUploadFile,
  STATUS,
} from "./FolderAndFile.model";
import { createFolder, getFolder, uploadFile } from "./FolderAndFile.api";
import Toast from "../../components/common/Toast";
import { AppState } from "../../store/store";
import { IAxiosError, Utils } from "../../utils/utils";

export interface ISavedScenario {
  status: STATUS;
  createFolderState: boolean;
  uploadFileState: boolean;
  folderData: {
    success: boolean;
    data: IFolderResponse[];
    message: string;
  };
}

const initialState: ISavedScenario = {
  status: STATUS.IDEL,
  createFolderState: false,
  uploadFileState: false,
  folderData: {
    success: false,
    data: [
      {
        files: [
          {
            __v: 0,
            _id: "",
            createdAt: 0,
            fileName: "",
            mimeType: "",
            path: "",
            updatedAt: 0,
          },
        ],
        folders: [
          {
            _id: "",
            name: "",
            description: "",
            path: "",
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          },
        ],

        statistics: {
          totalFolders: 0,
          totalFiles: 0,
        },
      },
    ],
    message: "",
  },
};
export const getFolderAsync = createAsyncThunk("get/folder", async () => {
  try {
    const response = await getFolder();
    return response;
  } catch (err: unknown) {
    const errorMessage = err as IAxiosError;
    const errMsg = Utils.handleError(errorMessage.response.data.message);
    Toast({ message: errMsg, type: "error" });
    throw err;
  }
});

export const createFolderAsync = createAsyncThunk(
  "add/folder",
  async (payload: ICreateFolder, { dispatch }) => {
    try {
      const response = await createFolder(payload);
      dispatch(getFolderAsync());
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
  async (payload: IUploadFile, { dispatch }) => {
    try {
      const response = await uploadFile(payload);
      dispatch(getFolderAsync());
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
      })

      .addCase(getFolderAsync.pending, (state) => {
        state.status = STATUS.PENDING;
      })
      .addCase(getFolderAsync.rejected, (state) => {
        state.status = STATUS.REJECTED;
      })
      .addCase(getFolderAsync.fulfilled, (state, action) => {
        state.status = STATUS.FULFILLED;
        state.folderData.data = action.payload.data;
      });
  },
});

export default FolderAndFileSlice.reducer;
export const FolderAndFileState = (state: AppState) => state;
export const FolderAndFileAction = FolderAndFileSlice.actions;
