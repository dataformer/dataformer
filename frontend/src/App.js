import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [serverMessage, setServerMessage] = useState("...");

  useEffect(() => {
    fetch("/hello?name=Frontend")
      .then((response) => response.text())
      .then((msg) => setServerMessage(msg));
  });

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to Dataformer!</h2>
      </div>
      <p className="App-intro">Server says: {serverMessage}</p>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <Button variant="contained">Hello World</Button>
    </div>
  );
}

export default App;
