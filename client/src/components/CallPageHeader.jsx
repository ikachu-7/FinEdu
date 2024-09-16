import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faUserCircle,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import Clock from "react-clock";

const CallPageHeader = ({ onBtnClick }) => {
  const [value, setValue] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const headerIcons =
    "flex items-center justify-center text-onsecondary h-12 flex-1 relative cursor-pointer hover:bg-[#161929]";
  return (
    <div className="flex flex-row justify-around items-center w-[300px] absolute top-0 right-0 bg-darkbg rounded-md overflow-hidden">
      <div className={headerIcons} onClick={() => onBtnClick("people")}>
        <FontAwesomeIcon icon={faUserFriends} className="icon" />
      </div>
      <div className={headerIcons} onClick={() => onBtnClick("chat")}>
        <FontAwesomeIcon icon={faCommentAlt} className="icon" />
        {/* <span className="absolute bg-green-700 h-3 w-3 top-3 right-6 rounded-lg border-2 border-white"></span> */}
      </div>
      <div className="flex font-[20px] text-onsecondary min-w-[120px] uppercase pr-2 items-center justify-center">
        {value.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </div>
      {/* <div className={headerIcons}>
        <FontAwesomeIcon icon={faUserCircle} className="text-green-700" />
      </div> */}
    </div>
  );
};

export default CallPageHeader;
