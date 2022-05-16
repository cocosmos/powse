import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Logo from "../assets/logo/logo.svg";
import MockupHome from "../assets/mockup/mockup_home.webp";
import Wave from "../assets/wave.svg";
import WaveFooter from "../assets/wave-footer.svg";

import Activity from "../assets/categories/Activity";
import Food from "../assets/categories/Food";
import Free from "../assets/categories/Free";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Landing = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  let max = "20vh";
  let foot = "10vh";
  let none = "none";

  if (matches) {
    max = "40vh";
    foot = "20vh";
    none = "flex";
  }

  return (
    <Container maxWidth="xl" sx={{ p: 0, height: "97vh" }}>
      {" "}
      <Box
        display={"flex"}
        /*    mt={5} */
        //alignItems="center"
        // width="100%"
        justifyContent={"center"}
        flexWrap="wrap"
        height={"100%"}
      >
        <Box
          position={"absolute"}
          component={"header"}
          width="100%"
          maxHeight={max}
          display="flex"
          justifyContent={"center"}
          sx={{
            backgroundImage: `url(${Wave})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            top: 0,
            bottom: 60,
          }}
        >
          <img src={Logo} width="150" height={"50"} style={{ marginTop: 30 }} />
          <IconButton
            aria-label="linkedin"
            size="large"
            href="https://www.linkedin.com/company/86021494"
            target={"blank"}
            sx={{ position: "absolute", top: 5, right: 5 }}
          >
            <LinkedInIcon color="primary" />
          </IconButton>
        </Box>
        <Box
          component={"main"}
          display={"flex"}
          height="100%"
          alignItems="center"
          zIndex={1}
        >
          <Box
            display="flex"
            justifyContent={"center"}
            mt={15}
            mb={15}
            flexWrap="wrap"
          >
            <Typography
              variant="h1"
              textAlign={"center"}
              fontSize={20}
              width="90%"
              sx={{ fontFamily: "degular", mb: 5 }}
            >
              La plateforme qui transforme<br></br> vos pauses en moments
              uniques.
            </Typography>
            <Box
              width={"100%"}
              display="flex"
              justifyContent="center"
              sx={{ mb: 5 }}
            >
              <Button
                variant="outlined"
                color="primary"
                href={"register"}
                sx={{
                  borderRadius: 25,
                  textTransform: "unset",
                  mr: 2,
                }}
                size="medium"
              >
                S'inscrire
              </Button>
              <Button
                variant="contained"
                color="primary"
                href={"login"}
                sx={{
                  borderRadius: 25,
                  textTransform: "unset",
                }}
                size="medium"
              >
                Connexion
              </Button>
            </Box>
            <Stack spacing={3}>
              <Box
                sx={{
                  backgroundColor: "slider.backgroundPri",
                  p: 2,
                  borderRadius: 5,
                  boxShadow: "1px 5px 10px -8px rgb(87 84 217 / 75%)",
                }}
              >
                <Typography
                  variant="h3"
                  fontSize={20}
                  sx={{ fontFamily: "degular", mb: 2 }}
                >
                  Consultez les différentes pauses de vos collègues.
                </Typography>
                <Typography variant="body2">
                  Rejoignez celles qui vous correspondent le plus !
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "slider.backgroundSec",
                  p: 2,
                  borderRadius: 5,
                  boxShadow: "1px 5px 10px -8px rgb(87 84 217 / 75%)",
                }}
              >
                <Typography
                  variant="h3"
                  fontSize={20}
                  sx={{ fontFamily: "degular", mb: 2 }}
                >
                  Un coin dédié au télétravail.
                </Typography>
                <Typography variant="body2">
                  Idéal pour renouer des liens sociaux !
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "slider.backgroundPri",
                  p: 2,
                  borderRadius: 5,
                  boxShadow: "1px 5px 10px -8px rgb(87 84 217 / 75%)",
                }}
              >
                <Typography
                  variant="h3"
                  fontSize={20}
                  sx={{
                    fontFamily: "degular",
                    mb: 2,
                  }}
                >
                  Si vous êtes inspirés, créez votre propre pause.
                </Typography>
                <Typography variant="body2">
                  Programmez-là facilement et vivez de nouvelles expériences en
                  équipe.
                </Typography>
              </Box>
            </Stack>
          </Box>
          <Box display={none} alignItems="center">
            <img src={MockupHome} alt="mockup home" height={750} />
          </Box>
        </Box>
        <Stack
          position={"fixed"}
          component={"footer"}
          width="100%"
          height={foot}
          justifyContent="center"
          mt={5}
          sx={{
            backgroundImage: `url(${WaveFooter})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            bottom: 0,
          }}
        >
          <Box
            display={"flex"}
            width="100%"
            justifyContent={"space-between"}
            maxWidth={"200px"}
            sx={{ m: "0 auto", mb: 2 }}
          >
            <Food />
            <Activity />
            <Free />
          </Box>
          <Typography variant="body2" textAlign={"center"} mb={2}>
            ©2022 <b>Powse</b>, Tous droits reservé.
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
};

export default Landing;
