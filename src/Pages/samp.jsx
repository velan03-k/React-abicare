// import React, { useState } from "react";
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Box,
// } from "@mui/material";

// function Signup() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
//   });

//   // Handle Input Change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Store Data in localStorage
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     localStorage.setItem("signupData", JSON.stringify(formData));

//     alert("Data Stored Successfully!");

//     console.log(formData);

//     // Clear the form
//     setFormData({
//       name: "",
//       email: "",
//       mobile: "",
//       password: "",
//       confirmPassword: "",
//     });
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper
//         elevation={5}
//         sx={{
//           mt: 5,
//           p: 4,
//           borderRadius: 3,
//         }}
//       >
//         <Typography variant="h4" align="center" gutterBottom>
//           Signup Form
//         </Typography>

//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//           }}
//         >
//           <TextField
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             label="Email"
//             name="email"
//             type="email"
//             value={formData.email}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             label="Mobile"
//             name="mobile"
//             value={formData.mobile}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             label="Password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             label="Confirm Password"
//             name="confirmPassword"
//             type="password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             fullWidth
//           />

//           <Button
//             variant="contained"
//             type="submit"
//             size="large"
//           >
//             Sign Up
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }

// export default Signup;