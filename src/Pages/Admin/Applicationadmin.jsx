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
  MenuItem,
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
  Tooltip,
  Typography,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
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
  confirmed: "#3B82F6",
  completed: "#22C55E",
  cancelled: "#6B7280",
  rejected: "#EF4444",
  rescheduled: "#8B5CF6",
};

const STATUS_OPTIONS = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
  "Rejected",
  "Rescheduled",
];

const statusColor = (status) => {
  switch ((status || "Pending").toLowerCase()) {
    case "confirmed":
      return COLORS.confirmed;
    case "completed":
      return COLORS.completed;
    case "cancelled":
      return COLORS.cancelled;
    case "rejected":
      return COLORS.rejected;
    case "rescheduled":
      return COLORS.rescheduled;
    default:
      return COLORS.pending;
  }
};
// Convert a date value (ISO string / Date) into yyyy-MM-dd for date inputs
const toDateInputValue = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
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

  // ---- Edit dialog state -----------------------------------------------
  const [editApp, setEditApp] = useState(null);
  const [editForm, setEditForm] = useState({ status: "Pending", date: "", time: "" });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

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

  // ---- Edit handlers -----------------------------------------------------
  const openEdit = (app) => {
    setEditApp(app);
    setEditForm({
      status: app.status || "Pending",
      date: toDateInputValue(app.date),
      time: app.time || "",
    });
    setSaveError("");
  };

  const closeEdit = () => {
    if (saving) return;
    setEditApp(null);
    setSaveError("");
  };

  const handleEditChange = (field) => (e) => {
    setEditForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSaveEdit = async () => {
    if (!editApp) return;
    setSaving(true);
    setSaveError("");
    try {
      const payload = {
        status: editForm.status,
        date: editForm.date,
        time: editForm.time,
      };
      const response = await API.put(`applications/${editApp._id}`, payload);
      const updated = response?.data || { ...editApp, ...payload };

      setApplications((prev) =>
        prev.map((a) => (a._id === editApp._id ? { ...a, ...updated } : a))
      );

      // Keep the view dialog in sync if the same appointment is open there
      setSelected((prev) => (prev && prev._id === editApp._id ? { ...prev, ...updated } : prev));

      setEditApp(null);
    } catch (error) {
      console.error("Failed to update appointment:", error);
      setSaveError("Couldn't save changes. Please try again.");
    } finally {
      setSaving(false);
    }
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
                      <Stack direction="row" spacing={0.5} justifyContent="center">
                        <Tooltip title="View">
                          <IconButton
                            size="small"
                            onClick={() => setSelected(app)}
                            sx={{
                              color: COLORS.primary,
                              border: `1px solid ${COLORS.primary}55`,
                              borderRadius: "10px",
                              "&:hover": {
                                bgcolor: `${COLORS.primary}1a`,
                                borderColor: COLORS.primary,
                              },
                            }}
                          >
                            <VisibilityRoundedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            onClick={() => openEdit(app)}
                            sx={{
                              color: COLORS.secondary,
                              border: `1px solid ${COLORS.secondary}55`,
                              borderRadius: "10px",
                              "&:hover": {
                                bgcolor: `${COLORS.secondary}1a`,
                                borderColor: COLORS.secondary,
                              },
                            }}
                          >
                            <EditRoundedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
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

      {/* Edit appointment dialog */}
      <Dialog
        open={Boolean(editApp)}
        onClose={closeEdit}
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
          Edit Appointment
          <IconButton onClick={closeEdit} sx={{ color: COLORS.subtext }} disabled={saving}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <Divider sx={{ borderColor: COLORS.border }} />

        {editApp && (
          <DialogContent sx={{ pt: 3 }}>
            <Stack spacing={2.5}>
              <Box>
                <Typography sx={{ color: COLORS.subtext, fontSize: 13, mb: 0.5 }}>
                  Patient
                </Typography>
                <Typography sx={{ color: COLORS.text, fontWeight: 600 }}>
                  {editApp.name} · {editApp.email}
                </Typography>
              </Box>

              <TextField
                select
                fullWidth
                label="Status"
                value={editForm.status}
                onChange={handleEditChange("status")}
                sx={textFieldStyle}
                slotProps={{
                  select: {
                    MenuProps: {
                      slotProps: {
                        paper: {
                          sx: {
                            bgcolor: COLORS.card,
                            color: COLORS.text,
                            "& .MuiMenuItem-root:hover": {
                              bgcolor: `${COLORS.primary}22`,
                            },
                          },
                        },
                      },
                    },
                  },
                }}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  value={editForm.date}
                  onChange={handleEditChange("date")}
                  sx={textFieldStyle}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
                <TextField
                  fullWidth
                  type="time"
                  label="Time"
                  value={editForm.time}
                  onChange={handleEditChange("time")}
                  sx={textFieldStyle}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Stack>

              {saveError && (
                <Typography sx={{ color: COLORS.rejected, fontSize: 13 }}>
                  {saveError}
                </Typography>
              )}
            </Stack>
          </DialogContent>
        )}

        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={closeEdit}
            disabled={saving}
            sx={{
              color: COLORS.subtext,
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveEdit}
            disabled={saving}
            variant="contained"
            sx={{
              bgcolor: COLORS.primary,
              textTransform: "none",
              borderRadius: "20px",
              px: 3,
              "&:hover": { bgcolor: "#4FA5CE" },
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}