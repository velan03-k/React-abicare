import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import API from "../Api/axios";

// Import images (adjust paths as needed)
import heroImage from "../Assets/Gemini_Generated_Image_ei62snei62snei62-clean.png";

export default function Departments() {
  const [departments, setDepartments] = useState([]);


  // Fetch Departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
const response = await API.get(
  "/departments"
);
        console.log("Department Response:", response.data);
        setDepartments(response.data || []);
      } catch (error) {
        console.error("Failed to load departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  // Handle Input Change
  // const handleChange = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // Add Department
  

  return (
    <Box sx={{ bgcolor: "#0F172A", minHeight: "100vh", color: "#fff" }}>
      {/* ========== HERO SECTION ========== */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "45% 55%" },
            alignItems: "center",
            gap: 6,
          }}
        >
          {/* Left Content */}
          <Box>
            <Box
              sx={{
                display: "inline-block",
                bgcolor: "rgba(107, 186, 224, 0.2)",
                color: "#6BBAE0",
                px: 4,
                py: 1.5,
                borderRadius: "40px",
                fontWeight: 700,
                fontSize: "1.1rem",
                border: "1px solid rgba(107, 186, 224, 0.4)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              Our Departments
            </Box>

            <Typography
              variant="h1"
              sx={{
                mt: 3,
                fontSize: { xs: "2.8rem", md: "3.8rem" },
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              Explore Our{" "}
              <Box component="span" sx={{ color: "#6BBAE0" }}>
                Specialized Care
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 4,
                fontSize: "1.15rem",
                color: "#d1d5db",
                lineHeight: 1.8,
              }}
            >
              Explore our specialized departments, each staffed with experienced
              medical professionals dedicated to providing exceptional care.
              From cardiology to pediatrics, our departments are equipped with{" "}
              <Box component="span" sx={{ fontWeight: 600, color: "#6BBAE0" }}>
                state-of-the-art facilities
              </Box>{" "}
              to ensure the best possible outcomes for our patients.
            </Typography>

            <Typography
              variant="h5"
              sx={{ mt: 3, color: "#F8B4C8", fontWeight: 600 }}
            >
              Comprehensive. Specialized. Advanced.
            </Typography>

            <Box sx={{ mt: 6, display: "flex", flexWrap: "wrap", gap: 3 }}>
              <Button
                variant="contained"
                href="#department-list"
                sx={{
                  bgcolor: "#6BBAE0",
                  color: "#0F172A",
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": { bgcolor: "#fff" },
                }}
              >
                View All Departments
              </Button>
              <Button
                variant="outlined"
                href="#"
                sx={{
                  borderColor: "#6BBAE0",
                  color: "#6BBAE0",
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": { bgcolor: "#6BBAE0", color: "#0F172A" },
                }}
              >
                Contact Us
              </Button>
            </Box>
          </Box>

          {/* Right Image */}
          <Box
            component="img"
            src={heroImage}
            alt="Medical Departments"
            sx={{
              width: "100%",
              height: { xs: "auto", md: "500px" },
              objectFit: "cover",
              borderRadius: "40px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
              border: "4px solid #6BBAE0",
            }}
          />
        </Box>
      </Container>

      {/* ========== DEPARTMENT LIST SECTION ========== */}
      <Box id="department-list" sx={{ bgcolor: "#0F172A", py: 10 }}>
        <Container maxWidth="xl" sx={{ px: { xs: 3, sm: 5, md: 8, lg: 10 } }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                color: "#6BBAE0",
                fontWeight: 700,
                fontSize: { xs: "2.2rem", md: "2.8rem" },
              }}
            >
              Our Specialized Departments
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color: "#E091AC",
                fontSize: "1.2rem",
                fontWeight: 500,
              }}
            >
              Comprehensive Care Across Medical Specialties
            </Typography>

            <Typography
              sx={{
                mt: 3,
                color: "#D1D5DB",
                maxWidth: "850px",
                mx: "auto",
                lineHeight: 1.8,
              }}
            >
              Our hospital offers a wide range of specialized departments, each
              focused on delivering high-quality care in their respective fields.
              Our multidisciplinary approach ensures patients receive
              comprehensive treatment tailored to their individual needs.
            </Typography>
          </Box>

          {/* Cards */}
{/* Cards */}
<Grid container spacing={4} sx={{ justifyContent: "center" }}>
  {departments.map((dept) => (
    <Grid
      key={dept._id}
      size={{ xs: 12, sm: 6, md: 4 }}
      sx={{ p: 2, display: "flex" }}
    >
      <Card
        sx={{
          width: "100%",
          bgcolor: "#1E293B",
          borderRadius: "18px",
          p: 4,
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(107,186,224,0.2)",
          transition: "all .3s ease",
          height: "90%",
          "&:hover": {
            borderColor: "#6BBAE0",
            transform: "translateY(-8px)",
            boxShadow: "0 15px 35px rgba(0,0,0,.45)",
          },
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            bgcolor: "rgba(107,186,224,0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 3,
          }}
        >
          <i
            className="fa-solid fa-hospital"
            style={{
              fontSize: "2rem",
              color: "#6BBAE0",
            }}
          />
        </Box>

        {/* Department Name */}
        <Typography
          variant="h5"
          sx={{
            color: "#fff",
            fontWeight: 700,
            mb: 2,
          }}
        >
          {dept.name}
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            color: "#D1D5DB",
            lineHeight: 1.8,
            mb: 2,
          }}
        >
          {dept.description}
        </Typography>

        {/* Email */}
        <Typography
          sx={{
            color: "#CBD5E1",
            fontSize: "0.9rem",
            mb: 1,
          }}
        >
          <strong>Email:</strong> {dept.email}
        </Typography>

        {/* Phone */}
        <Typography
          sx={{
            color: "#CBD5E1",
            fontSize: "0.9rem",
            mb: 2,
          }}
        >
          <strong>Phone:</strong> {dept.phone}
        </Typography>

        {/* Status */}
        <Typography
          sx={{
            color: dept.status === "Active" ? "#22C55E" : "#EF4444",
            fontWeight: 600,
            mb: 3,
          }}
        >
          {dept.status}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: "auto",
            bgcolor: "rgba(107,186,224,0.2)",
            color: "#6BBAE0",
            fontWeight: 700,
            borderRadius: "10px",
            textTransform: "none",
            py: 1.4,
            "&:hover": {
              bgcolor: "#6BBAE0",
              color: "#0F172A",
            },
          }}
        >
          View Doctors
        </Button>
      </Card>
    </Grid>
  ))}
