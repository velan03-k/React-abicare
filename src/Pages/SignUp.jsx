import { useState } from "react";
import {
  Box, Button, Card, CardContent, IconButton,
  InputAdornment, Link, TextField, Typography
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import AuthLayout from "../Components/AuthLayout";
import API from "../Api/api";
export default function Signup() {
  const [formData,setFormData]=useState({
    firstName:"",lastName:"",email:"",
    password:"",confirmPassword:""
  });
  const [errors,setErrors]=useState({});
  const [showPassword,setShowPassword]=useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false);

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value});
    setErrors({...errors,[name]:""});
  };

  const validate=()=>{
    const err={};
    if(!formData.firstName.trim()) err.firstName="First name is required";
    if(!formData.lastName.trim()) err.lastName="Last name is required";
    if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email))
      err.email="Enter a valid email";
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(formData.password))
      err.password="Weak password";
    if(formData.confirmPassword!==formData.password)
      err.confirmPassword="Passwords do not match";
    setErrors(err);
    return Object.keys(err).length===0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

   console.log("1. Submit clicked");

    if (!validate()) return;

      console.log("3. Validation passed");

  try {

        console.log("4. Sending request...");
    const responce = await API.post("users", formData);

     console.log("5. Response:", response.data);


alert(response.data.message);

console.log(response.data);

// clear form data
setFormData({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
});

  } catch (error) {
    console.error(error);
       console.log("6. Error:", error);
    alert(error.response.data.message || "An error occurred while creating the account.");
  }
}

  const tf={
    mb:3,
    "& .MuiOutlinedInput-root":{
      color:"white",
      "& fieldset":{borderColor:"rgba(107,186,224,.3)"},
      "&:hover fieldset":{borderColor:"#6BBAE0"},
      "&.Mui-focused fieldset":{borderColor:"#6BBAE0"},
    },
    "& .MuiInputLabel-root":{color:"#6BBAE0"},
    "& .MuiInputLabel-root.Mui-focused":{color:"#6BBAE0"},
  };

  return (
    <AuthLayout>
      <Card sx={{bgcolor:"#1E293B",borderRadius:3,border:"1px solid rgba(107,186,224,.2)"}}>
        <CardContent sx={{p:4}}>
          <Typography variant="h4" color="white" fontWeight="bold" textAlign="center" mb={4}>
            Create <span style={{color:"#6BBAE0"}}>Account</span>
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{display:"flex",gap:2}}>
              <TextField fullWidth label="First Name" name="firstName" value={formData.firstName}
                onChange={handleChange} error={!!errors.firstName} helperText={errors.firstName} sx={tf}/>
              <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName}
                onChange={handleChange} error={!!errors.lastName} helperText={errors.lastName} sx={tf}/>
            </Box>

            <TextField fullWidth label="Email Address" name="email" value={formData.email}
              onChange={handleChange} error={!!errors.email} helperText={errors.email} sx={tf}/>

            <TextField fullWidth label="Password" name="password"
              type={showPassword?"text":"password"}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              sx={tf}
              slotProps={{
                input:{
                  endAdornment:
                  <InputAdornment position="end">
                    <IconButton onClick={()=>setShowPassword(!showPassword)}>
                      {showPassword?<VisibilityOff/>:<Visibility/>}
                    </IconButton>
                  </InputAdornment>
                }
              }}
            />

            <TextField fullWidth label="Confirm Password" name="confirmPassword"
              type={showConfirmPassword?"text":"password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={tf}
              slotProps={{
                input:{
                  endAdornment:
                  <InputAdornment position="end">
                    <IconButton onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword?<VisibilityOff/>:<Visibility/>}
                    </IconButton>
                  </InputAdornment>
                }
              }}
            />

<Button
  fullWidth
  type="submit"
  variant="contained"
  onClick={() => console.log("BUTTON CLICKED")}
  sx={{
    mt: 1,
    py: 1.5,
    bgcolor: "#6BBAE0",
    color: "#0F172A",
    fontWeight: "bold",
    "&:hover": { bgcolor: "white" },
  }}
>
  Create Account
</Button>
            <Typography sx={{mt:3,textAlign:"center",color:"gray"}}>
              Already have an account?{" "}
              <Link component={RouterLink} to="/login" underline="none"
                sx={{color:"#6BBAE0",fontWeight:"bold"}}>
                Login
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}