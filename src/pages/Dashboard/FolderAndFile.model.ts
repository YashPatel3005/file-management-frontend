export enum STATUS {
  IDEL = "idle",
  LOADING = "loading",
  FAILED = "failed",
  FULFILLED = "fulfilled",
  PENDING = "pending",
  REJECTED = "rejected",
}
export interface IStatus {
  status: STATUS;
}

export interface ICreateFolder {
  name: string;
  description: string;
}

export interface IUploadFile {
  file: File | null;
}

export interface IFile {
  _id: string;
  fileName: string;
  path: string;
  mimeType: string;
  createdAt: number; // Timestamp in milliseconds
  updatedAt: number; // Timestamp in milliseconds
  __v: number;
}

export interface IFolder {
  _id: string;
  name: string;
  description: string;
  path: string;
  createdAt: number;
  updatedAt: number;
  __v: number;
}

export interface IFolderResponse {
  folders: IFolder[];
  files: IFile[];
  statistics: {
    totalFolders: number;
    totalFiles: number;
  };
}
export interface IFilter {
  name: string;
  description: string;
  date: string | null;
}
