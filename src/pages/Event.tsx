import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import './event.css';


const Event = () => {
  return <div>
    <h1>Event</h1>
      <Stack spacing={2}>
        {/*label pour le lieu*/}
          <TextField fullWidth className="text-field" id="lieu" label="Lieu" variant="outlined"  />
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
            step: 300, // 5 min
          }}
          />
        {/*Checkbox*/}
          <Checkbox
            inputProps={{ 'aria-label': 'controlled' }}
          />
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
          <Button variant="contained">VALIDER</Button>
          </Stack>
  </div>
};

export default Event;
