import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeSharpIcon from "@mui/icons-material/AccessTimeSharp";
import FmdGoodSharpIcon from "@mui/icons-material/FmdGoodSharp";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PersonSharp } from "@mui/icons-material";
import Food from "../../assets/categories/Food";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  color: "#000000",
  // transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  //marginLeft: "auto",
  /* transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),*/
}));

export default function EventCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const joined = true;

  return (
    <Card sx={{ maxWidth: 640, borderRadius: 4, width: "100%" }}>
      <Stack
        direction="row"
        sx={{ p: 2, pr: 1, pb: 1 }}
        justifyContent="space-between"
        alignItems={"center"}
        spacing={1.2}
      >
        <Avatar sx={{ backgroundColor: "background.paper", width: "30px" }}>
          <Food />
        </Avatar>
        <Stack flexGrow={1}>
          <Typography variant="h6">Midi au thaï</Typography>
          <Typography sx={{ fontWeight: 500 }} component="div">
            Julien Rochat
          </Typography>
        </Stack>
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
          <PersonSharp />
          <Typography component="span">3/7</Typography>
        </ExpandMore>
      </Stack>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent
          sx={{
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 4,
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="body2">Julien Rochta</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="body2">Julien Rhta</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="body2">Julien Rochta</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="body2">Julien Rochta</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="body2">Julien Rochta</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="body2">Julien Rochta</Typography>
            </Grid>
            <Grid item xs={4} sm={4} md={4}>
              <Typography variant="body2">Julien Rochta</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
      <CardContent sx={{ pb: 1, pt: 1 }}>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <AccessTimeSharpIcon color="disabled" />
          <Stack>
            <Typography component="div">jeudi, 5 mai 2022</Typography>
            <Typography component="div">13:00 à 14:00</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <FmdGoodOutlinedIcon color="disabled" />
          <Typography gutterBottom component="div">
            Mama Thaï Genève
          </Typography>
        </Stack>
      </CardContent>
      {/*bouton rejoindre*/}
      <CardActions sx={{ justifyContent: "end" }}>
        {joined ? (
          <CheckCircleIcon
            color="primary"
            fontSize="large"
            sx={{ mr: 1.5, mt: -6 }}
          />
        ) : (
          <Button
            type="submit"
            variant="contained"
            size="medium"
            sx={{ borderRadius: 25, textTransform: "unset", pr: 4, pl: 4 }}
          >
            Rejoindre
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
