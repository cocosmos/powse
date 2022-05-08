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
<<<<<<< HEAD

=======
>>>>>>> 23c3f043225b63d0ad818551dcf61ba261e0a385
      <SignupForm />

      <Typography variant="body2">
        Vous avez déjà un compte ?{" "}
        <Link href="/login">Connectez-vous..</Link>
      </Typography>

    </Stack>
  );
};

export default Register;
