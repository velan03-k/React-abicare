import React, { useEffect, useState } from "react";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";

import {
  Box,
  Button,
  Card,
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

export default function Doctoresadmin() {
  const [doctors, setDoctors] = useState([]);

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

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/doctors");
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error("Failed to load doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddDoctor = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/doctors",
        form
      );

      // Add the newly created doctor from the server
      setDoctors((prevDoctors) => [...prevDoctors, response.data]);
      console.log("POST Response:", response.data);


      // Reset form
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

      alert("Doctor added successfully!");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to add doctor.");
    }
  };

const filteredDoctors = doctors.filter((doctor) =>
  (doctor.name || "").toLowerCase().includes(search.toLowerCase())
);

const textFieldStyle = {
  "& .MuiInputLabel-root": {
    color: "#94A3B8",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#38BDF8",
  },
  "& .MuiOutlinedInput-root": {
    color: "#FFFFFF",
    "& fieldset": {
      borderColor: "#475569",
    },
    "&:hover fieldset": {
      borderColor: "#38BDF8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#38BDF8",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#CBD5E1",
    opacity: 1,
  },
  "& .MuiSvgIcon-root": {
    color: "#FFFFFF",
  },
};

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
          onClick={(e) => {
            e.currentTarget.blur();
            setOpen(true);
          }}
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
        <TableContainer
          component={Paper}
          sx={{ bgcolor: "transparent", boxShadow: "none" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#38BDF8" }}>Doctor Name</TableCell>

                <TableCell sx={{ color: "#38BDF8" }}>Email</TableCell>

                <TableCell sx={{ color: "#38BDF8" }}>Phone</TableCell>

                <TableCell sx={{ color: "#38BDF8" }}>Department</TableCell>

                <TableCell sx={{ color: "#38BDF8" }}>Qualification</TableCell>

                <TableCell sx={{ color: "#38BDF8" }}>Experience</TableCell>

                <TableCell sx={{ color: "#38BDF8" }}>Consultation Fee</TableCell>

                <TableCell align="center" sx={{ color: "#38BDF8" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredDoctors.map((doctor) => (
                <TableRow key={doctor._id}>
                  <TableCell sx={{ color: "white" }}>
                    {doctor.name}
                  </TableCell>

                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {doctor.email}
                  </TableCell>

                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {doctor.phone}
                  </TableCell>

                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {doctor.department}
                  </TableCell>

                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {doctor.qualification}
                  </TableCell>

                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {doctor.experience}
                  </TableCell>

                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {doctor.fee}
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

< Dialog
  open={open}
  onClose={() => setOpen(false)}
  fullWidth
  maxWidth="md"
  slotProps={{
    paper: {
      sx: {
        bgcolor: "#111C33",
        borderRadius: 4,
        color: "#fff",
      },
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

  <DialogContent sx={{ mt: 2 }}>
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Doctor Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          sx={textFieldStyle}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          sx={textFieldStyle}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          sx={textFieldStyle}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          select
          fullWidth
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
          sx={textFieldStyle}
        >
          <MenuItem value="Cardiology">Cardiology</MenuItem>
          <MenuItem value="Neurology">Neurology</MenuItem>
          <MenuItem value="Orthopedics">Orthopedics</MenuItem>
          <MenuItem value="Pediatrics">Pediatrics</MenuItem>
          <MenuItem value="Dermatology">Dermatology</MenuItem>
          <MenuItem value="General Medicine">General Medicine</MenuItem>
        </TextField>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Qualification"
          name="qualification"
          value={form.qualification}
          onChange={handleChange}
          sx={textFieldStyle}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Experience"
          name="experience"
          placeholder="Eg: 8 Years"
          value={form.experience}
          onChange={handleChange}
          sx={textFieldStyle}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Consultation Fee"
          name="fee"
          value={form.fee}
          onChange={handleChange}
          sx={textFieldStyle}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          select
          fullWidth
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          sx={textFieldStyle}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="On Leave">On Leave</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  </DialogContent>




        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              color: "#e3e5e8",
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
          console.log(doctors);
        </DialogActions>
      </Dialog>
    </Box>
  );
}