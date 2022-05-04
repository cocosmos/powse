interface State {
  name: string;
}
interface NameAction {
  type: string;
  payload?: any;
}

const AuthReducer = (_: State, action: NameAction) => {
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

export default AuthReducer;
