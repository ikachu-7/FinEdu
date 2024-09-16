import firebase from "firebase";
const user = JSON.parse(localStorage.getItem("auth"));

const config = {
  databaseURL: "https://vediocallcookies-default-rtdb.firebaseio.com/",
  apiKey: "",
};

firebase.initializeApp(config);

export const db = firebase;

var firepadRef = firebase.database().ref();

// export const userName = window.location.pathname.includes("room")
//   ? user.name
//   : "User " + Math.floor(Math.random() * 1000) + 1;
export const userName = localStorage.getItem("auth") ? user.user.name : "guest";
const urlparams = new URLSearchParams(window.location.search);
const roomId = urlparams.get("id");

if (roomId) {
  firepadRef = firepadRef.child(roomId);
} else {
  firepadRef = firepadRef.push();
  if (window.location.pathname.includes("room")) {
    window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);
  }
}

export default firepadRef;
