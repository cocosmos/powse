import { useContext } from "react";
import { Box, Link, Stack, Typography } from "@mui/material";
import { SignupForm } from "../components/SignupForm";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
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
      {/*logo*/}
      <SignupForm />
    </Stack>
  );
};

export default Register;
