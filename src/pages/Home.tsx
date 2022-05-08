import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

{
  /*pour l'élément card*/
}
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

{
  /*importer le compostant Typography*/
}
import Typography from "@mui/material/Typography";

{
  /*importer tous les icons*/
}
import IconButton from "@mui/material/IconButton";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import FmdGoodSharpIcon from "@mui/icons-material/FmdGoodSharp";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import Header from "../components/Header";
import RecipeReviewCard from "../components/EventCard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { useState } from "react";
import CategoriesHome from "../components/CategoriesHome";
import Filter from "../components/Filter";
import EventCard from "../components/EventCard";
import EventCardHome from "../components/EventCardHome";
import ControlHome from "../components/ControlHome";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

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

  return (
    <>
      <Header />
      {/*debut de la card*/}
      <Stack spacing={4} sx={{ pb: 10, margin: "0 auto" }} maxWidth="sm">
        <ControlHome />
        <CategoriesHome handleInput={handleInput} category={category} />

        <Stack spacing={4}>
          <EventCard />
          <EventCardHome />
          <EventCardHome />
        </Stack>
      </Stack>
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
    </>
  );
};

export default Home;
