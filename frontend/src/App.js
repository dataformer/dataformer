import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Pipeline from "./components/pipeline/Pipeline";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  function executeBash() {
    fetch(`/api/v1/execute/${input}`, { method: "POST" })
      .then((response) => response.text())
      .then((output) => {
        setOutput(output.trim());
        console.log(output);
      });
  }

  return (
    <div className="App">
      <Typography variant="h2" component="div" gutterBottom>
        Welcome to Dataformer!
      </Typography>
      <Sidebar />
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
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
      </Box>
      <br />
      <Pipeline />
      <Button variant="contained" onClick={() => executeBash()}>
        Execute
      </Button>
    </div>
  );
}

export default App;
