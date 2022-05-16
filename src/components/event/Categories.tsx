import {
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  useTheme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Activity from "../../assets/categories/Activity";
import Free from "../../assets/categories/Free";
import Food from "../../assets/categories/Food";

//add site styling
export default function Categories({ handleInput, category }) {
  const theme = useTheme();
  const [colorRadioA, setColorRadioA] = useState(
    theme.palette.background.default
  );
  const [colorRadioB, setColorRadioB] = useState(
    theme.palette.background.default
  );
  const [colorRadioC, setColorRadioC] = useState(
    theme.palette.background.default
  );
  //exporting foods, activities and free categories with the right style
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInput(e);

    switch (e.target.value) {
      case "food":
        setColorRadioA(theme.palette.background.paper);
        setColorRadioB(theme.palette.background.default);
        setColorRadioC(theme.palette.background.default);

        break;
      case "activity":
        setColorRadioB(theme.palette.background.paper);
        setColorRadioA(theme.palette.background.default);
        setColorRadioC(theme.palette.background.default);

        break;
      case "free":
        setColorRadioC(theme.palette.background.paper);
        setColorRadioA(theme.palette.background.default);
        setColorRadioB(theme.palette.background.default);

        break;
      default:
        setColorRadioA(theme.palette.background.default);
        setColorRadioB(theme.palette.background.default);
        setColorRadioC(theme.palette.background.default);
    }
  };

  return (
    //this component allows you to select a single category
    <RadioGroup
      row
      name="category"
      defaultValue="top"
      value={category}
      onChange={handleRadioChange}
      sx={{ flexWrap: "nowrap" }}
    >
      {/**element that defines the category: "Pause repas"*/}
      <FormControlLabel
        value="food"
        control={<Radio sx={{ display: "none" }} />}
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
        value="activity"
        control={<Radio sx={{ display: "none" }} />}
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
        value="free"
        control={<Radio sx={{ display: "none" }} />}
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
