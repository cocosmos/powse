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
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../components/common/firebase/config";
import { AuthContext } from "../contexts/AuthContext";
import EventCard from "../components/home/EventCard";
import "./home.css";
import SubmitButton from "../components/common/inputs/SubmitButton";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [entreprise, setEntreprise] = useState<any>({ entrepriseUid: "" });
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);

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
  }, []);
  // event.entrepriseUid === entreprise.entrepriseUid

  useEffect(() => {
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
  }, [entreprise.entrepriseUid]);

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
  events.sort((a, b) => b.dateStart - a.dateStart);
  // GetData();
  return (
    <>
      <Header />
      {/*debut de la card*/}
      <Stack
        spacing={4}
        sx={{ pb: 10, margin: "0 auto", height: "100%" }}
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
                >
                  <img
                    src="../assets/logo/square/square.svg"
                    alt="Logo Powse"
                    className="logoSpinner"
                    height={200}
                  />
                </Stack>
                <SubmitButton
                  label={"Ajouter un evènement"}
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
