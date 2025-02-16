import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { ICreateFolder, STATUS } from "./FolderAndFile.model";
import { createFolder } from "./FolderAndFile.api";
import Toast from "../../components/common/Toast";
import { AppState } from "../../store/store";
import { IAxiosError, Utils } from "../../utils/utils";

export interface ISavedScenario {
  status: STATUS;

  filterState: boolean;
}

const initialState: ISavedScenario = {
  status: STATUS.IDEL,

  filterState: false,
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

const FolderAndFileSlice = createSlice({
  name: "FolderAndFile",
  initialState,
  reducers: {
    FolderAndFile: (state) => {
      return state;
    },

    FilterModalOpen: (state, action) => {
      state.filterState = action.payload;
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
        Toast({ message: action.payload.message, type: "success" });
      });
  },
});

export default FolderAndFileSlice.reducer;
export const FolderAndFileState = (state: AppState) => state;
export const FolderAndFileAction = FolderAndFileSlice.actions;
