import { Stack } from "@mui/material";
import { SignupForm } from "../components/SignupForm";

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
