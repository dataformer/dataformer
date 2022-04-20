import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

function DataInput() {
  const [input, setInput] = useState("");
  return (
    <div>
      <TextField
        id="input-field"
        label="Input"
        multiline
        minRows={10}
        fullWidth
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
    </div>
  );
}

export default DataInput;
