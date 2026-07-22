import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter"; // swap for the X icon if your @mui/icons-material version has it
import doctorsHeroImage from "../Assets/Gemini_Generated_Image_ei62snei62snei62-clean.png";
import API from "../Api/axios";

// Static list of departments used for the filter dropdown (page copy, not patient/doctor data)


const WHY_CHOOSE_US = [
  "Highly qualified and experienced medical professionals.",
  "Compassionate care and patient-centered approach.",
  "State-of-the-art medical facilities and technology.",
  "Comprehensive range of medical specialties.",
  "Commitment to continuous learning and professional development.",
];

const STATS = [
  { value: "25+", label: "Experienced Doctors" },
  { value: "100+", label: "Happy Patients" },
  { value: "15+", label: "Years of Excellence" },
  { value: "5+", label: "Medical Specialties" },
  { value: "24/7", label: "Emergency Care" },
  { value: "100%", label: "Patient Satisfaction" },
];

const SOCIAL_LINKS = [
  { icon: FacebookIcon, href: "https://facebook.com" },
  { icon: InstagramIcon, href: "https://instagram.com" },
  { icon: TwitterIcon, href: "https://x.com" },
  { icon: LinkedInIcon, href: "https://linkedin.com" },
  { icon: YouTubeIcon, href: "https://youtube.com" },
];

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Doctors page.
 *
 * `doctors` is expected to be supplied from the backend, e.g.:
 * [
 *   {
 *     id: 1,
 *     name: "Dr. Arun Kumar",
 *     specialization: "Cardiologist",
 *     department: "cardiology",
 *     qualifications: "MBBS, MD, DM (Cardiology)",
 *     experience: "15+ Years Experience",
 *     tagline: "Heart Care Specialist",
 *     availability: "Mon – Sat",
 *     image: "https://.../photo.jpg", // optional, falls back to initials
 *   },
 *   ...
 * ]
 */
function Doctors({ onBookAppointment }) {
const [search, setSearch] = useState("");
const [department, setDepartment] = useState("all");
const [doctors, setDoctors] = useState([]);
const [loading, setLoading] = useState(true);
const [departments, setDepartments] = useState([]);

useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const response = await API.get(
        "/departments"
      );

      setDepartments(response.data);
    } catch (error) {
      console.error("Failed to load departments:", error);
    }
  };

  fetchDepartments();
}, []);useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const response = await API.get(
        "/departments"
      );

      setDepartments(response.data);
    } catch (error) {
      console.error("Failed to load departments:", error);
    }
  };

  fetchDepartments();
}, []);

useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const response = await API.get(
        "/doctors"
      );

      console.log(response.data);

      setDoctors(response.data.doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchDoctors();
}, []);

