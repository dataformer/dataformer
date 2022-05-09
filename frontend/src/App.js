import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Sidebar from "./components/sidebar/Sidebar";
import Pipeline from "./components/pipeline/Pipeline";
import Data from "./components/data/Data";
import useResize from "./utils/resizing";
import "./App.css";

import { createState } from "./state/State";

function App() {
  const { sidebarWidth, pipelineWidth, enableResizeLeft, enableResizeRight } =
    useResize({
      sidebarMinWidth: 250,
      sidebarDefaultWidth: 250,
      pipelineMinWidth: 300,
      pipelineDefaultWidth: 500,
      dataMinWidth: 450,
    });

  const [state, setState] = useState(createState());

  function executeBash() {
    const bashCommand = state.parseCommandSequence();
    const formData = new FormData();
    formData.append("script", bashCommand);
    fetch(`/api/v1/execute/`, { method: "POST", body: formData })
      .then((response) => response.text())
      .then((output) => {
        setState(state.setOutputDataText(output));
      });
  }

  function uploadFile(event) {
    const input = event.target;
    if ("files" in input && input.files.length > 0) {
      var fileToLoad = input.files[0];
      var fileReader = new FileReader();
      fileReader.onload = (fileLoadedEvent) => {
        var textFromFile = fileLoadedEvent.target.result;
        setState(state.setInputDataText(textFromFile));
      };
      fileReader.readAsText(fileToLoad);
    }
  }

  function downloadTextFile(content, filename) {
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  }

  function downloadOutput() {
    downloadTextFile(state.getOutputDataText(), "output.txt");
  }

  function downloadScript() {
    downloadTextFile(state.parseCommandSequence(true), "dataformer_script.py");
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ textAlign: "left", flexGrow: 1 }}
          >
            Dataformer
          </Typography>
          <IconButton
            size="large"
            aria-label="open file"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            component="label"
            title="Open file"
          >
            <FileOpenIcon />
            <input type="file" onChange={(event) => uploadFile(event)} hidden />
          </IconButton>
          <IconButton
            size="large"
            aria-label="download output"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            component="label"
            onClick={downloadOutput}
            title="Download output"
          >
            <FileDownloadIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label="export script"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            component="label"
            title="Export script"
            onClick={downloadScript}
          >
            <ExitToAppIcon />
          </IconButton>
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
          executeBash={executeBash}
        />
        <Data state={state} setState={setState} />
      </Box>
    </div>
  );
}

export default App;
