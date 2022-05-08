import { Button, Stack, TextField, Typography } from "@mui/material";

const ForgotPassword = () => {
  return (
    <Stack
      spacing={10}
      justifyContent="center"
      height={"100%"}
      textAlign="center"
      alignItems={"center"}
    >
      <Typography variant="h3">Mot de passe oublié</Typography>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <TextField
          id="email"
          label="Adresse e-mail"
          type={"email"}
          variant="filled"
          // onChange={handleInput{"email"}}
          fullWidth
          color="secondary"
          sx={{ mb: 3 }}
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
  );
};

export default ForgotPassword;
