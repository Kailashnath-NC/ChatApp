import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  // IMPORTS FOR PARTIAL SEARCH
  // orderBy,
  // startAt,
  // endAt,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Search() {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [searchedUsername, setSearchedUsername] = useState("");
  const [user, setUser] = useState(null);

  async function handleSearch() {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", searchedUsername)
    );
    //Try catch maynot be needed
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc);
        setUser(doc.data());
      });
    } catch (e) {
      console.log("Error in Search");
      console.log(e);
    }
  }
  function handleKey(e) {
    if (e.code === "Enter" && searchedUsername !== currentUser.displayName) {
      handleSearch();
    }
  }
  // HANDLER FOR PARTIAL KEYWORD SEARCH
  // async function handlePartialSearch(e) {
  //   setSearchedUsername(e.target.value);

  //   if (e.target.value.length > 0) {
  //     const q = query(
  //       collection(db, "users"),
  //       orderBy("displayName"),
  //       startAt(e.target.value)
  //     );
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.data());
  //     });
  //   }
  // }

  async function handleSelect() {
    const combinedId =
      currentUser.uid < user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      //update documents ONLY IF currentuser user have never texted each other
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId]: {
            userInfo: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            date: serverTimestamp(),
          },
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId]: {
            userInfo: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            date: serverTimestamp(),
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    // finally {
    //   console.log("done");
    // }
    dispatch({
      type: "UPDATE CHAT",
      user: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
    });
    setUser(null);
    setSearchedUsername("");
  }

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          value={searchedUsername}
          // ONCHANGE FOR PARTIALLY KEYWORD SEARCH
          // onChange={handlePartialSearch}
          onChange={(e) => setSearchedUsername(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>
      {user && (
        <div className="userchat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
