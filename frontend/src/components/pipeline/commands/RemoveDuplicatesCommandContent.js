import React from "react";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";

function RemoveDuplicatesCommandContent(props) {
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
          Remove all duplicate lines across the text.
        </Typography>
      </CardContent>
    </>
  );
}

export default RemoveDuplicatesCommandContent;
