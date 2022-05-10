import { Password, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { confirmPasswordReset } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../components/common/firebase/config";

interface State {
  password: string;
  showPassword: boolean;
  confirmPassword: string;
  passwordValid: boolean;
  code: string;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
    confirmPassword: "",
    passwordValid: false,
    code: "",
  });

  const handleSubmit = async (e: any) => {
    // console.log(email);
    e.preventDefault();
    if (
      values.password === values.confirmPassword &&
      values.password.length >= 8
    ) {
      try {
        console.log("good");
        confirmPasswordReset(auth, values.code, values.password);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("erroe");
    }
  };
  const codeOob = new URLSearchParams(window.location.href).get("oobCode");

  useEffect(() => {
    setValues({
      ...values,
      code: codeOob,
    });
    if (codeOob === "") {
      navigate("/");
    }
  }, []);

  const handleInput =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  console.log(values);

  return (
    <Stack
      spacing={8}
      justifyContent="center"
      height={"100vh"}
      textAlign="center"
      alignItems={"center"}
      maxWidth="sm"
      sx={{ margin: "0 auto" }}
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Réinitialiser votre mot de passe</Typography>
        <Stack spacing={1} sx={{ width: "100%" }}>
          <FormControl
            variant="filled"
            fullWidth
            color="secondary"
            sx={{ mb: 3 }}
          >
            <InputLabel htmlFor="password">Créer un mot de passe</InputLabel>
            <FilledInput
              id="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleInput("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="my-helper-text">
              Votre mot de passe doit faire minimum 8 charactères.
            </FormHelperText>
          </FormControl>
          <FormControl
            variant="filled"
            fullWidth
            color="secondary"
            sx={{ mb: 3 }}
          >
            <InputLabel htmlFor="passwordConfiirm">
              Confirmer le mot de passe
            </InputLabel>
            <FilledInput
              id="passwordConfirm"
              type={values.showPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={handleInput("confirmPassword")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="my-helper-text">
              Les mots de passe ne correspondent pas.
            </FormHelperText>
          </FormControl>
        </Stack>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ borderRadius: 25, textTransform: "unset", mt: 4, p: 1.5 }}
          fullWidth
        >
          {" "}
          Se connecter
        </Button>
      </form>
    </Stack>
  );
};

export default ResetPassword;
