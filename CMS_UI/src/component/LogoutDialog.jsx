import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Slide
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const LogoutDialog = ({ open, onClose, message }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth="xs"
      fullWidth
    >
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          p={2}
        >
          <CheckCircleOutlineIcon
            color="success"
            sx={{ fontSize: 60, mb: 1 }}
          />
          <Typography variant="h6" gutterBottom>
            {message}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          autoFocus
          sx={{ textTransform: "none", backgroundColor: "#0077B6" }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;