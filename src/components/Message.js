import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import moment from "moment/moment";

export default function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { chatData } = useContext(ChatContext);
  const ref = useRef();

  function msgDelTime(timestamp) {
    let delTime = moment(message.timestamp.toDate()).fromNow();
    delTime = delTime.replace(" minute ", " min ");
    delTime = delTime.replace(" minutes ", " mins ");
    delTime = delTime.replace("a few seconds ago", "Just now");
    return delTime;
  }

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      className={`message ${currentUser.uid === message.senderId && "owner"}`}
      ref={ref}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : chatData.user.photoURL
          }
          alt=""
        />
        <span className="delTime">{msgDelTime(message.timestamp)}</span>
      </div>
      <div className="messageContent">
        {message.text !== "" && <div>{message.text}</div>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
}
