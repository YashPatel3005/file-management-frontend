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
