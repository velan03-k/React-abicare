import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import hospitalImage from "../Assets/Gemini_Generated_Image_ei62snei62snei62-clean.png";

function Homepage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "calc(100vh - 70px)",
        px: 8,
        gap: 6,
      }}
    >
      {/* Left Side */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "620px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Welcome Card */}
          <Card
            sx={{
              width: 320,
              backgroundColor: "rgba(82,175,241,0.15)",
              backdropFilter: "blur(10px)",
              borderRadius: "40px",
              border: "1px solid rgba(255,255,255,0.2)",
              mb: 4,
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  color: "#38BDF8",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Welcome to ABI CARE
              </Typography>
            </CardContent>
          </Card>

          {/* Heading */}
          <Typography
            variant="h2"
            sx={{
              color: "#38BDF8",
              fontWeight: "bold",
              lineHeight: 1.1,
            }}
          >
            Your Health, Our
          </Typography>

          <Typography
            variant="h2"
            sx={{
              color: "#E091AC",
              fontWeight: "bold",
              lineHeight: 1.1,
              mb: 4,
            }}
          >
            Priority
          </Typography>

          {/* Paragraph */}
          <Typography
            sx={{
              color: "#38BDF8",
              fontSize: "20px",
              lineHeight: 1.8,
              textAlign: "justify",
            }}
          >
            Experience smarter healthcare management with ABI CARE. Book
            appointments, access medical records, connect with experienced
            doctors, and manage your healthcare journey through one secure,
            reliable and easy-to-use platform.
          </Typography>

          {/* Tagline */}
          <Typography
            sx={{
              mt: 4,
              fontSize: "28px",
              fontWeight: "bold",
              color: "#E091AC",
            }}
          >
            Simple. Secure. Compassionate.
          </Typography>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              mt: 5,
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: 190,
                height: 55,
                backgroundColor: "#0f7099",
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: "bold",

                "&:hover": {
                  backgroundColor: "#0EA5E9",
                  transform: "translateY(-3px)",
                },
              }}
            >
              Book Appointment
            </Button>

            <Button
              variant="outlined"
              sx={{
                width: 170,
                height: 55,
                color: "white",
                borderColor: "white",
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: "bold",

                "&:hover": {
                  backgroundColor: "white",
                  color: "#0F172A",
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Right Side */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={hospitalImage}
          alt="Hospital"
          sx={{
            width: "100%",
            maxWidth: "620px",
            borderRadius: "25px",
          }}
        />
      </Box>
    </Box>
  );
}

export default Homepage;