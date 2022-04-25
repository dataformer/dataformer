import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Card, CardActionArea, CardActions, CardContent } from "@mui/material";
import { grey } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import Code from "@mui/icons-material/Code";

function Pipeline(props) {

  const buttons = [<EditIcon />, <DoDisturbIcon />, <Code />];

  return (
    <>
      <Box
        sx={{
          width: props.width,
          float: "center",
          maxHeight: "calc(100vh - 48px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            overflowY: "scroll",
            paddingTop: "8px",
            paddingLeft: "8px",
            paddingRight: "8px",
            flexGrow: "1",
          }}
          justifyContent="space-between"
        >
          {props.state.getCommands().map((command) => (
            <Card variant="outlined" sx={{ marginBottom: "8px" }}>
              <Box sx={{ textAlign: "center" }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="center"
                  >
                    {command.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    paddingBottom={1}
                  >
                    This is an example command.
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="Your Regex"
                    variant="outlined"
                  />
                </CardContent>
                <FormControl sx={{ width: 200 }}>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Type"
                  >
                    <MenuItem value={0}>Literal String</MenuItem>
                    <MenuItem value={1}>Regex</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <CardActions sx={{ justifyContent: "center" }}>
                {buttons.map((button) => (
                  <Button size="small" color="primary">
                    {button}
                  </Button>
                ))}
              </CardActions>
            </Card>
          ))}
        </Box>
        <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
          <Button
            variant="contained"
            onClick={() => props.setState({ data: "This is new state" })}
          >
            Pipeline Execute
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          height: `calc(100vh - 48px)`,
          width: "3px",
          cursor: "col-resize",
          backgroundColor: grey["400"],
        }}
        onMouseDown={props.enableResize}
      />
    </>
  );
}

export default Pipeline;
