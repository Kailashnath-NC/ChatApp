import React from "react";
import add from '../img/add.png';
import cam from '../img/cam.png';
import more from '../img/more.png'

export default function Chat() {
  return (
    <div className="chat">
      <div className="chatNavbar">
        <span>Jane</span>
        <div className="chatIcons">
          <img src={cam} alt="" />
          <img src={add} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
    </div>
  );
}
