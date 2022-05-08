import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { auth, db } from "../firebase";
import { User } from "../types/Type";

interface State {
  password: string;
  showPassword: boolean;
}

const ResetPassword = () => {
  const [data, setData] = useState<User>();
  const { dispatch, currentUser } = useContext(AuthContext);

  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: any) => {
    // console.log(email);
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      /*   await setDoc(doc(db, "company/temp/users", res.user.uid), {
          name: data.name,
          email: data.email,
          timeStamp: serverTimestamp(),
        }); */

      signInWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch({ type: "LOGIN", payload: user });
          console.log(user);
        }
      );
      //navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };
  console.log(currentUser);

  // const handleInput = (e) => {
  //   const id = e.target.id;
  //   const value = e.target.value;

  //   setData({ ...data, [id]: value });
  // };
  /*Password Shows*/

  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
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
  console.log(data);
  console.log(values);

  return (
    <Stack
      spacing={8}
      justifyContent="center"
      height={"100vh"}
      textAlign="center"
      alignItems={"center"}
    >
      <Typography variant="h3">Réinitialiser votre mot de passe</Typography>
      <Stack spacing={1} sx={{ width: "100%" }}>
        <FormControl
          variant="filled"
          fullWidth
          color="secondary"
          sx={{ mb: 3 }}
        >
          <InputLabel htmlFor="passwordLogin">
            Creéer un mot de passe
          </InputLabel>
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
        <FormControl
          variant="filled"
          fullWidth
          color="secondary"
          sx={{ mb: 3 }}
        >
          <InputLabel htmlFor="passwordLogin">
            Confirmer le mot de passe
          </InputLabel>
          <FilledInput
            id="passwordConfirm"
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
    </Stack>
  );
};

export default ResetPassword;
