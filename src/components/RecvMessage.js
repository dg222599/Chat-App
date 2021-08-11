import React from "react";
const RecvMessage = ({ prevMessage, currentMessage }) => {
  const isFirstReplyMessage =
    !prevMessage ||
    prevMessage.sender.username !== currentMessage.sender.username;

  return (
    <div className="message-row">
      {isFirstReplyMessage && (
        <div
          className="message-avatar"
          style={{
            backgroundImage:
              currentMessage.sender && `url(${currentMessage.sender.avatar})`,
          }}
        />
      )}
      {currentMessage.attachments && currentMessage.attachments.length > 0 ? (
        <img
          src={currentMessage.attachments[0].file}
          alt="image"
          className="message-image"
          style={{ marginLeft: isFirstReplyMessage ? "4px" : "48px" }}
        />
      ) : (
        <div
          className="message"
          style={{
            float: "left",
            backgroundColor: "#CABCDC",
            marginLeft: isFirstReplyMessage ? "4px" : "48px",
          }}
        >
          {currentMessage.text}
        </div>
      )}
    </div>
  );
};
export default RecvMessage;
