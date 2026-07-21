import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
// import { href } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: <DashboardRoundedIcon /> },
  { label: "Doctors", icon: <LocalHospitalRoundedIcon /> },
  { label: "Patients", icon: <PeopleAltRoundedIcon /> },
  { label: "Appointments", icon: <EventAvailableRoundedIcon /> },
  { label: "Departments", icon: <AccountTreeRoundedIcon /> },
  { label: "Reports", icon: <AssessmentRoundedIcon /> },
  { label: "Settings", icon: <SettingsRoundedIcon /> },
];

const EXPANDED_WIDTH = 240;
const COLLAPSED_WIDTH = 76;

function Sidebar({ activeItem = "Dashboard", onSelect }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: "width 0.25s ease",
        "& .MuiDrawer-paper": {
          width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
          boxSizing: "border-box",
          backgroundColor: "#0F172A",
          borderRight: "1px solid rgba(56,189,248,0.12)",
          overflowX: "hidden",
          transition: "width 0.25s ease",
          pt: 1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-end",
          px: 1.5,
          py: 1,
        }}
      >
        <IconButton
          onClick={() => setCollapsed((prev) => !prev)}
          sx={{
            color: "#38BDF8",
            backgroundColor: "rgba(56,189,248,0.08)",
            "&:hover": { backgroundColor: "rgba(56,189,248,0.18)" },
          }}
          size="small"
        >
          {collapsed ? <ChevronRightRoundedIcon /> : <ChevronLeftRoundedIcon />}
        </IconButton>
      </Box>

      <Divider sx={{ borderColor: "rgba(56,189,248,0.1)", mb: 1 }} />

      <List sx={{ px: 1.25 }}>
        {navItems.map((item) => {
          const active = item.label === activeItem;
          return (
            <Tooltip
              key={item.label}
              title={collapsed ? item.label : ""}
              placement="right"
            >
              <ListItemButton
                onClick={() => onSelect && onSelect(item.label)}
                sx={{
                  borderRadius: "14px",
                  mb: 0.75,
                  justifyContent: collapsed ? "center" : "flex-start",
                  px: collapsed ? 1.5 : 2,
                  py: 1.1,
                  color: active ? "#0F172A" : "#94A3B8",
                  backgroundColor: active ? "#38BDF8" : "transparent",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    backgroundColor: active
                      ? "#38BDF8"
                      : "rgba(56,189,248,0.1)",
                    color: active ? "#0F172A" : "#38BDF8",
                    transform: "translateX(4px)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: collapsed ? 0 : 2,
                    color: "inherit",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
<ListItemText
  primary={item.label}
  slotProps={{
    primary: {
      sx: {
        fontWeight: active ? 700 : 500,
        fontSize: "15px",
      },
    },
  }}
/>
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ borderColor: "rgba(224,145,172,0.15)", mx: 1.25 }} />

      <List sx={{ px: 1.25, mb: 1.5 }}>
        <Tooltip title={collapsed ? "Logout" : ""} placement="right">
          <ListItemButton
            sx={{
              borderRadius: "14px",
              justifyContent: collapsed ? "center" : "flex-start",
              px: collapsed ? 1.5 : 2,
              py: 1.1,
              color: "#E091AC",
              transition: "all 0.25s ease",
              "&:hover": {
                backgroundColor: "rgba(224,145,172,0.12)",
                transform: "translateX(4px)",
              },
            }}
          >
            <ListItemIcon
              sx={{ minWidth: 0, mr: collapsed ? 0 : 2, color: "inherit", justifyContent: "center" }}
            >
              <LogoutRoundedIcon />
            </ListItemIcon>
            {!collapsed && (
            <ListItemText
  primary={
    <Box
      component="span"
      sx={{
        fontWeight: 600,
        fontSize: "15px",
      }}
    >
      Logout
    </Box>
  }
/>
            )}
          </ListItemButton>
        </Tooltip>
      </List>
    </Drawer>
  );
}

export default Sidebar;