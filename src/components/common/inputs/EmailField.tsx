import { TextField } from "@mui/material";

const EmailField = ({ emailRef }) => {
  return (
    <TextField
      id="email"
      label="Adresse e-mail"
      type={"email"}
      variant="filled"
      //  onChange={handleInput("email")}
      // value={values.email}
      inputRef={emailRef}
      required
      fullWidth
      color="secondary"
      sx={{ mb: 3 }}
    />
  );
};

export default EmailField;
