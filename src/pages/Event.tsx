import { Box, Button, Checkbox, Stack, TextField } from "@mui/material";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddData from "../components/AddData";
import { db } from "../firebase";

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
    <>
      <h1>Event</h1>
      <form onSubmit={handleAdd}>
        <Stack spacing={2}>
          {/*label pour le lieu*/}
          <TextField
            fullWidth
            className="text-field"
            id="lieu"
            label="Lieu"
            variant="outlined"
          />
          {/*label pour le debut*/}

          <TextField
            className="text-field"
            id="time"
            label="Heure de début"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            fullWidth
          />

          {/*label pour la fin*/}
          <TextField
            className="text-field"
            id="time"
            label="Heure de fin"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />

          {/*label pour le nb de personnes*/}
          <Box>
            <TextField
              id="nbperso"
              label="Nombre de personnes"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 5, // 5 min
              }}
            />
            {/*Checkbox*/}
            <Checkbox inputProps={{ "aria-label": "controlled" }} />
            Ouvert à tous
          </Box>

          {/*label pour la description*/}
          <TextField
            className="text-field"
            id="description"
            label="Coute description "
            multiline
            maxRows={4}
          />
          <Button type="submit" variant="contained">
            VALIDER
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default Event;
