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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../components/common/firebase/config";

const Landing = () => {
  const { currentUser } = useContext(AuthContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const [user, setUser] = useState<any>({ name: "" });

  useEffect(() => {
    if (currentUser.uid) {
      const docRef = doc(db, `users`, currentUser.uid);
      try {
        onSnapshot(docRef, (doc) => {
          setUser({ ...doc.data() });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  let max = "10vh";
  let foot = "10vh";
  let none = "none";
  let large = "medium";
  let height = "100%";
  let bottom = "80%";

  if (matches) {
    max = "40vh";
    foot = "20vh";
    none = "flex";
    large = "large";
    height = "86vh";
    bottom = "60%";
  }

  return (
    <>
      <Container maxWidth="xl" sx={{ p: 0, height: { height } }}>
        <Box
          component={"header"}
          width="100%"
          maxHeight={max}
          display="flex"
          justifyContent={"center"}
        >
          <Box
            sx={{
              position: "absolute",
              backgroundImage: `url(${Wave})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "bottom",
              top: 0,
              right: 0,
              left: 0,
              bottom: { bottom },
            }}
          ></Box>
          <img src={Logo} width="150" height={"50"} />
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
          alignItems="flex-start"
          zIndex={2}
          mt={4}
          mb={11}
        >
          <Box display="flex" justifyContent={"center"} mt={0} flexWrap="wrap">
            <Typography
              variant="h1"
              textAlign={"center"}
              fontSize={20}
              width="95%"
              sx={{ fontFamily: "degular", mb: 4 }}
            >
              La plateforme qui transforme<br></br> vos pauses en moments
              uniques.
            </Typography>
            <Box
              width={"100%"}
              display="flex"
              justifyContent="center"
              alignItems={"center"}
              flexWrap="wrap"
              sx={{ mb: 4 }}
            >
              {user.name ? (
                <>
                  <Typography
                    variant="body1"
                    sx={{ mr: 2, mb: 1 }}
                    textAlign={"center"}
                  >
                    Bonjour <b>{user.name}</b>, les <b>POWSES</b> de{" "}
                    <b>{user.entreprise}</b>:
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    href={"home"}
                    sx={{
                      borderRadius: 25,
                      textTransform: "unset",
                    }}
                    size="medium"
                  >
                    C'est par ici
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    href={"register"}
                    sx={{
                      borderRadius: 25,
                      textTransform: "unset",
                      mr: 2,
                      pr: 3,
                      pl: 3,
                    }}
                    size={matches ? "large" : "medium"}
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
                      pr: 3,
                      pl: 3,
                    }}
                    size={matches ? "large" : "medium"}
                  >
                    Connexion
                  </Button>
                </>
              )}
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
        {/*  </Box> */}

        <Stack
          component={"footer"}
          width="100%"
          height={foot}
          justifyContent="center"
          mt={0}
          mb={0}
          sx={{
            zIndex: -2,
            backgroundImage: `url(${WaveFooter})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            bottom: 0,
            right: 0,
            left: 0,
            position: "fixed",
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
      </Container>
    </>
  );
};

export default Landing;
