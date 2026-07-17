import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";

const stats = [
  {
    label: "Total Patients",
    value: "4,982",
    growth: "+12.4%",
    up: true,
    icon: <PeopleAltRoundedIcon />,
    color: "#38BDF8",
  },
  {
    label: "Total Doctors",
    value: "186",
    growth: "+4.1%",
    up: true,
    icon: <LocalHospitalRoundedIcon />,
    color: "#E091AC",
  },
  {
    label: "Today's Appointments",
    value: "73",
    growth: "-2.8%",
    up: false,
    icon: <EventAvailableRoundedIcon />,
    color: "#38BDF8",
  },
  {
    label: "Revenue",
    value: "₹8.4L",
    growth: "+18.6%",
    up: true,
    icon: <PaidRoundedIcon />,
    color: "#E091AC",
  },
];

function DashboardCards() {
  return (
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} lg={3} key={stat.label}>
          <Card
            sx={{
              p: 2.75,
              borderRadius: "20px",
              backgroundColor: "#111C33",
              border: "1px solid rgba(56,189,248,0.1)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: `0 14px 32px rgba(0,0,0,0.35)`,
                borderColor: `${stat.color}55`,
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Avatar
                sx={{
                  bgcolor: `${stat.color}22`,
                  color: stat.color,
                  width: 52,
                  height: 52,
                  borderRadius: "16px",
                }}
              >
                {stat.icon}
              </Avatar>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  px: 1.25,
                  py: 0.5,
                  borderRadius: "999px",
                  backgroundColor: stat.up ? "rgba(74,222,128,0.12)" : "rgba(248,113,113,0.12)",
                  color: stat.up ? "#4ADE80" : "#F87171",
                }}
              >
                {stat.up ? (
                  <ArrowUpwardRoundedIcon sx={{ fontSize: 14 }} />
                ) : (
                  <ArrowDownwardRoundedIcon sx={{ fontSize: 14 }} />
                )}
                <Typography sx={{ fontSize: "12px", fontWeight: 700 }}>
                  {stat.growth}
                </Typography>
              </Box>
            </Box>

            <Typography sx={{ mt: 2.5, fontSize: "30px", fontWeight: 800, color: "#F8FAFC" }}>
              {stat.value}
            </Typography>
            <Typography sx={{ mt: 0.5, fontSize: "14px", color: "#94A3B8", fontWeight: 500 }}>
              {stat.label}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default DashboardCards;