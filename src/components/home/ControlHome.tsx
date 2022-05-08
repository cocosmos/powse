import {
  Box,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const ControlHome = () => {
  const theme = useTheme();
  const [colorHome, setColorHome] = useState(theme.palette.background.paper);
  const [colorPresent, setColorPresent] = useState(theme.palette.info.main);
  const [indexH, setIndexH] = useState(0);
  const [indexP, setIndexP] = useState(1);

  const handlePresent = (event) => {
    switch (event.target.value) {
      case "general":
        if (event.target.checked) {
          setColorPresent(theme.palette.info.main);
          setColorHome(theme.palette.background.paper);
          setIndexH(0);
          setIndexP(1);
        }
        break;
      case "home":
        if (event.target.checked) {
          setColorHome(theme.palette.info.main);

          setColorPresent(theme.palette.background.paper);
          setIndexP(0);
          setIndexH(1);
        }
        break;
    }
  };

  return (
    <RadioGroup
      row
      name="radioGeneral"
      onChange={handlePresent}
      sx={{
        justifyContent: "center",
        // backgroundColor: "background.paper",
        borderRadius: 32,
      }}
    >
      <FormControlLabel
        value="general"
        control={<Radio sx={{ display: "none" }} />}
        label="Général"
        sx={{
          backgroundColor: colorPresent,
          borderRadius: 32,
          p: 1,
          pr: 4,
          pl: 3,
          mr: -2,
          zIndex: indexP,
        }}
      />
      <FormControlLabel
        value="home"
        control={<Radio sx={{ display: "none" }} />}
        label="Télé-travail"
        sx={{
          backgroundColor: colorHome,
          borderRadius: 32,
          p: 1,
          pr: 3,
          pl: 4,
          zIndex: indexH,
        }}
      />
    </RadioGroup>
  );
};

export default ControlHome;