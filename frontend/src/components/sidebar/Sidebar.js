import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import SidebarGroup from "./SidebarGroup";
import useResize from "../../utils/resizing";

import FindReplaceIcon from "@mui/icons-material/FindReplace";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CachedIcon from "@mui/icons-material/Cached";

function Sidebar() {
  const [width, enableResize] = useResize("max(20%, 250px)", 250);

  const commandGroups = [
    {
      name: "Find/Replace",
      icon: <FindReplaceIcon />,
      commands: [
        {
          name: "Filter rows",
          icon: <FilterAltIcon />,
          callback: () => alert("Filtered rows!"),
        },
        {
          name: "Filter columns",
          icon: <FilterAltIcon />,
          callback: () => alert("Filtered colmns!"),
        },
        {
          name: "Replace",
          icon: <CachedIcon />,
          callback: () => alert("Replaced something!"),
        },
      ],
    },
  ];

  const commandGroupsComponents = commandGroups.map((cg) => (
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
          <List>{commandGroupsComponents}</List>
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
