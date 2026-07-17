import React, { useState } from "react";

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
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const initialDoctors = [
  {
    id: 1,
    name: "Dr. Priya Nair",
    department: "Cardiology",
    experience: "8 Years",
    phone: "9876543210",
    email: "priya@abicare.com",
    fee: "700",
    qualification: "MD Cardiology",
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Rohan Das",
    department: "Neurology",
    experience: "10 Years",
    phone: "9876543211",
    email: "rohan@abicare.com",
    fee: "900",
    qualification: "DM Neurology",
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. Meera Suresh",
    department: "Orthopedics",
    experience: "6 Years",
    phone: "9876543212",
    email: "meera@abicare.com",
    fee: "600",
    qualification: "MS Orthopedics",
    status: "On Leave",
  },
];

export default function Doctoresadmin() {
  const [doctors, setDoctors] = useState(initialDoctors);

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    qualification: "",
    experience: "",
    fee: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddDoctor = () => {
    setDoctors([
      ...doctors,
      {
        id: doctors.length + 1,
        ...form,
      },
    ]);

    setForm({
      name: "",
      email: "",
      phone: "",
      department: "",
      qualification: "",
      experience: "",
      fee: "",
      status: "Active",
    });

    setOpen(false);
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#F8FAFC",
              fontWeight: 700,
              fontSize: 28,
            }}
          >
            Doctors
          </Typography>

          <Typography sx={{ color: "#94A3B8" }}>
            Manage all doctors in ABI CARE
          </Typography>
        </Box>

        <Button
          startIcon={<AddRoundedIcon />}
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{
            bgcolor: "#38BDF8",
            color: "#fff",
            textTransform: "none",
            borderRadius: 3,
            px: 3,
            "&:hover": {
              bgcolor: "#0EA5E9",
            },
          }}
        >
          Add Doctor
        </Button>
      </Box>

      <Card
        sx={{
          bgcolor: "#111C33",
          borderRadius: 4,
          p: 3,
          border: "1px solid rgba(56,189,248,0.1)",
        }}
      >

        <TextField
          fullWidth
          placeholder="Search Doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <SearchRoundedIcon sx={{ mr: 1 }} />,
          }}
          sx={{
            mb: 3,
            input: {
              color: "white",
            },
          }}
        />

        <TableContainer component={Paper} sx={{ bgcolor: "transparent", boxShadow: "none" }}>
          <Table>

            <TableHead>

              <TableRow>

                <TableCell sx={{ color: "#38BDF8" }}>Doctor</TableCell>

                <TableCell sx={{ color: "#38BDF8" }}>Department</TableCell>

                <TableCell sx={{ color: "#38BDF8" }}>Experience</TableCell>

                <TableCell sx={{ color: "#38BDF8" }}>Phone</TableCell>

                <TableCell sx={{ color: "#38BDF8" }}>Status</TableCell>

                <TableCell align="center" sx={{ color: "#38BDF8" }}>
                  Actions
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {filteredDoctors.map((doctor) => (

                <TableRow key={doctor.id}>

                  <TableCell sx={{ color: "white" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
<Avatar sx={{ bgcolor: "#38BDF8" }}>
  {doctor.name.split(" ")[1]?.charAt(0) || doctor.name.charAt(0)}
</Avatar>

                      {doctor.name}
                    </Box>
                  </TableCell>

                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {doctor.department}
                  </TableCell>

                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {doctor.experience}
                  </TableCell>

                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {doctor.phone}
                  </TableCell>

                  <TableCell>

                    <Chip
                      label={doctor.status}
                      color={
                        doctor.status === "Active"
                          ? "success"
                          : "warning"
                      }
                    />

                  </TableCell>

                  <TableCell align="center">

                    <IconButton color="primary">
                      <EditRoundedIcon />
                    </IconButton>

                    <IconButton color="error">
                      <DeleteRoundedIcon />
                    </IconButton>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>

      </Card>

            {/* Add Doctor Dialog */}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            bgcolor: "#111C33",
            borderRadius: 4,
            color: "#fff",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: 24,
            color: "#38BDF8",
          }}
        >
          Add New Doctor
        </DialogTitle>

        <DialogContent>

          <Grid container spacing={3} sx={{ mt: 1 }}>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Doctor Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Department"
                name="department"
                value={form.department}
                onChange={handleChange}
              >
                <MenuItem value="Cardiology">
                  Cardiology
                </MenuItem>

                <MenuItem value="Neurology">
                  Neurology
                </MenuItem>

                <MenuItem value="Orthopedics">
                  Orthopedics
                </MenuItem>

                <MenuItem value="Pediatrics">
                  Pediatrics
                </MenuItem>

                <MenuItem value="Dermatology">
                  Dermatology
                </MenuItem>

                <MenuItem value="General Medicine">
                  General Medicine
                </MenuItem>

              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Qualification"
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Experience"
                name="experience"
                placeholder="Eg: 8 Years"
                value={form.experience}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Consultation Fee"
                name="fee"
                value={form.fee}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <MenuItem value="Active">
                  Active
                </MenuItem>

                <MenuItem value="On Leave">
                  On Leave
                </MenuItem>

              </TextField>
            </Grid>

          </Grid>

        </DialogContent>

        <DialogActions sx={{ p: 3 }}>

          <Button
            onClick={() => setOpen(false)}
            sx={{
              color: "#94A3B8",
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleAddDoctor}
            sx={{
              bgcolor: "#38BDF8",
              textTransform: "none",
              px: 3,
              borderRadius: 3,
              "&:hover": {
                bgcolor: "#0EA5E9",
              },
            }}
          >
            Add Doctor
          </Button>

        </DialogActions>

      </Dialog>

          </Box>
  );
}