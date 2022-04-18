import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Card, CardActionArea, CardActions, CardContent } from "@mui/material";
import List from "@mui/material/List";

function Pipeline() {
  // const [input, setInput] = useState("");
  // const [output, setOutput] = useState("");

  const commands = ["Command 1", "Command 2", "Command 3", "Command 4"];

  const buttons = ["Edit", "Disable", "Export"];

  return (
    <Box sx={{maxWidth: "360px"}} justifyContent="center">
      <List
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        {commands.map((command) => (
          <Card sx={{ paddingTop: 5, justifyContent: "center" }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {command}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This is an example command.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: "center" }}>
              {buttons.map((button) => (
                <Button size="small" color="primary">
                  {button}
                </Button>
              ))}
            </CardActions>
          </Card>
        ))}
        <br />
        <Button variant="contained" onClick={() => console.log("Executing...")}>
          Pipeline Execute
        </Button>
      </List>
    </Box>
  );
}

export default Pipeline;
