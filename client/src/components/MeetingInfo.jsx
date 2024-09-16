import {
  faCopy,
  faShieldAlt,
  faTimes,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { userName } from "../server/firebase";

const MeetingInfo = ({ setMeetInfoPopup }) => {
  return (
    <div className="absolute top-12 left-12 bg-darkbg rounded-lg text-onprimary p-4 w-[310px]">
      <div className="flex items-center justify-between color-[#222]">
        <h3 className="m-0 font-[18px]">Your meeting's ready</h3>
        <FontAwesomeIcon
          className="fa-lg cursor-pointer"
          icon={faTimes}
          onClick={() => {
            setMeetInfoPopup(false);
          }}
        />
      </div>
      <button className="flex items-center justify-center bg-primary text-white font-[14px] py-2 px-3 hover:bg-[#124fb2] rounded-md mt-4">
        <FontAwesomeIcon className="fa-sm mr-3" icon={faUser} />
        Add Others
      </button>
      <p className="text-onsecondary text-[14px] mt-2">
        Or share this meeting link with others you want in the meeting
      </p>
      <div className="flex mt-2 items-center justify-between bg-[#161929]  p-3 rounded-md">
        <span className="font-[14px] text-onprimary flex-1">
          {window.location.href}
        </span>
        <FontAwesomeIcon
          className="fa-md cursor-pointer"
          icon={faCopy}
          onClick={() => navigator.clipboard.writeText(window.location.href)}
        />
      </div>
      <div className="flex items-center justify-center mt-3">
        <FontAwesomeIcon
          className="fa-md mr-3 text-blue-500"
          icon={faShieldAlt}
        />
        <p className="text-sm text-onsecondary">
          People who use this meeting link can join the meeting
        </p>
      </div>
      <p className="text-sm mt-3">{`Joined as ${userName}`}</p>
    </div>
  );
};

export default MeetingInfo;
