import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import { Box } from "@mui/system";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function ImputeCommandContent(props) {
  const [columnName, setColumnName] = useState("");
  const [strategy, setStrategy] = useState("average");
  const [constant, setConstant] = useState("0");

  useEffect(() => {
    props.onArgumentsChange({
      columnName: columnName,
      strategy: strategy,
      constant: constant,
    });
  }, [columnName, strategy, constant]);

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
        Impute command allows you to fill in missing values in a column.
        Requires CSV with a header.
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
          label="Column name"
          variant="outlined"
          onChange={(event) => setColumnName(event.target.value)}
          sx={{ minWidth: 120 }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="demo-controlled-open-select-label">
            Strategy
          </InputLabel>
          <Select
            id="demo-simple-select-helper"
            label="Strategy"
            value={strategy}
            onChange={(event) => setStrategy(event.target.value)}
          >
            <MenuItem value={"average"}>Average</MenuItem>
            <MenuItem value={"constant"}>Constant</MenuItem>
            <MenuItem value={"forward"}>Forward Fill</MenuItem>
            <MenuItem value={"backward"}>Backward Fill</MenuItem>
          </Select>
        </FormControl>
        {strategy == "constant" && (
          <TextField
            id="outlined-basic"
            label="Constant"
            variant="outlined"
            value={constant}
            onChange={(event) => setConstant(event.target.value)}
            sx={{ minWidth: 50, maxWidth: 70 }}
          />
        )}
      </Box>
    </CardContent>
  );
}

export default ImputeCommandContent;
