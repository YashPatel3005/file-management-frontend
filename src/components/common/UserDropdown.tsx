import React, { useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { CreateFileArray } from "../../utils/constants";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <div className="flex items-center  overflow-hidden">
        <img src="/images/filter.png" alt="User Profile" width={40} />

        <img
          src="/images/plus.png"
          alt="User"
          onClick={toggleDropdown}
          width={40}
          className="ml-3"
        />
      </div>

      {isOpen && (
        <Dropdown
          isOpen={isOpen}
          onClose={closeDropdown}
          className="absolute right-0 mt-[17px] flex w-[180px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
        >
          <ul className="flex flex-col gap-1 pt-4 pb-3 border-gray-200 dark:border-gray-800">
            {CreateFileArray.map((item, index) => (
              <li key={index}>
                <DropdownItem
                  onItemClick={closeDropdown}
                  tag="a"
                  href={item.href}
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
