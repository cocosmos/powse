import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Checkbox from '@mui/material/Checkbox';

{/*importer le compostant Typography/ TextField*/}
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

{/*importer le cssy*/}
import './event.css';

{/*importer le compostant*/}
import Filter from '../components/Filter';

{/*https://libraries.io/npm/mui-segmented-control*/}
import { useState } from 'react';
import SegmentedControl from 'mui-segmented-control';

const Event = () => {
  const [value, setValue] = useState(1);

  return <div>
    <h1>Event</h1>
    <Container maxWidth="sm">
      <Stack spacing={2}>
        <SegmentedControl
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
          />
          {/*composant "filter"*/}
        <Filter/>
        <Stack spacing={2} direction="row">
        {/*label pour le debut*/}
          <TextField id="time" label="Heure de début" type="time" defaultValue="07:30" InputLabelProps={{ shrink: true, }}
          inputProps={{ step: 300, // 5 min
        }}/>
        
          {/*label pour la fin*/}
          <TextField id="time" label="Heure de fin" type="time" defaultValue="07:30" InputLabelProps={{ shrink: true, }}
          inputProps={{
            step: 300, // 5 min
          }}/>
        </Stack>

        {/*label pour le nb de personnes*/}
        <Stack direction='row'>
          <TextField id="nbperso" label="Nombre de personnes" type="number" InputLabelProps={{ shrink: true, }}
          inputProps={{
            step: 300, // 5 min
          }}
          />
          {/*Checkbox*/}
          <Checkbox
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography variant="subtitle1" gutterBottom component="div">
            Ouvert à tous
          </Typography>
        </Stack>

        {/*label pour le lieu*/}
          <TextField fullWidth  id="lieu" label="Lieu" variant="outlined"  />

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
  </div>
};

export default Event;
