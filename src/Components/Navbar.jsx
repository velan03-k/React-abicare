import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import logo from "../Assets/Gemini_Generated_Image_r3w7g9r3w7g9r3w7-clean.png";

import { useState } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

const open = Boolean(anchorEl);

const navigate = useNavigate();

const handleMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl(null);
};
  return (
    <AppBar position="static" sx={{ backgroundColor: "#0F172A" }}>
      <Toolbar   sx={{
    minHeight: "70px",
  }}>
        <Box
          component="img"
          src={logo}
          alt="Abi Care Logo"
          sx={{
            width: 110,
            height: 110,
            objectFit: "contain",
          }}
        />
<Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
    flexGrow: 1,
    gap: 2,

    "& .MuiButton-root": {
      fontWeight: 600,
      fontSize: "19px",
      color : "#6BBAE0",
      textTransform: "none",
      transition: "all 0.3s ease",
    },

    "& .MuiButton-root:hover": {
      color: "#E091AC",
      transform: "translateY(-2px)",
    },
  }}
>
  <Button color="inherit">Home</Button>
  <Button color="inherit">About Us</Button>
  <Button color="inherit">Doctors</Button>
  <Button color="inherit">Departments</Button>
  <Button color="inherit">Applications</Button>
<>
  <IconButton
    onClick={handleMenuOpen}
    sx={{
      ml: 2,
      transition: "0.3s",

      "&:hover": {
        transform: "scale(1.1)",
      },
    }}
  >
    <Avatar />
  </IconButton>

  <Menu
    anchorEl={anchorEl}
    open={open}
    onClose={handleMenuClose}
  >
    <MenuItem
      onClick={() => {
        handleMenuClose();
        navigate("/login");
      }}
    >
      Login
    </MenuItem>
  </Menu>
</>

</Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
