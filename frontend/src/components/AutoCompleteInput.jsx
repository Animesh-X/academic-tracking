import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/material";

export default function FreeSolo(props) {
  return (
    <Box sx={{ width: 500 }}>
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={props.data.map((option) => option.title)}
          onChange={(event, value) => props.handleClick(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label={props.label || "Search"}
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
    </Box>
  );
}


