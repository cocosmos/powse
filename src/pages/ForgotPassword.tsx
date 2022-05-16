import { Box, FormHelperText, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import EmailField from "../components/common/inputs/EmailField";
import SubmitButton from "../components/common/inputs/SubmitButton";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../assets/Logo";

const ForgotPassword = () => {
  const emailRef = useRef({ value: "" });
  const { forgotPassword } = useAuth();
  const [emailSent, setEmailSent] = useState(
    "Nous vous enverrons un lien pour réinitialiser votre mot de passe."
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    try {
      await forgotPassword(email);
      setEmailSent(`Un lien vient d'être envoyé à ${email}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Stack
        spacing={10}
        justifyContent="center"
        height={"100%"}
        textAlign="center"
        alignItems={"center"}
        maxWidth="sm"
        sx={{ margin: "0 auto" }}
      >
        <Box component="span" mt={20}>
          <Logo />
        </Box>
        <Typography variant="h1" sx={{ mt: 7, fontSize: 32 }}>
          Mot de passe oublié?
        </Typography>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <EmailField emailRef={emailRef} />
          <FormHelperText sx={{ textAlign: "center", mt: -2 }}>
            <Typography variant="body2">{emailSent}</Typography>
          </FormHelperText>
        </Stack>
        <SubmitButton label={"Envoyer"} type={"submit"} href={undefined} />
      </Stack>
    </form>
  );
};

export default ForgotPassword;
