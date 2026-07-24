import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api/axios";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import EventBusyRoundedIcon from "@mui/icons-material/EventBusyRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

// ---- Theme tokens (matches the rest of the app) ---------------------------
const COLORS = {
  bg: "#0F172A",
  card: "#1E293B",
  primary: "#6BBAE0",
  secondary: "#E091AC",
  text: "#F8FAFC",
  subtext: "#94A3B8",
  border: "rgba(148,163,184,0.12)",
};

const STATUS_STYLES = {
  pending: { color: "#F59E0B", label: "Pending" },
  confirmed: { color: "#3B82F6", label: "Confirmed" },
  completed: { color: "#22C55E", label: "Completed" },
  cancelled: { color: "#94A3B8", label: "Cancelled" },
  rejected: { color: "#EF4444", label: "Rejected" },
  rescheduled: { color: "#A78BFA", label: "Rescheduled" },
};

function StatusChip({ status }) {
  const key = (status || "pending").toLowerCase();
  const style = STATUS_STYLES[key] || STATUS_STYLES.pending;
  return (
    <Chip
      label={style.label}
      size="small"
      sx={{
        bgcolor: `${style.color}22`,
        color: style.color,
        fontWeight: 600,
        border: `1px solid ${style.color}55`,
      }}
    />
  );
}

