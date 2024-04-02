// ChatbotPopUp.js
import { useSelector } from "react-redux";
import "./ChatbotPopUp.css";





const ChatbotPopUp = () => {
  const visible = useSelector((state) => state.chatbotslice.visible);


  return (
    <div className={`chatbot-popup ${visible ? "chatbot-popup-show" : ""}`}>
      <div className="chatbot-popup-inner" >
      <h2>Chatbot Popup</h2>
        <p>Here is the chatbot popup content.</p>
        <button onClick={() => console.log("Chatbot button clicked")}>
          Chatbot
        </button>
        <button onClick={() => console.log("Close button clicked")}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ChatbotPopUp;