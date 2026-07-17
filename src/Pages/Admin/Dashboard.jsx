import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// import DashboardCards from "../../Components/DashboardCards";
// import ChartsSection from "../../Components/ChartsSection";
// import AppointmentTable from "../../Components/AppointmentTable";
// import ActivityTimeline from "../../Components/ActivityTimeline";
// import DoctorAvailability from "../../Components/DoctorAvailability";
// import NotificationsPanel from "../../Components/NotificationsPanel";
// import CalendarWidget from "../../Components/CalendarWidget";
// import RecentPatientsTable from "../../Components/RecentPatientsTable";

function Dashboard() {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            color: "#F8FAFC",
            fontWeight: 800,
            fontSize: "26px",
          }}
        >
          Welcome back, Admin
        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            fontSize: "14px",
            mt: 0.5,
          }}
        >
          Here's what's happening at ABI CARE today.
        </Typography>
      </Box>
{/* 
      Dashboard Cards
      <Box sx={{ mb: 4 }}>
        <DashboardCards />
      </Box>

      <Box sx={{ mb: 4 }}>
        <ChartsSection />
      </Box>

      <Grid
        container
        spacing={3}
        alignItems="stretch"
        sx={{ mb: 4 }}
      >
        <Grid
          size={{ xs: 12, lg: 8 }}
          sx={{ display: "flex" }}
        >
          <Box sx={{ width: "100%" }}>
            <AppointmentTable />
          </Box>
        </Grid>

        <Grid
          size={{ xs: 12, lg: 4 }}
          sx={{ display: "flex" }}
        >
          <Box sx={{ width: "100%" }}>
            <NotificationsPanel />
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        alignItems="stretch"
        sx={{ mb: 4 }}
      >
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{ display: "flex" }}
        >
          <Box sx={{ width: "100%" }}>
            <ActivityTimeline />
          </Box>
        </Grid>

        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{ display: "flex" }}
        >
          <Box sx={{ width: "100%" }}>
            <DoctorAvailability />
          </Box>
        </Grid>

        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{ display: "flex" }}
        >
          <Box sx={{ width: "100%" }}>
            <CalendarWidget />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mb: 2 }}>
        <RecentPatientsTable />
      </Box> */}
    </Box>
  );
}

export default Dashboard;