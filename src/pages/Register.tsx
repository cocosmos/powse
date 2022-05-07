import { useContext } from "react";
import { Box, Link, Stack, Typography } from "@mui/material";
import { SignupForm } from "../components/SignupForm";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  return (
      <Stack
      spacing={10}
      justifyContent="center"
      height={"100%"}
      textAlign="center"
      alignItems={"center"}
    >
      {/*logo*/}
      <SignupForm />

      <Typography variant="body2">
        Vous avez déjà un compte ?{" "}
        <Link href="/login">Connectez-vous..</Link>
      </Typography>

    </Stack>
  );
};

export default Register;
