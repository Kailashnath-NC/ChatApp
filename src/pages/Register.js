import React, { useState } from "react";
import addAvatar from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import defaultIcon from "../img/user-fill.svg";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [warn, setWarn] = useState(false);
  const navigate = useNavigate();

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
    setLoading(true);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          setWarn(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(response.user, {
              displayName,
              photoURL: file ? downloadURL : defaultIcon,
            });
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName,
              email,
              photoURL: file ? downloadURL : defaultIcon,
            }).catch((e) => {
              setWarn(true);
              warning();
              console.log(e);
            });

            await setDoc(doc(db, "userChats", response.user.uid), {});
            setLoading(false);
            e.target.reset();
            navigate("/");
          });
        }
      );
    } catch (error) {
      setWarn(true);
      setLoading(false);
      warning();
      console.log(error);
    }
  }
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <span className="logo">ShitApp</span>
        <p className="title">Register</p>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Display handle" />
          <input type="email" placeholder="Email ID" />
          <input type="password" placeholder="Password" />
          <input className="avatar" type="file" id="file" />
          <label className="avatar" htmlFor="file">
            <img src={addAvatar} alt="" />
            <span>Add an avatar</span>
          </label>
          <button type="submit">
            {loading ? (
              <BounceLoader
                loading={loading}
                color="white"
                size={25}
                cssOverride={{ margin: "0 auto" }}
              />
            ) : (
              "Sign up"
            )}
          </button>
        </form>
        <p>
          You have an account? <Link to="/login">Login</Link>
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
