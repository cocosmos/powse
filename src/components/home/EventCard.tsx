import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import FmdGoodSharpIcon from "@mui/icons-material/FmdGoodSharp";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PersonSharp } from "@mui/icons-material";
import Food from "../../assets/categories/Food";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Grid, Stack } from "@mui/material";
import { EventType } from "../../types/Type";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  color: "#000000",
  // transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  //marginLeft: "auto",
  /* transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),*/
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

  return (
    <Card sx={{ maxWidth: 640, borderRadius: 4, width: "100%" }}>
      <Stack
        direction="row"
        sx={{ p: 2, pr: 1, pb: 1 }}
        justifyContent="space-between"
        alignItems={"center"}
        spacing={1.2}
      >
        <Avatar sx={{ backgroundColor: "background.paper", width: "30px" }}>
          <Food />
        </Avatar>
        <Stack flexGrow={1}>
          <Typography>{props.data.title}</Typography>
          <Typography sx={{ fontWeight: 500 }} component="div">
            {props.data.author}
          </Typography>
        </Stack>
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <PersonSharp />
          {props.data.unlimited ? (
            <AllInclusiveIcon fontSize="small" />
          ) : (
            <Typography component="span">0/{props.data.space}</Typography>
          )}
        </ExpandMore>
      </Stack>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 4,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="body2">Julien Rochta</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="body2">Julien Rhta</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="body2">Julien Rochta</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="body2">Julien Rochta</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="body2">Julien Rochta</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="body2">Julien Rochta</Typography>
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
            <Typography component="div">{setdate.dateEvent}</Typography>
            <Typography component="div">{setdate.dateHour}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <FmdGoodOutlinedIcon color="disabled" />
          <Typography gutterBottom component="div">
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
            sx={{ mr: 1.5, mt: -6 }}
          />
        ) : (
          <Button
            type="submit"
            variant="contained"
            size="medium"
            sx={{ borderRadius: 25, textTransform: "unset", pr: 4, pl: 4 }}
          >
            Rejoindre
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
