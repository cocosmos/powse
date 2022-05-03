import { Button, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../firebase";

export const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: any) => {
    console.log(email);
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div>
      <h2>SignupForm</h2>
      <form onSubmit={handleSignup}>
        <TextField
          helperText="Please enter your email"
          id="email"
          label="Email"
          type={"email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          helperText="Please enter your Password"
          id="password"
          label="Password"
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="success">
          Submit
        </Button>
      </form>
    </div>
  );
};
