import * as React from "react";
import {
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Stack,
  useTheme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Activity from "../../assets/categories/Activity";
import Free from "../../assets/categories/Free";
import Food from "../../assets/categories/Food";

export default function CategoriesHome({ handleInput, category }) {
  const theme = useTheme();
  const [colorRadioA, setColorRadioA] = useState(
    theme.palette.background.paper
  );
  const [colorRadioB, setColorRadioB] = useState(
    theme.palette.background.paper
  );
  const [colorRadioC, setColorRadioC] = useState(
    theme.palette.background.paper
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInput(e);

    switch (e.target.name) {
      case "food":
        if (e.target.checked) {
          setColorRadioA(theme.palette.background.paper);
        } else {
          setColorRadioA(theme.palette.background.default);
        }
        break;
      case "activity":
        if (e.target.checked) {
          setColorRadioB(theme.palette.background.paper);
        } else {
          setColorRadioB(theme.palette.background.default);
        }
        break;
      case "free":
        if (e.target.checked) {
          setColorRadioC(theme.palette.background.paper);
        } else {
          setColorRadioC(theme.palette.background.default);
        }
        break;
    }
  };

  return (
    //this component allows you to select a single category
    <RadioGroup
      row
      name="category"
      defaultValue="top"
      value={category}
      sx={{ justifyContent: "space-evenly", width: "100%", maxWidth: 500 }}
    >
      {/**element that defines the category: "Pause repas"*/}
      <FormControlLabel
        sx={{ marginTop: "3vh", mr: 1, ml: 1 }}
        value="food"
        control={
          //checkbox according to the user's wishes, this serves as a filter in the "news feed" of the home page
          <Checkbox
            sx={{ display: "none" }}
            checked={category.food}
            onChange={handleChange}
            name="food"
          />
        }
        label={
          <Stack alignItems={"center"}>
            <Stack
              bgcolor={colorRadioA}
              justifyContent={"center"}
              width={"70px"}
              height={"70px"}
              alignItems={"center"}
              borderRadius={3}
            >
              <Food />
            </Stack>
            <Typography variant="subtitle2" color={"primary"}>
              Powse repas
            </Typography>
          </Stack>
        }
        labelPlacement="bottom"
      />
      {/**element that defines the category: "Pause activités"*/}
      <FormControlLabel
        sx={{ marginTop: "3vh", mr: 1, ml: 1 }}
        value="activity"
        control={
          //checkbox according to the user's wishes, this serves as a filter in the "news feed" of the home page
          <Checkbox
            sx={{ display: "none" }}
            checked={category.activity}
            onChange={handleChange}
            name="activity"
          />
        }
        label={
          <Stack alignItems={"center"}>
            <Stack
              bgcolor={colorRadioB}
              justifyContent={"center"}
              width={"70px"}
              height={"70px"}
              alignItems={"center"}
              borderRadius={3}
            >
              <Activity />
            </Stack>
            <Typography variant="subtitle2" color={"primary"}>
              Powse activités
            </Typography>
          </Stack>
        }
        labelPlacement="bottom"
      />
      {/**element that defines the category: "Pause libre"*/}
      <FormControlLabel
        sx={{ marginTop: "3vh", mr: 1, ml: 1 }}
        value="free"
        control={
          //checkbox according to the user's wishes, this serves as a filter in the "news feed" of the home page
          <Checkbox
            sx={{ display: "none" }}
            checked={category.free}
            onChange={handleChange}
            name="free"
          />
        }
        label={
          <Stack alignItems={"center"}>
            <Stack
              bgcolor={colorRadioC}
              justifyContent={"center"}
              width={"70px"}
              height={"70px"}
              alignItems={"center"}
              borderRadius={3}
            >
              <Free />
            </Stack>
            <Typography variant="subtitle2" color={"primary"}>
              Powse libre
            </Typography>
          </Stack>
        }
        labelPlacement="bottom"
      />
    </RadioGroup>
  );
}
