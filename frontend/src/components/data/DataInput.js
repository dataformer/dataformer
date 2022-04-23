import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function DataInput() {
  const [input, setInput] = useState("");
  return (
    <Box sx={{paddingBottom:"8px"}}>
      <TextField
        id="input-field"
        label="Input"
        multiline
        minRows={12}
        maxRows={12}
        fullWidth
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
    </Box>
  );
}

export default DataInput;
