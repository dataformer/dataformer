import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import { Box } from "@mui/system";

function ListwiseDeletion(props) {
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
        Listwise deletion removes all rows with missing values
      </Typography>
    </CardContent>
  );
}

export default ListwiseDeletion;
