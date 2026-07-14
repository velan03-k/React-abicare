import React from "react";
import { Box, Typography, IconButton } from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#0F172A",
        mt: 10,
      }}
    >
      {/* Top Footer */}
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          px: 8,
          py: 8,
          gap: 5,
        }}
      >
        {/* ABI CARE */}
        <Box sx={{ width: "320px" }}>
          <Typography
            variant="h5"
            sx={{
              color: "#38BDF8",
              fontWeight: "bold",
              mb: 3,
              
            }}
          >
            ABI CARE
          </Typography>

          <Typography
            sx={{
              color: "#E091AC",
              lineHeight: 2,
              textAlign: "justify",
            }}
          >
            ABI CARE is committed to providing secure, compassionate and
            accessible healthcare services through modern technology.
          </Typography>
        </Box>

        {/* Quick Links */}
        <Box sx={{ width: "180px" }}>
          <Typography
            variant="h5"
            sx={{
              color: "#38BDF8",
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Quick Links
          </Typography>

          <Typography sx={{ color: "#E091AC", mb: 2, cursor: "pointer" }}>
            Home
          </Typography>

          <Typography sx={{ color: "#E091AC", mb: 2, cursor: "pointer" }}>
            About Us
          </Typography>

          <Typography sx={{ color: "#E091AC", mb: 2, cursor: "pointer" }}>
            Doctors
          </Typography>

          <Typography sx={{ color: "#E091AC", mb: 2, cursor: "pointer" }}>
            Departments
          </Typography>

          <Typography sx={{ color: "#E091AC", cursor: "pointer" }}>
            Book Appointment
          </Typography>
        </Box>

        {/* Contact */}
        <Box sx={{ width: "320px" }}>
          <Typography
            variant="h5"
            sx={{
              color: "#38BDF8",
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Contact Us
          </Typography>

          <Typography sx={{color: "#E091AC", mb: 2 }}>
            📧 abicare2000@gmail.com
          </Typography>

          <Typography sx={{color: "#E091AC", mb: 2 }}>
            📞 +91 7904019592
          </Typography>

          <Typography sx={{ color: "#E091AC", mb: 2 }}>
            📍 Chennai, Tamil Nadu, India
          </Typography>

          <Typography sx={{ color: "#E091AC" }}>
            🕒 24 × 7 Emergency Services
          </Typography>
        </Box>

        {/* Follow Us */}
        <Box sx={{ width: "250px" }}>
          <Typography
            variant="h5"
            sx={{
              color: "#38BDF8",
              fontWeight: "bold",
              mb: 3,
            }}
          >
            Follow Us
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              mb: 4,
            }}
          >
            <IconButton
              sx={{
                bgcolor: "#38BDF8",
                color: "#0F172A",
                "&:hover": {
                  bgcolor: "#0EA5E9",
                },
              }}
            >
              <FacebookIcon />
            </IconButton>

            <IconButton
              sx={{
                bgcolor: "#38BDF8",
                color: "#0F172A",
                "&:hover": {
                  bgcolor: "#0EA5E9",
                },
              }}
            >
              <InstagramIcon />
            </IconButton>

            <IconButton
              sx={{
                bgcolor: "#38BDF8",
                color: "#0F172A",
                "&:hover": {
                  bgcolor: "#0EA5E9",
                },
              }}
            >
              <XIcon />
            </IconButton>

            <IconButton
              sx={{
                bgcolor: "#38BDF8",
                color: "#0F172A",
                "&:hover": {
                  bgcolor: "#0EA5E9",
                },
              }}
            >
              <LinkedInIcon />
            </IconButton>

            <IconButton
              sx={{
                bgcolor: "#38BDF8",
                color: "#0F172A",
                "&:hover": {
                  bgcolor: "#0EA5E9",
                },
              }}
            >
              <YouTubeIcon />
            </IconButton>
          </Box>

          <Typography
            sx={{
             color: "#E091AC",
              mb: 2,
              cursor: "pointer",
              "&:hover": {
                color: "#38BDF8",
              },
            }}
          >
            Privacy Policy
          </Typography>

          <Typography
            sx={{
              color: "#E091AC",
              cursor: "pointer",
              "&:hover": {
                color: "#38BDF8",
              },
            }}
          >
            Terms & Conditions
          </Typography>
        </Box>
      </Box>

      {/* Bottom Footer */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.15)",
          py: 3,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            color: "#94A3B8",
            fontSize: "14px",
          }}
        >
          © 2026 ABI CARE. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;