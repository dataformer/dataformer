import React, { useEffect, useState } from "react";
import DataInput from "./DataInput";
import DataOutput from "./DataOutput";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Data() {
  return (
    <Box sx={{height: "100vh", display: 'flex', flexDirection: 'column', flexGrow: 1, paddingTop:"8px"}} >
      <DataInput/>
      <br/>
      <DataOutput/>
    </Box>
  );
}

export default Data;
