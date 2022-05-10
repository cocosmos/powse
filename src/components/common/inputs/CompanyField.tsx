import {
  Autocomplete,
  CircularProgress,
  createFilterOptions,
  TextField,
} from "@mui/material";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { db } from "../firebase/config";

const filter = createFilterOptions<any>();
/*A virr apres*/

/****** */
interface CompanyOptionType {
  inputValue?: string;
  name: string;
  id: string;
}

export default function FreeSoloCreateOption({ value, setValue, companyRef }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    onSnapshot(collection(db, "entreprise"), (snapshot) =>
      setOptions(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    ),
      /*  if (active) {
        setOptions([...top100Companys]);
      }  */

      (active = false);
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue({
            name: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            name: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            name: `Ajouter "${inputValue}"`,
          });
        }

        return filtered;
      }}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      options={options}
      loading={loading}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="company-field"
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          label="Dans quelle entreprise travailles-tu ?"
          required
          color="secondary"
          variant="filled"
          inputRef={companyRef}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
}
