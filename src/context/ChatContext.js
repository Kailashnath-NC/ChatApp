import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const ChatContext = createContext();

const INITIAL_STATE = { chatId: null, user: {} };

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  function reducer(state, action) {
    switch (action.type) {
      case "UPDATE CHAT":
        return {
          chatId:
            currentUser.uid < action.user.uid
              ? currentUser.uid + action.user.uid
              : action.user.uid + currentUser.uid,
          user: action.user,
        };
      case "RESET CHAT":
        return {
          chatId: null,
          user: {},
        };
      default:
        return state;
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      dispatch({ type: "RESET CHAT" });
    });
  }, []);

  return (
    <ChatContext.Provider value={{ chatData: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
