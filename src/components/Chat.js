import React, { useContext } from "react";
import add from "../img/add.png";
import cam from "../img/cam.png";
import more from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

export default function Chat() {
  const { chatData } = useContext(ChatContext);
  return (
    <div className="chat">
      <div className="chatNavbar">
        <span>
          {JSON.stringify(chatData.user) !== JSON.stringify({}) && (
            <img
              className="recepientProfilePic"
              src={chatData.user.photoURL}
              alt=""
            />
          )}
          {chatData.user?.displayName}
        </span>
        <div className="chatIcons">
          <img src={cam} alt="" />
          <img src={add} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
      {JSON.stringify(chatData.user) === JSON.stringify({}) ? (
        <div className="noUserSelected">SELECT A USER TO CHAT</div>
      ) : (
        <>
          <Messages />
          <Input />
        </>
      )}
    </div>
  );
}
