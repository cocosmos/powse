import {
  Box,
  Button,
  Checkbox,
  Container,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Event.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

{
  /*importer le compostant*/
}
import SegmentedControl from "../components/event/SegmentedControl";
import Header from "../components/common/Header";
import Categories from "../components/event/Categories";
import { EventType } from "../types/Type";
import { AuthContext } from "../contexts/AuthContext";
import frLocale from "date-fns/locale/fr";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "../components/common/firebase/config";
import {
  DesktopDatePicker,
  MobileDatePicker,
  MobileTimePicker,
} from "@mui/x-date-pickers";

const Event = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [colorChecked, setColorCheked] = useState(
    theme.palette.background.paper
  );

  const [colorCounter, setColorCounter] = useState(theme.palette.info.main);
  const { dispatch, currentUser } = useContext(AuthContext);
  const [entreprise, setEntreprise] = useState<any>({ entrepriseUid: "" });
  const [fulldate, setFulldate] = useState<Date | null>(new Date(Date.now()));
  const [endDate, setEndDate] = useState<Date | null>(
    new Date(Date.now() + 900000)
  );
  const [startDate, setStartDate] = useState<Date | null>(new Date(Date.now()));

  const [values, setValues] = useState<EventType>({
    present: "general",
    category: "",
    title: "",
    date: new Date(),
    dateStart: new Date(),
    dateEnd: new Date(),
    space: 5,
    entrepriseUid: "",
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

  //Date
  const tzoffset = new Date().getTimezoneOffset() * 60000;

  const dateFullString = new Date(fulldate.getTime() - tzoffset)
    .toISOString()
    .slice(0, -1);

  const dateTimeStartString = new Date(startDate.getTime() - tzoffset)
    .toISOString()
    .slice(0, -1);
  const dateTimeEndString = new Date(endDate.getTime() - tzoffset)
    .toISOString()
    .slice(0, -1);

  const datetimeStart =
    dateFullString.substr(0, 11) + dateTimeStartString.substr(11);
  const datetimeEnd =
    dateFullString.substr(0, 11) + dateTimeEndString.substr(11);
  const date = Timestamp.fromDate(fulldate).toDate();
  const dateStartFi = Timestamp.fromDate(new Date(datetimeStart)).toDate();
  const dateEndFi = Timestamp.fromDate(new Date(datetimeEnd)).toDate();
  //end date
  useEffect(() => {
    const docRef = doc(db, `users`, currentUser.uid);
    try {
      onSnapshot(docRef, (doc) => {
        setEntreprise({ ...doc.data() });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (values.category === "") {
      setHelperText("Veuillez selectionner une catégorie.");
      setError(true);
    } else {
      await addDoc(collection(db, "events"), {
        present: values.present,
        category: values.category,
        title: values.title,
        date: date,
        dateStart: dateStartFi,
        dateEnd: dateEndFi,
        space: values.space,
        unlimited: values.unlimited,
        location: values.location,
        author: currentUser.uid,
        entrepriseUid: entreprise.entrepriseUid,
      });
      navigate("/");
      setHelperText("");
      setError(false);
    }
  };

  const backgroundBox =
    values.present === "general"
      ? "slider.backgroundPri"
      : "slider.backgroundSec";
  const backgroundButton =
    values.present === "general" ? "slider.primary" : "slider.secondary";

  const colorButton = values.present === "home" ? "home.main" : "primary.main";
  const focused = "";
  const colorHome =
    values.present === "home" ? "home.contrastText" : "background.paper";
  const labelRdv =
    values.present === "home"
      ? "Lien de la réunion..."
      : "Lieu du rendez-vous...";

  // height of the TextField
  const height = "70%";

  // magic number which must be set appropriately for height
  const labelOffset = -6;

  // get this from your form library, for instance in
  // react-final-form it's fieldProps.meta.active
  // or provide it yourself - see notes below

  return (
    <Box height={"90vh"}>
      <Header />
      <Container sx={{ p: 0, mt: 5, height: "80%" }} maxWidth="lg">
        <form
          onSubmit={handleSubmit}
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            padding: 0,
            alignContent: "center",
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
              </Box>

              {/* Field date */}
              <Box>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={frLocale}
                >
                  <MobileDatePicker
                    mask={"__/__/____"}
                    label="Date"
                    value={fulldate}
                    minDate={new Date(Date.now())}
                    onChange={(newValue) => {
                      setFulldate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        fullWidth
                        color="primary"
                        required
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Stack>
            {/* FIN de la 1ère stack}

            {/* Heure */}
            {/* deuxième Stack gauche */}
            <Stack className="stack-right" spacing={2}>
              <Stack spacing={2} direction="row" sx={{ width: "100%" }}>
                {/*label pour le debut*/}
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={frLocale}
                >
                  <MobileTimePicker
                    label="Heure de début"
                    value={startDate}
                    /*  minTime={dateStartFi} */
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        required
                        variant="filled"
                      />
                    )}
                  />
                </LocalizationProvider>

                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  locale={frLocale}
                >
                  <MobileTimePicker
                    label="Heure de fin"
                    value={endDate}
                    minTime={dateStartFi}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        required
                        variant="filled"
                      />
                    )}
                  />
                </LocalizationProvider>
                {/*label pour la fin*/}
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
                    padding: "0.8rem",
                    paddingTop: "1rem",
                  }}
                >
                  <FormHelperText>Nombre de participants*</FormHelperText>
                  <Stack
                    direction="row"
                    mt={1}
                    className="marge-desk"
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
                        width: "50%",
                        textAlign: "center",
                        minWidth: "140px",
                        maxWidth: "165px",
                        p: 2,
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
                  label={labelRdv}
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
          <Stack sx={{ alignItems: "center", width: "100%" }}>
            <Button
              className="button-alignement"
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              sx={{
                borderRadius: 25,
                textTransform: "unset",
                mt: 4,
                p: 1.5,
                backgroundColor: colorButton,
              }}
            >
              {" "}
              Valider
            </Button>
          </Stack>
        </form>
        {/*  <div style={{ width: "20px", height: "20px" }}></div> */}
      </Container>
    </Box>
  );
};
export default Event;
