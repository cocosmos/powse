import { Box, FormHelperText, Link, Stack, Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import Logo from "../assets/Logo";
import EmailField from "../components/common/inputs/EmailField";
import PasswordField from "../components/common/inputs/PasswordField";
import SubmitButton from "../components/common/inputs/SubmitButton";
import { AuthContext, useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef({ value: "" });
  const passwordRef = useRef({ value: "" });
  const { login } = useAuth();
  const { dispatch } = useContext(AuthContext);
  const [emailExist, setEmailExist] = useState(null);
  const [wrongPassword, setWrongPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setEmailExist(null);
    setWrongPassword("");
    if (email) {
      await login(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch({ type: "LOGIN", payload: user });
          navigate("/");
        })
        .catch((error) => {
          //error if email not registred
          if (error.message === "Firebase: Error (auth/user-not-found).") {
            setEmailExist(
              <Typography variant="caption">
                Cet email n'est pas enregistré.{" "}
                <Link href="/register">S'enregistrer</Link>
              </Typography>
            );
          } else if (
            error.message === "Firebase: Error (auth/wrong-password)."
          ) {
            setWrongPassword("Mauvais mot de passe.");
          }
        });
    }
  };

  return (
    <Stack
      spacing={10}
      justifyContent="center"
      height={"100%"}
      textAlign="center"
      alignItems={"center"}
      maxWidth="sm"
      sx={{ margin: "0 auto" }}
    >
      {/*logo*/}
      <Box component="span" mt={20}>
        <Logo />
      </Box>

      <Box flexGrow={1} display={"flex"} mt={5} alignItems="flex-start">
        <form onSubmit={handleLogin}>
          <EmailField emailRef={emailRef} />
          <FormHelperText sx={{ textAlign: "center", mb: 2, mt: -2 }} error>
            {emailExist}
          </FormHelperText>
          <PasswordField passwordRef={passwordRef} />
          <FormHelperText sx={{ textAlign: "center", mt: -2, mb: 4 }} error>
            {wrongPassword}
          </FormHelperText>
          <Link href="/forgotpassword" underline="hover">
            Mot de passe oublié ?
          </Link>

          <SubmitButton
            label={"Se connecter"}
            type={"submit"}
            href={undefined}
          />
        </form>
      </Box>

      <Typography variant="body2">
        Vous n’avez pas encore de compte ?{" "}
        <Link href="/register">Inscrivez-vous.</Link>
      </Typography>
    </Stack>
  );
};

export default Login;
