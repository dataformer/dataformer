import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import SidebarGroup from "./SidebarGroup";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import useResize from "../../utils/resizing";

function Sidebar(props) {
  const [width, enableResize] = useResize("max(20%, 250px)", 250);

  const commandGroups = props.commandGroups.map((cg) => (
    <SidebarGroup
      name={cg.name}
      icon={cg.icon}
      commands={cg.commands}
      key={cg.name}
    />
  ));

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: width, flexShrink: 0 }}>
        <Drawer
          variant="permanent"
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: width,
            },
          }}
          open
        >
          <List>{commandGroups}</List>
        </Drawer>
      </Box>
      <Box
        sx={{
          height: "100vh",
          width: "3px",
          cursor: "col-resize",
        }}
        onMouseDown={enableResize}
      />
    </Box>
  );
}

export default Sidebar;
