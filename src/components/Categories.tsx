import * as React from "react";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import LaptopIcon from "@mui/icons-material/Laptop";
import TvIcon from "@mui/icons-material/Tv";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  Box,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function Categories() {
  const [alignment, setAlignment] = React.useState("");
  const [devices, setDevices] = React.useState(() => ["phone"]);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };
  const [radioValue, setRadioValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("Choose wisely");
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
    setHelperText(" ");
    setError(false);
    console.log(radioValue);
  };

  return (
    <>
      <RadioGroup
        row
        aria-labelledby="demo-form-control-label-placement"
        name="position"
        defaultValue="top"
        value={radioValue}
        onChange={handleRadioChange}
      >
        <FormControlLabel
          value="food"
          control={<Radio sx={{ display: "none" }} />}
          label={
            <>
              <svg
                width="49"
                height="49"
                viewBox="0 0 49 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.1618 48.3235C24.1618 38.3257 24.1618 38.3257 24.1618 48.3235C19.1002 33.3268 14.9967 29.2234 0 24.1618C9.99783 24.1618 9.99783 24.1618 0 24.1618C14.9967 19.1002 19.1002 14.9967 24.1618 0C24.1618 9.99783 24.1618 9.99783 24.1618 0C29.2234 14.9967 33.3268 19.1002 48.3235 24.1618C38.3257 24.1618 38.3257 24.1618 48.3235 24.1618C33.3268 29.2234 29.2234 33.3268 24.1618 48.3235Z"
                  fill="#D771C0"
                />
              </svg>
              <Typography variant="subtitle1" color={"primary"}>
                Powse repas
              </Typography>
            </>
          }
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="activity"
          control={<Radio sx={{ display: "none" }} />}
          label={
            <>
              <svg
                width="47"
                height="47"
                viewBox="0 0 47 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_190_171)">
                  <path
                    d="M23.5 14.3744C24.7088 19.5997 29.4402 23.5 35.0985 23.5C41.6712 23.5 47 18.2387 47 11.7493C47 5.25991 41.6712 0 35.0985 0C29.4402 0 24.7074 3.90028 23.5 9.12558C22.2912 3.90028 17.5584 0 11.9015 0C5.3288 0 0 5.2613 0 11.7507C0 18.2401 5.3288 23.5014 11.9015 23.5014C17.5598 23.5014 22.2926 19.6011 23.5 14.3758V14.3744Z"
                    fill="#7697EC"
                  />
                  <path
                    d="M35.0985 23.5C29.4402 23.5 24.7074 27.4003 23.5 32.6256C22.2912 27.4003 17.5598 23.5 11.9015 23.5C5.3288 23.5 0 28.7613 0 35.2507C0 41.7401 5.3288 47.0014 11.9015 47.0014C17.5598 47.0014 22.2926 43.1011 23.5 37.8758C24.7088 43.1011 29.4402 47.0014 35.0985 47.0014C41.6712 47.0014 47 41.7401 47 35.2507C47 28.7613 41.6712 23.5 35.0985 23.5Z"
                    fill="#7697EC"
                  />
                </g>
              </svg>
              <Typography variant="subtitle1" color={"primary"}>
                Powse activités
              </Typography>
            </>
          }
          labelPlacement="bottom"
        />{" "}
        <FormControlLabel
          value="free"
          control={<Radio sx={{ display: "none" }} />}
          label={
            <>
              <svg
                width="47"
                height="47"
                viewBox="0 0 47 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M47 17.9247H36.9592L44.0595 10.8245L36.1755 2.9405L29.0753 10.0408V0H17.9247V10.0408L10.8245 2.9405L2.9405 10.8245L10.0408 17.9247H0V29.0753H10.0408L2.9405 36.1755L10.8245 44.0595L17.9247 36.9592V47H29.0753V36.9592L36.1755 44.0595L44.0595 36.1755L36.9592 29.0753H47V17.9247Z"
                  fill="#FFBBF0"
                />
              </svg>
              <Typography variant="subtitle1" color={"primary"}>
                Powse libre
              </Typography>
            </>
          }
          labelPlacement="bottom"
        />
      </RadioGroup>
    </>
  );
}