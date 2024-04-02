// ChatbotPopUp.js
import { useSelector } from "react-redux";
import "./ChatbotPopUp.css";
import { AiChat } from '@nlux/react';
import { useUnsafeChatAdapter } from '@nlux/openai-react';
import '@nlux/themes/nova.css';


const adapterOptions ={
    apiKey: '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',
    model: 'gpt-3.5-turbo',
    systemMessage: 'Act as a helpful assistant and be funny and engaging.',
  };

const ChatbotPopUp = () => {
  const visible = useSelector((state) => state.chatbotslice.visible);
  const openAiAdapter = useUnsafeChatAdapter(adapterOptions);

  return (
    <div className={`chatbot-popup ${visible ? "chatbot-popup-show" : ""}`}>
      <div className="chatbot-popup-inner" >
      <AiChat
        adapter={openAiAdapter}
        promptBoxOptions={{
          placeholder: 'How can I help you today?'
        }}
      />
      </div>
    </div>
  );
};

export default ChatbotPopUp;