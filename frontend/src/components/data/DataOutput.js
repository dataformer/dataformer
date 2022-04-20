import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

function DataOutput(props) {
  const [output, setOutput] = useState("");
  return (
    <div>
      <TextField
        id="output-field"
        label="Output"
        multiline
        minRows={10}
        fullWidth
        disabled
        value={output}
      />
    </div>
  );
}

export default DataOutput;
