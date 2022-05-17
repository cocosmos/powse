import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { auth, db } from "../components/common/firebase/config";
import AuthReducer from "./AuthReducer";

interface ContextType {
  dispatch: React.Dispatch<{ type: any; payload: any }>;
}

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user") || "{}"),
};
const INITIAL = {
  userData: JSON.parse(localStorage.getItem("data") || "{}"),
};
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContext = createContext<ContextType | any>(INITIAL_STATE);
export const AuthDataContext = createContext<any>(INITIAL);

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [modal, setModal] = useState({ isOpen: false, title: "", content: "" });
  const [alert, setAlert] = useState({
    isAlert: false,
    severity: "info",
    message: "",
    timeout: null,
    location: "",
  });
  const [loading, setLoading] = useState(false);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const logout = () => {
    return signOut(auth);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const resetPassword = (code, password) => {
    return confirmPasswordReset(auth, code, password);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  const table = {};
  useEffect(() => {
    if (state.currentUser.uid) {
      const docRef = doc(db, `users`, state.currentUser.uid);

      onSnapshot(docRef, (doc) => {
        const table = { ...doc.data(), id: doc.id };
        localStorage.setItem("data", JSON.stringify(table));
      });
    }
  }, [state.currentUser.uid]);

  const value = {
    signUp,
    login,
    logout,
    modal,
    setModal,
    loginWithGoogle,
    alert,
    setAlert,
    loading,
    setLoading,
    resetPassword,
    forgotPassword,
    userData: table,
    currentUser: state.currentUser,
    dispatch,
  };

  return <AuthContext.Provider {...{ value }}>{children}</AuthContext.Provider>;
};
function setEntreprise(arg0: { [field: string]: any }) {
  throw new Error("Function not implemented.");
}
