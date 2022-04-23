import React, { useEffect, useState } from "react";
import DataInput from "./DataInput";
import DataOutput from "./DataOutput";
import Box from "@mui/material/Box";

function Data(props) {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        padding: "8px",
      }}
    >
      <DataInput state={props.state} setState={props.setState} />
      <DataOutput state={props.state} setState={props.setState} />
    </Box>
  );
}

export default Data;
