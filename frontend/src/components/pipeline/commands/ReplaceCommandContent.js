import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import { Box } from "@mui/system";

function ReplaceCommandContent(props) {
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");

  useEffect(() => {
    props.onArgumentsChange({
      find,
      replace,
    });
  }, [find, replace]);

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
          Find a regular expression and replace it with a literal string.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            gap: "8px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Find"
            variant="outlined"
            onChange={(event) => setFind(event.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Replace"
            variant="outlined"
            onChange={(event) => setReplace(event.target.value)}
          />
        </Box>
      </CardContent>
    </>
  );
}

export default ReplaceCommandContent;
