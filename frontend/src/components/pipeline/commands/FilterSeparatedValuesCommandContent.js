import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import { Box } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

function FilterSeparatedValuesCommandContent(props) {
  const [filter, setFilter] = useState("");
  const [isInverse, setIsInverse] = useState(false);
  const [isRegex, setIsRegex] = useState(true);
  const [separator, setSeparator] = useState("");

  useEffect(() => {
    props.onArgumentsChange({
      filter,
      isInverse,
      isRegex,
      separator,
    });
  }, [filter, isInverse, isRegex, separator]);

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
          Filter separated values by specifying a separator and a regular
          expression to match.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            gap: "8px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Separator"
            variant="outlined"
            onChange={(event) => setSeparator(event.target.value)}
            sx={{ minWidth: 120 }}
          />
          <TextField
            id="outlined-basic"
            label="Filter expression"
            variant="outlined"
            onChange={(event) => setFilter(event.target.value)}
            sx={{ minWidth: 120 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isInverse}
                onChange={(event) => setIsInverse(event.target.checked)}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Inverse"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isRegex}
                onChange={(event) => setIsRegex(event.target.checked)}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Regex"
          />
        </Box>
      </CardContent>
    </>
  );
}

export default FilterSeparatedValuesCommandContent;
