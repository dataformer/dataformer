import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import { Box } from "@mui/system";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function AggregationCommandContent(props) {
  const [fn, setFn] = useState("max");
  const [axis, setAxis] = useState(0);
  const [columns, setColumns] = useState("");

  useEffect(() => {
    props.onArgumentsChange({
      fn: fn,
      axis: axis,
      columns: columns,
    });
  }, [fn, axis, columns]);

  return (
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
        Aggregation command allows you to apply various aggregation functions.
        Specify comma-separated column names to group-by first or leave the
        field empty to apply to the entire dataframe. Requires CSV with a
        header.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Group-by column names (optional)"
          variant="outlined"
          onChange={(event) => setColumns(event.target.value)}
          sx={{ minWidth: 360 }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="demo-controlled-open-select-label">
            Function
          </InputLabel>
          <Select
            id="demo-simple-select-helper"
            label="Function"
            value={fn}
            onChange={(event) => setFn(event.target.value)}
          >
            <MenuItem value={"max"}>Maximum</MenuItem>
            <MenuItem value={"min"}>Minimum</MenuItem>
            <MenuItem value={"mean"}>Mean</MenuItem>
            <MenuItem value={"sum"}>Sum</MenuItem>
            <MenuItem value={"size"}>Size</MenuItem>
            <MenuItem value={"count"}>Count</MenuItem>
            <MenuItem value={"std"}>Standard Deviation</MenuItem>
            <MenuItem value={"var"}>Variance</MenuItem>
            <MenuItem value={"sem"}>Standard Error of Means</MenuItem>
            <MenuItem value={"first"}>First Record</MenuItem>
            <MenuItem value={"last"}>Last Record</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="demo-controlled-open-select-label">
            Apply to
          </InputLabel>
          <Select
            id="demo-simple-select-helper"
            label="Apply to"
            value={axis}
            onChange={(event) => setAxis(event.target.value)}
          >
            <MenuItem value={0}>Columns</MenuItem>
            <MenuItem value={1}>Rows</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </CardContent>
  );
}

export default AggregationCommandContent;
