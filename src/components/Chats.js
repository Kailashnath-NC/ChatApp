import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Chats() {
  const [chats, setChats] = useState([]);
  const { dispatch } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    function getChats() {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        if (doc.exists()) setChats(doc.data());
      });
      return () => unsub();
    }
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  function handleSelect(chat) {
    dispatch({ type: "UPDATE CHAT", user: chat[1].userInfo });
  }

  return (
    <div className="chats">
      {Object.entries(chats)
        .sort((a, b) => b.date - a.date)
        .map((chat) => (
          <div
            className="userchat"
            key={chat[0]}
            onClick={() => handleSelect(chat)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <div>{chat[1].lastMessage?.text}</div>
            </div>
          </div>
        ))}
    </div>
  );
}
