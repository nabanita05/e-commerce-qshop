/* eslint-disable react/prop-types */


const Message = ({ text, sender, image, link }) => {
  return (
    <div className={`message ${sender}`}>
      <div className="message-text">
        {text}
        {image && (
          <div className="message-image">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <img src={image} alt={text} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;