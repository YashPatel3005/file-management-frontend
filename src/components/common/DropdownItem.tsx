import type React from "react";
import { Link } from "react-router";

interface DropdownItemProps {
  onClick?: () => void;
  onItemClick?: () => void;
  baseClassName?: string;
  className?: string;
  children: React.ReactNode;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  onClick,
  onItemClick,
  baseClassName = "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  className = "",
  children,
}) => {
  const combinedClasses = `${baseClassName} ${className}`.trim();

  const handleClick = (event: React.MouseEvent) => {
    if (onClick) onClick();
    if (onItemClick) onItemClick();
  };

  return (
    <button onClick={handleClick} className={combinedClasses}>
      {children}
    </button>
  );
};
