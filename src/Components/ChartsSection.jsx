import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const patientRegistrations = [
  { month: "Jan", patients: 210 },
  { month: "Feb", patients: 268 },
  { month: "Mar", patients: 302 },
  { month: "Apr", patients: 275 },
  { month: "May", patients: 340 },
  { month: "Jun", patients: 398 },
  { month: "Jul", patients: 356 },
];

const appointmentTrends = [
  { day: "Mon", scheduled: 42, completed: 36 },
  { day: "Tue", scheduled: 51, completed: 44 },
  { day: "Wed", scheduled: 39, completed: 33 },
  { day: "Thu", scheduled: 58, completed: 49 },
  { day: "Fri", scheduled: 63, completed: 55 },
  { day: "Sat", scheduled: 34, completed: 30 },
  { day: "Sun", scheduled: 21, completed: 19 },
];

const revenueOverview = [
  { month: "Jan", revenue: 4.1 },
  { month: "Feb", revenue: 4.8 },
  { month: "Mar", revenue: 5.3 },
  { month: "Apr", revenue: 5.0 },
  { month: "May", revenue: 6.2 },
  { month: "Jun", revenue: 7.1 },
  { month: "Jul", revenue: 8.4 },
];

const departmentDistribution = [
  { name: "Cardiology", value: 320 },
  { name: "Neurology", value: 210 },
  { name: "Orthopedics", value: 265 },
  { name: "Pediatrics", value: 190 },
  { name: "Dermatology", value: 140 },
];

const PIE_COLORS = ["#38BDF8", "#E091AC", "#818CF8", "#4ADE80", "#FBBF24"];

const chartCardSx = {
  width: "100%",
  p: 3,
  borderRadius: 4, // 16px
  bgcolor: "#111C33",
  border: "1px solid rgba(56,189,248,0.1)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minHeight: 380,
  transition: "0.25s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    borderColor: "#38BDF8",
    boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
  },
};

const chartTitleSx = {
  color: "#F8FAFC",
  fontWeight: 700,
  fontSize: "17px",
  mb: 2,
};

const chartBodySx = {
  flex: 1,
  minHeight: 280,
};

const tooltipStyle = {
  contentStyle: {
    backgroundColor: "#1A2740",
    border: "1px solid rgba(56,189,248,0.2)",
    borderRadius: "10px",
    color: "#F8FAFC",
  },
  labelStyle: { color: "#94A3B8" },
};

const axisProps = { stroke: "#94A3B8", fontSize: 12 };
const gridProps = { strokeDasharray: "3 3", stroke: "rgba(148,163,184,0.1)" };

function ChartCard({ title, children }) {
  return (
    <Grid item xs={12} lg={6} sx={{ display: "flex" }}>
      <Card sx={chartCardSx}>
        <Typography sx={chartTitleSx}>{title}</Typography>
        <Box sx={chartBodySx}>
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </Box>
      </Card>
    </Grid>
  );
}

function ChartsSection() {
  return (
    <Grid container spacing={3} alignItems="stretch">
      {/* Monthly Patient Registrations */}
      <ChartCard title="Monthly Patient Registrations">
        <AreaChart data={patientRegistrations}>
          <defs>
            <linearGradient id="patientFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="month" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip {...tooltipStyle} />
          <Area
            type="monotone"
            dataKey="patients"
            stroke="#38BDF8"
            strokeWidth={2.5}
            fill="url(#patientFill)"
          />
        </AreaChart>
      </ChartCard>

      {/* Appointment Trends */}
      <ChartCard title="Appointment Trends">
        <LineChart data={appointmentTrends}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="day" {...axisProps} />
          <YAxis {...axisProps} />
          <Tooltip {...tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: "12px", color: "#94A3B8" }} />
          <Line
            type="monotone"
            dataKey="scheduled"
            stroke="#38BDF8"
            strokeWidth={2.5}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="completed"
            stroke="#E091AC"
            strokeWidth={2.5}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ChartCard>

      {/* Revenue Overview */}
      <ChartCard title="Revenue Overview">
        <BarChart data={revenueOverview}>
          <CartesianGrid {...gridProps} />
          <XAxis dataKey="month" {...axisProps} />
          <YAxis {...axisProps} tickFormatter={(v) => `₹${v}L`} />
          <Tooltip {...tooltipStyle} formatter={(v) => [`₹${v}L`, "Revenue"]} />
          <Bar dataKey="revenue" fill="#E091AC" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ChartCard>

      {/* Department-wise Distribution */}
      <ChartCard title="Department-wise Patient Distribution">
        <PieChart>
          <Pie
            data={departmentDistribution}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={3}
          >
            {departmentDistribution.map((entry, index) => (
              <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip {...tooltipStyle} />
          <Legend
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ color: "#94A3B8", fontSize: 12, paddingTop: 20 }}
          />
        </PieChart>
      </ChartCard>
    </Grid>
  );
}

export default ChartsSection;