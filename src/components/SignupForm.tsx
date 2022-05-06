import { Autocomplete, Button, TextField } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { auth, db } from "../firebase";
import { User } from "../types/user";
import Asynchronous from "./AutoComplete";

export const SignupForm = () => {
  const [data, setData] = useState<User>();
  const { dispatch, currentUser } = useContext(AuthContext);

  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: any) => {
    // console.log(email);
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      /*   await setDoc(doc(db, "company/temp/users", res.user.uid), {
        name: data.name,
        email: data.email,
        timeStamp: serverTimestamp(),
      }); */

      signInWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch({ type: "LOGIN", payload: user });
          console.log(user);
        }
      );
      //navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };
  console.log(currentUser);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleInputCompany = (f) => {
    const id = f.target.id;
    const value = f.target.value;

    setData({ ...data, [id]: value });
  };

  const handleCompany = async (e: any) => {
    e.preventDefault();
    await setDoc(doc(db, `company/${data.company}/users`, currentUser.uid), {
      name: data.name,
      email: data.email,
      timeStamp: serverTimestamp(),
    });
    /*  await updateDoc(doc(db, "users", currentUser.uid), {
      company: data.company,
    }); */

    navigate("/");
  };

  console.log(data);

  return (
    <div>
      {currentUser.uid ? (
        <form onSubmit={handleCompany}>
          <h2>Company</h2>
          <TextField
            helperText="Entreprise"
            id="company"
            label="Entreprise"
            type={"text"}
            onChange={handleInputCompany}
            defaultValue=""
          />
          <Button type="submit" variant="contained" color="success" fullWidth>
            Submit
          </Button>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          <TextField
            helperText="Please enter your name"
            id="name"
            label="Nom"
            type={"text"}
            onChange={handleInput}
          />
          <TextField
            helperText="Please enter your email"
            id="email"
            label="Email"
            type={"email"}
            onChange={handleInput}
          />
          <TextField
            helperText="Please enter your Password"
            id="password"
            label="Password"
            type={"password"}
            onChange={handleInput}
          />
          <TextField
            helperText="Please confirm your Password"
            id="passwordConfirm"
            label="Confirm Password"
            type={"password"}
            onChange={handleInput}
          />

          <Button type="submit" variant="contained" color="success" fullWidth>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};
