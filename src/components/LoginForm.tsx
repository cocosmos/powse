import { Button, TextField } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };
  return (
    <form onSubmit={handleLogin}>
      <TextField
        helperText="Please enter your email"
        id="emailLogin"
        label="Email"
        type={"email"}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        helperText="Please enter your Password"
        id="passwordLogin"
        label="Password"
        type={"password"}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="contained" color="success">
        Submit
      </Button>
    </form>
  );
};

export default LoginForm;
