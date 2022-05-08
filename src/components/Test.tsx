import * as React from "react";
import firebase from "firebase/app";

function CurrentUser() {
  const [user, setUser] = React.useState<firebase.User | null>(null);

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return <div>{user?.displayName || "unauthenticated"}</div>;
}
