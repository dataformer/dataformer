import React from "react";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import SidebarGroup from "./SidebarGroup";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FormatLineSpacingIcon from "@mui/icons-material/FormatLineSpacing";
import CachedIcon from "@mui/icons-material/Cached";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import NumbersIcon from "@mui/icons-material/Numbers";

import { ReplaceCommand } from "../../state/ReplaceCommand";
import { FilterRowsCommand } from "../../state/FilterRowsCommand";
import { FilterSeparatedValuesCommand } from "../../state/FilterSeparatedValuesCommand";
import { FilterColsCommand } from "../../state/FilterColsCommand";
import { WrapCommand } from "../../state/WrapCommand";
import { RemoveDuplicatesCommand } from "../../state/RemoveDuplicatesCommand";
import { CountUniqueWordsCommand } from "../../state/CountUniqueWordsCommand";

function Sidebar(props) {
  const commandGroups = [
    {
      name: "Basic commands",
      icon: <ListAltIcon />,
      commands: [
        {
          name: "Remove duplicate lines",
          icon: <PlaylistRemoveIcon />,
          commandType: RemoveDuplicatesCommand,
        },
        {
          name: "Count unique words",
          icon: <NumbersIcon />,
          commandType: CountUniqueWordsCommand,
        },
      ],
    },
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
          name: "Filter separated values",
          icon: <FilterAltIcon />,
          commandType: FilterSeparatedValuesCommand,
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
    {
      name: "Advanced commands",
      icon: <AutoAwesomeIcon />,
      commands: [
        {
          name: "Wrap lines",
          icon: <FormatLineSpacingIcon />,
          commandType: WrapCommand,
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
