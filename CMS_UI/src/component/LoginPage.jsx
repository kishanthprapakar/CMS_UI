import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@fontsource/poppins";
import Lottie from "lottie-react";
import companyLogo from "../assets/company_logo.jpg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import loginAnimation from "../assets/loginAnimation.json";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  //username && password state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //forgot password
  const [openForgotDialog, setOpenForgotDialog] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //API baseName
  const baseURL = "http://192.168.223.227:8000";

  //handle submit function
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${baseURL}/auth/login`,
        {
          username: username,
          password: password,
        }
      );
      console.log("access_token", response);

      const token = response.data.access_token;

      if (token) {
        localStorage.setItem("access_token", token);

      const decoded = jwtDecode(token);
      const extractedUsername = decoded?.sub || ""; // assuming "sub" contains username
      localStorage.setItem("username", extractedUsername);

      setLoginSnackBar(true);

      setTimeout(() => {
        navigate("/dashboard");
      },500);

      // navigate("/dashboard");
        
      } else {
        setApiError("Invalid credentials");
      }
    } catch (error) {
      setApiError(error.response?.data?.detail || "Login failed");
    }
    // navigate("/dashboard");
  };

  //handle password visibility
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  //snackbar state
  const [loginSnackBar, setLoginSnackBar] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // /* background: "linear-gradient(180deg,rgb(33, 66, 163) 0%,rgb(73, 156, 225) 100%)",px: 2,*/
        background:
          "linear-gradient( 132.6deg,  rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%);linear-gradient( 109.6deg,  rgba(30,198,198,1) 11.3%, rgba(47,127,164,1) 50.1%, rgba(6,92,147,1) 100.2% );radial-gradient( circle 950px at 2.5% 8%,  rgba(44,103,176,1) 0%, rgba(35,56,136,1) 90% );",
        // background: "white"
      }}
    >
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        maxWidth="md"
      >
        {/* Left Side - Login Form */}
        <Grid
          size={{ xs: 12, sm: 6, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: "#fff",
            height: 0,
            //   p: 2,
            spacing: 2,
          }}
        >
          <Lottie animationData={loginAnimation} loop={true} />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 6, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              // width: "35vh",
              // height: "35vh",
              
              pl:6,
              pr:6,
              pt:4,
              pb:4,

              //p:4
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box sx={{ position: "absolute", top: 4, left: 4 }}>
              <img
                src={companyLogo}
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
              sx={{ mb: 3, mt: 2, textTransform: "none" }}
            >
              Login
            </Typography>

            <Stack spacing={2}>

              <TextField
                fullWidth
                label="Enter Username"
                size="small"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       {/* <IconButton edge="end"> */}
                //         <PersonIcon sx={{ fontSize: "22px" }} />
                //       {/* </IconButton> */}
                //     </InputAdornment>
                //   ),
                // }}
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <PersonIcon sx={{ fontSize: "22px" }} />
                //     </InputAdornment>
                //   ),
                // }}
                sx={{
                  "& .MuiInputLabel-root": {
                    fontFamily: "Poppins",
                    fontSize: "14.5px",
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px", // pill shape
                    fontFamily: "Poppins",
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#888",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1976d2",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? (
                          <Visibility sx={{ fontSize: "20px", pr: "1px" }} />
                        ) : (
                          <VisibilityOff sx={{ fontSize: "20px", pr: "1px" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    fontFamily: "Poppins",
                    fontSize: "14.5px",
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    fontFamily: "Poppins",
                    "& fieldset": {
                      borderColor: "#ccc",
                    },
                    "&:hover fieldset": {
                      borderColor: "#888",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1976d2",
                    },
                  },
                }}
              />
              <Box textAlign="right">
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{
                    cursor: "pointer",
                    fontFamily: "Poppins",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={() => setOpenForgotDialog(true)}
                >
                  Forgot password?
                </Typography>
              </Box>

              {apiError && (
                <Typography color="error" textAlign="center">
                  {apiError}
                </Typography>
              )}
              <Box display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    width: "33%",
                    fontFamily: "Poppins",
                    textTransform: "none",
                    backgroundColor: "#0077B6",
                  }}
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </Box>
            </Stack>
          </Paper>
          {/*forgot password dialog*/}
          <Dialog
            open={openForgotDialog}
            onClose={() => setOpenForgotDialog(false)}
            PaperProps={{
              sx: {
                borderRadius: 4,
                p: 3,
                width: 400,
                maxWidth: "90%",
              },
            }}
          >
            <DialogTitle
              sx={{
                fontFamily: "Poppins",
                fontSize: "1.5rem",
                textAlign: "center",
                pb: 3,
              }}
            >
              Forgot Password
            </DialogTitle>

            <DialogContent>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  mb: 2,
                  fontSize: "0.95rem",
                  textAlign: "center",
                }}
              >
                Please enter your registered email address.
              </Typography>

              <TextField
                fullWidth
                size="small"
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ fontFamily: "Poppins", mb: 1 }}
              />
            </DialogContent>

            <DialogActions
              sx={{ justifyContent: "space-between", px: 3, pb: 2 }}
            >
              <Button
                onClick={() => setOpenForgotDialog(false)}
                sx={{ fontFamily: "Poppins", textTransform: "none" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={async () => {
                  try {
                    const response = await axios.post(
                      `${baseURL}/auth/forgot_password_token`,
                      {
                        email: email,
                      }
                    );
                    const token = response.data.token;
                    localStorage.setItem("resetToken", token);
                    console.log("token", token);
                    setOpenForgotDialog(false);
                    setOpenResetDialog(true);
                    setEmail("");
                  } catch (error) {
                    console.error("Error sending reset email", error);
                  }
                }}
                sx={{
                  fontFamily: "Poppins",
                  textTransform: "none",
                  borderRadius: 4
                }}
              >
                Continue
              </Button>
            </DialogActions>
          </Dialog>

          {/* Reset password */}
          <Dialog
            open={openResetDialog}
            onClose={() => setOpenResetDialog(false)}
            PaperProps={{
              sx: { borderRadius: 4, p: 3, minWidth: 400 },
            }}
          >
            <DialogTitle
              sx={{
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            >
              Reset Password
            </DialogTitle>

            <DialogContent
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                pt: 2,
              }}
            >
              <Typography
                fontFamily="Poppins"
                fontWeight={500}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Enter your new password:
              </Typography>
              <TextField
                size="small"
                label="New Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                variant="outlined"
                sx={{ fontFamily: "Poppins" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </DialogContent>

            <DialogActions sx={{ justifyContent: "space-between", pt: 2 }}>
              <Button
                onClick={() => setOpenResetDialog(false)}
                sx={{ fontFamily: "Poppins", textTransform: "none" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("resetToken");

                    const res = await axios.post(
                      `${baseURL}/auth/reset-password`,
                      {
                        token: token,
                        new_password: newPassword,
                      }
                    );

                    setOpenResetDialog(false);
                    setNewPassword("");
                    localStorage.removeItem("resetToken");
                  } catch (err) {
                    console.error("Reset failed", err);
                  }
                }}
                sx={{ fontFamily: "Poppins", textTransform: "none" }}
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
      <Snackbar
  open={loginSnackBar}
  autoHideDuration={1300}
  onClose={() => setLoginSnackBar(false)}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
  sx={{p:0}}
>
  <Alert
    // onClose={() => setLoginSnackBar(false)}
    severity="success"
    sx={{
      // width: "100%",
      background: "linear-gradient( 132.6deg,  rgba(71,139,214,1) 100%);linear-gradient( 109.6deg,  rgba(30,198,198,1) 11.3%, rgba(47,127,164,1) 50.1%, rgba(6,92,147,1) 100.2% );radial-gradient( circle 950px at 2.5% 8%,  rgba(44,103,176,1) 0%, rgba(35,56,136,1) 90% );",
      color: "white",
      fontFamily: "Poppins",
      borderRadius: 2,
      boxShadow: 6,
      "& .MuiAlert-icon": {
      // color: "#2CFF05",
      color: "white"
    },
    }}
  >
    Login Successfully!
  </Alert>
</Snackbar>

    </Box>
  );
};

export default LoginPage;