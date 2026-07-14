import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthLayout from "../Components/AuthLayout";

function ForgotPassword() {
  const [step, setStep] = useState(1);

  const [forgotData, setForgotData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setForgotData({
      ...forgotData,
      [event.target.name]: event.target.value,
    });
  };

  const sendOTP = (event) => {
    event.preventDefault();

    console.log("OTP Sent To:", forgotData.email);

    // Backend API

    setStep(2);
  };

  const resetPassword = (event) => {
    event.preventDefault();

    console.log(forgotData);

    // Backend API
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      color: "white",

      "& fieldset": {
        borderColor: "rgba(107,186,224,.3)",
      },

      "&:hover fieldset": {
        borderColor: "#6BBAE0",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#6BBAE0",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#6BBAE0",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#6BBAE0",
    },
  };

  return (
    <AuthLayout>
      <Card
        sx={{
          bgcolor: "#1E293B",
          borderRadius: "20px",
          border: "1px solid rgba(107,186,224,.2)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            sx={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              mb: 4,
            }}
          >
            Reset{" "}
            <span style={{ color: "#6BBAE0" }}>
              Password
            </span>
          </Typography>

          {/* STEP 1 */}

          {step === 1 && (
            <Box component="form" onSubmit={sendOTP}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={forgotData.email}
                onChange={handleChange}
                sx={{
                  ...textFieldStyle,
                  mb: 4,
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: "#6BBAE0",
                  color: "#0F172A",
                  fontWeight: "bold",
                  py: 1.5,
                  fontSize: 18,
                  textTransform: "none",

                  "&:hover": {
                    bgcolor: "white",
                  },
                }}
              >
                Send OTP
              </Button>
            </Box>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <Box component="form" onSubmit={resetPassword}>
              <TextField
                fullWidth
                label="OTP"
                name="otp"
                value={forgotData.otp}
                onChange={handleChange}
                sx={{
                  ...textFieldStyle,
                  mb: 3,
                }}
              />

              <TextField
                fullWidth
                label="New Password"
                type="password"
                name="password"
                value={forgotData.password}
                onChange={handleChange}
                sx={{
                  ...textFieldStyle,
                  mb: 3,
                }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={forgotData.confirmPassword}
                onChange={handleChange}
                sx={{
                  ...textFieldStyle,
                  mb: 4,
                }}
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  bgcolor: "#6BBAE0",
                  color: "#0F172A",
                  fontWeight: "bold",
                  py: 1.5,
                  fontSize: 18,
                  textTransform: "none",

                  "&:hover": {
                    bgcolor: "white",
                  },
                }}
              >
                Reset Password
              </Button>
            </Box>
          )}

          <Typography
            sx={{
              mt: 4,
              color: "gray",
              textAlign: "center",
            }}
          >
            Remember your password?{" "}
            <Link
              component={RouterLink}
              to="/login"
              underline="none"
              sx={{
                color: "#6BBAE0",
                fontWeight: "bold",

                "&:hover": {
                  color: "white",
                },
              }}
            >
              Login
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

export default ForgotPassword;