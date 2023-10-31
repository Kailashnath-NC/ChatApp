import React, { useContext, useRef, useState } from "react";
// import attach from "../img/attach.png";
import img from "../img/img.png";
import { db, storage } from "../firebase";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";
import { v4 } from "uuid";
import { AuthContext } from "../context/AuthContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Input() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);
  const { chatData } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  async function handleSend() {
    if (text || image) {
      const inputText = text;
      console.log(inputText);
      setText("");
      if (image) {
        const storageRef = ref(storage, v4());
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          null,
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, "chats", chatData.chatId), {
                  messages: arrayUnion({
                    id: v4(),
                    text: inputText,
                    img: downloadURL,
                    senderId: currentUser.uid,
                    timestamp: Timestamp.now(),
                  }),
                });
              }
            );
          }
        );
      } else {
        await updateDoc(doc(db, "chats", chatData.chatId), {
          messages: arrayUnion({
            id: v4(),
            text: inputText,
            senderId: currentUser.uid,
            timestamp: Timestamp.now(),
          }),
        });
      }
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [chatData.chatId + ".lastMessage"]: {
          text: inputText,
        },
        [chatData.chatId + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", chatData.user.uid), {
        [chatData.chatId + ".lastMessage"]: {
          text: inputText,
        },
        [chatData.chatId + ".date"]: serverTimestamp(),
      });
      setImage(null);
      if (imageRef.current) imageRef.current.value = null;
    }
  }

  return (
    <div className="input">
      <input
        type="text"
        value={text}
        className="textMsg"
        placeholder="Type something..."
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />

      <div className="inputButtons">
        {/* <input type="file" id="attachFile" />
        <label htmlFor="attachFile">
          <img src={attach} alt="" />
        </label> */}
        <input
          type="file"
          id="addImage"
          ref={imageRef}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="addImage">
          <img src={img} alt="" />
        </label>
        <button className="sendMessage" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
