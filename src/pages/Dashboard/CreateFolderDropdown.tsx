import React, { useState } from "react";

import { CREATE_FILE_ARRAY } from "../../utils/constants";
import { Dropdown } from "../../components/common/Dropdown";
import { DropdownItem } from "../../components/common/DropdownItem";
import { useAppDispatch } from "../../store/store";
import { FolderAndFileAction } from "./FolderAndFile.slice";

export default function CreateFolderDropdown() {
  const dispatch = useAppDispatch();
  const { CreateFolderModalOpen, UploadFileOpen, FilterModalOpen } =
    FolderAndFileAction;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleFilterClick = () => {
    dispatch(FilterModalOpen(true));
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleItemClick = (name: string) => {
    if (name === "Create Folder") {
      dispatch(CreateFolderModalOpen(true));
    } else {
      dispatch(UploadFileOpen(true));
    }
  };
  return (
    <div className="relative">
      <div className="flex items-center  overflow-hidden">
        <img
          src="/images/filter.png"
          alt="User Profile"
          width={40}
          className="cursor-pointer"
          onClick={handleFilterClick}
        />

        <img
          src="/images/plus.png"
          alt="User"
          onClick={toggleDropdown}
          width={40}
          className="ml-3 cursor-pointer"
        />
      </div>

      {isOpen && (
        <Dropdown
          isOpen={isOpen}
          onClose={closeDropdown}
          className="absolute p-1 right-0 mt-[8px] flex w-[170px] flex-col border border-gray-200 bg-white shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
        >
          <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800">
            {CREATE_FILE_ARRAY.map((item, index) => (
              <li key={index} className="flex flex-col">
                <DropdownItem
                  onClick={() => handleItemClick(item.label)}
                  onItemClick={closeDropdown}
                  className="flex items-center font-medium text-gray-700 group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                  {item.label}
                </DropdownItem>
              </li>
            ))}
          </ul>
        </Dropdown>
      )}
    </div>
  );
}
