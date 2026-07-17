import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";

const doctors = [
  { name: "Dr. Priya Nair", department: "Cardiology", availability: "9:00 AM – 3:00 PM", online: true },
  { name: "Dr. Rohan Das", department: "Neurology", availability: "11:00 AM – 5:00 PM", online: true },
  { name: "Dr. Meera Suresh", department: "Orthopedics", availability: "10:00 AM – 4:00 PM", online: false },
  { name: "Dr. Arjun Kapoor", department: "Pediatrics", availability: "8:30 AM – 2:30 PM", online: true },
  { name: "Dr. Sanjay Gupta", department: "Dermatology", availability: "1:00 PM – 6:00 PM", online: false },
];

function initials(name) {
  return name
    .replace("Dr. ", "")
    .split(" ")
    .map((n) => n[0])
    .join("");
}

function DoctorAvailability() {
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
        Doctor Availability
      </Typography>

      <Grid container spacing={2}>
        {doctors.map((doc) => (
          <Grid item xs={12} key={doc.name}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 1.5,
                borderRadius: "16px",
                transition: "all 0.25s ease",
                "&:hover": {
                  backgroundColor: "rgba(56,189,248,0.06)",
                  transform: "translateX(4px)",
                },
              }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                sx={{
                  "& .MuiBadge-dot": {
                    backgroundColor: doc.online ? "#4ADE80" : "#64748B",
                    boxShadow: "0 0 0 2px #111C33",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 46,
                    height: 46,
                    bgcolor: "rgba(224,145,172,0.15)",
                    color: "#E091AC",
                    fontWeight: 700,
                  }}
                >
                  {initials(doc.name)}
                </Avatar>
              </Badge>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ color: "#F8FAFC", fontWeight: 600, fontSize: "14px" }} noWrap>
                  {doc.name}
                </Typography>
                <Typography sx={{ color: "#38BDF8", fontSize: "12.5px", fontWeight: 500 }}>
                  {doc.department}
                </Typography>
                <Typography sx={{ color: "#94A3B8", fontSize: "12px", mt: 0.25 }}>
                  {doc.availability}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: "11.5px",
                  fontWeight: 700,
                  color: doc.online ? "#4ADE80" : "#64748B",
                  flexShrink: 0,
                }}
              >
                {doc.online ? "Online" : "Offline"}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}

export default DoctorAvailability;