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
  const { sidebarWidth, pipelineWidth, enableResizeLeft, enableResizeRight } =
    useResize({
      sidebarMinWidth: 250,
      sidebarDefaultWidth: 250,
      pipelineMinWidth: 300,
      pipelineDefaultWidth: 500,
      dataMinWidth: 450,
    });

  const [state, setState] = useState(createState([]));

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
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Dataformer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          maxHeight: "calc(100vh - 48px)",
        }}
      >
        <Sidebar
          width={sidebarWidth}
          enableResize={enableResizeLeft}
          state={state}
          setState={setState}
        />
        <Pipeline
          width={pipelineWidth}
          enableResize={enableResizeRight}
          state={state}
          setState={setState}
        />
        <Data state={state} setState={setState} />
      </Box>
      {/* {state.toString()}; */}
    </div>
  );
}

export default App;
