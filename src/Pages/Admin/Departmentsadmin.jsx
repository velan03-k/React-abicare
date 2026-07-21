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

export default function Departmentsadmin() {
  const [departments, setDepartments] = useState([]);

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    headDoctor: "",
    email: "",
    phone: "",
    totalDoctors: "",
    status: "Active",
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/departments"
        );
setDepartments(response.data || []);      } catch (error) {
        console.error("Failed to load departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleAddDepartment = async () => {
  try {

    const response = await axios.post(
      "http://localhost:5000/api/departments",
      form
    );


    console.log("POST Response:", response.data);


    setDepartments((prevDepartments = []) => [
      ...prevDepartments,
      response.data
    ]);


    setForm({
      name: "",
      description: "",
      headDoctor: "",
      email: "",
      phone: "",
      totalDoctors: "",
      status: "Active",
    });


    setOpen(false);

    alert("Department added successfully!");


  } catch(error) {

    console.error("Department Error:", error);

    alert(
      error.response?.data?.message ||
      "Failed to add department"
    );

  }
};
const filteredDepartments = (departments || []).filter((department) =>
  (department.name || "")
    .toLowerCase()
    .includes(search.toLowerCase())
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
            Departments
          </Typography>

          <Typography sx={{ color: "#94A3B8" }}>
            Manage all departments in ABI CARE
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
          Add Department
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
          placeholder="Search Department..."
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
                <TableCell sx={{ color: "#38BDF8" }}>Department Name</TableCell>

                <TableCell sx={{ color: "#38BDF8" }}>Head Doctor</TableCell>

                <TableCell sx={{ color: "#38BDF8" }}>Email</TableCell>

                <TableCell sx={{ color: "#38BDF8" }}>Phone</TableCell>

                <TableCell sx={{ color: "#38BDF8" }}>Total Doctors</TableCell>

                <TableCell sx={{ color: "#38BDF8" }}>Status</TableCell>

                <TableCell align="center" sx={{ color: "#38BDF8" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredDepartments.map((department) => (
                <TableRow key={department._id}>
                  <TableCell sx={{ color: "white" }}>
                    {department.name}
                  </TableCell>

                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {department.headDoctor}
                  </TableCell>

                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {department.email}
                  </TableCell>

                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {department.phone}
                  </TableCell>

                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {department.totalDoctors}
                  </TableCell>

                  <TableCell sx={{ color: "#CBD5E1" }}>
                    {department.status}
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
{/* Add Department Dialog */}

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
    Add New Department
  </DialogTitle>

  <DialogContent sx={{ mt: 2 }}>
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Department Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          sx={textFieldStyle}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Head Doctor"
          name="headDoctor"
          value={form.headDoctor}
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
          fullWidth
          label="Total Doctors"
          name="totalDoctors"
          placeholder="Eg: 5"
          value={form.totalDoctors}
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
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
      </Grid>

      <Grid size={12}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          sx={textFieldStyle}
        />
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
            onClick={handleAddDepartment}
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
            Add Department
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}