// ChatbotPopUp.js
import { useSelector } from "react-redux";
import "./ChatbotPopUp.css";
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from "../util/Chatbot/config"
import ActionProvider from '../util/Chatbot/ActionProvider';
import MessageParser from '../util/Chatbot/MessageParser';






const ChatbotPopUp = () => {
    const visible = useSelector((state) => state.chatbotslice.visible);


    return (
        <div className={`chatbot-popup ${visible ? "chatbot-popup-show" : ""}`}>
            <div className="chatbot-popup-inner" >
                <Chatbot
                    config={config}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                />
            </div>
        </div>

    );
};

export default ChatbotPopUp;