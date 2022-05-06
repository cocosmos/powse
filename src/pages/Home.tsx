import React from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import FmdGoodSharpIcon from '@mui/icons-material/FmdGoodSharp';



const Home = () => {
  return ( <div>
  <h1>Home</h1> 
  <Container maxWidth="sm">
    <Card>
        <CardMedia
          component="img"
          image="/static/images/cards/paella.jpg"
        />
      <CardHeader
        action={
          <IconButton aria-label="participant">
            <PersonOutlineOutlined/>
          </IconButton>
        }
        title={
          <Stack>
            <Typography variant="h5" gutterBottom component="div">
            Midi au thaï
            </Typography>
            <Typography variant="h6" gutterBottom component="div">
            Julien Rochat
            </Typography>
          </Stack>
          }
      />
      <CardContent>
        <Stack  direction="row" >
            <AccessTimeSharpIcon/>
        </Stack >
        <Stack  direction="row" >
            <FmdGoodSharpIcon/>
        </Stack >
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="contained">Rejoindre</Button>
      </CardActions>
    </Card>
    </Container>
  </div> 
    );
}

export default Home;
