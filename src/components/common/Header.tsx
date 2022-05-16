import { Box, Link, useMediaQuery, useTheme } from "@mui/material";
import logo from "../../assets/logo/logo.svg";
//header component, containing the site logo
const Header = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <>
      {matches ? (
        <Box textAlign={"left"} mt={1} mb={2}>
          <Link href="/" underline="none">
            <img src={logo} alt="Logo Powse" width={125} />
          </Link>
        </Box>
      ) : (
        <Box textAlign={"center"} mt={1} mb={2}>
          <Link href="/" underline="none">
            <img src={logo} alt="Logo Powse" width={125} />
          </Link>
        </Box>
      )}
    </>
  );
};
export default Header;
