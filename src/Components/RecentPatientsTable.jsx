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

const patients = [
  { name: "Aarav Mehta", age: 34, gender: "Male", doctor: "Dr. Priya Nair", status: "Active", lastVisit: "12 Jul 2026" },
  { name: "Sneha Iyer", age: 27, gender: "Female", doctor: "Dr. Rohan Das", status: "Active", lastVisit: "14 Jul 2026" },
  { name: "Karthik Raja", age: 45, gender: "Male", doctor: "Dr. Meera Suresh", status: "Discharged", lastVisit: "02 Jul 2026" },
  { name: "Divya Prakash", age: 8, gender: "Female", doctor: "Dr. Arjun Kapoor", status: "Active", lastVisit: "16 Jul 2026" },
  { name: "Vikram Shetty", age: 52, gender: "Male", doctor: "Dr. Priya Nair", status: "Discharged", lastVisit: "09 Jul 2026" },
];

const statusColor = {
  Active: { bg: "rgba(74,222,128,0.14)", color: "#4ADE80" },
  Discharged: { bg: "rgba(148,163,184,0.14)", color: "#94A3B8" },
};

function initials(name) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("");
}

function RecentPatientsTable() {
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
      <Typography sx={{ color: "#F8FAFC", fontWeight: 700, fontSize: "17px", mb: 2 }}>
        Recent Patients
      </Typography>

      <TableContainer sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 640 }}>
          <TableHead>
            <TableRow>
              {["Patient", "Age", "Gender", "Assigned Doctor", "Status", "Last Visit"].map((head) => (
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
            {patients.map((p) => (
              <TableRow
                key={p.name}
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
                        bgcolor: "rgba(224,145,172,0.15)",
                        color: "#E091AC",
                        fontWeight: 700,
                      }}
                    >
                      {initials(p.name)}
                    </Avatar>
                    <Typography sx={{ color: "#F8FAFC", fontSize: "14px", fontWeight: 500 }}>
                      {p.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: "#CBD5E1", fontSize: "14px" }}>{p.age}</TableCell>
                <TableCell sx={{ color: "#CBD5E1", fontSize: "14px" }}>{p.gender}</TableCell>
                <TableCell sx={{ color: "#CBD5E1", fontSize: "14px" }}>{p.doctor}</TableCell>
                <TableCell>
                  <Chip
                    label={p.status}
                    size="small"
                    sx={{
                      backgroundColor: statusColor[p.status].bg,
                      color: statusColor[p.status].color,
                      fontWeight: 700,
                      fontSize: "12px",
                      borderRadius: "999px",
                    }}
                  />
                </TableCell>
                <TableCell sx={{ color: "#CBD5E1", fontSize: "14px" }}>{p.lastVisit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default RecentPatientsTable;