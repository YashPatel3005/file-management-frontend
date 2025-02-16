import React from "react";
import { Link } from "react-router";

interface BreadcrumbProps {
  pageTitle: string;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle }) => {
  return (
    <nav>
      <ol className="flex items-center gap-1.5 font-inter font-semibold text-[15px] leading-[18.15px] tracking-[0]">
        <li>
          <Link className="inline-flex items-center gap-1.5" to="/">
            NSM
            <img
              src="images/chevron.png"
              className="w-[7.68px] h-[13.57]"
              alt="icon"
            />
          </Link>
        </li>
        <li>{pageTitle}</li>
      </ol>
    </nav>
  );
};

export default PageBreadcrumb;
