import React from "react";
import Card from "./Card";
import { faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Participant = (props) => {
  const {
    curentIndex,
    currentParticipant,
    hideVideo,
    videoRef,
    showAvatar,
    currentUser,
  } = props;
  if (!currentParticipant) return <></>;
  return (
    <div
      className={`bg-[#353b48] h-full w-full relative rounded-xl min-h-[200px] ${
        hideVideo ? "hidden" : ""
      }`}
    >
      <Card>
        <video
          ref={videoRef}
          className={`bg-[#353b48] h-full w-full relative rounded-xl object-cover ${
            props.isScreenSharing ? "" : "inv-cam"
          }`}
          id={`participantVideo${curentIndex}`}
          autoPlay
          playsInline
        ></video>
        {!currentParticipant.audio && (
          <FontAwesomeIcon
            className="text-white right-3 top-3 absolute bg-secondary rounded-full h-6 w-6 p-2"
            icon={faMicrophoneSlash}
            title="Muted"
          />
        )}
        {showAvatar && (
          <div
            style={{ background: currentParticipant.avatarColor }}
            className="h-48 w-48 rounded-full text-6xl text-white bg-orange-500 absolute text-center uppercase flex items-center justify-center"
          >
            {currentParticipant.name[0]}
          </div>
        )}
        <div className="text-white absolute bottom-3 left-3">
          {currentParticipant.name}
          {currentUser ? " (You)" : ""}
        </div>
      </Card>
    </div>
  );
};
