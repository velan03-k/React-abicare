import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

const appointments = [
  { patient: "Aarav Mehta", doctor: "Dr. Priya Nair", department: "Cardiology", time: "09:30 AM", status: "Scheduled" },
  { patient: "Sneha Iyer", doctor: "Dr. Rohan Das", department: "Neurology", time: "10:15 AM", status: "Completed" },
  { patient: "Karthik Raja", doctor: "Dr. Meera Suresh", department: "Orthopedics", time: "11:00 AM", status: "Scheduled" },
  { patient: "Divya Prakash", doctor: "Dr. Arjun Kapoor", department: "Pediatrics", time: "11:45 AM", status: "Cancelled" },
  { patient: "Vikram Shetty", doctor: "Dr. Priya Nair", department: "Cardiology", time: "01:30 PM", status: "Completed" },
  { patient: "Ananya Reddy", doctor: "Dr. Sanjay Gupta", department: "Dermatology", time: "02:15 PM", status: "Scheduled" },
];

const statusColor = {
  Scheduled: { bg: "rgba(56,189,248,0.14)", color: "#38BDF8" },
  Completed: { bg: "rgba(74,222,128,0.14)", color: "#4ADE80" },
  Cancelled: { bg: "rgba(248,113,113,0.14)", color: "#F87171" },
};

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

function AppointmentTable() {
  return (
    <Card
      sx={{
        borderRadius: "20px",
        backgroundColor: "#111C33",
        border: "1px solid rgba(56,189,248,0.1)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        p: 3,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography sx={{ color: "#F8FAFC", fontWeight: 700, fontSize: "17px" }}>
          Today's Appointments
        </Typography>
      </Box>

      <TableContainer sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 640 }}>
          <TableHead>
            <TableRow>
              {["Patient", "Doctor", "Department", "Time", "Status", ""].map((head) => (
                <TableCell
                  key={head}
                  sx={{
                    color: "#94A3B8",
                    fontWeight: 600,
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderBottom: "1px solid rgba(148,163,184,0.1)",
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appt) => (
              <TableRow
                key={appt.patient + appt.time}
                sx={{
                  transition: "background-color 0.2s ease",
                  "&:hover": { backgroundColor: "rgba(56,189,248,0.05)" },
                  "& td": { borderBottom: "1px solid rgba(148,163,184,0.06)" },
                }}
              >
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      sx={{
                        width: 34,
                        height: 34,
                        fontSize: "13px",
                        bgcolor: "rgba(56,189,248,0.15)",
                        color: "#38BDF8",
                        fontWeight: 700,
                      }}
                    >
                      {initials(appt.patient)}
                    </Avatar>
                    <Typography sx={{ color: "#F8FAFC", fontSize: "14px", fontWeight: 500 }}>
                      {appt.patient}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: "#CBD5E1", fontSize: "14px" }}>{appt.doctor}</TableCell>
                <TableCell sx={{ color: "#CBD5E1", fontSize: "14px" }}>{appt.department}</TableCell>
                <TableCell sx={{ color: "#CBD5E1", fontSize: "14px" }}>{appt.time}</TableCell>
                <TableCell>
                  <Chip
                    label={appt.status}
                    size="small"
                    sx={{
                      backgroundColor: statusColor[appt.status].bg,
                      color: statusColor[appt.status].color,
                      fontWeight: 700,
                      fontSize: "12px",
                      borderRadius: "999px",
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton size="small" sx={{ color: "#94A3B8" }}>
                    <MoreVertRoundedIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default AppointmentTable;