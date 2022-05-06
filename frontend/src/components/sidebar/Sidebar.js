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
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DoNotDisturbOnTotalSilenceIcon from "@mui/icons-material/DoNotDisturbOnTotalSilence";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Add from "@mui/icons-material/Add";
import CodeIcon from "@mui/icons-material/Code";

import { ReplaceCommand } from "../../state/ReplaceCommand";
import { FilterRowsCommand } from "../../state/FilterRowsCommand";
import { FilterSeparatedValuesCommand } from "../../state/FilterSeparatedValuesCommand";
import { FilterColsCommand } from "../../state/FilterColsCommand";
import { WrapCommand } from "../../state/WrapCommand";
import { RemoveDuplicatesCommand } from "../../state/RemoveDuplicatesCommand";
import { CountUniqueWordsCommand } from "../../state/CountUniqueWordsCommand";
import { RemoveHeaderCommand } from "../../state/RemoveHeaderCommand";
import { PrependLineCommand } from "../../state/PrependLineCommand";
import { AppendLineCommand } from "../../state/AppendLineCommand";
import { ListwiseDeletionCommand } from "../../state/ListwiseDeletionCommand";
import { ImputeCommand } from "../../state/ImputeCommand";
import { CodeCommand } from "../../state/CodeCommand";

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
          name: "Remove header row",
          icon: <PlaylistRemoveIcon />,
          commandType: RemoveHeaderCommand,
        },
        {
          name: "Count unique words",
          icon: <NumbersIcon />,
          commandType: CountUniqueWordsCommand,
        },
        {
          name: "Prepend line",
          icon: <ArrowDownwardIcon />,
          commandType: PrependLineCommand,
        },
        {
          name: "Append line",
          icon: <ArrowUpwardIcon />,
          commandType: AppendLineCommand,
        },
      ],
    },
    {
      name: "Filter/Replace",
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
      name: "Missing values",
      icon: <DoNotDisturbOnTotalSilenceIcon />,
      commands: [
        {
          name: "Listwise deletion",
          icon: <DeleteForeverIcon />,
          commandType: ListwiseDeletionCommand,
        },
        {
          name: "Imputation",
          icon: <Add />,
          commandType: ImputeCommand,
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
        {
          name: "Code",
          icon: <CodeIcon />,
          commandType: CodeCommand,
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
