import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/system";

function FilterColsCommandContent(props) {
  const [separator, setSeparator] = useState("");
  const [columns, setColumns] = useState("");

  useEffect(() => {
    props.onArgumentsChange({
      separator: separator,
      columns: columns,
    });
  }, [separator, columns]);

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
          Filter columns allow you to specify a separator and return the
          specified columns (1-indexed)
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
            label="Separator"
            variant="outlined"
            sx={{
              width: "10ch",
            }}
            onChange={(event) => setSeparator(event.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Columns (e.g., 1, 3-5)"
            variant="outlined"
            onChange={(event) => setColumns(event.target.value)}
          />
        </Box>
      </CardContent>
    </>
  );
}

export default FilterColsCommandContent;
