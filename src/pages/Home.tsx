import React from 'react'
import { styled } from '@mui/material/styles';
{/*pour l'élément card*/}
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

{/*importer le compostant Typography*/}
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';

{/*importer tous les icons*/}
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import FmdGoodSharpIcon from '@mui/icons-material/FmdGoodSharp';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

{/*importer le cssy*/}
import './home.css';
{/*importer le compostant*/}
import Filter from '../components/Filter';

import { useState } from 'react';
import SegmentedControl from 'mui-segmented-control';

{/*début script*/}
const Home = () => {
  const [value, setValue] = useState(1);
  return ( <div>
  <h1>Home</h1> 
  {/*wapper*/}
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
      </Stack>
      {/*debut de la card*/}
      <Card className="c-break">
        <CardContent>
          {/*haut de la carte avec les participants*/}
          <CardHeader
            action={
              <IconButton aria-label="participant">
                <PersonOutlineOutlined/>
              </IconButton>
            }
          />    
           {/*description de la pause avec le nom, l'instigateur, la date, l'heure et le lieu (avec les icons)*/}        
          <Stack  direction="row" spacing={2} >
            <WorkspacesIcon/>
            <Stack>
              <Typography className='left' component="div">
                Midi au thaï
              </Typography>
              <Typography className='left' gutterBottom component="div">
                Julien Rochat
              </Typography>
            </Stack>
          </Stack >
          <Stack  direction="row" spacing={2} >
            <AccessTimeSharpIcon/>
            <Stack>
              <Typography className='left' component="div">
                jeudi, 5 mai 2022
              </Typography>
              <Typography className='left' gutterBottom component="div" >
                13:00 à 14:00
              </Typography>
            </Stack>
          </Stack >
          <Stack  direction="row"  spacing={2}>
            <FmdGoodSharpIcon/>
            <Typography className='left' gutterBottom component="div">
              Mama Thaï Genève
            </Typography>
          </Stack >
        </CardContent>

        {/*bouton rejoindre*/}   
          <CardActions disableSpacing className='right'>
            <Button className="button" variant="contained">Rejoindre</Button>
          </CardActions>
      </Card>
    </Container>
  </div> 
    );
}

export default Home;
