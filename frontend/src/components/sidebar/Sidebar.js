import React, { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import SidebarGroup from "./SidebarGroup";

import FindReplaceIcon from "@mui/icons-material/FindReplace";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CachedIcon from "@mui/icons-material/Cached";

import { ReplaceCommand } from "../../state/ReplaceCommand";
import { FilterRowsCommand } from "../../state/FilterRowsCommand";
import { FilterColsCommand } from "../../state/FilterColsCommand";

function Sidebar(props) {
  const commandGroups = [
    {
      name: "Find/Replace",
      icon: <FindReplaceIcon />,
      commands: [
        {
          name: "Filter rows",
          icon: <FilterAltIcon />,
          commandType: FilterRowsCommand,
        },
        {
          name: "Filter columns",
          icon: <FilterAltIcon />,
          commandType: FilterColsCommand,
        },
        {
          name: "Replace",
          icon: <CachedIcon />,
          commandType: ReplaceCommand,
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
      state={props.state}
      setState={props.setState}
    />
  ));

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: props.width, flexShrink: 0 }}>
          <Drawer
            variant="permanent"
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: props.width,
                position: "relative",
              },
            }}
            open
          >
            <List>{commandGroupsComponents}</List>
          </Drawer>
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

export default Sidebar;
