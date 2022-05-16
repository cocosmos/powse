import { Box, FormHelperText, Stack, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo";
import PasswordField from "../components/common/inputs/PasswordField";
import SubmitButton from "../components/common/inputs/SubmitButton";
import { useAuth } from "../contexts/AuthContext";

const ResetPassword = () => {
  const navigate = useNavigate();
  const codeOob = new URLSearchParams(window.location.href).get("oobCode");
  const passwordRef = useRef({ value: "" });
  const { resetPassword } = useAuth();
  const confirmPasswordRef = useRef({ value: "" });
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async (e: any) => {
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        throw new Error("passwordconfirm");
      }
      resetPassword(codeOob, password);
      navigate("/login");
    } catch (err) {
      console.log(err);
      if (err.message === "passwordconfirm") {
        setPasswordConfirm("Les mots de passe ne correspondent pas.");
      } else {
        setPasswordConfirm(
          "Une erreur est survenue veuillez redemander un lien."
        );
      }
    }
  };
  //Get codeOob for reset password
  if (!codeOob) {
    navigate("/");
  }

  return (
    <Stack
      spacing={8}
      justifyContent="center"
      height={"80vh"}
      textAlign="center"
      alignItems={"center"}
      maxWidth="sm"
      sx={{ margin: "0 auto" }}
    >
      <Box component="span" mt={20}>
        <Logo />
      </Box>
      <form onSubmit={handleSubmit}>
        <Typography variant="h1" sx={{ mb: 6 }}>
          Réinitialiser votre mot de passe
        </Typography>
        <Stack spacing={1} sx={{ width: "100%" }}>
          <PasswordField
            passwordRef={passwordRef}
            label={"Créer un mot de passe *"}
            id={"new-password"}
          />
          <PasswordField
            passwordRef={confirmPasswordRef}
            label={"Confirmer le mot de passe *"}
            id={"confirm-password"}
            autoFocus={false}
          />
          <FormHelperText sx={{ textAlign: "center", mt: -2 }} error>
            {passwordConfirm}
          </FormHelperText>
        </Stack>
        <SubmitButton label={"Se connecter"} type={"submit"} href={undefined} />
        <Typography variant="body2" pb={5} pt={5}>
          Redemandez un lien ? <Link href="/forgotpassword">Redemandez</Link>
        </Typography>
      </form>
    </Stack>
  );
};

export default ResetPassword;
