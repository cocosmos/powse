import { Box } from "@mui/material";
import logo from "../assets/logo/logo.svg";

const Header = () => {
  return (
    <Box textAlign={"center"} mt={1} mb={2}>
      <img src={logo} alt="Logo Powse" width={125} />
    </Box>
  );
};
export default Header;
