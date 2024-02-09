import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import StoreIcon from "@mui/icons-material/Store";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./style.css";

export const mainListItems = (
    <React.Fragment>
        <ListItemButton component={NavLink} to="/dashboard/">
            <ListItemIcon>
                <DashboardIcon sx={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItemButton>
    </React.Fragment>
);
