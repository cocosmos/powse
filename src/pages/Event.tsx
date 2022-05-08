<<<<<<< HEAD
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
  useTheme,
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
import { EventType } from "../types/Type";
import getPaletteMode from "../theme/getPaletteMode";

const Event = () => {
  const theme = useTheme();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [colorChecked, setColorCheked] = useState(
    theme.palette.background.paper
  );
  const [colorCounter, setColorCounter] = useState(theme.palette.info.main);

  /*const handleAdd = async (e) => {
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
  };*/

  /*Display correct date and hours*/
  function padTo2Digits(num: number) {
    return String(num).padStart(2, "0");
  }
  const today = new Date();
  const dateStart =
    padTo2Digits(today.getHours()) + ":" + padTo2Digits(today.getMinutes());
  const newDate = new Date(Date.now() + 900000);
  const dateEnd =
    padTo2Digits(newDate.getHours()) + ":" + padTo2Digits(newDate.getMinutes());

  const [values, setValues] = useState<EventType>({
    present: "general",
    category: "",
    title: "",
    date: today.toISOString().slice(0, 10),
    dateStart: dateStart,
    dateEnd: dateEnd,
    space: 5,
    unlimited: false,
    location: "",
  });

  const handleInput =
    (prop: keyof EventType) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
      setHelperText("");
      setError(false);
    };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked === true) {
      setValues((prevState) => ({
        ...prevState,
        unlimited: true,
        space: 1,
      }));
      setColorCheked(theme.palette.info.main);
      setColorCounter(theme.palette.background.paper);
    } else {
      setValues((prevState) => ({
        ...prevState,
        unlimited: false,
        space: 5,
      }));
      setColorCounter(theme.palette.info.main);
      setColorCheked(theme.palette.background.paper);
    }
  };
  const handleCounter = () => {
    setValues((prevState) => ({
      ...prevState,
      unlimited: false,
      space: 5,
    }));
    setColorCounter(theme.palette.info.main);
    setColorCheked(theme.palette.background.paper);
  };
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (values.category === "") {
      setHelperText("Veuillez selectionner une catégorie.");
      setError(true);
    } else {
      console.log(values);
      setHelperText("");
      setError(false);
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <Stack
          //height={"100%"}
          textAlign="center"
          alignItems={"center"}
          spacing={3}
        >
          <SegmentedControl
            present={values.present}
            handleInput={handleInput("present")}
          />
          <FormControl sx={{ m: 3 }} error={error} variant="standard">
            <Categories
              category={values.category}
              handleInput={handleInput("category")}
            />
            <FormHelperText sx={{ textAlign: "center" }}>
              {helperText}
            </FormHelperText>
          </FormControl>
          <FormControl
            sx={{ mb: 3 }}
            variant="filled"
            fullWidth
            color="primary"
            required
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
            value={values.date}
            onChange={handleInput("date")}
            fullWidth
            color="primary"
            sx={{ mb: 3 }}
            required
          />
          <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
            {/*label pour le debut*/}
            <TextField
              id="time"
              label="Heure de début"
              type="time"
              variant="filled"
              value={values.dateStart}
              onChange={handleInput("dateStart")}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
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
              value={values.dateEnd}
              onChange={handleInput("dateEnd")}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </Stack>

          {/*label pour le nb de personnes*/}
          <Box
            width="100%"
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 3,
              p: 2,
            }}
          >
            <FormHelperText>Nombre de participants*</FormHelperText>
            <Stack direction="row" mt={1} flexWrap="wrap">
              {/*Button Counter*/}
              <Stack
                direction="row"
                position="relative"
                onClick={handleCounter}
                sx={{
                  backgroundColor: colorCounter,
                  borderRadius: 32,
                  p: 2.5,
                  width: "50%",
                  textAlign: "center",
                  minWidth: "140px",
                  maxWidth: "165px",
                }}
              >
                <IconButton
                  size="small"
                  onClick={() =>
                    setValues((prevState) => ({
                      ...prevState,
                      space: values.space + 1,
                    }))
                  }
                >
                  <AddIcon fontSize="inherit" />
                </IconButton>
                <TextField
                  id="event-people"
                  variant="standard"
                  type={"number"}
                  value={values.space}
                  onChange={handleInput("space")}
                  sx={{ justifyContent: "center" }}
                  required
                  inputProps={{
                    min: 1,
                    max: 999,
                    style: { textAlign: "center" },
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() =>
                    setValues((prevState) => ({
                      ...prevState,
                      space: values.space - 1,
                    }))
                  }
                >
                  <RemoveIcon fontSize="inherit" />
                </IconButton>
              </Stack>

              <Box
                sx={{
                  backgroundColor: colorChecked,
                  borderRadius: 32,
                  p: 2.5,
                  width: "50%",
                  textAlign: "center",
                  minWidth: "140px",
                  maxWidth: "165px",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      /* sx={{ display: "none" }} */
                      onChange={handleCheckbox}
                      checked={values.unlimited}
                    />
                  }
                  label="Illimité"
                  sx={{ justifyContent: "center", ml: 2, flexGrow: 1 }}
                />
              </Box>
            </Stack>
          </Box>

          {/*label pour le lieu*/}

          <TextField
            fullWidth
            id="event-lieu"
            label="Lieu du rendez-vous"
            variant="filled"
            onChange={handleInput("location")}
            required
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
      </form>
    </>
  );
};
export default Event;
=======
import {
  Box,
  Button,
  Checkbox,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
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

const Event = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
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
  return (
    <Container maxWidth="sm">
      <Stack spacing={2}>
        {/* <SegmentedControl
            color="primary"
            options={[
              {
                label: 'Présentiel',
                value: 1
              },
              {
                label: 'Télé-travail',
                value: 2
              }
            ]
          }
          value={value}
          onChange={setValue}
          /> */}

        <Stack spacing={2} direction="row">
          {/*label pour le debut*/}
          <TextField
            id="time"
            label="Heure de début"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              step: 300, // 5 min
            }}
          />

          {/*label pour la fin*/}
          <TextField
            id="time"
            label="Heure de fin"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </Stack>

        {/*label pour le nb de personnes*/}
        <Stack direction="row">
          <TextField
            id="nbperso"
            label="Nombre de personnes"
            type="number"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          {/*Checkbox*/}
          <Checkbox inputProps={{ "aria-label": "controlled" }} />
          <Typography variant="subtitle1" gutterBottom component="div">
            Ouvert à tous
          </Typography>
        </Stack>

        {/*label pour le lieu*/}
        <TextField fullWidth id="lieu" label="Lieu" variant="outlined" />

        {/*label pour la description*/}
        <TextField
          id="description"
          label="Coute description "
          multiline
          maxRows={4}
        />
        <Button variant="contained">VALIDER</Button>
      </Stack>
    </Container>
  );
};
export default Event;
>>>>>>> integration
