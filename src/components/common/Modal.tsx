import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  width?: string;
  headerText?: string;
  children?: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  headerText,
  width = "max-w-md",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 md:p-12">
      <div
        className={`relative bg-white rounded-lg shadow-md w-full ${width} p-6`}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 text-black p-2 rounded-full focus:outline-none"
        >
          <FontAwesomeIcon icon={faTimes} className="text-[20px]" />
        </button>

        {title && (
          <h2
            className={`text-lg font-[700] mb-4 font-PlusJakartaSans text-black ${
              headerText ? headerText : "text-[24px]"
            } leading-[24px]`}
          >
            {title}
          </h2>
        )}
        <div className="text-black mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
