import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CompanyField from "../components/common/inputs/CompanyField";

const Choice = () => {
  return (
    <Stack
      spacing={10}
      justifyContent="center"
      height={"100%"}
      textAlign="center"
      alignItems={"center"}
      maxWidth="sm"
      sx={{ margin: "0 auto" }}
    >
      <Typography variant="h3">
        Salut Julien, plus qu'une étape avant de prendre ta Powse.
      </Typography>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <CompanyField />
        <TextField
          id="entreprise"
          label="Dans quelle entreprise travailles-tu ?"
          type={"text"}
          variant="filled"
          // onChange={handleInput{"email"}}
          fullWidth
          color="secondary"
          sx={{ mb: 3 }}
        />
        <Typography variant="subtitle1">
          Grâce à cette information, nous pourrons te proposer les powses que
          tes collègues ont planifié.
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
        S'inscrire
      </Button>
    </Stack>
  );
};

export default Choice;
