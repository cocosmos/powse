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
    </Stack>
  );
};

export default Register;
