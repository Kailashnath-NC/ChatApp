import React from "react";
import addAvatar from "../img/addAvatar.png";

export default function Register() {
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">ShitApp</span>
        <p className="title">Register</p>
        <form action="">
          <input type="text" placeholder="Display handle" />
          <input type="email" placeholder="Email ID" />
          <input type="password" placeholder="Password" />
          <input className="avatar" type="file" id="file" />
          <label className="avatar" htmlFor="file">
            <img src={addAvatar} alt="" srcset="" />
            <span>Add an avatar</span>
          </label>
          <button type="submit">Sign up</button>
        </form>
        <p>You have an account? Login</p>
      </div>
    </div>
  );
}
