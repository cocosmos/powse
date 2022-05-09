import Stack from "@mui/material/Stack";

{
  /*importer tous les icons*/
}
import IconButton from "@mui/material/IconButton";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import Header from "../components/common/Header";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  BottomNavigation,
  BottomNavigationAction,
  FormGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  useEffect,
  useState,
} from "react";
import CategoriesHome from "../components/home/CategoriesHome";
import EventCard from "../components/home/EventCard";
import EventCardHome from "../components/home/EventCardHome";
import ControlHome from "../components/home/ControlHome";
import { useNavigate } from "react-router-dom";
import AddData from "../components/AddData";
import GetData from "../components/common/GetData";
import { EventType } from "../types/Type";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { LensTwoTone } from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [events, setEvents] = useState<any>([
    {
      present: "",
      category: "",
      title: "Loading...",
      date: null,
      dateStart: null,
      dateEnd: null,
      space: null,
      unlimited: false,
      location: "",
      id: "",
    },
  ]);
  const [participants, setParticipants] = useState<any>([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "events"), (snapshot) =>
        setEvents(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      ),

    []
  );
  //let participants = [];
  useEffect(() => {
    if (events[0].present) {
      events.map((event: EventType, index) => {
        onSnapshot(collection(db, `events/${event.id}/users`), (snapshot) => {
          setParticipants((oldArray) => [...oldArray, snapshot.docs.length]);

          //participants.push(snapshot.docs.length);
        });
      });
    }
  }, []);
  console.log(participants);
  /* useEffect(() => {
    events.map((event: EventType) => {
      onSnapshot(
        collection(db, `events/${event.id}/users`),
        (snapshot) => console.log(snapshot.docs.length)
        /*  setEvents(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        ) */
  /*   );
    });
  }, []); */

  const [category, setCategory] = useState({
    food: true,
    activity: true,
    free: true,
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({
      ...category,
      [event.target.name]: event.target.checked,
    });
  };
  function navi() {
    navigate("/event");
  }
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  // GetData();
  return (
    <>
      <Header />
      {/*debut de la card*/}
      <Stack spacing={4} sx={{ pb: 10, margin: "0 auto" }} maxWidth="md">
        <ControlHome />
        {matches ? (
          <FormGroup
            defaultValue="top"
            sx={{
              flexWrap: "nowrap",
              justifyContent: "center",
              position: "fixed",
              zIndex: 0,
              top: 0,
              bottom: 0,
              right: 900,
              left: 0,
              "> *": {
                mb: 5,
              },
            }}
          >
            <CategoriesHome handleInput={handleInput} category={category} />
          </FormGroup>
        ) : (
          <FormGroup
            row
            defaultValue="top"
            sx={{ flexWrap: "nowrap", justifyContent: "center" }}
          >
            <CategoriesHome handleInput={handleInput} category={category} />
          </FormGroup>
        )}
        <Stack spacing={4} alignItems="center">
          {events.map((event: EventType, index) => (
            <EventCard
              key={event.id}
              data={event}
              participants={participants[index]}
            />
          ))}
        </Stack>
      </Stack>
      {matches ? (
        <IconButton
          onClick={navi}
          sx={{
            position: "fixed",
            bottom: "10%",
            // left: 0,
            right: "10%",
            //height: 100,
          }}
        >
          <AddCircleIcon
            color="primary"
            sx={{
              width: 70,
              height: 70,
            }}
          />
        </IconButton>
      ) : (
        <BottomNavigation
          sx={{
            backgroundColor: "background.default",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: 70,
            boxShadow: "1px -4px 20px -8px rgba(87,84,217,0.75)",
          }}
        >
          <BottomNavigationAction
            label="Add events"
            onClick={navi}
            icon={
              <AddCircleIcon
                color="primary"
                sx={{
                  width: 60,
                  height: 60,
                }}
              />
            }
          />
        </BottomNavigation>
      )}
    </>
  );
};

export default Home;
