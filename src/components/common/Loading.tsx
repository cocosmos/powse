import { Backdrop, CircularProgress } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

const Loading = () => {
  const { loading } = useAuth();
  return (
    <Backdrop open={loading} sx={{ zIndex: 999 }}>
      <CircularProgress sx={{ color: "white" }} />
    </Backdrop>
  );
};

export default Loading;
