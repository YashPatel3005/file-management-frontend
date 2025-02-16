import React, { ReactNode } from "react";

type NavigationButtonProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

const NavigationButton: React.FC<NavigationButtonProps> = (props) => {
  return <div {...props}>{props.children}</div>;
};

export default NavigationButton;
