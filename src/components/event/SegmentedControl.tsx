import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box } from "@mui/material";

export default function ColorToggleButton({ present, handleInput }) {
  return (
    /**element that includes all*/
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
      {/**element that includes général and télé-travail + style*/}
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
        {/**for option général  */}
        <ToggleButton
          value="general"
          sx={{
            p: 0.8,
            borderRadius: 25,
            textTransform: "unset",
          }}
        >
          Général
        </ToggleButton>

        {/**for option télé-travail */}
        <ToggleButton
          value="home"
          sx={{
            p: 0.8,
            borderRadius: 25,
            textTransform: "unset",
          }}
        >
          Télé-travail
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
