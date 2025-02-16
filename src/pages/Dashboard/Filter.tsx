import React from "react";
import Button from "../../components/common/Button";
import { Formik, Form } from "formik";
import Input from "../../components/common/InputField";
import Label from "../../components/common/Label";
import { IFilter } from "./FolderAndFile.model";
import DatePicker from "react-flatpickr";
import { FolderAndFileAction } from "./FolderAndFile.slice";
import { useAppDispatch } from "../../store/store";

function Filter() {
  const { FilterModalOpen } = FolderAndFileAction;
  const dispatch = useAppDispatch();

  const initialValues: IFilter = {
    description: "",
    name: "",
    date: null,
  };

  const onFilterSubmit = () => {};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onFilterSubmit}
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
              <div className="custom-scrollbar h-auto overflow-y-auto px-2 pb-3 mt-5">
                <div>
                  <div className="mb-5">
                    <Label className="font-Inter text-[15px] font-[500] leading-[18.15px] ">
                      Name
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      className="font-Inter text-[15px] font-[500] leading-[18.15px]"
                      placeholder="Folder name"
                      value={values.name ?? ""}
                      onChange={(e) => {
                        const { value } = e.target;
                        setValues({
                          ...values,
                          name: value,
                        });
                      }}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div className="mb-5">
                    <Label className="font-Inter text-[15px] font-[500] leading-[18.15px]">
                      Description
                    </Label>
                    <Input
                      className="font-Inter text-[15px] font-[500] leading-[18.15px]"
                      type="text"
                      name="description"
                      placeholder="Folder description"
                      value={values.description ?? ""}
                      onChange={(e) => {
                        const { value } = e.target;
                        setValues({
                          ...values,
                          description: value,
                        });
                      }}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div>
                    <Label className="font-Inter text-[15px] font-[500] leading-[18.15px]">
                      Date
                    </Label>
                    <Input
                      className="font-Inter text-[15px] text-gray-200 font-[500] leading-[18.15px] placeholder:uppercase"
                      type="date"
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
                  Cancel
                </Button>
                <Button
                  size="sm"
                  type="submit"
                  className="font-Inter text-[15px] font-[500] leading-[18.15px]"
                >
                  Apply
                </Button>
              </div>
            </div>{" "}
          </Form>
        );
      }}
    </Formik>
  );
}

export default Filter;
