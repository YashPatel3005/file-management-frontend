import React, { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import { useSidebar } from "../context/SidebarContext";
import { AppState, useAppDispatch, useAppSelector } from "../store/store";
import { getFolderAsync } from "../pages/Dashboard/FolderAndFile.slice";

const AppSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isExpanded, isMobileOpen } = useSidebar();
  const { folderData } = useAppSelector((state: AppState) => state.folders);

  useEffect(() => {
    dispatch(getFolderAsync());
  }, [dispatch]);

  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});

  const toggleFolder = (folderName: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const renderMenuItems = (folderData: any, level = 0) => (
    <ul className="flex flex-col">
      {folderData?.data?.folders?.map(
        (folder: {
          _id: string;
          name: string;
          subItems?: any;
          files?: { _id: string; fileName: string }[];
        }) => (
          <li key={folder._id} className="flex flex-col">
            <button
              onClick={() => toggleFolder(folder._id)}
              className="flex items-center gap-2 px-4 py-2 border-b cursor-pointer hover:bg-[rgba(169,181,223,0.3)] dark:hover:bg-gray-700"
            >
              <img src="/images/folder.png" alt="Folder" width={20} />
              {(isExpanded || isMobileOpen) && (
                <span className="text-black font-inter font-normal text-[13px] leading-[15.73px] tracking-[0%]">
                  {folder.name}
                </span>
              )}
              <img
                src="/images/file-expand.png"
                alt="Expand"
                width={20}
                className={`ml-auto w-5 h-5 transition-transform ${
                  openFolders[folder._id] ? "rotate-180" : ""
                } ${
                  openFolders[folder._id]
                    ? "bg-yellow-300 rounded-xl text-white"
                    : ""
                }`}
              />
            </button>
            {/* Render subfolders and files inside this folder */}
            {openFolders[folder._id] && (
              <div className="pl-6">
                {folder.subItems &&
                  renderMenuItems(
                    {
                      data: {
                        folders: folder.subItems,
                        files: folder?.files || [],
                      },
                    },
                    level + 1
                  )}
              </div>
            )}
          </li>
        )
      )}

      {folderData?.data?.files?.map(
        (file: { _id: string; fileName: string }) => (
          <li key={file._id} className="flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2 border-b">
              <img src="/images/file.png" alt="File" width={20} />
              <span className="text-black font-inter font-normal text-[13px] leading-[15.73px] tracking-[0%]">
                {file.fileName}
              </span>
            </div>
          </li>
        )
      )}
    </ul>
  );

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
                <nav>{renderMenuItems(folderData)}</nav>
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default AppSidebar;
