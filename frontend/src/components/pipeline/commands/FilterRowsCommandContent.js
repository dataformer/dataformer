import React from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

function FilterRowsCommandContent(props) {
  return (
    <>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" align="center">
          {props.label}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          paddingBottom={1}
        >
          This is an example filter rows command.
        </Typography>
        <TextField id="outlined-basic" label="Your Regex" variant="outlined" />
      </CardContent>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Type"
        >
          <MenuItem value={0}>Literal String</MenuItem>
          <MenuItem value={1}>Regex</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export default FilterRowsCommandContent;
