import React, { useState } from "react";

const Input = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const formStyle = {
    display: "flex",
    gap: "10px",
    width: "100%",
  };

  const inputStyle = {
    flex: 1,
    padding: "12px 20px",
    borderRadius: "25px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "1rem",
  };

  const buttonStyle = {
    backgroundColor: "#25d366",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "45px",
    height: "45px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    fontSize: "1.2rem",
    transition: "transform 0.1s ease",
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <input
        style={inputStyle}
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button style={buttonStyle} type="submit" onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'} onMouseUp={(e) => e.target.style.transform = 'scale(1)'}>
        ➤
      </button>
    </form>
  );
};

export default Input;
