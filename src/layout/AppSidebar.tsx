import React, { useEffect, useCallback, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library

import NavigationBar from "./NavigationBar";
import { useSidebar } from "../context/SidebarContext";
import { useAppDispatch } from "../store/store";
import { getFolderAsync } from "../pages/Dashboard/FolderAndFile.slice";

type SidebarItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: SidebarItem[];
  type?: "folder" | "file";
};

const sidebarItems: SidebarItem[] = [
  {
    name: "Mission Logs",
    type: "folder",
    subItems: [],
  },
  {
    name: "Cybersecurity Reports",
    type: "folder",
    subItems: [
      {
        name: "Operating Systems",
        type: "folder",
        subItems: [{ name: "note1.docx", type: "file" }],
      },
      {
        name: "Networking Protocols",
        type: "folder",
        subItems: [],
      },
    ],
  },
  {
    name: "Indian Navy",
    type: "folder",
    subItems: [],
  },
  {
    name: "Astronomy",
    type: "folder",
    subItems: [],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFolderAsync());
  }, []);

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  const toggleFolder = (folderName: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const renderMenuItems = (items: SidebarItem[], level = 0) => (
    <ul className="flex flex-col">
      {items.map((item) => (
        <li key={item.name} className="flex flex-col">
          {item.type === "folder" ? (
            <button
              onClick={() => toggleFolder(item.name)}
              className="flex items-center gap-2 px-4 py-2 border-b cursor-pointer hover:bg-[rgba(169,181,223,0.3)] dark:hover:bg-gray-700"
            >
              <img src="/images/folder.png" alt="User" width={20} />
              {(isExpanded || isMobileOpen) && (
                <span className="text-black font-inter font-normal text-[13px] leading-[15.73px] tracking-[0%]">
                  {item.name}
                </span>
              )}

              <img
                src="/images/file-expand.png"
                alt="User"
                width={20}
                className={`ml-auto w-5 h-5 transition-transform ${
                  openFolders[item.name] ? "rotate-180" : ""
                }
                ${
                  openFolders[item.name]
                    ? "bg-yellow-300 rounded-xl color-white"
                    : ""
                }
                `}
              />
            </button>
          ) : item.type === "file" ? (
            <div className="flex items-center gap-2 px-4 py-2 border-b">
              <img src="/images/file.png" alt="User" width={20} />
              <span className="text-black font-inter font-normal text-[13px] leading-[15.73px] tracking-[0%]">
                {item.name}
              </span>
            </div>
          ) : (
            <Link
              to={item.path || "#"}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                isActive(item.path || "")
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {item.icon}
              {(isExpanded || isMobileOpen) && <span>{item.name}</span>}
            </Link>
          )}
          {item.subItems && openFolders[item.name] && (
            <div className="pl-6">
              {renderMenuItems(item.subItems, level + 1)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <div className="flex">
      <NavigationBar />
      <aside
        className={`mt-16 flex flex-col lg:mt-0 top-0 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? "w-[320px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div
          className={`pt-8 flex ${
            !isExpanded ? "lg:justify-center" : "justify-start"
          } flex flex-col`}
        >
          {isExpanded ? (
            <>
              <span className="font-inter text-black font-semibold text-[15px] leading-[18.15px] px-5">
                Folders & Documents
              </span>
              <div className="flex flex-row mt-6 pb-5 items-start space-x-0 border-b border-[#DDDDDD] px-5">
                <div className="flex flex-col w-[74px] h-[92px] gap-3">
                  <img
                    src="images/folder.png"
                    alt=""
                    className="w-8 h-[27.79px]"
                  />
                  <span className="font-inter font-normal text-[12px] leading-[14.52px] tracking-[0%]">
                    Folders
                  </span>
                  <span className="font-inter font-semibold text-[20px] leading-[24.2px] tracking-[0%]">
                    200+
                  </span>
                </div>
                <div className="border-l border-[#DDDDDD] h-[68px] pr-8"></div>
                <div className="flex flex-col w-[74px] h-[92px] gap-[10px]">
                  <img
                    src="images/document-file.png"
                    alt=""
                    className="w-[25px] h-[32px]"
                  />
                  <span className="font-inter font-normal text-[12px] leading-[14.52px] tracking-[0%]">
                    Documents
                  </span>
                  <span className="font-inter font-semibold text-[20px] leading-[24.2px] tracking-[0%]">
                    200+
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
        <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
          <nav className="mb-6">
            <div className="flex flex-col gap-4">
              <div>
                <nav>{renderMenuItems(sidebarItems)}</nav>
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default AppSidebar;
