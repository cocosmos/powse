import { Button } from "@mui/material";

const SubmitButton = ({ label }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      sx={{
        borderRadius: 25,
        textTransform: "unset",
        mt: 4,
      }}
      size="large"
    >
      {label}
    </Button>
  );
};

export default SubmitButton;
