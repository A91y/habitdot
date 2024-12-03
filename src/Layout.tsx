import React from "react";
import Appbar from "./components/Appbar";
import { useLocation } from "react-router-dom";

const Layout = ({ children, showAppbar = true }) => {
  const pathname = useLocation().pathname;
  return (
    <div className="min-h-screen w-screen flex flex-col justify-between ">
      <div
        className={`flex-1 w-full md:max-w-[380px] md:mx-auto overflow-y-auto md:border-2 md:border-[#efefef50] md:min-h-screen pb-[70px] ${
          pathname == "/" ? "bg-[#FFE668]" : "bg-white"
        }`}
      >
        {children}
        <div className="">{showAppbar && <Appbar />}</div>
      </div>
    </div>
  );
};

export default Layout;
