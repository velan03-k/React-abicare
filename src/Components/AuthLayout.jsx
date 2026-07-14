import { Box, Typography } from "@mui/material";
import hospitalImage from "../Assets/Gemini_Generated_Image_ei62snei62snei62-clean.png";

function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#0F172A",
      }}
    >
      {/* Left Side */}
      <Box
        sx={{
          width: {
            xs: "100%",
            md: "50%",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 5,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Right Side */}

      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          width: "50%",
          position: "relative",
        }}
      >
        <Box
          component="img"
          src={hospitalImage}
          alt="Hospital"
          sx={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(15,23,42,.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              color: "white",
              px: 5,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                mb: 3,
              }}
            >
              Your Health,
              <br />
              Our Priority
            </Typography>

            <Typography
              sx={{
                fontSize: 20,
                lineHeight: 1.8,
              }}
            >
              Experience smarter healthcare management with ABI CARE.
              Book appointments, access records and connect with trusted doctors.
            </Typography>

            <Typography
              sx={{
                mt: 5,
                color: "#6BBAE0",
                fontWeight: "bold",
                fontSize: 22,
              }}
            >
              Secure • Compassionate • Accessible
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AuthLayout;