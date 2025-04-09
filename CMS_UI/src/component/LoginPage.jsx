import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Stack,
  Container,
  InputAdornment,
  IconButton
} from "@mui/material";

import {createReport} from '../Services/apiServices.js';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '@fontsource/poppins';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import animationn from '../assets/animation_image.json'
import Lottie from "lottie-react";
// import loginAnimation from '../assets/animation_loginpage.json';
import companyLogo from '../assets/company_logo.jpg';
import PersonIcon from '@mui/icons-material/Person';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import backgroundLoginImage from '../assets/background_login.png';
import loginAnimation from '../assets/loginAnimation.json';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://192.168.172.227:8000/auth/login", {
        username: username,
        password: password,
      });
      console.log("access_token", response);

      const token = response.data.access_token;

      if (token) {
        localStorage.setItem("access_token", token);
        navigate("/dashboard");
      } else {
        setApiError("Invalid credentials");
      }
    } catch (error) {
      setApiError(error.response?.data?.detail || "Login failed");
    }
    // navigate("/dashboard");
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "97vh",
    //     backgroundImage: {backgroundLoginImage},
    //     backgroundSize: "cover",
    // backgroundPosition: "center",
        // /* background: "linear-gradient(180deg,rgb(33, 66, 163) 0%,rgb(73, 156, 225) 100%)",px: 2,*/
        background: "linear-gradient( 132.6deg,  rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7% );linear-gradient( 109.6deg,  rgba(30,198,198,1) 11.3%, rgba(47,127,164,1) 50.1%, rgba(6,92,147,1) 100.2% );radial-gradient( circle 950px at 2.5% 8%,  rgba(44,103,176,1) 0%, rgba(35,56,136,1) 90% );"
      }}
      
    >
    {/* <Container sx={{alignItems: "center", justifyContent: "center", display: "flex", minHeight:"100vh", overflow: "hidden"}}> */}
        <Grid container spacing={4}
        justifyContent="center"
        alignItems="center"
        maxWidth="md">
          {/* Left Side - Login Form */}
          <Grid
            size={{ xs: 12, sm: 6, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              backgroundColor: "#fff",
              height: 380,
            //   p: 2,
            spacing:2
            }}
          >
            {/* <Paper
            elevation={4}
            sx={{
              borderRadius: 5,
              // p: 2,
              height: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          > */}
            {/* <Box component="img" src={man} alt="Illustration" sx={{ width: "80%", height:"80%"}} /> */}
            {/* <DotLottieReact
      src={animation}
      loop
      autoplay
    /> */}
           <Lottie animationData={loginAnimation} loop={true} />
          {/* <Box sx={{ width: '100%', height: '100%', borderRadius: 2, overflow: 'hidden' }}>
  <video
    src={animation}
    autoPlay
    loop
    muted
    playsInline
    style={{ width: '100%', height: '100%'}}
  />
</Box> */}
            {/* </Paper> */}
          </Grid>
          <Grid
        size={{ xs: 12, sm: 6, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: { xs: 3, sm: 4 },
            }}
          >
            <Paper
            elevation={4}
            sx={{
              borderRadius: 5,
              p: 4,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative"
            }}
          >
            <Box sx={{ position: "absolute", top: 4,left:4 }}>
        <img
          src={companyLogo} // <-- adjust path as needed
          alt="Logo"
          style={{ width: 100, height: 40, borderRadius: "8px" }}
        />
      </Box>
            <Typography
              variant="h5"
              fontFamily="Poppins"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
              sx={{ mb: 3, mt:2}}
            >
              LOGIN
            </Typography>

            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Enter Username"
                size="small"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <PersonIcon sx={{ fontSize: "22px"  }}/>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx = {{
                  '& .MuiInputLabel-root' : {
                    fontFamily: "Poppins",
                    fontSize: "14.5px",
                    
                  },
                  '& .MuiOutlinedInput-root': {
      borderRadius: '10px', // pill shape
      fontFamily: 'Poppins',
      '& fieldset': {
        borderColor: '#ccc',
      },
      '&:hover fieldset': {
        borderColor: '#888',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1976d2',
      },
    }
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type= {showPassword ? "text" : "password"}
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ?  <Visibility sx={{ fontSize: "20px", pr: "1px"}}/> : <VisibilityOff sx={{ fontSize: "20px", pr: "1px"}}/>}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx = {{
                  '& .MuiInputLabel-root' : {
                    fontFamily: "Poppins",
                    fontSize: "14.5px",
                  },
                  '& .MuiOutlinedInput-root': {
      borderRadius: '10px', // pill shape
      fontFamily: 'Poppins',
      '& fieldset': {
        borderColor: '#ccc',
      },
      '&:hover fieldset': {
        borderColor: '#888',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1976d2',
      },
    }
                }}
              />
              {apiError && (
                <Typography color="error" textAlign="center">
                  {apiError}
                </Typography>
              )}
              <Box display="flex" justifyContent= "center">
              <Button
                variant="contained"
                sx={{ borderRadius: 2, mt: 1, width: "40%", fontFamily: "Poppins" }}
                onClick={handleSubmit}

              >
                Login
              </Button>
              </Box>
            </Stack>
            </Paper>
          </Grid>

          {/* Right Side - Image */}
          
      </Grid>
    
    </Box>
  );
};

export default LoginPage;
