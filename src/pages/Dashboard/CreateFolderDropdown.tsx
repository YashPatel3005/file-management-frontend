import React, { useState } from "react";

import { CREATE_FILE_ARRAY } from "../../utils/constants";
import { Dropdown } from "../../components/common/Dropdown";
import { DropdownItem } from "../../components/common/DropdownItem";
import { useAppDispatch } from "../../store/store";
import { FolderAndFileAction } from "./FolderAndFile.slice";

export default function CreateFolderDropdown() {
  const dispatch = useAppDispatch();
  const { FilterModalOpen } = FolderAndFileAction;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleItemClick = (name: string) => {
    if (name === "Create Folder") {
      dispatch(FilterModalOpen(true));
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
          className="absolute right-0 mt-[17px] flex w-[180px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
        >
          <ul className="flex flex-col gap-1 pt-4 pb-3 border-gray-200 dark:border-gray-800">
            {CREATE_FILE_ARRAY.map((item, index) => (
              <li key={index}>
                <DropdownItem
                  onClick={() => handleItemClick(item.label)}
                  onItemClick={closeDropdown}
                  className="flex items-center gap-3  font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 border-b"
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
