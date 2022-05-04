import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';


const Event = () => {
  return <div>
    <h1>Event</h1>
    <Box sx={{ width: '50%' }}>
      <Stack>
        <Box>
          
        </Box>
        {/*label pour le lieu*/}
        <Box>
          <TextField id="lieu" label="Lieu" variant="outlined" />
        </Box>
        {/*label pour le debut*/}
        <Box>
          <TextField  id="time" 
          label="Heure de début" 
          type="time" 
          defaultValue="07:30" 
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
            sx={{ width: 150 }}
          />
        </Box>
        <Box>
          {/*label pour la fin*/}
          <TextField  id="time" 
          label="Heure de fin" 
          type="time" 
          defaultValue="07:30" 
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
            sx={{ width: 150 }}
          />
        </Box>
        {/*label pour le nb de personnes*/}
        <Box>
          <TextField  id="nbperso" 
          label="Nombre de personnes" 
          type="number" 
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
            sx={{ width: 150 }}
          />
        {/*Checkbox*/}
          <Checkbox
            inputProps={{ 'aria-label': 'controlled' }}
          />
          Ouvert à tous
        </Box>

        {/*label pour la description*/}
        <Box>
          <TextField
          id="description"
          label="Coute description "
          multiline
          maxRows={4}
          />
        </Box>
        <Box>
          <Button variant="contained">VALIDER</Button>
        </Box>
      </Stack>
    </Box>
  </div>
};

export default Event;
