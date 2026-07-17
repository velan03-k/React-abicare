import { Outlet, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";

import AdminNavbar from "../Components/AdminNavbar";
import Sidebar from "../Components/Sidebar";

function AdminLayout() {
  const location = useLocation();

  // Hide sidebar only on the admin home page
  const showSidebar = location.pathname !== "/admin";
  

  return (
    <>
      <AdminNavbar />

      <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
        {showSidebar && <Sidebar />}

        <Box
          sx={{
            flexGrow: 1,
            backgroundColor: "#0B1220",
            p: { xs: 2, sm: 3, md: 4 },
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default AdminLayout;