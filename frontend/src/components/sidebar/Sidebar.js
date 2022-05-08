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
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Add from "@mui/icons-material/Add";
import CodeIcon from "@mui/icons-material/Code";
import SortIcon from "@mui/icons-material/Sort";
import FunctionsIcon from "@mui/icons-material/Functions";

import { ReplaceCommand } from "../../state/ReplaceCommand";
import { FilterRowsCommand } from "../../state/FilterRowsCommand";
import { FilterSeparatedValuesCommand } from "../../state/FilterSeparatedValuesCommand";
import { FilterColsCommand } from "../../state/FilterColsCommand";
import { WrapCommand } from "../../state/WrapCommand";
import { RemoveDuplicatesCommand } from "../../state/RemoveDuplicatesCommand";
import { CountUniqueWordsCommand } from "../../state/CountUniqueWordsCommand";
import { SortRowsCommand } from "../../state/SortRowsCommand";
import { RemoveHeaderCommand } from "../../state/RemoveHeaderCommand";
import { PrependLineCommand } from "../../state/PrependLineCommand";
import { AppendLineCommand } from "../../state/AppendLineCommand";
import { ListwiseDeletionCommand } from "../../state/ListwiseDeletionCommand";
import { ImputeCommand } from "../../state/ImputeCommand";
import { AggregationCommand } from "../../state/AggregationCommand";
import { CodeCommand } from "../../state/CodeCommand";
import { FilterColumnNamesCommand } from "../../state/FilterColumnNamesCommand";

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
      name: "CSV",
      icon: <TableChartOutlinedIcon />,
      commands: [
        {
          name: "Filter column names",
          icon: <FilterAltIcon />,
          commandType: FilterColumnNamesCommand,
        },
        {
          name: "Sort rows",
          icon: <SortIcon />,
          commandType: SortRowsCommand,
        },
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
        {
          name: "Aggregation",
          icon: <FunctionsIcon />,
          commandType: AggregationCommand,
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
      <Box
        sx={{ display: "flex", height: `calc(100vh - 48px)`, overflow: "auto" }}
      >
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
