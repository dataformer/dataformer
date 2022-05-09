import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Card, CardActions, CardContent } from "@mui/material";
import { grey } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import DeleteIcon from "@mui/icons-material/Delete";

function Pipeline(props) {
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
            <Card
              variant="outlined"
              sx={{
                marginBottom: "8px",
              }}
              key={command.getId()}
            >
              <Box
                sx={{
                  textAlign: "center",
                  pointerEvents: command.isEnabled ? "initial" : "none",
                  opacity: command.isEnabled ? 1 : 0.15,
                }}
              >
                {command.getComponent()}
              </Box>
              <CardActions sx={{ justifyContent: "center" }}>
                {command.constructor.name !== "CodeCommand" ? (
                  <Button size="small" color="primary">
                    {
                      <EditIcon
                        onClick={() =>
                          props.setState(
                            props.state.editCommand(command.getId())
                          )
                        }
                      />
                    }
                  </Button>
                ) : undefined}
                <Button size="small" color="primary">
                  {
                    <DoDisturbIcon
                      onClick={() =>
                        props.setState(
                          props.state.toggleCommmand(command.getId())
                        )
                      }
                    />
                  }
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() =>
                    props.setState(props.state.removeCommand(command.getId()))
                  }
                >
                  <DeleteIcon />
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
        <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
          <Button variant="contained" onClick={() => props.executeBash()}>
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
