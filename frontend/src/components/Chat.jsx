/* eslint-disable react/prop-types */

import { useState } from 'react';
import { pants, shirt, skirts } from '../util/imageURL';
import ChatInput from './ChatInput';
import Message from './Message';


const Chat = ({ messages, setMessages }) => {
    const [isTyping, setIsTyping] = useState(false)

    const handleSendMessage = (text, sender) => {
        const newMessage = { text, sender };
        setMessages([...messages, newMessage]);
        handleResponse(newMessage);
    };

    const handleResponse = (message) => {
        setIsTyping(true);
      
        setTimeout(() => {
          setIsTyping(false);
          
          if (message.sender === 'user1') {
            const textLower = message.text.toLowerCase();
            
            if (textLower.includes('shirt')) {
              setMessages(prevMessages => [
                ...prevMessages,
                {
                  text: 'Check out this shirt!',
                  image: shirt, // replace with actual URL
                  link: 'https://www.flipkart.com/surhi-men-checkered-casual-grey-shirt/p/itmcd618d5595dc5?pid=SHTGTUW5G7KY7QJF&lid=LSTSHTGTUW5G7KY7QJFTWIL5D&marketplace=FLIPKART&store=clo%2Fash%2Faxc%2Fmmk%2Fkp7&spotlightTagId=BestsellerId_clo%2Fash%2Faxc%2Fmmk%2Fkp7&srno=b_1_39&otracker=browse&fm=organic&iid=cdc6e0c0-6563-487a-b24f-d6422c2e975b.SHTGTUW5G7KY7QJF.SEARCH&ppt=None&ppn=None&ssid=ajn3wg30000000001711755486833', // replace with actual link
                  sender: 'user2'
                }
              ]);
            } else if (textLower.includes('jeans') || textLower.includes('pant')) {
              setMessages(prevMessages => [
                ...prevMessages,
                {
                  text: 'Check out these pants!',
                  image: pants, // replace with actual URL
                  link: 'https://www.only.in/255136001-dark-blue-denim', // replace with actual link
                  sender: 'user2'
                }
              ]);
            } else if (textLower.includes('skirt')) {
              setMessages(prevMessages => [
                ...prevMessages,
                {
                  text: 'Check out these skirts!',
                  image: skirts, // replace with actual URL
                  link: 'https://www.jiomart.com/p/fashion/klart-women-s-pleated-skirt-skater-skirt-tennis-skirt-cycling-skirts-with-shorts-underneath/592737780', // replace with actual link
                  sender: 'user2'
                }
              ]);
            } else if (textLower.includes('hi') || textLower.includes('hello')) {
              setMessages(prevMessages => [
                ...prevMessages,
                { text: 'Hello!', sender: 'user2' }
              ]);
            } else {
              setMessages(prevMessages => [
                ...prevMessages,
                { text: 'Sorry we cannot give you an exact response for this. For more information, visit qshop', sender: 'user2' }
              ]);
            }
          }
        }, 1000); // simulate delay
      };
      




return (
    messages &&
    <div className="chat-container">
        <div className="chat-window">
            {messages.map((msg, index) => (
                <Message key={index} text={msg.text} sender={msg.sender} image={msg.image} link={msg.link} />
            ))}
            {isTyping && (
                <div className="typing-indicator">
                    <img src="../../public/loadingChat.gif" alt="User2 is typing..." /> {/* replace with actual typing indicator GIF URL */}
                </div>
            )}
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
    </div>
);
};

export default Chat;
