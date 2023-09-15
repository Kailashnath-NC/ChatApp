import React from "react";

export default function Navbar() {
  return (
    <div className="navbar">
      <span className="logo">ShitApp</span>
      <div className="profile">
        <img src="https://images.pexels.com/photos/8616015/pexels-photo-8616015.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
        <span>Name</span>
        <button className="logoutbtn">Logout</button>
      </div>
    </div>
  );
}
