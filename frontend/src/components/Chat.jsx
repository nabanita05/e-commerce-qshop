/* eslint-disable react/prop-types */

import ChatInput from './ChatInput';
import Message from './Message';

const Chat = ({messages, setMessages}) => {
   

    const handleSendMessage = (text, sender) => {
        const newMessage = { text, sender };
        setMessages([...messages, newMessage]);
        handleResponse(newMessage);
    };

    const handleResponse = (message) => {
        if (message.sender === 'user1') {
            const textLower = message.text.toLowerCase();
            console.log(textLower);
            if (textLower.includes('shirt')) {
                setTimeout(() => {
                    setMessages(prevMessages => [
                        ...prevMessages,
                        {
                            text: 'Check out this shirt!',
                            image: 'data:image/jpeg;base64,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', // replace with actual URL
                            link: 'https://www.flipkart.com/surhi-men-checkered-casual-grey-shirt/p/itmcd618d5595dc5?pid=SHTGTUW5G7KY7QJF&lid=LSTSHTGTUW5G7KY7QJFTWIL5D&marketplace=FLIPKART&store=clo%2Fash%2Faxc%2Fmmk%2Fkp7&spotlightTagId=BestsellerId_clo%2Fash%2Faxc%2Fmmk%2Fkp7&srno=b_1_39&otracker=browse&fm=organic&iid=cdc6e0c0-6563-487a-b24f-d6422c2e975b.SHTGTUW5G7KY7QJF.SEARCH&ppt=None&ppn=None&ssid=ajn3wg30000000001711755486833', // replace with actual link
                            sender: 'user2'
                        }
                    ]);
                }, 1000); // simulate delay
            } else if (message.text.includes('Pant')) {
                setTimeout(() => {
                    setMessages(prevMessages => [
                        ...prevMessages,
                        {
                            text: 'Check out these pants!',
                            image: 'pant_image_url', // replace with actual URL
                            link: 'https://example.com/pant', // replace with actual link
                            sender: 'user2'
                        }
                    ]);
                }, 1000); // simulate delay
            } else if (message.text === 'Hi') {
                setTimeout(() => {
                    setMessages(prevMessages => [
                        ...prevMessages,
                        { text: 'Hello!', sender: 'user2' }
                    ]);
                }, 1000); // simulate delay
            }else{
                setTimeout(() => {
                    setMessages(prevMessages => [
                        ...prevMessages,
                        { text: 'Sorry we can not give you exact response for this', sender: 'user2' }
                    ]);
                }, 1000); 
            }
        }
    };

   

    return (
        messages && 
        <div className="chat-container">
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <Message key={index} text={msg.text} sender={msg.sender} image={msg.image} link={msg.link} />
                ))}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default Chat;
