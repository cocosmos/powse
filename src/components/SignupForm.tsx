import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";

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

interface State {
  password: string;
  showPassword: boolean;
  email: string;
  name: string;
}

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

  // const handleInput = (e) => {
  //   const id = e.target.id;
  //   const value = e.target.value;

  //   setData({ ...data, [id]: value });
  // };

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

  /*Password Shows*/

  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
    email: "",
    name: "",
  });

  const handleInput =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  console.log(data);
  console.log(values);
  return (
    <div>
      <Typography variant="h3">Viens te Powser avec nous !</Typography>

      {currentUser.uid ? (
        <form onSubmit={handleCompany}>
          <h2>Company</h2>
          <TextField
            helperText="Entreprise"
            id="company"
            label="Entreprise"
            type={"text"}
            onChange={handleInputCompany}
            variant="filled"
            defaultValue=""
            fullWidth
            color="secondary"
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" color="success" fullWidth>
            Suivant
          </Button>
        </form>
      ) : (
        <Box flexGrow={1} display={"flex"} mt={5}>
          <form onSubmit={handleSignup}>
            <TextField
              id="name"
              label="Nom complet"
              variant="filled"
              type={"text"}
              onChange={handleInput("name")}
              fullWidth
              color="secondary"
              sx={{ mb: 3 }}
            />
            <TextField
              id="email"
              label="Adresse e-mail"
              type={"email"}
              variant="filled"
              onChange={handleInput("email")}
              fullWidth
              color="secondary"
              sx={{ mb: 3 }}
            />
            <FormControl
              variant="filled"
              fullWidth
              color="secondary"
              sx={{ mb: 4 }}
            >
              <InputLabel htmlFor="passwordLogin">
                Creéer un mot de passe
              </InputLabel>
              <FilledInput
                id="passwordLogin"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleInput("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              variant="filled"
              fullWidth
              color="secondary"
              sx={{ mb: 4 }}
            >
              <InputLabel htmlFor="passwordLogin">
                Confirmer le mot de passe
              </InputLabel>
              <FilledInput
                id="passwordConfirm"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleInput("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ borderRadius: 25, textTransform: "unset", mt: 4, p: 1.5 }}
              fullWidth
            >
              {" "}
              Suivant
            </Button>
          </form>
        </Box>
      )}
    </div>
  );
};
