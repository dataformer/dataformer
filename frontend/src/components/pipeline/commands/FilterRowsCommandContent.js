import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import { Box } from "@mui/system";

function FilterRowsCommandContent(props) {
  const [separator, setSeparator] = useState("");
  const [regEx, setRegEx] = useState("");

  useEffect(() => {
    props.onArgumentsChange({
      separator,
      regEx,
    });
  }, [separator, regEx]);

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
          Filter rows by specifying a separator and a regular expression to
          match.
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
            label="Regular Expression"
            variant="outlined"
            onChange={(event) => setRegEx(event.target.value)}
          />
        </Box>
      </CardContent>
    </>
  );
}

export default FilterRowsCommandContent;
