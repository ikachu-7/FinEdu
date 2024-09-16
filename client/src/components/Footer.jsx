import {
  faAngleUp,
  faDesktop,
  faMicrophone,
  faMicrophoneSlash,
  faPhone,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const Footer = (props) => {
  const [streamState, setStreamState] = useState({
    mic: true,
    video: false,
    screen: false,
  });
  const micClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        mic: !currentState.mic,
      };
    });
  };

  const onVideoClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        video: !currentState.video,
      };
    });
  };

  const onScreenClick = () => {
    props.onScreenClick(setScreenState);
  };

  const setScreenState = (isEnabled) => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        screen: isEnabled,
      };
    });
  };

  const onDisconnectCall = () => {
    // alert to disconnect the call
  };

  useEffect(() => {
    props.onMicClick(streamState.mic);
  }, [streamState.mic]);
  useEffect(() => {
    props.onVideoClick(streamState.video);
  }, [streamState.video]);
  return (
    <div className="absolute bottom-0 left-0 w-full flex flex-row items-center justify-center h-[10vh] bg-[#161929] z-10 text-onprimary">
      <div className="flex items-center h-full w-[350px]">
        <div
          className="flex items-center justify-center h-full px-4  cursor-pointer hover:bg-[#0f111c] text-onprimary"
          onClick={props.onMeetingInfoClick}
        >
          Meeting details
          <FontAwesomeIcon className="fa-md ml-2" icon={faAngleUp} />
        </div>
      </div>
      <div className="w-full flex items-center justify-center flex-1">
        {streamState.mic ? (
          <div
            className={`bg-primary  w-12 h-12 flex items-center justify-center rounded-full mx-2 cursor-pointer shadow-md`}
            onClick={micClick}
          >
            <FontAwesomeIcon className="fa-lg" icon={faMicrophone} />
          </div>
        ) : (
          <div
            className={`bg-secondary  w-12 h-12 flex items-center justify-center rounded-full mx-2 cursor-pointer shadow-md`}
            onClick={micClick}
          >
            <FontAwesomeIcon className="fa-lg" icon={faMicrophoneSlash} />
          </div>
        )}
        <div
          className="bg-secondary w-12 h-12 flex items-center justify-center rounded-full mx-2 cursor-pointer shadow-md"
          onClick={() => props.onCallEnd()}
        >
          <FontAwesomeIcon className="fa-lg" icon={faPhone} />
        </div>

        {streamState.video ? (
          <div
            className={`bg-primary w-12 h-12 flex items-center justify-center rounded-full mx-2 cursor-pointer shadow-md`}
            onClick={onVideoClick}
          >
            <FontAwesomeIcon className="fa-lg" icon={faVideo} />
          </div>
        ) : (
          <div
            className={`bg-secondary w-12 h-12 flex items-center justify-center rounded-full mx-2 cursor-pointer shadow-md`}
            onClick={onVideoClick}
          >
            <FontAwesomeIcon className="fa-lg" icon={faVideoSlash} />
          </div>
        )}
      </div>
      <div className="flex items-center justify-end h-full w-[350px]">
        {streamState.screen ? (
          <div
            className="flex items-center justify-center flex-col h-full w-[146px] text-[#555] cursor-pointer hover:bg-[#eee]"
            onClick={onScreenClick}
          >
            <FontAwesomeIcon
              className="text-red-500 fa-lg mb-1"
              icon={faDesktop}
            />
            <p className="title">Stop presenting</p>
          </div>
        ) : (
          <div
            className="flex items-center justify-center flex-col h-full w-[146px] text-onprimary cursor-pointer hover:bg-[#0f111c]"
            onClick={onScreenClick}
          >
            <FontAwesomeIcon className="fa-lg  mb-1" icon={faDesktop} />
            <p className="title">Present now</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
