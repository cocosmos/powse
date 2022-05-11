import { Button } from "@mui/material";

const SubmitButton = ({ label, type, href }) => {
  return (
    <Button
      type={type}
      variant="contained"
      color="primary"
      href={href}
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
