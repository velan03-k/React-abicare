import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

import EventAvailableRoundedIcon from "@mui/icons-material/EventAvailableRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import EmergencyRoundedIcon from "@mui/icons-material/EmergencyRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";

const notifications = [
  {
    icon: <EventAvailableRoundedIcon fontSize="small" />,
    title: "New appointment request",
    detail: "Ananya Reddy requested a slot with Dr. Gupta",
    tag: "New",
    color: "#38BDF8",
  },
  {
    icon: <HourglassBottomRoundedIcon fontSize="small" />,
    title: "Pending approval",
    detail: "3 leave requests awaiting review",
    tag: "Pending",
    color: "#FBBF24",
  },
  {
    icon: <MedicationRoundedIcon fontSize="small" />,
    title: "Low medicine stock",
    detail: "Paracetamol 500mg below reorder level",
    tag: "Warning",
    color: "#F87171",
  },
  {
    icon: <EmergencyRoundedIcon fontSize="small" />,
    title: "Emergency admission",
    detail: "Trauma case admitted to Ward 4",
    tag: "Urgent",
    color: "#F87171",
  },
  {
    icon: <NotificationsActiveRoundedIcon fontSize="small" />,
    title: "System alert",
    detail: "Scheduled maintenance tonight at 11:00 PM",
    tag: "System",
    color: "#818CF8",
  },
];

function NotificationsPanel() {
  return (
    <Card
      sx={{
        borderRadius: "20px",
        backgroundColor: "#111C33",
        border: "1px solid rgba(56,189,248,0.1)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        p: 3,
        height: "100%",
      }}
    >
      <Typography sx={{ color: "#F8FAFC", fontWeight: 700, fontSize: "17px", mb: 2.5 }}>
        Notifications
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {notifications.map((n) => (
          <Box
            key={n.title}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              p: 1.5,
              borderRadius: "14px",
              border: "1px solid rgba(148,163,184,0.08)",
              transition: "all 0.25s ease",
              "&:hover": {
                backgroundColor: "rgba(56,189,248,0.06)",
                borderColor: `${n.color}55`,
              },
            }}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: `${n.color}22`,
                color: n.color,
                flexShrink: 0,
              }}
            >
              {n.icon}
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ color: "#F8FAFC", fontWeight: 600, fontSize: "13.5px" }}>
                  {n.title}
                </Typography>
                <Chip
                  label={n.tag}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: "10.5px",
                    fontWeight: 700,
                    backgroundColor: `${n.color}1F`,
                    color: n.color,
                  }}
                />
              </Box>
              <Typography sx={{ color: "#94A3B8", fontSize: "12.5px", mt: 0.25 }}>
                {n.detail}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

export default NotificationsPanel;