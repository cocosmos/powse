import {
  Box,
  FormHelperText,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SignupForm } from "../components/SignupForm";
import NameField from "../components/common/inputs/NameField";
import { useState, useContext, useRef } from "react";
import EmailField from "../components/common/inputs/EmailField";
import PasswordField from "../components/common/inputs/PasswordField";
import SubmitButton from "../components/common/inputs/SubmitButton";
import { AuthContext, useAuth } from "../contexts/AuthContext";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../components/common/firebase/config";
import { useNavigate } from "react-router-dom";
import CompanyField from "../components/common/inputs/CompanyField";

const Register = () => {
  const emailRef = useRef({ value: "" });
  const passwordRef = useRef({ value: "" });
  const confirmPasswordRef = useRef({ value: "" });
  const nameRef = useRef({ value: "" });
  const companyRef = useRef({ value: "" });

  const {
    modal,
    setModal,
    signUp,
    login,
    loginWithGoogle,
    setAlert,
    setLoading,
  } = useAuth();
  const { dispatch, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const name = nameRef.current.value;
    console.log(email, password, confirmPassword, name);

    try {
      if (password !== confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas.");
      }
      const res = await signUp(email, password, name);
      await setDoc(doc(db, "users", res.user.uid), {
        name: name,
        email: email,

        timeStamp: serverTimestamp(),
      });

      login(email, password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user, name: name });
        console.log(user);
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const [value, setValue] = useState<any | null>(null);

  const handleCompany = async (e) => {
    e.preventDefault();
    const entreprise = companyRef.current.value;
    const rep = await addDoc(collection(db, `entreprise`), {
      name: entreprise,
      timeStamp: serverTimestamp(),
    });
    await updateDoc(doc(db, "users", currentUser.uid), {
      entreprise: entreprise,
      id: rep.id,
      timeStamp: serverTimestamp(),
    });
    navigate("/");
  };
  return (
    <Stack
      spacing={5}
      justifyContent="center"
      height={"100%"}
      textAlign="center"
      alignItems={"center"}
      maxWidth="sm"
      sx={{ margin: "0 auto" }}
    >
      {currentUser.uid /* && !data.companyChoice  */ ? (
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
              <CompanyField
                value={value}
                setValue={setValue}
                companyRef={companyRef}
              />
              <Typography variant="subtitle1">
                Grâce à cette information, nous pourrons te proposer les powses
                que tes collègues ont planifié.
              </Typography>
            </Stack>
            <SubmitButton label={"Suivant"} />
          </Stack>
        </form>
      ) : (
        <>
          <Typography variant="h3">Viens te Powser avec nous ! </Typography>
          <Box flexGrow={1} display={"flex"} mt={5}>
            <form onSubmit={handleSignup}>
              <NameField nameRef={nameRef} label={"Nom complet"} />
              <EmailField emailRef={emailRef} />
              <PasswordField
                passwordRef={passwordRef}
                label={"Créer un mot de passe *"}
              />
              <PasswordField
                passwordRef={confirmPasswordRef}
                label={"Confirmer le mot de passe *"}
                id={"confirmPassword"}
              />
              <SubmitButton label={"Suivant"} />
            </form>
          </Box>
          <Typography variant="body2">
            Vous avez déjà un compte ?{" "}
            <Link href="/login">Connectez-vous..</Link>
          </Typography>
        </>
      )}
    </Stack>
  );
};

export default Register;
