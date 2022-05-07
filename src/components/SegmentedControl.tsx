import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box } from "@mui/material";

export default function ColorToggleButton() {
  const [alignment, setAlignment] = useState("present");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

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
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        fullWidth
        sx={{ p: 0.5, borderRadius: 25 }}
      >
        <ToggleButton
          value="present"
          sx={{
            p: 0.8,
            borderRadius: 25,
          }}
        >
          Général
        </ToggleButton>
        <ToggleButton value="home" sx={{ p: 0.8, borderRadius: 25 }}>
          Télé-travail
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
