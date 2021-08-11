import React from "react";
import SendMessage from "./SendMessage";
import RecvMessage from "./RecvMessage";
import MessageForm from "./MessageForm";
import { LogoutOutlined } from "@ant-design/icons";

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props;

  const currentChat = chats && chats[activeChat];

  const readStatus = (currentMessage, isMyMessage) =>
    currentChat.people.map(
      (person, index) =>
        person.last_read === currentMessage.id && (
          <div
            key={`read_${index}`}
            className="read-receipt"
            style={{
              float: isMyMessage ? "right" : "left",

              backgroundImage:
                person.person.avatar && `url(${person.person.avatar})`,
            }}
          />
        )
    );

  const showMessages = () => {
    const keys = Object.keys(messages);
    console.log("hello");
    return keys.map((key, index) => {
      const currentMessage = messages[key];
      const prevMessageKey = index === 0 ? null : keys[index - 1];
      const prevMessage = messages[prevMessageKey];
      const isMyMessage = userName === currentMessage.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? (
              <SendMessage message={currentMessage} />
            ) : (
              <RecvMessage
                currentMessage={currentMessage}
                prevMessage={prevMessage}
              />
            )}
          </div>
          <div
            className="read-receipts"
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marginLeft: isMyMessage ? "0px" : "68px",
            }}
          >
            {readStatus(currentMessage, isMyMessage)}
          </div>
        </div>
      );
    });
  };
  const handleClick = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    window.location.reload();
  };

  if (!currentChat)
    return (
      <div>
        <h3
          style={{
            textAlign: "center",
            justifyContent: "center",
            paddingTop: "19px",
          }}
        >
          No Chat rooms found for you!!
          <span>
            <LogoutOutlined
              style={{ float: "right", fontSize: "30px", color: "#377f72" }}
              onClick={handleClick}
            />
          </span>
        </h3>
      </div>
    );

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">
          {currentChat?.title}
          <LogoutOutlined
            style={{ float: "right", fontSize: "30px", color: "#377f72" }}
            onClick={handleClick}
          />
        </div>
        <div className="chat-subtitle">
          {currentChat.people.map((person) => `${person.person.username},`)}
        </div>
      </div>
      {showMessages()}
      <div style={{ height: "100px" }} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
