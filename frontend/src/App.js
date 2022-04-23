import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Pipeline from "./components/pipeline/Pipeline";
import Data from "./components/data/Data";
import useResize from "./utils/resizing";

import { createState } from "./state/State";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [widths, enableResizeCallbacks] = useResize([
    [250, 250],
    [500, 500],
    [500, 500],
  ]);

  const [state, setState] = useState(createState([]));

  function executeBash() {
    fetch(`/api/v1/execute/${input}`, { method: "POST" })
      .then((response) => response.text())
      .then((output) => {
        setOutput(output.trim());
        console.log(output);
      });
  }
  console.log(widths);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Dataformer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Sidebar
          width={widths[0]}
          enableResize={enableResizeCallbacks[0]}
          state={state}
          setState={setState}
        />
        <Pipeline
          width={widths[1]}
          enableResize={enableResizeCallbacks[1]}
          state={state}
          setState={setState}
        />
        <Data state={state} setState={setState} />
      </Box>
      {state.toString()};
    </div>
  );
}

export default App;
