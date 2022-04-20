import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Card, CardActionArea, CardActions, CardContent } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

function Pipeline() {
  const commands = ["Command 1", "Command 2", "Command 3", "Command 4"];

  const buttons = ["Edit", "Disable", "Export"];

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <List>
        {commands.map((command) => (
          <ListItem>
            <Card variant="outlined" sx={{ width: 500 }}>
              <CardActionArea>
                <CardContent alignItems="center">
                  <Typography gutterBottom variant="h5" component="div" align="center">
                    {command}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    This is an example command.
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="Your Regex"
                    variant="outlined"
                  />
                </CardContent>
                <FormControl fullWidth>
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
              </CardActionArea>
              <CardActions sx={{ justifyContent: "center" }}>
                {buttons.map((button) => (
                  <Button size="small" color="primary">
                    {button}
                  </Button>
                ))}
              </CardActions>
            </Card>
          </ListItem>
        ))}
        <Button variant="contained" onClick={() => console.log("Executing...")}>
          Pipeline Execute
        </Button>
      </List>
    </Grid>
  );
}

export default Pipeline;
