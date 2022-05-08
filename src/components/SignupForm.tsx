import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
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
import { User } from "../types/Type";
import Asynchronous from "./AutoComplete";

export const SignupForm = () => {
  const [data, setData] = useState<User>({
    email: "",
    name: "",
    timeStamp: new Date(),
    password: "",
    confirmPassword: "",
    showPassword: false,
    company: "",
    passwordSame: false,
    companyChoice: false,
  });
  const { dispatch, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e: any) => {
    //console.log(email);
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

  const handleCompany = async (e: any) => {
    e.preventDefault();

    await setDoc(doc(db, `company/${data.company}/users`, currentUser.uid), {
      name: data.name,
      email: data.email,
      timeStamp: serverTimestamp(),
    });
    await updateDoc(doc(db, "users", currentUser.uid), {
      company: data.company,
    });

    navigate("/");
    setData({ ...data, companyChoice: true });
  };

  /*Password Shows*/

  const handleInput =
    (prop: keyof User) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setData({ ...data, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setData({
      ...data,
      showPassword: !data.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  console.log(data);
  console.log(currentUser);
  return (
    <div>
      <Typography variant="h3">Viens te Powser avec nous !</Typography>
      {currentUser.uid && !data.companyChoice ? (
        <form onSubmit={handleCompany}>
          <h2>Company</h2>
          <TextField
            helperText="Entreprise"
            id="company"
            label="Entreprise"
            type={"text"}
            onChange={handleInput("company")}
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
              required
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
              required
            />
            <FormControl
              variant="filled"
              fullWidth
              color="secondary"
              sx={{ mb: 4 }}
            >
              <InputLabel htmlFor="passwordLogin">
                Créer un mot de passe *
              </InputLabel>
              <FilledInput
                id="passwordLogin"
                type={data.showPassword ? "text" : "password"}
                value={data.password}
                onChange={handleInput("password")}
                required
                inputProps={{
                  min: 8,
                  max: 999,
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {data.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="my-helper-text">
                Votre mot de passe doit faire minimum 8 charactères.
              </FormHelperText>
            </FormControl>
            <FormControl
              variant="filled"
              fullWidth
              color="secondary"
              sx={{ mb: 4 }}
            >
              <InputLabel htmlFor="passwordConfirm">
                Confirmer le mot de passe *
              </InputLabel>
              <FilledInput
                id="passwordConfirm"
                type={data.showPassword ? "text" : "password"}
                value={data.confirmPassword}
                onChange={handleInput("confirmPassword")}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {data.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText id="my-helper-text">
                Les mots de passe ne correspondent pas.
              </FormHelperText>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ borderRadius: 25, textTransform: "unset", mt: 2, p: 1.5 }}
              fullWidth
            >
              Suivant
            </Button>
          </form>
        </Box>
      )}
    </div>
  );
};
