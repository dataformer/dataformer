import React, { useEffect, useState } from "react";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StarBorder from "@mui/icons-material/StarBorder";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

function SidebarGroup(props) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const commands = props.commands.map((c, index) => {
    return (
      <ListItemButton
        sx={{ pl: 4 }}
        onClick={() =>
          props.setState(
            props.state.addCommand(
              new c.commandType(true, props.state.getCounterValue())
            )
          )
        }
        key={index}
      >
        {c.icon && <ListItemIcon>{c.icon}</ListItemIcon>}
        <ListItemText primary={c.name} />
      </ListItemButton>
    );
  });

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {commands}
        </List>
      </Collapse>
    </>
  );
}

export default SidebarGroup;
