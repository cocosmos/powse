import { Box, Link, useMediaQuery, useTheme } from "@mui/material";
import logo from "../../assets/logo/logo.svg";

const Header = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <>
      {matches ? (
        <Box textAlign={"left"} mt={1} mb={2}>
          <Link href="/" underline="none">
            <object data={logo} type="image/svg+xml" width={125} />
          </Link>
        </Box>
      ) : (
        <Box textAlign={"center"} mt={1} mb={2}>
          <Link href="/" underline="none">
            <object data={logo} type="image/svg+xml" width={125} />
          </Link>
        </Box>
      )}
    </>
  );
};
export default Header;
