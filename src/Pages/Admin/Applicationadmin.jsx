import React, { useEffect, useMemo, useState } from "react";
import API from "../../Api/axios";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EventBusyRoundedIcon from "@mui/icons-material/EventBusyRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

// ---- Theme tokens ---------------------------------------------------------
const COLORS = {
  bg: "#0F172A",
  card: "#1E293B",
  primary: "#6BBAE0",
  secondary: "#E091AC",
  text: "#F8FAFC",
  subtext: "#94A3B8",
  border: "rgba(148,163,184,0.12)",
  pending: "#F59E0B",
  approved: "#22C55E",
  rejected: "#EF4444",
};

const statusColor = (status) => {
  switch ((status || "Pending").toLowerCase()) {
    case "approved":
      return COLORS.approved;
    case "rejected":
      return COLORS.rejected;
    default:
      return COLORS.pending;
  }
};

// ---- Summary card ----------------------------------------------------------
function SummaryCard({ title, value, accent, icon }) {
  return (
    <Card
      sx={{
        bgcolor: COLORS.card,
        borderRadius: "16px",
        p: 2.5,
        height: "100%",
        border: `1px solid ${COLORS.border}`,
        borderLeftWidth: "4px",
        borderLeftStyle: "solid",
        borderLeftColor: accent,
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: `0 12px 28px -12px ${accent}55`,
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography sx={{ color: COLORS.text, fontWeight: 700, fontSize: 32, lineHeight: 1.1 }}>
            {value}
          </Typography>
          <Typography sx={{ color: COLORS.subtext, fontSize: 14, mt: 0.5 }}>{title}</Typography>
        </Box>
        <Avatar sx={{ bgcolor: `${accent}22`, color: accent, width: 44, height: 44 }}>
          {icon}
        </Avatar>
      </Stack>
    </Card>
  );
}

// ---- Status chip -------------------------------------------------------
function StatusChip({ status }) {
  const color = statusColor(status);
  return (
    <Chip
      label={status || "Pending"}
      size="small"
      sx={{
        bgcolor: `${color}22`,
        color: color,
        fontWeight: 600,
        border: `1px solid ${color}55`,
      }}
    />
  );
}

// ---- Detail row for dialog ----------------------------------------------
function DetailRow({ icon, label, value }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start" sx={{ py: 1.25 }}>
      <Avatar sx={{ bgcolor: `${COLORS.primary}1f`, color: COLORS.primary, width: 34, height: 34 }}>
        {icon}
      </Avatar>
      <Box>
        <Typography sx={{ color: COLORS.subtext, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
          {label}
        </Typography>
        <Typography sx={{ color: COLORS.text, fontSize: 15, fontWeight: 500 }}>
          {value || "—"}
        </Typography>
      </Box>
    </Stack>
  );
}

export default function Appointmentadmin() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        const response = await API.get("applications");
        setApplications(response.data || []);
      } catch (error) {
        console.error("Failed to load appointment requests:", error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const counts = useMemo(() => {
    const total = applications.length;
    const pending = applications.filter(
      (a) => (a.status || "Pending").toLowerCase() === "pending"
    ).length;
    const approved = applications.filter(
      (a) => (a.status || "").toLowerCase() === "approved"
    ).length;
    const rejected = applications.filter(
      (a) => (a.status || "").toLowerCase() === "rejected"
    ).length;
    return { total, pending, approved, rejected };
  }, [applications]);

  const filteredApplications = useMemo(() => {
    const query = search.toLowerCase();
    return (applications || []).filter((app) => {
      const name = (app.name || "").toLowerCase();
      const email = (app.email || "").toLowerCase();
      const phone = String(app.phone || "").includes(search)
      return name.includes(query) || email.includes(query) ||String(phone).includes(query);
    });
  }, [applications, search]);

  const textFieldStyle = {
    "& .MuiInputLabel-root": { color: COLORS.subtext },
    "& .MuiInputLabel-root.Mui-focused": { color: COLORS.primary },
    "& .MuiOutlinedInput-root": {
      color: COLORS.text,
      borderRadius: "12px",
      "& fieldset": { borderColor: COLORS.border },
      "&:hover fieldset": { borderColor: COLORS.primary },
      "&.Mui-focused fieldset": { borderColor: COLORS.primary },
    },
    "& .MuiInputBase-input::placeholder": { color: COLORS.subtext, opacity: 1 },
    "& .MuiSvgIcon-root": { color: COLORS.subtext },
  };

  return (
    <Box sx={{ bgcolor: COLORS.bg, minHeight: "100vh", p: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ color: COLORS.text, fontWeight: 700, fontSize: { xs: 22, sm: 28 } }}>
          Appointment Requests
        </Typography>
        <Typography sx={{ color: COLORS.subtext, mt: 0.5 }}>
          View appointment requests submitted by patients
        </Typography>
      </Box>

      {/* Summary cards */}
      <Grid container spacing={2.5} sx={{ mb: 3.5 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {loading ? (
            <Skeleton variant="rounded" height={104} sx={{ bgcolor: "rgba(148,163,184,0.08)", borderRadius: "16px" }} />
          ) : (
            <SummaryCard
              title="Total Appointments"
              value={counts.total}
              accent={COLORS.primary}
              icon={<EventNoteRoundedIcon />}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {loading ? (
            <Skeleton variant="rounded" height={104} sx={{ bgcolor: "rgba(148,163,184,0.08)", borderRadius: "16px" }} />
          ) : (
            <SummaryCard
              title="Pending"
              value={counts.pending}
              accent={COLORS.pending}
              icon={<HourglassEmptyRoundedIcon />}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {loading ? (
            <Skeleton variant="rounded" height={104} sx={{ bgcolor: "rgba(148,163,184,0.08)", borderRadius: "16px" }} />
          ) : (
            <SummaryCard
              title="Approved"
              value={counts.approved}
              accent={COLORS.approved}
              icon={<CheckCircleRoundedIcon />}
            />
          )}
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          {loading ? (
            <Skeleton variant="rounded" height={104} sx={{ bgcolor: "rgba(148,163,184,0.08)", borderRadius: "16px" }} />
          ) : (
            <SummaryCard
              title="Rejected"
              value={counts.rejected}
              accent={COLORS.rejected}
              icon={<CancelRoundedIcon />}
            />
          )}
        </Grid>
      </Grid>

      {/* Table card */}
   <Card
  sx={{
    mt: 10, // 👈 Adds space above the table card
    bgcolor: COLORS.card,
    borderRadius: "16px",
    p: { xs: 2, sm: 3 },
    border: `1px solid ${COLORS.border}`,
  }}
>
        <TextField
          fullWidth
          placeholder="Search by name, email, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2.5, ...textFieldStyle }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        {loading ? (
          <Stack spacing={1.2}>
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                height={52}
                sx={{ bgcolor: "rgba(148,163,184,0.08)", borderRadius: "10px" }}
              />
            ))}
          </Stack>
        ) : filteredApplications.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
              textAlign: "center",
            }}
          >
            <Avatar sx={{ bgcolor: `${COLORS.primary}1a`, color: COLORS.primary, width: 64, height: 64, mb: 2 }}>
              <EventBusyRoundedIcon sx={{ fontSize: 34 }} />
            </Avatar>
            <Typography sx={{ color: COLORS.text, fontWeight: 600, fontSize: 18 }}>
              No Appointment Requests Found
            </Typography>
            <Typography sx={{ color: COLORS.subtext, fontSize: 14, mt: 0.5 }}>
              New requests submitted by patients will appear here.
            </Typography>
          </Box>
        ) : (
          <TableContainer
            component={Paper}
            sx={{
              bgcolor: "transparent",
              boxShadow: "none",
              maxHeight: 560,
              borderRadius: "12px",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {[
                    "Patient Name",
                    "Email",
                    "Phone",
                    "Department",
                    "Doctor",
                    "Preferred Date",
                    "Preferred Time",
                    "Reason",
                    "Status",
                    "Action",
                  ].map((head) => (
                    <TableCell
                      key={head}
                      align={head === "Action" ? "center" : "left"}
                      sx={{
                        bgcolor: COLORS.card,
                        color: COLORS.primary,
                        fontWeight: 600,
                        borderBottom: `1px solid ${COLORS.border}`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredApplications.map((app) => (
                  <TableRow
                    key={app._id}
                    sx={{
                      transition: "background-color 0.2s ease",
                      "&:hover": { bgcolor: "rgba(107,186,224,0.06)" },
                    }}
                  >
                    <TableCell sx={{ color: COLORS.text, borderBottom: `1px solid ${COLORS.border}` }}>
                      {app.name}
                    </TableCell>
                    <TableCell sx={{ color: COLORS.subtext, borderBottom: `1px solid ${COLORS.border}` }}>
                      {app.email}
                    </TableCell>
                    <TableCell sx={{ color: COLORS.subtext, borderBottom: `1px solid ${COLORS.border}` }}>
                      {app.phone}
                    </TableCell>
                    <TableCell sx={{ color: COLORS.subtext, borderBottom: `1px solid ${COLORS.border}` }}>
                      {app.department?.name || "—"}
                    </TableCell>
                    <TableCell sx={{ color: COLORS.subtext, borderBottom: `1px solid ${COLORS.border}` }}>
                      {app.doctor?.name || "Not Assigned"}
                    </TableCell>
                    <TableCell sx={{ color: COLORS.subtext, borderBottom: `1px solid ${COLORS.border}`, whiteSpace: "nowrap" }}>
                      {app.date ? new Date(app.date).toLocaleDateString() : "—"}
                    </TableCell>
                    <TableCell sx={{ color: COLORS.subtext, borderBottom: `1px solid ${COLORS.border}`, whiteSpace: "nowrap" }}>
                      {app.time || "—"}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: COLORS.subtext,
                        borderBottom: `1px solid ${COLORS.border}`,
                        maxWidth: 220,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {app.message || "—"}
                    </TableCell>
                    <TableCell sx={{ borderBottom: `1px solid ${COLORS.border}` }}>
                      <StatusChip status={app.status} />
                    </TableCell>
                    <TableCell align="center" sx={{ borderBottom: `1px solid ${COLORS.border}` }}>
                      <Button
                        size="small"
                        startIcon={<VisibilityRoundedIcon />}
                        onClick={() => setSelected(app)}
                        sx={{
                          color: COLORS.primary,
                          textTransform: "none",
                          fontWeight: 600,
                          borderRadius: "20px",
                          px: 1.8,
                          border: `1px solid ${COLORS.primary}55`,
                          "&:hover": {
                            bgcolor: `${COLORS.primary}1a`,
                            borderColor: COLORS.primary,
                          },
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      {/* View details dialog */}
      <Dialog
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              bgcolor: COLORS.card,
              borderRadius: "16px",
              color: COLORS.text,
              border: `1px solid ${COLORS.border}`,
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontWeight: 700,
            fontSize: 20,
            color: COLORS.text,
          }}
        >
          Appointment Details
          <IconButton onClick={() => setSelected(null)} sx={{ color: COLORS.subtext }}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <Divider sx={{ borderColor: COLORS.border }} />

        {selected && (
          <DialogContent sx={{ pt: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <StatusChip status={selected.status} />
            </Stack>

            <DetailRow icon={<PersonRoundedIcon fontSize="small" />} label="Patient Name" value={selected.name} />
            <DetailRow icon={<EmailRoundedIcon fontSize="small" />} label="Email" value={selected.email} />
            <DetailRow icon={<PhoneRoundedIcon fontSize="small" />} label="Phone" value={selected.phone} />
            <DetailRow
              icon={<LocalHospitalRoundedIcon fontSize="small" />}
              label="Department"
              value={selected.department?.name}
            />
            <DetailRow
              icon={<MedicalServicesRoundedIcon fontSize="small" />}
              label="Doctor"
              value={selected.doctor?.name || "Not Assigned"}
            />
            <DetailRow
              icon={<CalendarMonthRoundedIcon fontSize="small" />}
              label="Date"
              value={selected.date ? new Date(selected.date).toLocaleDateString() : "—"}
            />
            <DetailRow icon={<AccessTimeRoundedIcon fontSize="small" />} label="Time" value={selected.time} />
            <DetailRow
              icon={<ChatBubbleOutlineRoundedIcon fontSize="small" />}
              label="Reason for Visit"
              value={selected.message}
            />
          </DialogContent>
        )}

        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={() => setSelected(null)}
            variant="contained"
            sx={{
              bgcolor: COLORS.primary,
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              "&:hover": { bgcolor: "#4FA5CE" },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}