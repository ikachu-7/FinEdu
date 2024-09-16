import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { addMessage, setMainStream, updateUser } from "../store/actioncreator";
import Footer from "./Footer";
import Participants from "./Participants";
import EndCallDialog from "./EndCallDialog";
import Chat from "./Chat";
import CallPageHeader from "./CallPageHeader";
import MeetingInfo from "./MeetingInfo";

const Call = (props) => {
  const participantRef = useRef(props.participants);

  const onMicClick = (micEnabled) => {
    if (props.stream) {
      props.stream.getAudioTracks()[0].enabled = micEnabled;
      props.updateUser({ audio: micEnabled });
    }
  };
  const onVideoClick = (videoEnabled) => {
    if (props.stream) {
      props.stream.getVideoTracks()[0].enabled = videoEnabled;
      props.updateUser({ video: videoEnabled });
    }
  };

  useEffect(() => {
    participantRef.current = props.participants;
  }, [props.participants]);

  const updateStream = (stream) => {
    for (let key in participantRef.current) {
      const sender = participantRef.current[key];
      if (sender.currentUser) continue;
      const peerConnection = sender.peerConnection
        .getSenders()
        .find((s) => (s.track ? s.track.kind === "video" : false));
      peerConnection.replaceTrack(stream.getVideoTracks()[0]);
    }
    props.setMainStream(stream);
  };

  const onScreenShareEnd = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    localStream.getVideoTracks()[0].enabled = Object.values(
      props.currentUser
    )[0].video;

    updateStream(localStream);

    props.updateUser({ screen: false });
  };

  const onScreenClick = async () => {
    let mediaStream;
    if (navigator.getDisplayMedia) {
      mediaStream = await navigator.getDisplayMedia({ video: true });
    } else if (navigator.mediaDevices.getDisplayMedia) {
      mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
    } else {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { mediaSource: "screen" },
      });
    }

    mediaStream.getVideoTracks()[0].onended = onScreenShareEnd;

    updateStream(mediaStream);

    props.updateUser({ screen: true });
  };

  const [endDialogOpen, setEndDialogOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isChatSelected, setIsChatSelected] = useState(true);
  const [showMeetingInfo, setShowMeetingInfo] = useState(true);

  const onBtnClick = (type) => {
    setIsChatSelected(type === "chat");
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div className="w-full h-full">
      <EndCallDialog open={endDialogOpen} setOpen={setEndDialogOpen} />
      <div className="h-[90vh] w-full bg-darkbg flex flex-row">
        <div className="grow w-full">
          <Participants />
        </div>
        <div className={`flex-none ${isChatVisible ? "" : "hidden"}`}>
          <Chat
            onClose={() => setIsChatVisible(!isChatVisible)}
            isChatSelected={isChatSelected}
            messageList={props.messages}
            addMessage={props.addMessage}
            toggleTab={() => setIsChatSelected(!isChatSelected)}
            participants={props.participants}
          />
        </div>
      </div>

      <div className="h-[10vh] w-full bg-[#161929]">
        <Footer
          onScreenClick={onScreenClick}
          onMicClick={onMicClick}
          onVideoClick={onVideoClick}
          onCallEnd={() => setEndDialogOpen(true)}
          onMeetingInfoClick={() => setShowMeetingInfo(true)}
        />
      </div>
      {!isChatVisible && <CallPageHeader onBtnClick={onBtnClick} />}
      {showMeetingInfo && <MeetingInfo setMeetInfoPopup={setShowMeetingInfo} />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    stream: state.mainStream,
    participants: state.participants,
    currentUser: state.currentUser,
    messages: state.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMainStream: (stream) => dispatch(setMainStream(stream)),
    updateUser: (user) => dispatch(updateUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Call);
