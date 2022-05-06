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
