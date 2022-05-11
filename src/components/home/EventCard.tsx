import { useState, useEffect, useContext } from "react";
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
import { PartyModeOutlined, PersonSharp } from "@mui/icons-material";
import Food from "../../assets/categories/Food";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Chip, Grid, Link, Stack } from "@mui/material";
import Activity from "../../assets/categories/Activity";
import Free from "../../assets/categories/Free";
import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../common/firebase/config";
import { AuthContext } from "../../contexts/AuthContext";
//import { db } from "../common/firebase/config";
//Now import this
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
  const [userDetails, setUserDetails] = useState<any>({ name: "" });
  const [participants, setParticipants] = useState<any>([{ id: "" }]);
  const { currentUser } = useContext(AuthContext);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [joined, setJoined] = useState(false);
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
      categoryEvent = <Free />;
  }
  function padTo2Digits(num: number) {
    return String(num).padStart(2, "0");
  }

  if (props.data.date) {
    let dateEvent = new Date(props.data.date.seconds * 1000);
    let dateStart = new Date(props.data.dateStart.seconds * 1000);
    let dateEnd = new Date(props.data.dateEnd.seconds * 1000);

    let displayHours =
      padTo2Digits(dateStart.getHours()) +
      ":" +
      padTo2Digits(dateStart.getMinutes()) +
      " à " +
      padTo2Digits(dateEnd.getHours()) +
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

  console.log(joined);

  useEffect(() => {
    if (props.data.author) {
      console.log(userDetails.name);
      if (userDetails.name !== "") {
        setDoc(doc(db, `/events/${props.data.id}/users`, props.data.author), {
          name: userDetails.name,
          timeStamp: serverTimestamp(),
        });
      }

      try {
        onSnapshot(
          collection(db, `events/${props.data.id}/users`),
          (snapshot) => {
            setParticipants(
              snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
          }
        );
      } catch (er) {}
    }
  }, []);
  //show button finish
  useEffect(() => {
    participants.map((participant) => {
      if (participant.id === currentUser.uid) {
        setJoined(true);
      }
    });
  }, [participants]);

  const numbPartcipants = participants.length;
  let full = false;
  if (numbPartcipants === props.data.space && props.data.unlimited === false) {
    full = true;
  }
  //Display Author name
  useEffect(() => {
    if (props.data.author) {
      const docRef = doc(db, `users`, props.data.author);
      try {
        onSnapshot(docRef, (doc) => {
          setUserDetails({ ...doc.data() });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);
  /*Create participants*/
  const handleButton = async (e) => {
    e.preventDefault();
    if (props.data.unlimited || props.data.space >= numbPartcipants) {
      console.log("test");
      await setDoc(doc(db, `/events/${props.data.id}/users`, currentUser.uid), {
        name: props.user.name,
        timeStamp: serverTimestamp(),
      });
    }
  };
  useEffect(() => {
    if (props.data.author === currentUser.uid) {
      setJoined(true);
    }
  }, []);

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
        <Avatar
          sx={{
            backgroundColor: "background.paper",
            width: "30px",
            borderRadius: 0,
          }}
        >
          {categoryEvent}
        </Avatar>
        <Stack flexGrow={1}>
          <Typography variant="h3" sx={{ ml: 1 }} component="div">
            {props.data.title}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 500, ml: 1 }}
            component="div"
          >
            {userDetails.name}
          </Typography>
        </Stack>
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <PersonSharp />
          {props.data.unlimited ? (
            <AllInclusiveIcon fontSize="small" />
          ) : (
            <Typography component="span">
              {numbPartcipants}/{props.data.space}
            </Typography>
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
            {participants.map((participant) => {
              return (
                <Grid item xs={4} sm={4} md={4} key={participant.id}>
                  <Typography variant="body2">{participant.name}</Typography>
                </Grid>
              );
            })}
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
          {props.data.present === "general" ? (
            <Typography gutterBottom component="div" variant="h5">
              {props.data.location}
            </Typography>
          ) : (
            <Link href={props.data.location} target="_blank">
              Lien de la réunion
            </Link>
          )}
        </Stack>
      </CardContent>
      {/*bouton rejoindre*/}
      <CardActions sx={{ justifyContent: "end" }}>
        {joined ? (
          <CheckCircleIcon
            /* color={props.data.present === "home" ? "home" : "primary"} */
            color="primary"
            fontSize="large"
            sx={{ mr: 1.5, mt: -6 }}
          />
        ) : full ? (
          <Chip label="Complet" color={"error"} />
        ) : (
          <Button
            variant="contained"
            size="medium"
            onClick={handleButton}
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
