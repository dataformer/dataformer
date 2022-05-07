import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import { Box } from "@mui/system";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function SortRowsCommandContent(props) {
  const [isAscending, setIsAscending] = useState("");

  useEffect(() => {
    props.onArgumentsChange({
      isAscending,
    });
  }, [isAscending]);

  return (
    <>
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
          Sort rows in ascending or descending order.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flaxWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            gap: "8px",
          }}
        >
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-controlled-open-select-label">
              Order
            </InputLabel>
            <Select
              id="demo-simple-select-helper"
              label="Order"
              value={isAscending}
              onChange={(event) => setIsAscending(event.target.value)}
            >
              <MenuItem value={true}>Ascending</MenuItem>
              <MenuItem value={false}>Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </CardContent>
    </>
  );
}

export default SortRowsCommandContent;
