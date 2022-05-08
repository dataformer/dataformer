import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import { Box } from "@mui/system";

function FilterColumnNamesCommandContent(props) {
  const [columnNames, setColumnNames] = useState("");

  useEffect(() => {
    props.onArgumentsChange({
      columnNames: columnNames,
    });
  }, [columnNames]);

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
          Filter column names. Requires CSV with header. Separate multiple
          column names with commas.
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
            label="Column names"
            variant="outlined"
            onChange={(event) => setColumnNames(event.target.value)}
          />
        </Box>
      </CardContent>
    </>
  );
}

export default FilterColumnNamesCommandContent;
