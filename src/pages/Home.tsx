import Stack from "@mui/material/Stack";

{
  /*importer tous les icons*/
}
import IconButton from "@mui/material/IconButton";
import Header from "../components/common/Header";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  BottomNavigation,
  BottomNavigationAction,
  FormGroup,
  LinearProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CategoriesHome from "../components/home/CategoriesHome";
import ControlHome from "../components/home/ControlHome";
import { useNavigate } from "react-router-dom";
import { EventType } from "../types/Type";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../components/common/firebase/config";
import { AuthContext } from "../contexts/AuthContext";
import EventCard from "../components/home/EventCard";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [entreprise, setEntreprise] = useState<any>({ entrepriseUid: "" });
  const { currentUser } = useContext(AuthContext);

  const [events, setEvents] = useState<any>([
    {
      present: "test",
      category: "food",
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
  const [category, setCategory] = useState({
    food: true,
    activity: true,
    free: true,
  });
  const [home, setHome] = useState({ general: true, home: false });
  //const [users, setUsers] = useState({ author: "Mipam" });

  const colorHome = home.home ? "home.main" : "primary.main";

  useEffect(() => {
    const docRef = doc(db, `users`, currentUser.uid);
    try {
      onSnapshot(docRef, (doc) => {
        setEntreprise({ ...doc.data() });
      });
    } catch (error) {
      console.log(error);
    }
  }, [currentUser.uid]);

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
  const handleCategorie = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({
      ...category,
      [event.target.name]: event.target.checked,
    });
  };
  const handleHome = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "general") {
      setHome({ ...home, home: false, general: true });
    }
    if (event.target.value === "home") {
      setHome({ ...home, general: false, home: true });
    }
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
        <ControlHome handleHome={handleHome} home={home} />
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
              right: 1079,
              left: 0,
              "> *": {
                mb: 5,
              },
            }}
          >
            <CategoriesHome handleInput={handleCategorie} category={category} />
          </FormGroup>
        ) : (
          <FormGroup
            row
            defaultValue="top"
            sx={{ flexWrap: "nowrap", justifyContent: "center" }}
          >
            <CategoriesHome handleInput={handleCategorie} category={category} />
          </FormGroup>
        )}
        <Stack spacing={4} alignItems="center">
          {events ? (
            events.map((event: EventType, index) => {
              if (
                category.food &&
                event.category === "food" &&
                event.entrepriseUid === entreprise.entrepriseUid
              ) {
                if (event.present === "home" && home.home) {
                  return (
                    <EventCard key={event.id} data={event} user={entreprise} />
                  );
                } else if (home.general) {
                  return (
                    <EventCard key={event.id} data={event} user={entreprise} />
                  );
                }
              }
              if (
                category.activity &&
                event.category === "activity" &&
                event.entrepriseUid === entreprise.entrepriseUid
              ) {
                if (event.present === "home" && home.home) {
                  return (
                    <EventCard key={event.id} data={event} user={entreprise} />
                  );
                } else if (home.general) {
                  return (
                    <EventCard key={event.id} data={event} user={entreprise} />
                  );
                }
              }
              if (
                category.free &&
                event.category === "free" &&
                event.entrepriseUid === entreprise.entrepriseUid
              ) {
                if (event.present === "home" && home.home) {
                  return (
                    <EventCard key={event.id} data={event} user={entreprise} />
                  );
                } else if (home.general) {
                  return (
                    <EventCard key={event.id} data={event} user={entreprise} />
                  );
                }
              }
            })
          ) : (
            <>
              <Stack
                sx={{ width: "100%", color: "grey.500", maxWidth: 300 }}
                spacing={2}
              >
                <LinearProgress color="primary" />
              </Stack>
              <Typography>Veuillez ajouter un évenement.</Typography>
            </>
          )}
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
                sx={{
                  width: 60,
                  height: 60,
                  color: colorHome,
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
