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
import { useNavigate } from "react-router-dom";

function Login() {
   const navigate = useNavigate();

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
    const response = await axios.post(
      "http://localhost:5000/api/users/login",
      {
        email: loginData.email,
        password: loginData.password,
      }
    );

    alert(response.data.message);

    console.log(response.data);


    // Store JWT token only
    localStorage.setItem(
      "token",
      response.data.token
    );


    // Store role for frontend route checking
    localStorage.setItem(
      "role",
      response.data.user.role
    );


    // Redirect based on role
    if (response.data.user.role === "admin") {
        console.log("Navigating to admin");

      navigate("/admin");

    } else {

      navigate("/");

    }


    setLoginData({
      email: "",
      password: "",
      remember: false,
    });


  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message || "Login failed."
    );

  }
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