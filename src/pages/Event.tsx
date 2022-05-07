import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddData from "../components/AddData";
import { db } from "../firebase";

{
  /*importer le cssy*/
}
import "./event.css";

{
  /*importer le compostant*/
}
import Filter from "../components/Filter";
import SegmentedControl from "../components/SegmentedControl";
import Header from "../components/Header";
import Categories from "../components/Categories";
import { display } from "@mui/system";

interface Event {
  title: string;
  date: Date;
  email: string;
}

const Event = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [alignment, setAlignment] = useState("number");
  const [count, setCount] = useState(1);
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "users"), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };
  const [values, setValues] = useState<Event>({
    title: "",
    date: null,
    email: "",
  });
  const handleInput =
    (prop: keyof Event) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  console.log(count);
  return (
    <>
      <Header />
      <Stack
        justifyContent="center"
        //height={"100%"}
        textAlign="center"
        alignItems={"center"}
        spacing={2}
      >
        <SegmentedControl />
        <Categories />

        <FormControl
          sx={{ mb: 3 }}
          variant="filled"
          fullWidth
          color="secondary"
        >
          <InputLabel htmlFor="event-title">Titre</InputLabel>
          <FilledInput
            id="event-title"
            inputProps={{ maxLength: 40 }}
            onChange={handleInput("title")}
            endAdornment={
              <InputAdornment position="end">
                {values["title"].length}/40
              </InputAdornment>
            }
          />
        </FormControl>
        <TextField
          id="event-date"
          label="Date"
          type={"date"}
          variant="filled"
          onChange={handleInput("email")}
          fullWidth
          color="secondary"
          sx={{ mb: 3 }}
          focused
        />
        <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
          {/*label pour le debut*/}
          <TextField
            id="time"
            label="Heure de début"
            type="time"
            variant="filled"
            defaultValue="07:30"
            InputLabelProps={{ shrink: true }}
            fullWidth
            inputProps={{
              step: 300, // 5 min
            }}
          />

          {/*label pour la fin*/}
          <TextField
            id="time"
            label="Heure de fin"
            type="time"
            variant="filled"
            defaultValue="07:30"
            InputLabelProps={{ shrink: true }}
            fullWidth
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </Stack>

        {/*label pour le nb de personnes*/}
        <Box
          width="100%"
          sx={{ backgroundColor: "background.paper", borderRadius: 3, p: 2 }}
        >
          <FormHelperText>Nombre de participants</FormHelperText>
          <Stack direction="row" mt={1}>
            <Stack
              direction="row"
              position="relative"
              sx={{
                backgroundColor: "#DED1F4",
                borderRadius: 32,
                p: 2.5,
                width: "50%",
                textAlign: "center",
              }}
            >
              <IconButton
                size="small"
                onClick={() => setCount((count) => count + 1)}
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
              <TextField
                id="event-people"
                variant="standard"
                type={"number"}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                inputProps={{
                  min: 1,
                  max: 999,
                  style: { textAlign: "center" },
                }}
              />
              <IconButton
                size="small"
                onClick={() => setCount((count) => count - 1)}
              >
                <RemoveIcon fontSize="inherit" />
              </IconButton>
            </Stack>

            <FormControlLabel
              control={
                <Checkbox
                  sx={{ display: "none" }}
                  onClick={() => setCount(999)}
                />
              }
              label="Illimité"
              sx={{ width: "50%", justifyContent: "center", ml: 2 }}
            />
          </Stack>
        </Box>

        {/*label pour le lieu*/}
        <TextField
          fullWidth
          id="event-lieu"
          label="Lieu du rendez-vous"
          variant="filled"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ borderRadius: 25, textTransform: "unset", mt: 4 }}
          fullWidth
          size="large"
        >
          Valider
        </Button>
      </Stack>
    </>
  );
};
export default Event;
