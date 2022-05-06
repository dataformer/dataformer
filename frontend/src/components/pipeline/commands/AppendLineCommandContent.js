import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import { Box } from "@mui/system";

function AppendLineCommandContent(props) {
  const [line, setLine] = useState("");

  useEffect(() => {
    props.onArgumentsChange({
      line,
    });
  }, [line]);

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
          Append line to text.
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
            label="Line to append"
            variant="outlined"
            onChange={(event) => setLine(event.target.value)}
          />
        </Box>
      </CardContent>
    </>
  );
}

export default AppendLineCommandContent;
