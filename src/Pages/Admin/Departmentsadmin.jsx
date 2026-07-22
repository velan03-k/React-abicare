import React, { useEffect, useState } from "react";
import API from "../../Api/axios";
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

  const [editingId, setEditingId] = useState(null);

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
        const response = await API.get(
          "departments"
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

    if (editingId) {

      const response = await API.put(
        `departments/${editingId}`,
        form
      );

      setDepartments((prevDepartments) =>
        prevDepartments.map((department) =>
          department._id === editingId
            ? response.data.department
            : department
        )
      );

      alert("Department updated successfully!");

    } else {

      const response = await API.post(
        "departments",
        form
      );

      setDepartments((prevDepartments) => [
        ...prevDepartments,
        response.data.department,
      ]);

      alert("Department added successfully!");
    }

    // Reset form
    setForm({
      name: "",
      description: "",
      headDoctor: "",
      email: "",
      phone: "",
      totalDoctors: "",
      status: "Active",
    });

    setEditingId(null);

    setOpen(false);

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Operation failed."
    );

  }
};

const handleEdit = (department) => {
  setForm({
    name: department.name,
    description: department.description,
    headDoctor: department.headDoctor,
    email: department.email,
    phone: department.phone,
    status: department.status,
  });

  setEditingId(department._id);

  setOpen(true);
};

const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this department?"
  );

  if (!confirmDelete) return;

  try {

    await API.delete(`departments/${id}`);

    setDepartments((prevDepartments) =>
      prevDepartments.filter(
        (department) => department._id !== id
      )
    );

    alert("Department deleted successfully!");

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Failed to delete department."
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
<IconButton
  color="primary"
  onClick={() => handleEdit(department)}
>
  <EditRoundedIcon />
</IconButton>

<IconButton
  color="error"
  onClick={() => handleDelete(department._id)}
>
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
{editingId ? "Edit Department" : "Add Department"}  </DialogTitle>

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
{editingId ? "Update Department" : "Add Department"}          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}