</Grid>
        </Container>
      </Box>

      {/* ========== STATISTICS SECTION ========== */}
      <Box sx={{ bgcolor: "#0F172A", py: 10, borderTop: "1px solid #1E293B", mx: "20%" }}>
        <Container maxWidth="xxl">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Box
              sx={{
                display: "inline-block",
                bgcolor: "rgba(107, 186, 224, 0.2)",
                color: "#6BBAE0",
                px: 4,
                py: 1,
                borderRadius: "40px",
                fontWeight: 700,
                fontSize: "0.9rem",
                border: "1px solid rgba(107, 186, 224, 0.4)",
              }}
            >
              Our Impact
            </Box>
            <Typography
              variant="h3"
              sx={{
                mt: 3,
                fontWeight: 700,
                color: "#fff",
                fontSize: { xs: "2rem", md: "2.8rem" },
              }}
            >
              <Box component="span" sx={{ color: "#6BBAE0" }}>
                Excellence
              </Box>{" "}
              in Numbers
            </Typography>
          </Box>

          <Grid container spacing={8}>
            {[
              { value: "25+", label: "Specialized Departments" },
              { value: "50+", label: "Expert Doctors" },
              { value: "1000+", label: "Happy Patients" },
              { value: "24/7", label: "Emergency Services" },
            ].map((stat, idx) => (
              <Grid size={{ xs: 6, md: 3 }} key={idx}>
                <Paper
                  sx={{
                    bgcolor: "#1E293B",
                    p: 4,
                    textAlign: "center",
                    borderRadius: "16px",
                    border: "1px solid rgba(107, 186, 224, 0.2)",
                    transition: "border 0.3s",
                    "&:hover": { borderColor: "#6BBAE0" },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ color: "#6BBAE0", fontWeight: 700 }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography sx={{ color: "#d1d5db", mt: 1 }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ========== DEPARTMENTS FEATURES ========== */}
      <Box sx={{ bgcolor: "#0F172A", py: 10, borderTop: "1px solid #1E293B" }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} sx={{ alignItems: "center" }}>
            {/* Left Side */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: "inline-block",
                  bgcolor: "rgba(107, 186, 224, 0.2)",
                  color: "#6BBAE0",
                  px: 4,
                  py: 1,
                  borderRadius: "40px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  border: "1px solid rgba(107, 186, 224, 0.4)",
                }}
              >
                Why Choose Us
              </Box>
              <Typography
                variant="h3"
                sx={{
                  mt: 3,
                  fontWeight: 700,
                  color: "#fff",
                  fontSize: { xs: "2rem", md: "2.8rem" },
                }}
              >
                Why Our{" "}
                <Box component="span" sx={{ color: "#6BBAE0" }}>
                  Departments
                </Box>
              </Typography>
              <Box component="ul" sx={{ mt: 4, listStyle: "none", p: 0 }}>
                {[
                  "World-class medical facilities and advanced technology.",
                  "Highly experienced and board-certified specialists.",
                  "Comprehensive and integrated patient care.",
                  "State-of-the-art diagnostic and treatment options.",
                  "Patient-centered approach with compassionate care.",
                ].map((item, idx) => (
                  <Box
                    component="li"
                    key={idx}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      mb: 2,
                      color: "#d1d5db",
                      fontSize: "1.05rem",
                    }}
                  >
                    <Box
                      component="span"
                      sx={{ color: "#6BBAE0", fontSize: "1.8rem" }}
                    >
                      ✓
                    </Box>
                    {item}
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Right Side */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                sx={{
                  bgcolor: "#1E293B",
                  p: 4,
                  mx: "50%",
                  mt: "10%",
                  width: "600px",
                  borderRadius: "16px",
                  border: "1px solid rgba(107, 186, 224, 0.2)",
                }}
              >
                {[
                  {
                    icon: "fa-solid fa-stethoscope",
                    title: "Advanced Technology",
                    desc: "Cutting-edge medical equipment",
                  },
                  {
                    icon: "fa-solid fa-user-md",
                    title: "Expert Specialists",
                    desc: "Highly qualified medical professionals",
                  },
                  {
                    icon: "fa-solid fa-hand-holding-heart",
                    title: "Compassionate Care",
                    desc: "Patient-first approach to healing",
                  },
                ].map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      mb: idx < 2 ? 4 : 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        bgcolor: "rgba(107, 186, 224, 0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <i
                        className={item.icon}
                        style={{ fontSize: "1.8rem", color: "#6BBAE0" }}
                      ></i>
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ color: "#fff", fontWeight: 700 }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        sx={{ color: "#9ca3af", fontSize: "0.95rem" }}
                      >
                        {item.desc}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}