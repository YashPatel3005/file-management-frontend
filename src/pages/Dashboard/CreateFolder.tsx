import Label from "../../components/common/Label";
import Input from "../../components/common/InputField";
import Button from "../../components/common/Button";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { ICreateFolder } from "./FolderAndFile.model";
import { VALIDATION_MESSAGES } from "../../utils/validation";
import { createFolderAsync, FolderAndFileAction } from "./FolderAndFile.slice";
import { AppState, useAppDispatch } from "../../store/store";

const CreateFolder = () => {
  const { FilterModalOpen } = FolderAndFileAction;
  const dispatch = useAppDispatch();
  const initialValues: ICreateFolder = {
    description: "",
    name: "",
  };
  const validationSchemaLogin = Yup.object({
    name: Yup.string().required(VALIDATION_MESSAGES.required),
    description: Yup.string().required(VALIDATION_MESSAGES.required),
  });

  const handelLogin = async (
    values: ICreateFolder,
    { resetForm }: FormikHelpers<ICreateFolder>
  ) => {
    const payload: ICreateFolder = {
      description: values.description,
      name: values.name,
    };

    dispatch(createFolderAsync(payload));
    resetForm();
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaLogin}
        onSubmit={handelLogin}
        enableReinitialize
      >
        {({
          values,
          handleBlur,
          setValues,
          touched,
          errors,
          handleSubmit,
          setFieldValue,
        }) => {
          return (
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col self-stretch my-auto w-full bg-white font-medium max-md:mt-10"
            >
              <div className="no-scrollbar relative   overflow-y-auto  bg-white dark:bg-gray-900">
                <div className="px-2 pr-14">
                  <h4 className="mb-2 text-[18px] leading-[18.15px] font-Inter font-[600] text-gray-800 dark:text-white/90">
                    Create Folder
                  </h4>
                </div>
                <div className="custom-scrollbar h-auto overflow-y-auto px-2 pb-3 mt-5">
                  <div>
                    <div className="mb-5">
                      <Label className="font-Inter text-[15px] font-[500] leading-[18.15px] ">
                        Name
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        value={values.name ?? ""}
                        onChange={(e) => {
                          const { value } = e.target;
                          setValues({
                            ...values,
                            name: value,
                          });
                        }}
                        onBlur={handleBlur}
                        error={!!(touched.name && errors.name)}
                      />
                      <ErrorMessage
                        component={"div"}
                        name="name"
                        className="text-red-600 mt-1 "
                      />
                    </div>

                    <div>
                      <Label className="font-Inter text-[15px] font-[500] leading-[18.15px]">
                        Description
                      </Label>
                      <Input
                        type="text"
                        name="description"
                        value={values.description ?? ""}
                        onChange={(e) => {
                          const { value } = e.target;
                          setValues({
                            ...values,
                            description: value,
                          });
                        }}
                        onBlur={handleBlur}
                        error={!!(touched.description && errors.description)}
                      />
                      <ErrorMessage
                        component={"description"}
                        name="name"
                        className="text-red-600 mt-1 "
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => dispatch(FilterModalOpen(false))}
                    className="font-Inter text-[15px] font-[500] leading-[18.15px]"
                  >
                    Close
                  </Button>
                  <Button
                    size="sm"
                    type="submit"
                    className="font-Inter text-[15px] font-[500] leading-[18.15px]"
                  >
                    Create Folder
                  </Button>
                </div>
              </div>{" "}
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CreateFolder;
