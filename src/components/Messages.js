import React, { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";

export default function Messages() {
  const { chatData } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatData.chatId) {
      const unSub = onSnapshot(doc(db, "chats", chatData.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      return () => unSub();
    }
  }, [chatData.chatId]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
}
