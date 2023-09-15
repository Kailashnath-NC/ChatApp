import React from "react";

export default function Login() {
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">ShitApp</span>
        <p className="title">Login</p>
        <form action="">
          <input type="email" placeholder="Email ID" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign in</button>
        </form>
        <p>You don't have an account? Register</p>
      </div>
    </div>
  );
}
