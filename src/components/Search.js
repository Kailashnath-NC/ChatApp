import React from "react";

export default function Search() {
  return (
    <div className="search">
      <form className="searchForm">
        <input type="text" placeholder="Find a user" />
      </form>
      <div className="userchat">
        <img
          src="https://images.pexels.com/photos/8616015/pexels-photo-8616015.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt=""
        />
        <div className="userChatInfo">
          <span className="user">Jane</span>
        </div>
      </div>
    </div>
  );
}
