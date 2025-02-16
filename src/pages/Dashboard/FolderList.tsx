import { useState } from "react";
import { Dropdown } from "../../components/common/Dropdown";
import { DropdownItem } from "../../components/common/DropdownItem";
import Dialog from "../../components/common/Modal";
import { DROPDOWN_ITEMS } from "../../utils/constants";
import { AppState, useAppDispatch, useAppSelector } from "../../store/store";
import { FolderAndFileAction } from "./FolderAndFile.slice";
import CreateFolder from "./CreateFolder";
import UploadFile from "./UploadFile";

type FolderItem = {
  name: string;
  type: "folder" | "file";
  subItems?: FolderItem[];
  createdAt: string;
  updatedAt: string;
};

const folderData: FolderItem[] = [
  {
    name: "Mission_Logs",
    type: "folder",
    subItems: [],
    createdAt: "17/03/2025 23:30",
    updatedAt: "17/03/2025 23:30",
  },
  {
    name: "Cybersecurity_Reports",
    type: "folder",
    subItems: [
      {
        name: "Operating_Systems",
        type: "folder",
        subItems: [
          { name: "note1.docx", type: "file", createdAt: "", updatedAt: "" },
        ],
        createdAt: "17/03/2025 23:30",
        updatedAt: "17/03/2025 23:30",
      },
      {
        name: "Networking_Protocols",
        type: "folder",
        subItems: [],
        createdAt: "17/03/2025 23:30",
        updatedAt: "17/03/2025 23:30",
      },
    ],
    createdAt: "17/03/2025 23:30",
    updatedAt: "17/03/2025 23:30",
  },
];

export default function FolderList() {
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { createFolderState, uploadFileState } = useAppSelector(
    (state: AppState) => state.folders
  );
  const { CreateFolderModalOpen, UploadFileOpen } = FolderAndFileAction;

  const toggleFolder = (folderName: string) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const toggleDropdown = (folderName: string) => {
    setDropdownOpen(dropdownOpen === folderName ? null : folderName);
  };

  const closeDropdown = () => setDropdownOpen(null);

  const renderFolders = (items: FolderItem[], level = 0) => (
    <ul>
      {items.map((item) => (
        <li
          key={item.name}
          className="relative flex flex-col w-full last:border-0"
        >
          <div className="flex justify-between items-center px-4 py-3 mb-2 bg-white shadow-default rounded-2xl dark:bg-gray-900 border">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => item.type === "folder" && toggleFolder(item.name)}
            >
              {item.type === "folder" ? (
                <>
                  {(item.subItems?.length ?? 0) > 0 && (
                    <img
                      src="/images/folder-expand.png"
                      alt="User"
                      width={8}
                      // className={`transition-transform ${
                      //   openFolders[item.name] ? "rotate-180" : ""
                      // }`}
                    />
                  )}

                  <img
                    src="/images/folder.png"
                    alt="User"
                    width={20}
                    // className={`transition-transform ${
                    //   openFolders[item.name] ? "rotate-180" : ""
                    // }`}
                  />
                  <span className="text-lg font-medium">{item.name}</span>
                  <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded-lg">
                    {item.subItems?.length || 0}
                  </span>
                </>
              ) : (
                <span className="text-lg font-medium">📄 {item.name}</span>
              )}
            </div>

            <div className="relative">
              <button onClick={() => toggleDropdown(item.name)}>
                <img src="./images/more-dot.png" alt="" />
              </button>
              {dropdownOpen === item.name && (
                <Dropdown
                  isOpen={true}
                  onClose={closeDropdown}
                  className="w-44 p-2"
                >
                  {DROPDOWN_ITEMS.map((item, index) => (
                    <DropdownItem key={index} onClick={() => {}}>
                      {item.label}
                    </DropdownItem>
                  ))}

                  {item.type === "folder" && (
                    <DropdownItem onItemClick={closeDropdown}>
                      Create Folder
                    </DropdownItem>
                  )}
                </Dropdown>
              )}
            </div>
          </div>

          {item.subItems && openFolders[item.name] && (
            <div className="pl-8 ">
              {renderFolders(item.subItems, level + 1)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className="rounded-2xl  dark:bg-white/[0.03]">
        {/* <table className="w-full border-collapse">
        <thead>
          <tr className=" dark:bg-gray-800">
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Created At</th>
            <th className="px-4 py-3 text-left">Updated At</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody> */}
        <div className="px-5 py-5  shadow-default rounded-2xl dark:bg-gray-900">
          <div className="mt-4">{renderFolders(folderData)}</div>
        </div>
        {/* </tbody>
      </table> */}
      </div>
      {/* Create folder */}
      <Dialog
        isOpen={createFolderState}
        onClose={() => dispatch(CreateFolderModalOpen(false))}
        children={<CreateFolder />}
        title="Create Folder"
      />
      {/* Upload file */}
      <Dialog
        isOpen={uploadFileState}
        onClose={() => dispatch(UploadFileOpen(false))}
        children={<UploadFile />}
        title="Upload Document"
      />
    </>
  );
}
