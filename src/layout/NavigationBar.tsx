import React from "react";
import NavigationButton from "../components/common/NavigationButton";

const navigationButtons = new Array(7).fill(null);
function NavigationBar() {
  return (
    <div className="flex flex-col h-screen bg-secondary w-20">
      <div className="mt-[13px] mx-[15px]">
        <NavigationButton className="w-[50px] h-[50px] rounded-[10px] bg-[#A9B5DF]" />
      </div>

      <div className="mt-[94px] mx-5 flex flex-col gap-3">
        {navigationButtons.map((_, index) => (
          <NavigationButton
            key={index}
            className="w-10 h-10 rounded-[10px] bg-customBlue"
          />
        ))}
      </div>

      <div className="mt-auto mx-[15px] mb-8">
        <NavigationButton className="w-[50px] h-[50px] rounded-full bg-customBlue flex items-center justify-center">
          <img src="images/icon_user.png" alt="User Icon" className="w-5 h-5" />
        </NavigationButton>
      </div>
    </div>
  );
}

export default NavigationBar;
