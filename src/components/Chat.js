import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import Input from "./Input";
import { database, auth } from "../firebase";
import { ref, push, onValue } from "firebase/database";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Handle Username
    const savedName = localStorage.getItem("chat_username");
    if (savedName) {
      setUsername(savedName);
    } else {
      const name = prompt("Enter your name to start chatting:", "Anonymous");
      const finalName = name || "Anonymous";
      localStorage.setItem("chat_username", finalName);
      setUsername(finalName);
    }

    // Handle Authentication
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid.substring(0, 6));
      }
    });

    // Fetch Messages in Real-time
    const messagesRef = ref(database, "messages");
    const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMessages(messagesList);
      } else {
        setMessages([]);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeMessages();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text) => {
    if (text.trim() === "") return;

    const messagesRef = ref(database, "messages");
    push(messagesRef, {
      text: text,
      userId: userId,
      username: username,
      createdAt: Date.now(),
    });
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    backgroundColor: "#e5ddd5", // WhatsApp-like light background
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  };

  const headerStyle = {
    padding: "15px 20px",
    backgroundColor: "#075e54",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    zIndex: 10,
  };

  const messagesAreaStyle = {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div>
          <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Chat Notes</h2>
          <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>Welcome, {username}!</div>
        </div>
        <span style={{ fontSize: "0.8rem", opacity: 0.6 }}>ID: {userId}</span>
      </header>

      <div style={messagesAreaStyle}>
        {messages.map((msg) => (
          <Message key={msg.id} msg={msg} currentUser={userId} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ backgroundColor: "#f0f0f0", padding: "10px" }}>
        <Input onSend={sendMessage} />
      </div>
    </div>
  );
};

export default Chat;
