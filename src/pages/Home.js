import React from "react";
import Sidebar from "../components/Sidebar";
import Chats from "../components/Chats";
import Chat from "../components/Chat";

export default function Home() {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}
