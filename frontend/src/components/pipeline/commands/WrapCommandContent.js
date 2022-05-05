import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import { Box } from "@mui/system";

function WrapCommandContent(props) {
  const [headerField, setHeaderField] = useState("");
  const [separator, setSeparator] = useState("");

  useEffect(() => {
    props.onArgumentsChange({
      headerField: headerField,
      separator: separator,
    });
  }, [headerField, separator]);

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
        Allows you to combine related data on consecutive lines
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
          label="Header Field"
          variant="outlined"
          onChange={(event) => setHeaderField(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Separator"
          variant="outlined"
          sx={{
            width: "10ch",
          }}
          onChange={(event) => setSeparator(event.target.value)}
        />
      </Box>
    </CardContent>
  );
}

export default WrapCommandContent;
