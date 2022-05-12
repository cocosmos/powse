import { TextField } from "@mui/material";

const NameField = ({ nameRef, label }) => {
  return (
    <TextField
      id="name"
      label={label}
      inputRef={nameRef}
      variant="filled"
      type={"text"}
      fullWidth
      color="secondary"
      required
      sx={{ mb: 3 }}
      autoComplete="on"
    />
  );
};

export default NameField;
