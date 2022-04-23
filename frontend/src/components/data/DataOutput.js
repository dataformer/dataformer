import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function DataOutput(props) {
  return (
    <Box>
      <TextField
        id="output-field"
        label="Output"
        multiline
        minRows={12}
        maxRows={12}
        fullWidth
        disabled
        value={props.state.data}
      />
    </Box>
  );
}

export default DataOutput;
