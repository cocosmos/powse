import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.svg";

const Error = () => {
  const navigate = useNavigate();

  function navi() {
    navigate("/");
  }
  return (
    <Stack
      spacing={10}
      sx={{
        justifyContent: "center",
        flexWrap: "wrap",
        height: "100%",
        textAlign: "center",
        alignContent: "center",
        alignItems: "center",
        maxWidth: "sm",
        margin: "0 auto",
      }}
    >
      <img src={logo} alt="loading" width={300} />

      <Typography variant="h1" sx={{ width: "100%" }}>
        Error 404
      </Typography>

      <Button onClick={navi} variant="contained" sx={{ mt: 10 }} size="large">
        Go back Home
      </Button>
    </Stack>
  );
};

export default Error;
