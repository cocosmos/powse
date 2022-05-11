import {
  Box,
  Button,
  Checkbox,
  Container,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../components/common/firebase/config";
import "./Event.css";

{
  /*importer le compostant*/
}
import SegmentedControl from "../components/event/SegmentedControl";
import Header from "../components/common/Header";
import Categories from "../components/event/Categories";
import { EventType } from "../types/Type";
import { AuthContext } from "../contexts/AuthContext";

import './Event.css'
import ControlEvent from "../components/event/ControlEvent";

const Event = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { dispatch, currentUser } = useContext(AuthContext);

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
    id: "",
    author: "",
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
      setValues((preState) => ({
        ...preState,
        unlimited: false,
      }));
      setColorCounter(theme.palette.info.main);
      setColorCheked(theme.palette.background.paper);
    }
  };
  const handleCounter = () => {
    setValues((preState) => ({
      ...preState,
      unlimited: false,
    }));
    setColorCounter(theme.palette.info.main);
    setColorCheked(theme.palette.background.paper);
  };
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (values.category === "") {
      setHelperText("Veuillez selectionner une catégorie.");
      setError(true);
    } else {
      /*  await setDoc(doc(db, `company/${data.company}/users`, currentUser.uid), {
        name: data.name,
        email: data.email,
        timeStamp: serverTimestamp(),
      });
      await updateDoc(doc(db, "users", currentUser.uid), {
        company: data.company,
      }); */

      navigate("/");
      setHelperText("");
      setError(false);
    }
  };

  // height of the TextField
  const height = "90%";

  // magic number which must be set appropriately for height
  const labelOffset = -6;

  // get this from your form library, for instance in
  // react-final-form it's fieldProps.meta.active
  // or provide it yourself - see notes below
  const focused = "";

  
  const colorHome =
    values.present === "home" ? "sucess.contrastText" : "background.paper";
  const colorButton =
    values.present === "home" ? "sucess.main" : "primary.main";
  console.log(colorHome);
  return (
    <>
      <Header />
      
      <Container sx={{ p: 0,}} maxWidth="lg" className="marge-desk">
        <form
          onSubmit={handleSubmit}
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            padding: 0,

          }}
        >
          {/*  STACK PINCIPALE */}
          <Box
            sx={{ display: "flex", width: "100%" }}
            flexWrap="wrap"
            // direction="row" className="main" spacing={2}
          >
            {/* première Stack gauche */}
            <Stack className="stack-left" spacing={2}>
              {/* SegmentedControl */}
              <Box>
                <SegmentedControl
                  present={values.present}
                  handleInput={handleInput("present")}
                />
              </Box>

              {/* Categories */}
              <Box>
                <FormControl
                  error={error}
                  variant="standard"
                  fullWidth
                  sx={{ alignItems: "center", pb: "16px" }}
                >
                  <Categories
                    category={values.category}
                    handleInput={handleInput("category")}
                  />
                  <FormHelperText sx={{ textAlign: "center" }}>
                    {helperText}
                  </FormHelperText>
                </FormControl>

                {/* title */}
                <FormControl
                  /*     sx={{ mb: 3 }} */
                  variant="filled"
                  fullWidth
                  color="primary"
                  required
                >
                  <InputLabel htmlFor="event-title">
                  Titre</InputLabel>
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
              </Box>

              {/* Field date */}
              <Box>
                <TextField
                  id="event-date"
                  label="Date"
                  type={"date"}
                  variant="filled"
                  value={values.date}
                  onChange={handleInput("date")}
                  fullWidth
                  color="primary"
                  /*  sx={{ mb: 3 }} */
                  inputProps={{
                    min: today.toISOString().slice(0, 10), // 5 min
                  }}
                  required
                />
              </Box>
            </Stack>
            {/* FIN de la 1ère stack}

            {/* Heure */}
            {/* deuxième Stack gauche */}
            <Stack className="stack-right" spacing={2} >
              <Stack spacing={2} direction="row" sx={{ width: "100%", mb:3}}>
                {/*label pour le debut*/}
                <TextField
                  id="time"
                  label="Heure de début"
                  type="time"
                  variant="filled"
                  value={values.dateStart}
                  onChange={handleInput("dateStart")}
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      height,
                      ...(!focused && { top: `${labelOffset}px` }),
                    },
                  }}
                  fullWidth
                  required
                  inputProps={{
                    step: 300, // 5 min
                    style: {
                      height,
                    },
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
                  InputLabelProps={{
                    shrink: true,
                    style: {
                      height,
                      ...(!focused && { top: `${labelOffset}px` }),
                    },
                  }}
                  fullWidth
                  required
                  inputProps={{
                    step: 300, // 5 min
                    style: {
                      height,
                    },
                  }}
                />
              </Stack>

              {/*label pour le nb de personnes*/}
              <Stack
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  width="100%"
                  sx={{
                    backgroundColor: "background.paper",
                    borderRadius: 3,
                    p: 2,
                  }}
                >
                  <FormHelperText>Nombre de participants*</FormHelperText>
                  <Stack
                    direction="row"
                    mt={1}
                    flexWrap="wrap"
                    justifyContent={"center"}
                    sx={{ width: "100%" }}
                  >
                    {/*Button Counter*/}
                    <Stack
                      direction="row"
                      position="relative"
                      onClick={handleCounter}
                      sx={{
                        backgroundColor: colorCounter,
                        borderRadius: 32,
                        p: 2,
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
                            space: values.space - 1,
                          }))
                        }
                      >
                        <RemoveIcon fontSize="inherit" />
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
                            space: values.space + 1,
                          }))
                        }
                      >
                        <AddIcon fontSize="inherit" />
                      </IconButton>
                    </Stack>
                    <Box
                      sx={{
                        backgroundColor: colorChecked,
                        borderRadius: 32,
                        p: 1.5,
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
              </Stack>

              {/*label pour le lieu*/}
              <Stack>
                <TextField
                  fullWidth
                  id="event-lieu"
                  label="Lieu du rendez-vous......"
                  variant="filled"
                  onChange={handleInput("location")}
                  required
                />
              </Stack>
              {/*    </Stack> */}
            </Stack>
            {/* FIN de la 2ème stack*/}
          </Box>
          {/* Fin de la Stack principale */}
          {/*  bouton */}
        <Stack sx={{ alignItems: "center", width:"100%" }}>
          <Button
            className="button-alignement"
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            sx={{ borderRadius: 25, textTransform: "unset", mt: 4, p: 1.5 }}
          >
            {" "}
            Valider
          </Button>
        </Stack>
        </form>
        <div style={{ width: "20px", height: "20px" }}></div>
      </Container>
    </>
  );
};
export default Event;
