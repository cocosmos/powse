import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box } from "@mui/material";

export default function ColorToggleButton({ present, handleInput }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        bgcolor: "background.paper",
        overflow: "hidden",
        borderRadius: "25px",
        fontWeight: "bold",
        width: "100%",
      }}
    >
      <ToggleButtonGroup
        color="standard"
        value={present}
        exclusive
        onChange={handleInput}
        fullWidth
        sx={{
          p: 0.5,
          borderRadius: 25,
        }}
      >
        <ToggleButton
          value="general"
          sx={{
            p: 0.8,
            borderRadius: 25,
          }}
        >
          Général
        </ToggleButton>
        <ToggleButton
          value="home"
          sx={{
            p: 0.8,
            borderRadius: 25,
          }}
        >
          Télé-travail
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
