import Stack from "@mui/material/Stack";

{
  /*importer tous les icons*/
}
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  FormGroup,
  LinearProgress,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CategoriesHome from "../components/home/CategoriesHome";
import ControlHome from "../components/home/ControlHome";
import { useNavigate } from "react-router-dom";
import { EventType } from "../types/Type";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../components/common/firebase/config";
import { AuthContext } from "../contexts/AuthContext";
import EventCard from "../components/home/EventCard";
import "./home.css";
import SubmitButton from "../components/common/inputs/SubmitButton";
import logo from "../assets/logo/square/square.svg";
import logoPowse from "../assets/logo/logo.svg";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [entreprise, setEntreprise] = useState<any>({ entrepriseUid: "" });
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [home, setHome] = useState({ general: true, home: false });
  const colorHome = home.home ? "home.main" : "primary.main";
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
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
  //Get info of the user
  useEffect(() => {
    const docRef = doc(db, `users`, currentUser.uid);

    onSnapshot(docRef, (doc) => {
      setEntreprise({ ...doc.data() });
    });
  }, []);
  // get events from the correct entreprise
  useEffect(() => {
    if (entreprise.entrepriseUid) {
      const q = query(
        collection(db, "events"),
        where("entrepriseUid", "==", entreprise.entrepriseUid)
      );
      onSnapshot(q, (snapshot) => {
        setEvents(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );

        setLoading(false);
      });
    }
  }, [entreprise.entrepriseUid]);
  //Categorie
  const handleCategorie = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory({
      ...category,
      [event.target.name]: event.target.checked,
    });
  };
  //select only home or general
  const handleHome = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "general") {
      setHome({ ...home, home: false, general: true });
    }
    if (event.target.value === "home") {
      setHome({ ...home, general: false, home: true });
    }
  };
  //go to page event
  function navi() {
    navigate("/event");
  }
  //sort events
  events.sort((a, b) => b.dateStart - a.dateStart);
  return (
    <>
      {matches ? (
        <Box textAlign={"left"} mt={1} mb={2} position="fixed">
          <Link href="/" underline="none">
            <img src={logoPowse} alt="Logo Powse" width={125} />
          </Link>
        </Box>
      ) : (
        <Box
          textAlign={"center"}
          position="fixed"
          justifyContent={"center"}
          alignItems="center"
          display={"flex"}
          sx={{
            backgroundColor: "background.default",
            boxShadow: "1px -4px 20px -8px rgba(87,84,217,0.75)",
            width: "100%",
            zIndex: 999,
            top: 0,
            left: 0,
            right: 0,
            height: 50,
          }}
        >
          <Link href="/" underline="none" width={"100%"}>
            <img src={logoPowse} alt="Logo Powse" width={125} />
          </Link>
        </Box>
      )}
      {/*debut de la card*/}
      <Stack
        spacing={4}
        sx={{ pb: 10, margin: "0 auto", height: "100%", mt: "50px" }}
        maxWidth="md"
      >
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
              right: "75%",
              width: 200,
              // left: 500,
              "> *": {
                mb: 5,
              },
              "label:nth-of-type(-n+3)": {
                width: "100%",
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
        {isLoading ? (
          <Stack
            flexGrow={1}
            height="50vh"
            alignItems="center"
            justifyContent="center"
          >
            <Stack
              sx={{ width: "100%", color: "grey.500", maxWidth: 300 }}
              spacing={2}
              justifyContent="center"
            >
              <LinearProgress color="primary" />
            </Stack>
            <Typography>Chargement...</Typography>
          </Stack>
        ) : (
          <Stack
            spacing={4}
            alignItems="center"
            /*      minHeight={events[0] ? "100%" : "100%"} */
            mb={20}
          >
            {events[0] ? (
              <Stack
                spacing={4}
                sx={{ pb: 10, margin: "0 auto", height: "100%" }}
                maxWidth="md"
                width={"100%"}
                alignItems={"center"}
              >
                {events.map((event: EventType, index) => {
                  if (category.food && event.category === "food") {
                    if (event.present === "home" && home.home) {
                      return (
                        <EventCard
                          key={event.id}
                          data={event}
                          user={entreprise}
                        />
                      );
                    } else if (home.general) {
                      return (
                        <EventCard
                          key={event.id}
                          data={event}
                          user={entreprise}
                        />
                      );
                    }
                  }
                  if (category.activity && event.category === "activity") {
                    if (event.present === "home" && home.home) {
                      return (
                        <EventCard
                          key={event.id}
                          data={event}
                          user={entreprise}
                        />
                      );
                    } else if (home.general) {
                      return (
                        <EventCard
                          key={event.id}
                          data={event}
                          user={entreprise}
                        />
                      );
                    }
                  }
                  if (category.free && event.category === "free") {
                    if (event.present === "home" && home.home) {
                      return (
                        <EventCard
                          key={event.id}
                          data={event}
                          user={entreprise}
                        />
                      );
                    } else if (home.general) {
                      return (
                        <EventCard
                          key={event.id}
                          data={event}
                          user={entreprise}
                        />
                      );
                    }
                  }
                })}
              </Stack>
            ) : (
              <Stack
                flexGrow={1}
                alignItems="center"
                justifyContent="center"
                height={"40vh"}
              >
                <Stack
                  sx={{ width: "100%", color: "grey.500", maxWidth: 200 }}
                  spacing={2}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <img
                    src={logo}
                    alt="Logo Powse"
                    height={200}
                    className="logoSpinner"
                  />
                </Stack>
                <SubmitButton
                  label={"Ajouter un événement"}
                  type={"button"}
                  href={"event"}
                />
              </Stack>
            )}
          </Stack>
        )}
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
