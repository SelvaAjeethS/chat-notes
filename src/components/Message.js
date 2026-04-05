import React from "react";

const Message = ({ msg, currentUser }) => {
  const isMine = msg.userId === currentUser;
  const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const displayName = msg.username || msg.userId;

  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: isMine ? "flex-end" : "flex-start",
    width: "100%",
    marginBottom: "8px",
  };

  const bubbleStyle = {
    backgroundColor: isMine ? "#4caf50" : "#ffffff",
    color: isMine ? "white" : "black",
    padding: "8px 12px",
    borderRadius: isMine ? "12px 12px 0 12px" : "12px 12px 12px 0",
    maxWidth: "75%",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  };

  const nameStyle = {
    fontSize: "0.7rem",
    fontWeight: "600",
    color: isMine ? "rgba(255,255,255,0.8)" : "#075e54",
    marginBottom: "2px",
  };

  const timeStyle = {
    fontSize: "0.6rem",
    color: isMine ? "rgba(255,255,255,0.7)" : "#888",
    alignSelf: "flex-end",
    marginTop: "4px",
  };

  return (
    <div style={wrapperStyle}>
      <div style={bubbleStyle}>
        {!isMine && <span style={nameStyle}>{displayName}</span>}
        <div style={{ wordBreak: "break-word", lineHeight: "1.4", fontSize: "0.95rem" }}>
          {msg.text}
        </div>
        <span style={timeStyle}>{time}</span>
      </div>
    </div>
  );
};

export default Message;
