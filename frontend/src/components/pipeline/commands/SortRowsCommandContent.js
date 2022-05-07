import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import { Box } from "@mui/system";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function SortRowsCommandContent(props) {
  const [isAscending, setIsAscending] = useState(true);
  const [columnName, setColumnName] = useState("");

  useEffect(() => {
    props.onArgumentsChange({
      isAscending,
      columnName,
    });
  }, [isAscending, columnName]);

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
          Sort rows in ascending or descending order. Requires CSV with a
          header.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flaxWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
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
              Order
            </InputLabel>
            <Select
              id="demo-simple-select-helper"
              label="Order"
              value={isAscending}
              onChange={(event) => setIsAscending(event.target.value)}
            >
              <MenuItem value={true}>Ascending</MenuItem>
              <MenuItem value={false}>Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </CardContent>
    </>
  );
}

export default SortRowsCommandContent;
