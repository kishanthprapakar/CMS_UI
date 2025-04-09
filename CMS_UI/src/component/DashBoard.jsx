import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Grid,
  FormHelperText,
  FormControlLabel,
  IconButton,
  Popover,
  Slide,
  Card,
  CardContent
} from "@mui/material";

import "@fontsource/poppins";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { forwardRef } from "react";
import Paper from '@mui/material/Paper';
import companyLogo from "../assets/company_logo.jpg";

import {
  PieChart,
  Pie,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const DashBoard = () => {
  // //dialogbox      remove the below comments upto 101
  // const [open, setOpen] = useState(false);
  // const [folders, setFolders] = useState([]);
  // const [reportName, setReportName] = useState("");
  // const [graphType, setGraphType] = useState("");
  // const [errors, setErrors] = useState({});

  // //logout state
  const [anchorLogoutEl, setAnchorLogoutEl] = useState(null);
  const [dialogLogoutOpen, setDialogLogoutOpen] = useState(false);
  const navigate = useNavigate();

  // const [reportType, setReportType] = useState("");
  // const [dataType, setDataType] = useState("");
  // const [reportTypeParam, setReportTypeParam] = useState("");
  // const [generateBy, setGenerateBy] = useState("");
  // const [showNPD, setShowNPD] = useState(false);
  // const [retailerNumber, setRetailerNumber] = useState(false);

  // const [includeProductCount, setIncludeProductCount] = useState(false);
  // const [showTop, setShowTop] = useState("");
  // const [showScore, setShowScore] = useState(false);
  // const [showAdcount, setShowAdcount] = useState(false);
  // const [addScore, setAddScore] = useState(false);

  // const [includeAdCount, setIncludeAdCount] = useState(false);
  // const [offlineShowTop, setOfflineShowTop] = useState("");
  // const [offlineShowScore, setOfflineShowScore] = useState(false);

  // const handleOpenDialog = () => {
  //   setOpen(true);
  // };

  // const handleCloseDialog = () => {
  //   setOpen(false);
  //   setErrors({});
  //   setFolders([]);
  //   setReportName("");
  //   setGraphType("");
  //   setReportType("");
  //   setDataType("");
  //   setReportTypeParam("");
  //   setGenerateBy("");
  //   setShowNPD(false);
  //   setRetailerNumber(false);
  // };

  const handleLogoutIconClick = (event) => {
    setAnchorLogoutEl(event.currentTarget);
  };

  const handleLogoutPopoverClose = () => {
    setAnchorLogoutEl(null);
  };

  const handleLogoutClick = () => {
    setAnchorLogoutEl(null);
    setDialogLogoutOpen(true);
  };

  const handleLogoutDialogClose = async () => {

    const accessToken = localStorage.getItem("access_token");
    console.log(accessToken, "accc");

    if (!accessToken) {
      console.error("Access token not found!");
      return;
    }
    try {
      console.log(`Bearer ${accessToken}`, "bear");
      await axios.post("http://192.168.172.227:8000/auth/logout",{},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log("Logout Successful");
      localStorage.removeItem("access_token");
    setDialogLogoutOpen(false);

    }catch(error){
      console.log("Logout error", error);
    }
    navigate("/");
  };

  const popoverLogoutOpen = Boolean(anchorLogoutEl);

  // const graphOptions = [
  //   "Pie Chart",
  //   "Column graph",
  //   "Line chart",
  //   "Bar chart",
  //   "Activity",
  //   "Activity - Online",
  //   "Progressive Pricing",
  //   "Activity - Online - Telecoms",
  //   "Activity with Sellers",
  //   "Banner Ad Report",
  // ];

  // const isShowCommonFields = [
  //   "Pie Chart",
  //   "Column graph",
  //   "Line chart",
  //   "Bar chart",
  // ].includes(graphType);
  // const isActivity = graphType === "Activity";
  // const isActivityOnline = graphType === "Activity" && dataType === "online";
  // const isProgressivePricing = graphType === "Progressive Pricing";
  // const isActivityWithSellers = graphType === "Activity with Sellers";
  // const isPieChartOnlineSOV =
  //   graphType === "Pie Chart" &&
  //   dataType === "online" &&
  //   reportType === "Share of Voice";
  // const isActivityOffline = graphType === "Activity" && dataType === "offline";
  // const isProgressiveOffline =
  //   graphType === "Progressive Pricing" && dataType === "offline";
  // const isSellersOnline =
  //   graphType === "Activity with Sellers" && dataType === "online";
  // const isSellersOffline =
  //   graphType === "Activity with Sellers" && dataType === "offline";
  // const isPieChartOfflineWithScore =
  //   graphType === "Pie Chart" &&
  //   dataType === "offline" &&
  //   (reportType === "Price" || reportType === "Share of Voice");
  // const isPieChartOfflineSOV =
  //   graphType === "Pie Chart" &&
  //   reportType === "Share of Voice" &&
  //   dataType === "offline";

  // const folderOptions = ["Australia", "New Zealand"];

  // const handleSubmit = () => {
  //   const newErrors = {};
  //   if (folders.length === 0) {
  //     newErrors.folders = "Please select at least one";
  //   }
  //   if (!reportName.trim()) {
  //     newErrors.reportName = "Report name is required";
  //   }
  //   if (!graphType) {
  //     newErrors.graphType = "Please select a graph type";
  //   }

  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length === 0) {
  //     console.log({
  //       folders,
  //       reportName,
  //       graphType,
  //       reportType,
  //       dataType,
  //       reportTypeParam,
  //       generateBy,
  //       showNPD,
  //       retailerNumber,
  //     });
  //     handleCloseDialog();
  //   }
  // };

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  //piechart
  const pieData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  //line chart
  const lineData = [
    { name: "Jan", uv: 400, pv: 240 },
    { name: "Feb", uv: 300, pv: 456 },
    { name: "Mar", uv: 200, pv: 139 },
  ];

  //bar chart
  const barData = [
    { name: "Page A", uv: 3000, pv: 1398 },
    { name: "Page B", uv: 2000, pv: 9800 },
    { name: "Page C", uv: 2780, pv: 3908 },
  ];

  //column chart
  const columnData = [
    { name: "A", value: 120 },
    { name: "B", value: 98 },
    { name: "C", value: 86 },
  ];


  //test data integration
  const chartTypes = [
    "Pie Chart",
    "Column Graph",
    "Line Chart",
    "Bar Chart",
    "Activity",
    "Activity - Online",
    "Progressive Pricing",
    "Activity - Online - Telecoms",
    "Activity with Sellers",
    "Banner Ad Report",
  ];

  const categories = ["Electronics", "Appliances"];

  const subCategoriesMap = {
  Electronics: ["Mobile", "Laptop"],
  Appliances: ["Refrigerator"],
  };

  const [open, setOpen] = useState(false);
  const [chartType, setChartType] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [reportName, setReportName] = useState("");

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => {
    setOpen(false);
    setCategory("");
  setSubCategory("");
  setChartType("");
  setReportName("");
  }
  const handleSubmit = () => {
    // Handle form submission
    console.log("Chart Type ID:", chartType);
    const selected = apiChartTypes.find((c) => c.id === chartType);
    console.log("Selected Chart:", selected);
    handleCloseDialog();
  };

  //state for data fetching 
  const [apiChartTypes, setApiChartTypes] = useState([]);
  const [apiCategories, setApiCategories] = useState([]);
  const [apiSubCategories, setApiSubCategories] = useState([]);
 

  //table data
  const [reports, setReports] = useState([]);

  //fetch data 
  useEffect (() => {
    axios.get('http://192.168.172.227:8000/api/chart-types').then((response) => setApiChartTypes(response.data)).catch((err) => console.error("Failed to fetch chart types:", err));
    axios.get('http://192.168.172.227:8000/api/categories').then((response) => setApiCategories(response.data)).catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  // useEffect(() => {
  //   if (category) {
  //     axios
  //       .get("http://192.168.172.227:8000/api/subcategories", {
  //         params: { category_id: category },
  //       })
  //       .then((res) => setApiSubCategories(res.data));
  //   } else {
  //     setApiSubCategories([]);
  //   }
  // }, [category]);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1976D2" }}>
        <Toolbar disableGutters sx={{ pr: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", pl: 2 }}>
            <img
              src={companyLogo}
              alt="Logo"
              style={{ height: 40, marginRight: 8 }}
            />
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                fontFamily="Poppins"
                sx={{ fontWeight: 400 }}
              >
                Dashboard
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit" onClick={handleLogoutIconClick}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Popover
        open={popoverLogoutOpen}
        onClose={handleLogoutPopoverClose}
        anchorEl={anchorLogoutEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        // transformOrigin={{
        //   vertical: 'top',
        //   horizontal: 'right',
        // }}
      >
        <Button
          onClick={handleLogoutClick}
          sx={{ fontFamily: "Poppins", fontSize: "14px", fontWeight: 500 }}
        >
          LOGOUT
        </Button>
      </Popover>

      {/* <Dialog open={dialogLogoutOpen} onClose={handleLogoutDialogClose}>
      <DialogTitle> Logout Successfully</DialogTitle>
      <DialogActions>
        <Button onClick={handleLogoutDialogClose} autoFocus>OK</Button>
      </DialogActions>
      
    </Dialog> */}
      <Dialog
        open={dialogLogoutOpen}
        onClose={handleLogoutDialogClose}
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
              Logged Out Successfully
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={handleLogoutDialogClose}
            variant="contained"
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Box display="flex" justifyContent="flex-end" sx={{ pt: 8 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontFamily: "Poppins",
            fontWeight: 500,
            px: 1.5,
            py: 1,
            textTransform: "none",
            borderRadius: "8px",
          }}
          onClick={handleOpenDialog}
        >
          + Add Report
        </Button>
      </Box>

      {/* <Box sx={{ display: "flex", justifyContent: "center" }}> */}
        <Grid container spacing={3} pt={3}>
          <Grid size={6} p={3}>
          {/* <Paper elevation={3}> */}
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            </CardContent>
            </Card>
            {/* </Paper> */}
          </Grid>
          

          <Grid size={6} p={3}>
            {/* <Paper elevation={3}> */}
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#01b5ea" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
            </CardContent>
            </Card>
            {/* </Paper> */}
          </Grid>

          <Grid size={6} p={3}>
            {/* <Paper elevation={3}> */}
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
            </CardContent>
            </Card>
            {/* </Paper> */}
          </Grid>

          <Grid size={6} p={3}>
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
          {/* <Paper elevation={3}> */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={columnData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#6559de" />
              </BarChart>
            </ResponsiveContainer>
            </CardContent>
            </Card>
            {/* </Paper> */}
          </Grid>
        </Grid>
      {/* </Box> */}

      {/* <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>
        Create Report
      </DialogTitle>

      <DialogContent>
        <Typography>
          You can add Reports
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseDialog}>Close</Button>
      </DialogActions>
    </Dialog> */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle sx={{ fontFamily: "Poppins", fontWeight: 600 }}>
          Create New Report
        </DialogTitle>
        <DialogContent sx={{pt: 3}}>

        <Grid container spacing={3} alignItems="center">
            {/* Report Name */}
            <Grid size = {{xs:2}}>
              <Typography>Report Name</Typography>
            </Grid>
            <Grid size={{xs:4}}>
              <TextField
                fullWidth
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                placeholder="Enter report name"
                
              />
            </Grid>

            {/* Chart Types */}
            <Grid size = {{xs:2}}>
              <Typography>Chart Types</Typography>
            </Grid>
            <Grid size = {{xs:4}}>
              <FormControl fullWidth>
                <InputLabel>Select Chart</InputLabel>
                <Select
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  label="Select Chart"
                >
                  {apiChartTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Categories */}
            <Grid size = {{xs:2}}>
              <Typography>Categories</Typography>
            </Grid>
            <Grid size = {{xs:4}}>
              <FormControl fullWidth>
                <InputLabel>Select Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSubCategory(""); // Reset subcategory on category change
                  }}
                  label="Select Category"
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* SubCategory */}
            {/* <Grid size = {{xs:2}}>
              <Typography>SubCategory</Typography>
            </Grid>
            <Grid size = {{xs:4}}>
              <FormControl fullWidth>
                <InputLabel>Select SubCategory</InputLabel>
                <Select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  label="Select SubCategory"
                  disabled={!category}
                >
                  {(subCategoriesMap[category] || []).map((sub) => (
                    <MenuItem key={sub} value={sub}>
                      {sub}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}
            {category && (
              <>
                <Grid size={{xs:2}}>
                  <Typography>SubCategory</Typography>
                </Grid>
                <Grid size={{xs:4}}>
                  <FormControl fullWidth>
                    <InputLabel>Select SubCategory</InputLabel>
                    <Select
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      label="Select SubCategory"
                    >
                      {(subCategoriesMap[category] || []).map((sub) => (
                        <MenuItem key={sub} value={sub}>
                          {sub}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>

        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DashBoard;
