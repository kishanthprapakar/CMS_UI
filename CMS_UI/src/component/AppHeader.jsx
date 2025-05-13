import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Popover,
  Button,
  Dialog,
  DialogContent,
  Typography,
  Slide,
  Card,
  CardContent, 
  Stack,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import companyLogo from "../assets/company_logo.jpg";
import axios from "axios";
import Lottie from "lottie-react";
import LogoutAnimation from "../assets/logoutAnimation.json";
import { TbLogout2 } from "react-icons/tb";

const Transitionn = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AppHeader = () => {
  const [anchorLogoutEl, setAnchorLogoutEl] = useState(null);
  const [dialogLogoutOpen, setDialogLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const [logoutMessage, setLogoutMessage] = useState("");
  const popoverLogoutOpen = Boolean(anchorLogoutEl);

  const handleLogoutIconClick = (event) => {
    setAnchorLogoutEl(event.currentTarget);
  };

  const handleLogoutPopoverClose = () => {
    setAnchorLogoutEl(null);
  };

  //logout API call
  const handleLogoutClick = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("Access token not found!");
      return;
    }
    try {
      const response = await axios.post(
        "http://192.168.223.227:8000/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const fullMessage = response?.data?.message || "Logged out successfully.";
      const match = fullMessage.match(/User '(.+?)'/);
      const username = match ? match[1] : "";
      setLogoutMessage(`${username} logged out successfully`);
      localStorage.removeItem("access_token");
      setDialogLogoutOpen(true);

      setTimeout(() => {
        setDialogLogoutOpen(false);
        navigate("/");
      }, 1300);

    } catch (error) {
      console.log("Logout error", error);
    }
  };

  const handleLogoutDialogClose = () => {
    setDialogLogoutOpen(false);
    navigate("/");
  };

  const username = localStorage.getItem("username");
  const avatarLetter = username ? username.charAt(0).toUpperCase() : "?";
  const avatarColor = stringToColor(username);

  //avatar color based on username
  // utils/avatarColor.js
 function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

// Generate pastel RGB values
const r = (hash >> 0) & 0x7F;  // limit to 0-127
const g = (hash >> 8) & 0x7F;
const b = (hash >> 16) & 0x7F;

// Add 127 to each to keep it in the pastel range (127–254)
const color = `rgb(${r + 127}, ${g + 127}, ${b + 127})`;
return color;
}


  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundImage: "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)",
          backgroundColor: "transparent",
        }}
      >
        <Toolbar disableGutters sx={{ pr: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", pl: 2 }}>
            <img
              src={companyLogo}
              alt="Logo"
              style={{ height: 40, marginRight: 8 }}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={handleLogoutIconClick}>
            <LogoutIcon />
            {/* <Avatar sx={{bgcolor:  avatarColor, color:"#fff" }}>{avatarLetter}</Avatar> */}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Logout Popover */}
      <Popover
        open={popoverLogoutOpen}
        onClose={handleLogoutPopoverClose}
        anchorEl={anchorLogoutEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'bottom',
        }}
        PaperProps={{
          sx: {
            mt: 2,
            // mr:2,
      boxShadow: 3,
      borderRadius: 6,
             // Increase this to move it lower (e.g., mt: 2 for more spacing)
          },
        }}
      >
        <Card sx={{  mx: "auto",}}>
          {/* <CardHeader> */}
          {/* <CardMedia
        component="img"
        sx={{mx: "auto", mt: 2, width: 40, height: 40}}
        image={LogoutLeftIcon}
        alt="logout icon"
      /> */}
      <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
    <TbLogout2 size={32} color= "#478BD6" />
  </Box>
      {/* <Avatar sx={{bgcolor:  avatarColor, color:"#fff" }}>{avatarLetter}</Avatar> */}
          {/* </CardHeader> */}
          <CardContent sx={{pt:1}}>
            <Typography gutterBottom variant="h6" sx={{ fontFamily: "Poppins", display: "flex", justifyContent: "center", fontWeight: "bold"}}> Logout </Typography>
            <Typography variant="body2" sx={{display: "flex", justifyContent: "center", fontFamily: "Poppins", color: "grey.700"}}>
              Are you sure you want to logout?
            </Typography>
          </CardContent>
          {/* <CardActions sx={{display: "flex", flexDirection: "column", gap: 1.5, px: 2, pb: 2 }}> */}
        <Stack sx={{gap:1.5, p:2}}>
        <Button
          onClick={handleLogoutClick}
          variant="contained"
          size="small"
          sx={{
            fontFamily: "Poppins",
            fontSize: "14px",
            borderRadius: 2,
            textTransform: "none",
            backgroundColor: "#0077B6",
            width: "100%",
            
          }}
        >
          Yes, Logout
        </Button>

        <Button variant="outlined" size="small" sx={{fontFamily: "Poppins",
            fontSize: "14px",
            borderRadius: 2,
            textTransform: "none",
            width: "100%",
          }}
          onClick={handleLogoutPopoverClose}

            >
          Cancel
        </Button>
        </Stack>
        {/* </CardActions> */}

        </Card>
      </Popover>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={dialogLogoutOpen}
        onClose={handleLogoutDialogClose}
        TransitionComponent={Transitionn}
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: 8,
            boxShadow:3,
            maxWidth: 340
          }
        }}
      >
        <DialogContent sx={{px:0}}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            sx={{pb:1}}
            // p={2}
          >
            <Lottie animationData={LogoutAnimation} loop={true} style={{ width: 250, height: 130 }}/>
            <Typography  variant="body1" fontSize="16px" fontFamily={"Poppins"}>
              {logoutMessage}
            </Typography>
          </Box>
        </DialogContent>
        
      </Dialog>
    </>
  );
};

export default AppHeader;