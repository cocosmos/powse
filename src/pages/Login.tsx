import { Box, Link, Stack, Typography } from "@mui/material";
import { useContext, useRef } from "react";
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

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);
    // setLoading(true);

    if (email) {
      await login(email, password)
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
          <PasswordField passwordRef={passwordRef} />
          <Link href="/forgotpassword" underline="hover">
            Mot de passe oublié ?
          </Link>
          <SubmitButton label="Se connecter" />
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
