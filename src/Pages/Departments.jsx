import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// Import images (adjust paths as needed)
import heroImage from "../Assets/Gemini_Generated_Image_ei62snei62snei62-clean.png";

function Departments() {
  // Department data
  const departments = [
    {
      icon: "fa-solid fa-heart",
      title: "Cardiology",
      desc: "Our Cardiology department is dedicated to the diagnosis and treatment of heart-related conditions. Our team of cardiologists utilizes advanced technology to provide personalized care for patients with cardiovascular diseases.",
    },
    {
      icon: "fa-solid fa-brain",
      title: "Neurology",
      desc: "Our Neurology department specializes in the treatment of disorders affecting the nervous system. Our neurologists are experienced in managing conditions such as epilepsy, stroke, and neurodegenerative diseases.",
    },
    {
      icon: "fa-solid fa-bone",
      title: "Orthopedics",
      desc: "Our Orthopedics department focuses on the diagnosis and treatment of musculoskeletal conditions. Our orthopedic surgeons provide comprehensive care for patients with fractures, joint disorders, and sports injuries.",
    },
    {
      icon: "fa-solid fa-child",
      title: "Pediatrics",
      desc: "Our Pediatrics department is committed to the health and well-being of children. Our pediatricians provide preventive care, vaccinations, and treatment for a wide range of childhood illnesses and conditions.",
    },
    {
      icon: "fa-solid fa-hand-sparkles",
      title: "Dermatology",
      desc: "Our Dermatology department offers specialized care for skin-related conditions. Our dermatologists provide treatments for acne, eczema, psoriasis, and other skin disorders, as well as cosmetic dermatology services.",
    },
    {
      icon: "fa-solid fa-venus",
      title: "Gynecology",
      desc: "Our Gynecology department focuses on women's health, providing comprehensive care for reproductive health, pregnancy, and gynecological conditions. Our gynecologists offer personalized treatment plans to support women's health and well-being.",
    },
  ];

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
      {/* ========== DEPARTMENT LIST SECTION ========== */}
<Box
  id="department-list"
  sx={{
    bgcolor: "#0F172A",
    py: 10,
  }}
>
  <Container
    maxWidth="xl"
    sx={{
      px: { xs: 3, sm: 5, md: 8, lg: 10 },
    }}
  >
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
    <Grid
      container
      spacing={4}
      justifyContent="center"
    >
      {departments.map((dept, index) => (
        <Grid
          key={index}
          size={{ xs: 12, sm: 6, md: 4 }}
          sx={{
            p: 2, // Space around each card
            display: "flex",
          }}
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
                className={dept.icon}
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
              {dept.title}
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                color: "#D1D5DB",
                lineHeight: 1.8,
                flexGrow: 1,
              }}
            >
              {dept.desc}
            </Typography>

            {/* Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 4,
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
      <Box sx={{ bgcolor: "#0F172A", py: 10, borderTop: "1px solid #1E293B", mx : "20%" }}>
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
              <Grid item xs={6} md={3} key={idx}>
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
          <Grid container spacing={6} alignItems="center">
            {/* Left Side */}
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  bgcolor: "#1E293B",
                  p: 4,
                  mx: "50%",
                  mt : "10%",
                  width : "600px",
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

export default Departments;