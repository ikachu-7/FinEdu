import firepadRef, { db, userName } from "../server/firebase";
import { useEffect } from "react";
import {
  setMainStream,
  addParticipant,
  setUser,
  removeParticipant,
  updateParticipant,
  addMessage,
} from "../store/actioncreator";
import { connect } from "react-redux";
import Call from "../components/Call";

function Room(props) {
  const getUserStream = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    return localStream;
  };
  useEffect(() => {
    getUserStream().then((stream) => {
      stream.getVideoTracks()[0].enabled = false;
      props.setMainStream(stream);

      connectedRef.on("value", (snap) => {
        if (snap.val()) {
          const defaultPreference = {
            audio: true,
            video: false,
            screen: false,
          };
          const userStatusRef = participantRef.push({
            userName,
            preferences: defaultPreference,
          });
          props.setUser({
            [userStatusRef.key]: { name: userName, ...defaultPreference },
          });
          userStatusRef.onDisconnect().remove();
        }
      });
    });
  }, []);

  const connectedRef = db.database().ref(".info/connected");
  const participantRef = firepadRef.child("participants");
  const chatRef = firepadRef.child("chats");

  const isUserSet = !!props.user;
  const isStreamSet = !!props.stream;

  useEffect(() => {
    if (isStreamSet && isUserSet) {
      participantRef.on("child_added", (snap) => {
        const preferenceUpdateEvent = participantRef
          .child(snap.key)
          .child("preferences");
        preferenceUpdateEvent.on("child_changed", (preferenceSnap) => {
          props.updateParticipant({
            [snap.key]: {
              [preferenceSnap.key]: preferenceSnap.val(),
            },
          });
        });
        const { userName: name, preferences = {} } = snap.val();
        props.addParticipant({
          [snap.key]: {
            name,
            ...preferences,
          },
        });
      });
      participantRef.on("child_removed", (snap) => {
        props.removeParticipant(snap.key);
      });
      chatRef.on("child_added", (snap) => {
        const { sender, message, time } = snap.val();
        props.addMessage({ sender, message, time });
      });
    }
  }, [isStreamSet, isUserSet]);

  const pushMessage = (message) => {
    console.log(message);
    chatRef.push(message);
    addMessage(message);
  };

  return (
    <div className="">
      <Call addMessage={pushMessage} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    stream: state.mainStream,
    user: state.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMainStream: (stream) => dispatch(setMainStream(stream)),
    addParticipant: (user) => dispatch(addParticipant(user)),
    setUser: (user) => dispatch(setUser(user)),
    removeParticipant: (userId) => dispatch(removeParticipant(userId)),
    updateParticipant: (user) => dispatch(updateParticipant(user)),
    addMessage: (message) => dispatch(addMessage(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
