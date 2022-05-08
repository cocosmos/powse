import {
  Box,
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  makeStyles,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface State {
  password: string;
  showPassword: boolean;
  email: string;
}

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  /*Password Shows*/

  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
    email: "",
  });

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

  return (
    <Box flexGrow={1} display={"flex"} mt={5} alignItems="flex-start">
      <form onSubmit={handleLogin}>
        <TextField
          id="emailLogin"
          label="Adresse e-mail"
          type={"email"}
          variant="filled"
          onChange={handleInput("email")}
          fullWidth
          color="secondary"
          sx={{ mb: 3 }}
        />
        <FormControl
          variant="filled"
          fullWidth
          color="secondary"
          sx={{ mb: 4 }}
        >
          <InputLabel htmlFor="passwordLogin">Mot de passe</InputLabel>
          <FilledInput
            id="passwordLogin"
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
        </FormControl>
        <Link href="/forgotpassword" underline="hover">
          Mot de passe oublié ?
        </Link>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ borderRadius: 25, textTransform: "unset", mt: 4 }}
          fullWidth
          size="large"
        >
          Se connecter
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