const filteredDoctors = doctors.filter((doctor) => {
  const matchesSearch = (doctor.name || "")
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesDepartment =
    department === "all" ||
    doctor.department?.name === department;

  return matchesSearch && matchesDepartment;
});

  return (
    <Box sx={{ backgroundColor: "#0F172A" }}>
      {/* HERO SECTION */}
<Box sx={{ backgroundColor: "#0F172A" }}>
  <Box
    sx={{
      maxWidth: "1280px",
      mx: "auto",
      px: { xs: 3, md: 8 },
      py: 10,
    }}
  >
    <Grid
      container
      spacing={6}
      alignItems="center"
      justifyContent="space-between"
    >
      {/* LEFT SIDE */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Box
          sx={{
            display: "inline-block",
            backgroundColor: "rgba(107,186,224,0.2)",
            color: "#6BBAE0",
            px: 4,
            py: 1.5,
            borderRadius: "999px",
            fontSize: "18px",
            fontWeight: "bold",
            border: "1px solid rgba(107,186,224,0.4)",
          }}
        >
          Our Doctors
        </Box>

        <Typography
          variant="h2"
          sx={{
            mt: 3,
            color: "white",
            fontWeight: "bold",
            fontSize: { xs: "42px", md: "56px" },
            lineHeight: 1.1,
          }}
        >
          Meet Our{" "}
          <Box component="span" sx={{ color: "#6BBAE0" }}>
            Medical Experts
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 4,
            color: "#D1D5DB",
            fontSize: "18px",
            lineHeight: 1.8,
          }}
        >
          Our team of highly skilled and compassionate doctors is dedicated
          to providing exceptional healthcare services. With expertise across{" "}
          <Box
            component="span"
            sx={{
              color: "#6BBAE0",
              fontWeight: 600,
            }}
          >
            multiple specialties
          </Box>
          , we ensure you receive the best care possible.
        </Typography>

        <Typography
          sx={{
            mt: 3,
            color: "#F8B4C8",
            fontWeight: "bold",
            fontSize: "22px",
          }}
        >
          Experienced. Trusted. Caring.
        </Typography>

        <Box
          sx={{
            mt: 5,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            onClick={onBookAppointment}
            sx={{
              backgroundColor: "#6BBAE0",
              color: "#0F172A",
              px: 4,
              py: 1.5,
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
          >
            Book Appointment
          </Button>

          <Button
            variant="outlined"
            href="#doctor-list"
            sx={{
              color: "#6BBAE0",
              borderColor: "#6BBAE0",
              borderWidth: "2px",
              px: 4,
              py: 1.5,
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#6BBAE0",
                color: "#0F172A",
                borderWidth: "2px",
              },
            }}
          >
            View All Doctors
          </Button>
        </Box>
      </Grid>

      {/* RIGHT SIDE */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={doctorsHeroImage}
            alt="Medical Team"
            sx={{
              width: "100%",
              maxWidth: "600px",
              height: "500px",
              objectFit: "cover",
              borderRadius: "30px",
              border: "4px solid #6BBAE0",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.4)",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  </Box>
</Box>
      {/* SEARCH & FILTER SECTION */}
      <Box
        sx={{
          borderTop: "1px solid #1E293B",
          py: 6,
        }}
      >
        <Box sx={{ maxWidth: "1280px", mx: "auto", px: 8 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search for doctors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                maxWidth: { md: "50%" },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#1E293B",
                  color: "white",
                  borderRadius: "999px",
                  "& fieldset": { borderColor: "rgba(107,186,224,0.3)" },
                  "&:hover fieldset": { borderColor: "#6BBAE0" },
                  "&.Mui-focused fieldset": { borderColor: "#6BBAE0" },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#6BBAE0" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ color: "#6BBAE0", fontWeight: 600 }}>
                Filter by:
              </Typography>
<Select
  value={department}
  onChange={(e) => setDepartment(e.target.value)}
>
  <MenuItem value="all">All Departments</MenuItem>

  {departments.map((dept) => (
    <MenuItem key={dept._id} value={dept.name}>
      {dept.name}
    </MenuItem>
  ))}
</Select>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* DOCTOR LIST SECTION */}
      <Box id="doctor-list" sx={{ py: 10 }}>
        <Box sx={{ maxWidth: "1280px", mx: "auto", px: 8 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h3"
              sx={{ color: "#6BBAE0", fontWeight: "bold", fontSize: "40px" }}
            >
              Our Medical Specialists
            </Typography>

            <Typography sx={{ mt: 2, color: "#E091AC", fontSize: "20px" }}>
              Experienced Professionals You Can Trust
            </Typography>

            <Typography
              sx={{
                mt: 3,
                color: "#D1D5DB",
                maxWidth: "760px",
                mx: "auto",
                lineHeight: 1.8,
              }}
            >
              Our team of medical specialists is committed to delivering
              personalized care and innovative treatments. With years of
              experience and a passion for improving patient outcomes, our
              doctors are here to guide you on your journey to better health.
            </Typography>
          </Box>

{loading ? (
  <Typography
    sx={{
      color: "white",
      textAlign: "center",
      py: 6,
    }}
  >
    Loading doctors...
  </Typography>
) : filteredDoctors.length === 0 ? (            <Typography sx={{ color: "#94A3B8", textAlign: "center", py: 6 }}>
              No doctors to show right now.
            </Typography>
          ) : (
           <Grid
  container
  spacing={4}
  justifyContent="center"
  alignItems="stretch"
>
  {filteredDoctors.map((doctor) => (
    <Grid
      key={doctor._id}
      size={{ xs: 12, sm: 6, md: 4 }}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 380,
          minHeight: 430,
          bgcolor: "#1E293B",
          borderRadius: "18px",
          border: "1px solid rgba(107,186,224,0.2)",
          display: "flex",
          flexDirection: "column",
          transition: "0.3s",

          "&:hover": {
            borderColor: "#6BBAE0",
            transform: "translateY(-6px)",
            boxShadow: "0 12px 30px rgba(0,0,0,.4)",
          },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{
              width: 90,
              height: 90,
              mx: "auto",
              mb: 2,
              bgcolor: "#6BBAE0",
              color: "#0F172A",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            {getInitials(doctor.name)}
          </Avatar>

          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "24px",
            }}
          >
            Dr. {doctor.name}
          </Typography>

  <Typography
  sx={{
    color: "#6BBAE0",
    fontWeight: 600,
    mb: 2,
  }}
>
  {doctor.department?.name}
</Typography>

          <Box
            component="ul"
            sx={{
              textAlign: "left",
              color: "#D1D5DB",
              flexGrow: 1,
              pl: 3,
              "& li": {
                mb: 1,
              },
            }}
          >
            <li>{doctor.qualification}</li>
            <li>{doctor.experience}</li>
            <li>Fee: ₹{doctor.fee}</li>
            <li>Status: {doctor.status}</li>
          </Box>

          <Button
            fullWidth
            onClick={() => onBookAppointment?.(doctor)}
            sx={{
              mt: "auto",
              bgcolor: "#6BBAE0",
              color: "#0F172A",
              fontWeight: "bold",
              borderRadius: "10px",
              py: 1.2,
              textTransform: "none",
              "&:hover": {
                bgcolor: "white",
              },
            }}
          >
            Book Appointment
          </Button>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
          )}
        </Box>
      </Box>

      {/* WHY CHOOSE US */}
      <Box sx={{ borderTop: "1px solid #1E293B", py: 10 }}>
        <Box sx={{ maxWidth: "1280px", mx: "auto", px: 8 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "inline-block",
                  backgroundColor: "rgba(107,186,224,0.2)",
                  color: "#6BBAE0",
                  px: 3,
                  py: 1,
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  border: "1px solid rgba(107,186,224,0.4)",
                }}
              >
                Why Choose Us
              </Box>

              <Typography
                variant="h4"
                sx={{ mt: 3, color: "white", fontWeight: "bold" }}
              >
                Why Choose Our{" "}
                <Box component="span" sx={{ color: "#6BBAE0" }}>
                  Doctors?
                </Box>
              </Typography>

              <Box component="ul" sx={{ mt: 4, listStyle: "none", p: 0 }}>
                {WHY_CHOOSE_US.map((point) => (
                  <Box
                    component="li"
                    key={point}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      color: "#D1D5DB",
                      mb: 2,
                    }}
                  >
                    <CheckCircleIcon sx={{ color: "#6BBAE0" }} />
                    {point}
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                {STATS.map((stat) => (
                  <Grid item xs={6} key={stat.label}>
                    <Box
                      sx={{
                        backgroundColor: "#1E293B",
                        borderRadius: "16px",
                        p: 3,
                        textAlign: "center",
                        border: "1px solid rgba(107,186,224,0.2)",
                      }}
                    >
                      <Typography
                        sx={{ color: "#6BBAE0", fontWeight: "bold", fontSize: "32px" }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography sx={{ color: "#D1D5DB", mt: 1 }}>
                        {stat.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* COMMITMENT & APPOINTMENT */}
      <Box sx={{ borderTop: "1px solid #1E293B", py: 10 }}>
        <Box
          sx={{
            maxWidth: "1280px",
            mx: "auto",
            px: { xs: 3, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 8,
              alignItems: "stretch",
            }}
          >
            {/* LEFT SIDE */}
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "inline-block",
                  backgroundColor: "rgba(107,186,224,0.2)",
                  color: "#6BBAE0",
                  px: 3,
                  py: 1,
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  border: "1px solid rgba(107,186,224,0.4)",
                }}
              >
                Our Commitment
              </Box>

              <Typography
                variant="h4"
                sx={{ mt: 3, color: "white", fontWeight: "bold" }}
              >
                Our <Box component="span" sx={{ color: "#6BBAE0" }}>Commitment</Box>
              </Typography>

              <Typography sx={{ mt: 3, color: "#D1D5DB", lineHeight: 1.8 }}>
                We are committed to providing the highest quality healthcare
                services to our patients. Our team of dedicated professionals
                works tirelessly to ensure every patient receives personalized
                care and attention.
              </Typography>

              <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    backgroundColor: "rgba(107,186,224,0.2)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FavoriteIcon sx={{ color: "#6BBAE0", fontSize: 30 }} />
                </Box>

                <Box>
                  <Typography sx={{ color: "white", fontWeight: 600 }}>
                    Patient First
                  </Typography>
                  <Typography sx={{ color: "#94A3B8", fontSize: "14px" }}>
                    Your health is our top priority.
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* RIGHT SIDE */}
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  display: "inline-block",
                  backgroundColor: "rgba(107,186,224,0.2)",
                  color: "#6BBAE0",
                  px: 3,
                  py: 1,
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  border: "1px solid rgba(107,186,224,0.4)",
                }}
              >
                Easy Booking
              </Box>

              <Typography variant="h4" sx={{ mt: 3, color: "white", fontWeight: "bold" }}>
                Appointment <Box component="span" sx={{ color: "#6BBAE0" }}>Process</Box>
              </Typography>

              <Typography sx={{ mt: 3, color: "#D1D5DB", lineHeight: 1.8 }}>
                Booking an appointment with our specialists is simple and
                convenient. Schedule online or call our reservation team.
                We'll help you find the best doctor and the most suitable
                consultation time.
              </Typography>

              <Box sx={{ mt: 5, display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  onClick={onBookAppointment}
                  sx={{
                    backgroundColor: "#6BBAE0",
                    color: "#0F172A",
                    px: 4,
                    py: 1.5,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "white" },
                  }}
                >
                  Book Online Now
                </Button>

                <Button
                  href="tel:+917904019592"
                  startIcon={<PhoneIcon />}
                  variant="outlined"
                  sx={{
                    color: "#6BBAE0",
                    borderColor: "#6BBAE0",
                    borderWidth: "2px",
                    px: 4,
                    py: 1.5,
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#6BBAE0", color: "#0F172A", borderWidth: "2px" },
                  }}
                >
                  Call Us
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Doctors;