import { Box, FormHelperText, Link, Stack, Typography } from "@mui/material";
import NameField from "../components/common/inputs/NameField";
import { useState, useContext, useRef, useEffect } from "react";
import EmailField from "../components/common/inputs/EmailField";
import PasswordField from "../components/common/inputs/PasswordField";
import SubmitButton from "../components/common/inputs/SubmitButton";
import { AuthContext, useAuth } from "../contexts/AuthContext";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../components/common/firebase/config";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Company from "../components/Company";

const Register = () => {
  const emailRef = useRef({ value: "" });
  const passwordRef = useRef({ value: "" });
  const confirmPasswordRef = useRef({ value: "" });
  const nameRef = useRef({ value: "" });
  /*Error*/
  const [emailExist, setEmailExist] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [entreprise, setEntreprise] = useState(false);

  const { signUp, login } = useAuth();
  const { dispatch, currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser.uid) {
      setEntreprise(true);
    }
  });

  const handleSignup = async (e: any) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    const name = nameRef.current.value;

    //Error check
    setEmailExist(null);
    setPasswordConfirm("");

    try {
      if (password !== confirmPassword) {
        throw new Error("passwordconfirm");
      }
      //register user
      const res = await signUp(email, password, name);
      await setDoc(doc(db, "users", res.user.uid), {
        name: name,
        email: email,
        timeStamp: serverTimestamp(),
      });
      //login
      login(email, password).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user, name: name });
      });

      setEntreprise(true);
      //display errot
    } catch (error) {
      switch (error.message) {
        case "Firebase: Error (auth/email-already-in-use).":
          setEmailExist(
            <Typography variant="caption">
              Cet email existe déjà : <Link href="/login">Connectez-vous</Link>
            </Typography>
          );
          break;
        case "passwordconfirm":
          setPasswordConfirm("Les mots de passe ne correspondent pas.");
          break;
      }
    }
  };
  return (
    <>
      {entreprise ? (
        <Company />
      ) : (
        <>
          <Header />
          <Stack
            spacing={5}
            justifyContent="flex-start"
            height={"80vh"}
            textAlign="center"
            alignItems={"center"}
            maxWidth="sm"
            sx={{ margin: "0 auto" }}
          >
            <Typography variant="h1" sx={{ mt: 5 }}>
              Viens te Powser avec nous !{" "}
            </Typography>
            <Box display={"flex"} mt={0}>
              <form onSubmit={handleSignup}>
                <NameField nameRef={nameRef} label={"Nom complet"} />

                <EmailField emailRef={emailRef} />
                <FormHelperText
                  sx={{ textAlign: "center", mb: 2, mt: -2 }}
                  error
                >
                  {emailExist}
                </FormHelperText>
                <PasswordField
                  passwordRef={passwordRef}
                  label={"Créer un mot de passe *"}
                  id={"new-password"}
                />
                <PasswordField
                  passwordRef={confirmPasswordRef}
                  label={"Confirmer le mot de passe *"}
                  id={"confirm-password"}
                  autoFocus={false}
                />
                <FormHelperText sx={{ textAlign: "center", mt: -2 }} error>
                  {passwordConfirm}
                </FormHelperText>
                <SubmitButton
                  label={"Suivant"}
                  type={"submit"}
                  href={undefined}
                />
              </form>
            </Box>
            <Typography variant="body2" pb={5}>
              Vous avez déjà un compte ?{" "}
              <Link href="/login">Connectez-vous</Link>
            </Typography>
          </Stack>
        </>
      )}
    </>
  );
};

export default Register;
