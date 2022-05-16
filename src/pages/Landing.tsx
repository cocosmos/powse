import { Box, Button, Stack, Typography } from "@mui/material";
import Logo from "../assets/logo/logo.svg";
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
    {/* <Box component="span" mt={2}>
      <Logo />
    </Box>
    <Typography variant="h1">La powse de votre vie !</Typography>
 */}
    <Box
      flexGrow={1}
      display={"flex"}
      /*    mt={5} */
      alignItems="center"
      width="100%"
      justifyContent={"center"}
      flexWrap="wrap"
    >
      <Box width={"50%"} textAlign="left">
        <img src={Logo} />
        <Typography variant="h1">
          Consultez les différentes pauses de vos collègues.
        </Typography>
        <Typography variant="body1">
          Rejoignez celles qui vous correspondent le plus !
        </Typography>

        <Button
          variant="contained"
          color="primary"
          href={"register"}
          sx={{
            borderRadius: 25,
            textTransform: "unset",
            mt: 4,
          }}
          size="medium"
        >
          S'inscrire
        </Button>
      </Box>
      <Box>
        <img src={MockupHome} alt="Mockup home" style={{ maxWidth: "80%" }} />
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
