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
  Stack,
  TextField,
  Typography,
  Link,
} from "@mui/material";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
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
      await setDoc(doc(db, "users", res.user.uid), {
        name: data.name,
        email: data.email,
        timeStamp: serverTimestamp(),
      });

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
  const company = [];

  const handleCompany = (e: any) => {
    e.preventDefault();

    const colRef = collection(db, "entreprise");

    getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach(async (doc) => {
          if (doc.data.name === data.company) {
            addCompanyUser(doc.id);
          } else {
            addCompany(doc.id);
          }
        });
        console.log(company);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // navigate("/");
    setData({ ...data, companyChoice: true });
  };

  async function addUsers() {
    await setDoc(doc(db, "users", currentUser.uid), {
      name: data.name,
      email: data.email,
      timeStamp: serverTimestamp(),
    });
    await updateDoc(doc(db, "users", currentUser.uid), {
      company: data.company,
    });
  }
  async function addCompanyUser(uid) {
    await setDoc(doc(db, `users/${currentUser.uid}/company`, uid), {
      name: data.company,
      timeStamp: serverTimestamp(),
    });
  }
  async function addCompany(uid: string) {
    console.log(uid);
    await setDoc(doc(db, `company`), {
      name: data.company,
      timeStamp: serverTimestamp(),
    });
    await setDoc(doc(db, `users/${currentUser.uid}/company`, uid), {
      name: data.company,
      timeStamp: serverTimestamp(),
    });
  }

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
      {currentUser.uid && !data.companyChoice ? (
        <form onSubmit={handleCompany}>
          <Stack
            spacing={10}
            justifyContent="center"
            height={"100%"}
            textAlign="center"
            alignItems={"center"}
            maxWidth="sm"
            sx={{ margin: "0 auto" }}
          >
            <Typography variant="h3">
              Salut Julien, plus qu'une étape avant de prendre ta Powse.
            </Typography>
            <Stack spacing={2} sx={{ width: "100%" }}>
              <TextField
                id="company"
                label="Dans quelle entreprise travailles-tu ?"
                type={"text"}
                variant="filled"
                onChange={handleInput("company")}
                fullWidth
                color="secondary"
                sx={{ mb: 3 }}
              />
              <Typography variant="subtitle1">
                Grâce à cette information, nous pourrons te proposer les powses
                que tes collègues ont planifié.
              </Typography>
            </Stack>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ borderRadius: 25, textTransform: "unset", mt: 2, p: 1.5 }}
              fullWidth
            >
              Suivant
            </Button>
          </Stack>
        </form>
      ) : (
        <>
          <Typography variant="h3">Viens te Powser avec nous ! </Typography>
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
              <Typography variant="body2">
                Vous avez déjà un compte ?{" "}
                <Link href="/login">Connectez-vous..</Link>
              </Typography>
            </form>
          </Box>
        </>
      )}
    </div>
  );
};
