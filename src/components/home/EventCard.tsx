import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";

import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import { PersonSharp } from "@mui/icons-material";
import Food from "../../assets/categories/Food";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Grid, Stack } from "@mui/material";
import { EventType } from "../../types/Type";
import Activity from "../../assets/categories/Activity";
import Free from "../../assets/categories/Free";
import SubmitButton from "../common/inputs/SubmitButton";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(() => ({
  color: "#000000",
}));

export default function EventCard(props: any) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const joined = false;
  const days = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ];
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  let setdate = { dateEvent: "", dateHour: "", dateEnd: "" };
  const colorHome =
    props.data.present === "home" ? "home.background" : "background.paper";
  const colorButton =
    props.data.present === "home" ? "home.main" : "primary.main";

  let categoryEvent = null;

  switch (props.data.category) {
    case "activity":
      categoryEvent = <Activity />;
      break;
    case "food":
      categoryEvent = <Food />;
      break;
    case "free":
      categoryEvent = <Free />;
      break;
    default:
      categoryEvent = <Free/>;
  }

  if (props.data.date) {
    let dateEvent = new Date(props.data.date.seconds * 1000);
    let dateStart = new Date(props.data.dateStart.seconds * 1000);
    let dateEnd = new Date(props.data.dateEnd.seconds * 1000);

    let displayHours =
      dateStart.getHours() +
      ":" +
      dateStart.getMinutes() +
      " à " +
      dateEnd.getHours() +
      ":" +
      dateEnd.getMinutes();

    let displayDate =
      days[dateEvent.getDay() - 1] +
      ", " +
      dateEvent.getDate() +
      " " +
      months[dateEvent.getMonth()] +
      " " +
      dateEvent.getFullYear();

    setdate = { dateEvent: displayDate, dateHour: displayHours, dateEnd: "" };
  }
  /*   if (props.participants) {
    let numberParticipants = props.participants[0].id;
    console.log(numberParticipants);
  } */

  // console.log(props.participants);

  return (
    <Card
      sx={{
        maxWidth: 640,
        borderRadius: 4,
        width: "100%",
        backgroundColor: colorHome,
      }}
    >
      <Stack
        direction="row"
        sx={{ p: 2, pr: 1, pb: 1 }}
        justifyContent="space-between"
        alignItems={"center"}
        spacing={1.2}
      >
        <Avatar sx={{ backgroundColor: "background.paper", width: "30px", borderRadius:0 }}>
          {categoryEvent}
        </Avatar>
        <Stack flexGrow={1} >
          <Typography sx={{ml:1}} variant="h3">{props.data.title}</Typography>
          <Typography variant="h4" sx={{ fontWeight: 500, ml:1 }} component="div">
            {props.data.author}
          </Typography>
        </Stack>
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <PersonSharp />
          {props.data.unlimited ? (
            <AllInclusiveIcon fontSize="small" />
          ) : (
            <Typography component="span">/{props.data.space}</Typography>
          )}
        </ExpandMore>
      </Stack>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            backgroundColor: colorButton,
            color: "primary.contrastText",
            borderRadius: 4,
          }}
        >
          <Grid container spacing={1} textAlign={"center"}>
            {/*  {props.participants
              ? props.participants.map((element) => {
                  <Grid item xs={4} sm={4} md={4}>
                    <Typography variant="body2">{element.name}</Typography>
                  </Grid>;
                })
              : ""} */}

            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="body2">Julien Rhta</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="body2">Julien Rochta</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      <CardContent sx={{ pb: 1, pt: 1 }}>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <AccessTimeSharpIcon color="disabled" />
          <Stack>
            <Typography component="div" variant="h4">
              {setdate.dateEvent}
            </Typography>
            <Typography component="div" variant="h5">
              {setdate.dateHour}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <FmdGoodOutlinedIcon color="disabled" />
          <Typography gutterBottom component="div" variant="h5">
            {props.data.location}
          </Typography>
        </Stack>
      </CardContent>
      {/*bouton rejoindre*/}
      <CardActions sx={{ justifyContent: "end" }}>
        {joined ? (
          <CheckCircleIcon
            color="primary"
            fontSize="large"
            sx={{ mr: 1.5, mt: -6, backgroundColor: colorButton }}
          />
        ) : (
          <Button
            type="submit"
            variant="contained"
            size="medium"
            sx={{
              borderRadius: 25,
              textTransform: "unset",
              pr: 4,
              pl: 4,
              backgroundColor: colorButton,
            }}
          >
            Rejoindre
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