function AppointmentCard({ appointment }) {
  return (
    <Card
      sx={{
        bgcolor: COLORS.card,
        borderRadius: "16px",
        p: 2.5,
        border: `1px solid ${COLORS.border}`,
        height: "100%",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: `0 12px 28px -14px ${COLORS.primary}55`,
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
        <Typography sx={{ color: COLORS.text, fontWeight: 700, fontSize: 16 }}>
          {appointment.doctor?.name || "Doctor Not Assigned"}
        </Typography>
        <StatusChip status={appointment.status} />
      </Stack>

      <Stack spacing={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <LocalHospitalRoundedIcon sx={{ fontSize: 18, color: COLORS.primary }} />
          <Typography sx={{ color: COLORS.subtext, fontSize: 14 }}>
            {appointment.department?.name || "—"}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <CalendarMonthRoundedIcon sx={{ fontSize: 18, color: COLORS.primary }} />
          <Typography sx={{ color: COLORS.subtext, fontSize: 14 }}>
            {appointment.date ? new Date(appointment.date).toLocaleDateString() : "—"}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <AccessTimeRoundedIcon sx={{ fontSize: 18, color: COLORS.primary }} />
          <Typography sx={{ color: COLORS.subtext, fontSize: 14 }}>
            {appointment.time || "—"}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default function UserProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoadingProfile(true);
      try {
        const res = await API.get("users/profile");
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Couldn't load your profile. Please try logging in again.");
      } finally {
        setLoadingProfile(false);
      }
    };

    const fetchAppointments = async () => {
      setLoadingAppointments(true);
      try {
        const res = await API.get("applications/my");
        setAppointments(res.data || []);
      } catch (err) {
        console.error("Failed to load appointments:", err);
        setAppointments([]);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchProfile();
    fetchAppointments();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const displayName = profile
    ? [profile.firstName, profile.lastName].filter(Boolean).join(" ") || profile.name
    : "";
  const initials = displayName
    ? displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <Box sx={{ bgcolor: COLORS.bg, minHeight: "100vh", p: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ maxWidth: 960, mx: "auto" }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ color: COLORS.text, fontWeight: 700, fontSize: { xs: 22, sm: 28 } }}>
            My Profile
          </Typography>
          <Typography sx={{ color: COLORS.subtext, mt: 0.5 }}>
            View your account details and appointment history
          </Typography>
        </Box>

        {error && (
          <Card
            sx={{
              bgcolor: COLORS.card,
              border: "1px solid #EF444455",
              borderRadius: "14px",
              p: 2,
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <ErrorOutlineRoundedIcon sx={{ color: "#EF4444" }} />
            <Typography sx={{ color: COLORS.text, fontSize: 14 }}>{error}</Typography>
          </Card>
        )}

        {/* Profile card */}
        {loadingProfile ? (
          <Skeleton
            variant="rounded"
            height={130}
            sx={{ bgcolor: "rgba(148,163,184,0.08)", borderRadius: "16px", mb: 4 }}
          />
        ) : (
          profile && (
            <Card
              sx={{
                bgcolor: COLORS.card,
                borderRadius: "16px",
                p: { xs: 2.5, sm: 3.5 },
                border: `1px solid ${COLORS.border}`,
                mb: 4,
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2.5}
                alignItems={{ xs: "flex-start", sm: "center" }}
              >
                <Avatar
                  sx={{
                    bgcolor: `${COLORS.primary}22`,
                    color: COLORS.primary,
                    width: 72,
                    height: 72,
                    fontSize: 26,
                    fontWeight: 700,
                    border: `2px solid ${COLORS.primary}55`,
                  }}
                >
                  {initials}
                </Avatar>

                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ color: COLORS.text, fontWeight: 700, fontSize: 20 }}>
                    {displayName || "—"}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.75 }}>
                    <EmailRoundedIcon sx={{ fontSize: 18, color: COLORS.subtext }} />
                    <Typography sx={{ color: COLORS.subtext, fontSize: 14 }}>
                      {profile.email}
                    </Typography>
                  </Stack>

                  {profile.role && (
                    <Chip
                      icon={<PersonRoundedIcon sx={{ fontSize: 16, color: `${COLORS.primary} !important` }} />}
                      label={profile.role}
                      size="small"
                      sx={{
                        mt: 1.5,
                        bgcolor: `${COLORS.primary}1a`,
                        color: COLORS.primary,
                        textTransform: "capitalize",
                        fontWeight: 600,
                        border: `1px solid ${COLORS.primary}44`,
                      }}
                    />
                  )}
                </Box>
              </Stack>
            </Card>
          )
        )}

        {/* Appointment history */}
        <Typography sx={{ color: COLORS.text, fontWeight: 700, fontSize: 18, mb: 2 }}>
          Appointment History
        </Typography>

        {loadingAppointments ? (
          <Grid container spacing={2.5}>
            {[...Array(3)].map((_, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                <Skeleton
                  variant="rounded"
                  height={160}
                  sx={{ bgcolor: "rgba(148,163,184,0.08)", borderRadius: "16px" }}
                />
              </Grid>
            ))}
          </Grid>
        ) : appointments.length === 0 ? (
          <Card
            sx={{
              bgcolor: COLORS.card,
              borderRadius: "16px",
              border: `1px solid ${COLORS.border}`,
              p: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Avatar
              sx={{
                bgcolor: `${COLORS.primary}1a`,
                color: COLORS.primary,
                width: 64,
                height: 64,
                mb: 2,
              }}
            >
              <EventBusyRoundedIcon sx={{ fontSize: 34 }} />
            </Avatar>
            <Typography sx={{ color: COLORS.text, fontWeight: 600, fontSize: 17 }}>
              You haven't booked any appointments yet.
            </Typography>
            <Typography sx={{ color: COLORS.subtext, fontSize: 14, mt: 0.75 }}>
              Once you book an appointment, it will show up here.
            </Typography>
          </Card>
        ) : (
          <Grid container spacing={2.5}>
            {appointments.map((appointment) => (
              <Grid key={appointment._id} size={{ xs: 12, sm: 6, md: 4 }}>
                <AppointmentCard appointment={appointment} />
              </Grid>
            ))}
          </Grid>
        )}

        <Divider sx={{ borderColor: COLORS.border, my: 5 }} />

        {/* Logout */}
        <Stack alignItems="center">
          <Button
            onClick={handleLogout}
            variant="contained"
            startIcon={<LogoutRoundedIcon />}
            sx={{
              bgcolor: "#EF4444",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "24px",
              px: 4,
              py: 1.2,
              "&:hover": { bgcolor: "#DC2626" },
            }}
          >
            Logout
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

// -----------------------------------------------------------------------
// Route wiring reminder: whatever component guards your protected routes
// (e.g. a <PrivateRoute> or <ProtectedRoute> wrapper checking for a token
// in localStorage) should also wrap this page's route, e.g.:
//
//   <Route path="/profile" element={
//     <ProtectedRoute><UserProfile /></ProtectedRoute>
//   } />
//
// so that once handleLogout() clears the token, navigating anywhere else
// protected redirects back to /login automatically.
// -----------------------------------------------------------------------