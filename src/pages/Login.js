import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [warn, setWarn] = useState(false);

  async function warning() {
    setTimeout(
      () => {
        setWarn(false);
      },
      1200,
      1
    );
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setWarn(true);
      warning();
      console.log(error.message);
    }
  }

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">ShitApp</span>
        <p className="title">Login</p>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email ID" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign in</button>
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>
        </p>
        <div
          className="warning"
          style={{
            visibility: !warn ? "hidden" : "visible",
          }}
        >
          Something went wrong!
        </div>
      </div>
    </div>
  );
}
