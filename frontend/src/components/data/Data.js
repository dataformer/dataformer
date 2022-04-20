import React, { useEffect, useState } from "react";
import DataInput from "./DataInput";
import DataOutput from "./DataOutput";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Data() {
  return (
    <div>
      <DataInput></DataInput>
      <br />
      <DataOutput></DataOutput>
    </div>
  );
}

export default Data;
