import { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

// day -> marker color (demo data): blue = appointment, pink = hospital event
const markers = {
  3: "#38BDF8",
  8: "#E091AC",
  12: "#38BDF8",
  15: "#38BDF8",
  19: "#E091AC",
  22: "#38BDF8",
  27: "#38BDF8",
};

function CalendarWidget() {
  const [cursor, setCursor] = useState(new Date());
  const today = new Date();

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isToday = (d) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  const changeMonth = (delta) => {
    setCursor(new Date(year, month + delta, 1));
  };

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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography sx={{ color: "#F8FAFC", fontWeight: 700, fontSize: "17px" }}>
          {cursor.toLocaleString("default", { month: "long" })} {year}
        </Typography>
        <Box>
          <IconButton size="small" onClick={() => changeMonth(-1)} sx={{ color: "#94A3B8" }}>
            <ChevronLeftRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => changeMonth(1)} sx={{ color: "#94A3B8" }}>
            <ChevronRightRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 0.5, mb: 1 }}>
        {WEEKDAYS.map((w, i) => (
          <Typography
            key={w + i}
            align="center"
            sx={{ color: "#64748B", fontSize: "11.5px", fontWeight: 700 }}
          >
            {w}
          </Typography>
        ))}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 0.5 }}>
        {cells.map((d, idx) => (
          <Box
            key={idx}
            sx={{
              position: "relative",
              aspectRatio: "1 / 1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              fontSize: "12.5px",
              fontWeight: d && isToday(d) ? 800 : 500,
              color: !d ? "transparent" : isToday(d) ? "#0F172A" : "#CBD5E1",
              backgroundColor: d && isToday(d) ? "#38BDF8" : "transparent",
              cursor: d ? "pointer" : "default",
              transition: "all 0.2s ease",
              "&:hover": d
                ? { backgroundColor: isToday(d) ? "#38BDF8" : "rgba(56,189,248,0.1)" }
                : {},
            }}
          >
            {d || "."}
            {d && markers[d] && (
              <Tooltip title={markers[d] === "#38BDF8" ? "Appointment" : "Hospital event"}>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 4,
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    backgroundColor: isToday(d) ? "#0F172A" : markers[d],
                  }}
                />
              </Tooltip>
            )}
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex", gap: 2.5, mt: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#38BDF8" }} />
          <Typography sx={{ color: "#94A3B8", fontSize: "12px" }}>Appointments</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#E091AC" }} />
          <Typography sx={{ color: "#94A3B8", fontSize: "12px" }}>Hospital Events</Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default CalendarWidget;