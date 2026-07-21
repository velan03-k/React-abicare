import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthLayout from "../Components/AuthLayout";
import axios from "axios";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

      try {
        console.log(loginData);
    const responce = await axios.post("http://localhost:5000/api/users/login", loginData);


alert(responce.data.message);

console.log(responce.data);

// clear form data
setLoginData({
  email: "",
  password: "",
  remember: false
});

  } catch (error) {
    console.error(error);
    alert(error.response.data.message || "Login failed.");
  }
}

    // Backend Login API

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
              fontWeight: "bold",
              textAlign: "center",
              mb: 4,
            }}
          >
            Welcome{" "}
            <span style={{ color: "#6BBAE0" }}>
              Back
            </span>
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleChange}
              sx={{
                ...textFieldStyle,
                mb: 3,
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              sx={{
                ...textFieldStyle,
                mb: 2,
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="remember"
                    checked={loginData.remember}
                    onChange={handleChange}
                    sx={{
                      color: "#6BBAE0",
                      "&.Mui-checked": {
                        color: "#6BBAE0",
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: "white" }}>
                    Remember Me
                  </Typography>
                }
              />

              <Link
                component={RouterLink}
                to="/forgot-password"
                underline="none"
                sx={{
                  color: "#6BBAE0",
                  fontWeight: "bold",

                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                bgcolor: "#6BBAE0",
                color: "#0F172A",
                fontWeight: "bold",
                py: 1.5,
                fontSize: "18px",
                textTransform: "none",

                "&:hover": {
                  bgcolor: "white",
                },
              }}
            >
              Login
            </Button>

            <Typography
              sx={{
                mt: 4,
                textAlign: "center",
                color: "gray",
              }}
            >
              Don't have an account?{" "}
              <Link
                component={RouterLink}
                to="/signup"
                underline="none"
                sx={{
                  color: "#6BBAE0",
                  fontWeight: "bold",

                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                Signup
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}

export default Login;