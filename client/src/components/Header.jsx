import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faExclamationCircle,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="flex w-screen justify-between p-[20px]">
      <div className="flex items-center justify-center">
        <img src="/logo_heyu.svg" alt="" className="h-14" />
        <span className="text-[25px] pl-3 text-onprimary">HeyU</span>
      </div>
      <div className="flex items-center">
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-lg p-2 text-[#dadce0] cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faExclamationCircle}
          className="text-lg p-2 text-[#dadce0] cursor-pointer"
        />
        <FontAwesomeIcon
          icon={faCog}
          className="text-lg p-2 text-[#dadce0] cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
