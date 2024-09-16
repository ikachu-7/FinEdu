import { useState } from "react";
import Chatbot from "./ChatBot";
import "./chatbot.css";
import Face4Icon from "@mui/icons-material/Face4";

function App() {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setChatbotVisible(!isChatbotVisible);
  };

  return (
    <div className="chat-box">
      {isChatbotVisible && <Chatbot onClose={toggleChatbot} />}
      <button className="circular-button" onClick={toggleChatbot}>
        <Face4Icon />
      </button>
    </div>
  );
}

export default App;
