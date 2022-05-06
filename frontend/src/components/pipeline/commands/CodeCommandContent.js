import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import { Box } from "@mui/system";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function CodeCommandContent(props) {
  const [code, setCode] = useState(props.template);

  useEffect(() => {
    props.onArgumentsChange({
      code: code,
    });
  }, [code]);

  return (
    <CardContent>
      <Typography gutterBottom variant="h5" component="div" align="center">
        {props.label}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        paddingBottom={1}
      >
        Code command allows you to process the data using an arbitrary Python
        code
      </Typography>
      <Box sx={{ paddingBottom: "8px" }}>
        <TextField
          id="input-field"
          label="Input"
          multiline
          minRows={4}
          fullWidth
          value={code}
          onChange={(event) => {
            setCode(event.target.value);
          }}
        />
      </Box>
    </CardContent>
  );
}

export default CodeCommandContent;
