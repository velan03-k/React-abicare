import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Avatar,
  Container
} from "@mui/material";

// Replace these paths with your correct relative image routes
import hospitalImg from "../Assets/Gemini_Generated_Image_aq0j32aq0j32aq0j-clean.png"
import doctor1 from "../Assets/Gemini_Generated_Image_9fqu489fqu489fqu (1).png" ;
import doctor2 from "../Assets/Gemini_Generated_Image_9fqu489fqu489fqu (2).png";
import doctor3 from "../Assets/Gemini_Generated_Image_yb7sjnyb7sjnyb7s.png";
function AboutUsPage() {
  // Profile dropdown states


  return (
    <Box sx={{ bgcolor: "#0F172A", minHeight: "100vh", color: "white" }}>
      
      {/* 1. Header Navigation Bar */}
      

      {/* Main Container Wrapper */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        
        {/* 2. Top Intro Header Banner Card */}
        <Card
          sx={{
            width: "100%",
            backgroundColor: "#1E293B",
            borderRadius: "24px",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            border: "1px solid rgba(107, 186, 224, 0.3)",
            p: { xs: 4, md: 6 },
            mb: 10,
          }}
        >
          <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 0 }}>
            <Box
              sx={{
                bgcolor: "#6BBAE0",
                color: "#0F172A",
                px: 4,
                py: 1.5,
                borderRadius: "40px",
                fontSize: "24px",
                fontWeight: "bold",
                boxShadow: 3,
              }}
            >
              ABI CARE
            </Box>
            <Typography
              variant="h3"
              sx={{
                mt: 3,
                fontWeight: "bold",
                color: "#6BBAE0",
                fontSize: { xs: "28px", md: "36px" },
                textAlign: "center",
              }}
            >
              Your Trusted Healthcare Partner
            </Typography>
            <Typography
              sx={{
                mt: 4,
                color: "#E091AC",
                fontSize: "18px",
                lineHeight: 1.8,
                textAlign: "center",
                maxWidth: "900px",
              }}
            >
              ABI CARE is committed to providing secure, compassionate, and accessible healthcare services through modern
              technology. We connect patients, doctors, and hospitals through one smart healthcare platform, making healthcare
              simpler, faster, and more reliable.
            </Typography>
          </CardContent>
        </Card>

        {/* 3. Splitted Content Section (Image & Paragraphs) */}
<Grid container spacing={8} alignItems="center" sx={{ mb: 10 }}>
  {/* Image Section */}
  <Grid
    item
    xs={12}
    md={6}
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mx : 40
    }}
  >
    <Box
      component="img"
      src={hospitalImg}
      alt="Hospital Facility"
      sx={{
        width: "200%",
        maxWidth: "800px",
        height: 500,
        objectFit: "cover",
        borderRadius: "24px",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
      }}
    />
  </Grid>

  {/* Text Section */}
  <Grid item xs={12} md={6}>
    <Typography
      variant="h4"
      sx={{
        fontWeight: "bold",
        color: "#38BDF8",
        mb: 3,
        textAlign: "center", // Centers the heading
      }}
    >
      Your Trusted Healthcare Partner
    </Typography>

    <Typography
      sx={{
        color: "#E091AC",
        lineHeight: 1.8,
        fontSize: "16px",
        mb: 3,
        textAlign: "justify", // or "center" if you want the paragraph centered too
      }}
    >
      ABI CARE is a smart healthcare platform designed to simplify hospital
      services for everyone. Whether you need to book appointments, consult
      experienced doctors, access medical records, or manage healthcare
      services, ABI CARE brings everything together in one secure and
      user-friendly platform.
    </Typography>

    <Typography
      sx={{
        color: "#E091AC",
        lineHeight: 1.8,
        fontSize: "16px",
        textAlign: "justify", // or "center"
      }}
    >
      We believe healthcare should be simple, secure, and accessible. By
      combining advanced technology with compassionate care, we help patients
      receive better treatment while supporting healthcare professionals with
      efficient digital solutions.
    </Typography>
  </Grid>
</Grid>

        {/* 4. Our Vision Section */}
        <Box sx={{ textAlign: "center", maxWidth: "900px", mx: "auto", mb: 12 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", color: "#6BBAE0", mb: 3 }}>
            Our Vision
          </Typography>
          <Typography sx={{ color: "#E091AC", fontSize: "18px", lineHeight: 1.8 }}>
            Our vision is to revolutionize healthcare by building a connected, technology-driven ecosystem where patients and
            healthcare professionals can interact effortlessly. We strive to improve healthcare accessibility, enhance patient
            outcomes, and create a future where quality medical care is available to everyone.
          </Typography>
        </Box>

        {/* 5. Team Grid Profiles */}
<Box sx={{ mb: 12, mx : 23}}>
  {/* Section Heading */}
  <Box sx={{ textAlign: "center", mb: 6 }}>
    <Typography
      variant="h3"
      sx={{
        fontWeight: "bold",
        color: "#6BBAE0",
        mb: 1,
      }}
    >
      Meet Our Team
    </Typography>

    <Typography sx={{ color: "#E091AC" }}>
      Dedicated professionals working together to deliver exceptional healthcare.
    </Typography>
  </Box>

  {/* Team Cards */}
  <Grid container spacing={4} justifyContent="center">
    {[
      {
        name: "Dr. John Smith",
        role: "Chief Medical Officer",
        img: doctor1,
      },
      {
        name: "Dr. Sarah Wilson",
        role: "Senior Cardiologist",
        img: doctor2,
      },
      {
        name: "Dr. David Lee",
        role: "Healthcare Administrator",
        img: doctor3,
      },
    ].map((member, i) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        key={i}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 320,
            bgcolor: "#F8FAFC",
            borderRadius: "24px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            p: 4,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transition: "0.3s ease",
            "&:hover": {
              transform: "translateY(-8px)",
              boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
            },
          }}
        >
          <Avatar
            src={member.img}
            alt={member.name}
            sx={{
              width: 130,
              height: 130,
              mb: 3,
              boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
            }}
          />

          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#0F172A",
              mb: 1,
            }}
          >
            {member.name}
          </Typography>

          <Typography
            sx={{
              color: "#6BBAE0",
              fontWeight: 600,
              fontSize: "16px",
            }}
          >
            {member.role}
          </Typography>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>
      </Container>

   

    </Box>
  );
}

export default AboutUsPage;