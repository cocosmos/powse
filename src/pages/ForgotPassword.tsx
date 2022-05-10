import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { auth } from "../components/common/firebase/config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import ResetPassword from "./ResetPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({
    isAlert: false,
    severity: "info",
    message: "",
    timeout: null,
    location: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await ResetPassword(email);
      setAlert({
        isAlert: false,
        severity: "success",
        message: "reset link has been sent to your email inbox",
        timeout: 8000,
        location: "main",
      });
    } catch (error) {
      setAlert({
        isAlert: true,
        severity: "error",
        message: error.message,
        timeout: 5000,
        location: "modal",
      });
    }
  };

  const ResetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };
  console.log(email);

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
        <Typography variant="h3">Mot de passe oublié</Typography>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <TextField
            id="email"
            label="Adresse e-mail"
            type={"email"}
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            helperText={alert.message}
            color="secondary"
            sx={{ mb: 3 }}
            required
            error={alert.isAlert}
          />
          <Typography variant="subtitle1">
            Nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </Typography>
        </Stack>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ borderRadius: 25, textTransform: "unset", mt: 4, p: 1.5 }}
          fullWidth
        >
          {" "}
          Suivant
        </Button>
      </Stack>
    </form>
  );
};

export default ForgotPassword;
