import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";

function Pipeline() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const commands = ["command1", "command2", "command3", "command4", "command5"];

  const buttons = ["Edit", "Disable", "Export"];

  return (
    <div className="Pipeline">
      {commands.map((command) => (
        <Card sx={{ maxWidth: 345 }}>
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
          <CardActions>
            {buttons.map((button) => (
              <Button size="small" color="primary">
                {button}
              </Button>
            ))}
          </CardActions>
        </Card>
      ))}
      <Button variant="contained" onClick={() => console.log('Executing...')}>
        Pipeline Execute
      </Button>
    </div>
  );
}

export default Pipeline;
