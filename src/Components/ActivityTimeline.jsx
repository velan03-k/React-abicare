import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import EventBusyRoundedIcon from "@mui/icons-material/EventBusyRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

const activities = [
  {
    icon: <PersonAddAlt1RoundedIcon fontSize="small" />,
    text: "New patient registered",
    detail: "Ishaan Verma joined via online portal",
    time: "5 min ago",
    color: "#38BDF8",
  },
  {
    icon: <EditNoteRoundedIcon fontSize="small" />,
    text: "Doctor profile updated",
    detail: "Dr. Meera Suresh updated availability",
    time: "22 min ago",
    color: "#818CF8",
  },
  {
    icon: <EventBusyRoundedIcon fontSize="small" />,
    text: "Appointment cancelled",
    detail: "Karthik Raja cancelled 11:00 AM slot",
    time: "48 min ago",
    color: "#F87171",
  },
  {
    icon: <PaidRoundedIcon fontSize="small" />,
    text: "Payment completed",
    detail: "₹3,200 received from Vikram Shetty",
    time: "1 hr ago",
    color: "#4ADE80",
  },
  {
    icon: <DescriptionRoundedIcon fontSize="small" />,
    text: "Lab report uploaded",
    detail: "Blood panel results for Sneha Iyer",
    time: "2 hr ago",
    color: "#E091AC",
  },
];

function ActivityTimeline() {
  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 4,
        backgroundColor: "#111C33",
        border: "1px solid rgba(56,189,248,0.1)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          color: "#F8FAFC",
          fontWeight: 700,
          fontSize: 18,
          mb: 3,
        }}
      >
        Recent Activities
      </Typography>

      <Box sx={{ position: "relative" }}>
        {/* Timeline Line */}
        <Box
          sx={{
            position: "absolute",
            left: 19,
            top: 20,
            bottom: 20,
            width: "2px",
            bgcolor: "rgba(148,163,184,0.2)",
          }}
        />

        {activities.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 2,
              position: "relative",
              pb: index === activities.length - 1 ? 0 : 3,
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: `${item.color}20`,
                color: item.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                zIndex: 2,
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            >
              {item.icon}
            </Box>

            {/* Text */}
            <Box sx={{ flex: 1, mt: 0.3 }}>
              <Typography
                sx={{
                  color: "#F8FAFC",
                  fontWeight: 600,
                  fontSize: 14,
                  lineHeight: 1.4,
                }}
              >
                {item.text}
              </Typography>

              <Typography
                sx={{
                  color: "#94A3B8",
                  fontSize: 13,
                  mt: 0.5,
                  lineHeight: 1.5,
                }}
              >
                {item.detail}
              </Typography>

              <Typography
                sx={{
                  color: "#64748B",
                  fontSize: 11,
                  mt: 0.6,
                }}
              >
                {item.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

export default ActivityTimeline;