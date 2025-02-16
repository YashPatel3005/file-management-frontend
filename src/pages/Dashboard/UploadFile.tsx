import React, { useState } from "react";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Button from "../../components/common/Button";
import { useAppDispatch } from "../../store/store";
import { FolderAndFileAction } from "./FolderAndFile.slice";
import { IUploadFile } from "./FolderAndFile.model";
import Loader from "../../components/Loader";

const UploadFile = () => {
  const dispatch = useAppDispatch();
  const { UploadFileOpen } = FolderAndFileAction;
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const initialValues: IUploadFile = {
    file: null,
  };

  const validationSchema = Yup.object({
    file: Yup.mixed()
      .required("A file is required")
      .test(
        "fileType",
        "Only PDF, DOC, DOCX, JPG, PNG, or GIF are allowed",
        (value) => {
          if (!value) return false;
          const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "image/jpeg",
            "image/png",
            "image/gif",
          ];
          return allowedTypes.includes((value as File).type);
        }
      ),
  });

  const handleUploadFile = async (
    values: IUploadFile,
    { resetForm }: FormikHelpers<IUploadFile>
  ) => {
    if (!values.file) return;

    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", values.file);

    try {
      await new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
            resolve(null);
          }
        }, 100);
      });

      console.log("sucess");
    } catch (error) {
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUploadFile}
        enableReinitialize
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="flex flex-col self-stretch my-auto w-full font-medium"
          >
            <div className="mt-4">
              <label className="block font-Inter text-[16px] font-[500] leading-[18.15px] text-black mb-2">
                Browse document
              </label>

              <div
                className="border border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <input
                  id="fileInput"
                  type="file"
                  name="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0] || null;
                    setFieldValue("file", file);
                    setUploadProgress(0); // Reset progress on new file selection
                  }}
                />
                {values.file ? (
                  <div className="text-center">
                    <p className="text-gray-700 dark:text-gray-300">
                      {values.file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(values.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <>
                    <img src="./images/upload-file.png" alt="Upload Icon" />
                    <p className="text-gray-500 text-sm mt-2">
                      Click to upload
                    </p>
                  </>
                )}
              </div>

              {/* Error Message */}
              <ErrorMessage
                component="div"
                name="file"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Progress Bar */}
            {isUploading && (
              <div className="mt-4">
                <div className="relative w-full bg-gray-300 rounded-full h-2.5">
                  <div
                    className="absolute top-0 left-0 h-2.5 rounded-full bg-green-500 transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 text-center mt-1">
                  {uploadProgress}% upload completed
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="mt-4 flex justify-end space-x-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => dispatch(UploadFileOpen(false))}
                className="font-Inter text-[15px] font-[500] leading-[18.15px]"
                disabled={isUploading}
              >
                Close
              </Button>
              <Button
                size="sm"
                type="submit"
                className="font-Inter text-[15px] font-[500] leading-[18.15px]"
                disabled={!values.file || isUploading}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UploadFile;
