import { createContext, useEffect, useReducer } from "react";

enum AuthActionKind {
  INITIAL_STATE,
}
interface AuthAction {
  type: string;
  payload?: AuthActionKind;
  currentUser: {};
}

interface ContextType {
  dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<ContextType>({
  dispatch: () => null,
});

const AuthReducer = (action: AuthAction) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN": {
      return {
        currentUser: payload,
      };
    }
    case "LOGOUT": {
      return {
        currentUser: null,
      };
    }
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user") || "{}"),
};

export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(AuthReducer, { INITIAL_STATE: null });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
