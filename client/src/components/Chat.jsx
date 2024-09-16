import {
  faCommentAlt,
  faPaperPlane,
  faTimes,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { userName } from "../server/firebase";

const Chat = ({
  onClose,
  messageList,
  addMessage,
  isChatSelected,
  toggleTab,
  participants,
}) => {
  console.log("participants", participants);
  let users = [];
  Object.keys(participants).forEach((key) => {
    const participant = participants[key];
    users.push({
      name: participant.name + (participant.currentUser ? " (You)" : ""),
      currentUser: participant.currentUser,
      avatarColor: participant.avatarColor,
    });
  });
  users.sort((a, b) => {
    if (a.currentUser) return 1;
    if (b.currentUser) return -1;
    return 0;
  });

  const [message, setMessage] = useState("");
  const handleSendMsg = () => {
    if (message === "") return;
    console.log("sending message");
    addMessage({
      sender: userName,
      message: message,
      time: Date.now(),
    });
    setMessage("");
  };
  const selectedClass =
    "flex justify-center items-center w-full text-primary border-b-4 border-b-primary py-4 hover:bg-[#0f111c] cursor-pointer border-green-800";
  const unSelectedClass =
    "flex justify-center items-center w-full py-4 border-b-2 border-onsecondary hover:bg-[#0f111c] cursor-pointer";

  return (
    <div className="h-full flex w-96 flex-col justify-between border-b border-b-primary bg-[#161929] text-onprimary">
      <div className="px-6 py-5 flex items-center justify-between mx-2 ">
        <h3 className="m-0">Meeting details</h3>
        <FontAwesomeIcon
          className="fa-lg cursor-pointer"
          icon={faTimes}
          onClick={onClose}
        />
      </div>

      <div className="flex items-center">
        <div
          className={!isChatSelected ? selectedClass : unSelectedClass}
          onClick={toggleTab}
        >
          <FontAwesomeIcon className="fa-lg mr-4" icon={faUserFriends} />
          <p>{`People (${Object.keys(participants).length})`}</p>
        </div>
        <div
          className={isChatSelected ? selectedClass : unSelectedClass}
          onClick={toggleTab}
        >
          <FontAwesomeIcon className="fa-lg mr-4" icon={faCommentAlt} />
          <p>Chat</p>
        </div>
      </div>
      {isChatSelected ? (
        <div className="flex-1 flex flex-col">
          <div className="p-4 flex-1 overflow-scroll no-scrollbar">
            {messageList.map((item) => (
              <div key={item.time} className="mb-7">
                <div className="text-[14px]">
                  {item.sender}{" "}
                  <small className="ml-1 font-light uppercase text-onsecondary">
                    {new Date(item.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </small>
                </div>
                <p className="text-onprimary text-[14px] pt-1">
                  {item.message}
                </p>
              </div>
            ))}
          </div>

          <div className="pl-5 pr-5 py-3 flex items-center justify-between text-[#555] rounded-full bg-[#1C1F2E] mx-2 mb-1">
            <input
              placeholder="Send a message to everyone"
              className="p-1 border-0 outline-none border-b-primary bg-transparent text-onprimary w-4/5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div
              className="h-10 w-10 bg-primary rounded-full items-center justify-center flex text-onprimary pr-1 cursor-pointer"
              onClick={handleSendMsg}
            >
              <FontAwesomeIcon className="fa-lg" icon={faPaperPlane} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col px-4 py-2">
          {users.map((item) => {
            return (
              <div className="flex flex-row w-full mt-3 justify-center items-center ">
                <div className="w-1/6">
                  <div
                    style={{ background: item.avatarColor }}
                    className={`h-10 w-10 rounded-full text-lg text-white bg-[${item.avatarColor}]  text-center uppercase flex items-center justify-center`}
                  >
                    {item.name[0]}
                  </div>
                </div>
                <div className="w-5/6">
                  <div className="text-[14px]">{item.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Chat;
