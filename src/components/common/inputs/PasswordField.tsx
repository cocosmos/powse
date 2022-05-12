import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { useState } from "react";

const PasswordField = ({
  passwordRef,
  id = "password",
  label = "Mot de passe*",
  autoFocus = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDown = (e) => {
    e.preventDefault();
  };
  return (
    <FormControl variant="filled" fullWidth color="secondary" sx={{ mb: 4 }}>
      <InputLabel htmlFor="passwordLogin">{label}</InputLabel>
      <FilledInput
        autoFocus={autoFocus}
        required
        id={id}
        type={showPassword ? "text" : "password"}
        inputRef={passwordRef}
        autoComplete="on"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClick}
              onMouseDown={handleMouseDown}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default PasswordField;
