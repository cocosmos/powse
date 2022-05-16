import { Box, Stack, Typography } from "@mui/material";
import Logo from "../assets/Logo";
import MockupHome from "../assets/mockup/mockup_home.webp";
import MockupEvent from "../assets/mockup/mockup_event.webp";
import SubmitButton from "../components/common/inputs/SubmitButton";
const Landing = () => (
  <Stack
    spacing={3}
    justifyContent="center"
    height={"100%"}
    textAlign="center"
    alignItems={"center"}
    maxWidth="lg"
    sx={{ margin: "0 auto" }}
  >
    {/*logo*/}
    <Box component="span" mt={2}>
      <Logo />
    </Box>
    <Typography variant="h1">La powse de votre vie !</Typography>

    <Box
      flexGrow={1}
      display={"flex"}
      mt={5}
      alignItems="center"
      width="100%"
      justifyContent={"center"}
      flexWrap="wrap"
    >
      <img src={MockupHome} alt="Mockup home" style={{ maxWidth: "100%" }} />
      <Box flexGrow={1}>
        <Typography variant="h2">La powse de votre vie !</Typography>
        <SubmitButton label={"S'inscrire"} type={"button"} href={"register"} />
      </Box>
    </Box>

    <Box
      flexGrow={1}
      display={"flex"}
      mt={5}
      alignItems="center"
      width="100%"
      justifyContent={"center"}
      flexWrap="wrap"
    >
      <Box flexGrow={1}>
        <Typography variant="h2">La powse de votre vie !</Typography>
        <SubmitButton label={"S'inscrire"} type={"button"} href={"register"} />
      </Box>

      <img src={MockupEvent} alt="Mockup home" style={{ maxWidth: "100%" }} />
    </Box>
  </Stack>
);

export default Landing;
