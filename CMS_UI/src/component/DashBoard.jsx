import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  IconButton,
  Popover,
  Slide,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Autocomplete,
  MenuList,
} from "@mui/material";

import "@fontsource/poppins";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { forwardRef } from "react";
import companyLogo from "../assets/company_logo.jpg";
import CircularProgress from "@mui/material/CircularProgress";

import DeleteIcon from "@mui/icons-material/Delete";
import HistoryReportViewIcon from "../assets/HistoryReportViewIcon.png";
import EditIcons from "../assets/histotyReportEditIcon.png";

//date picker
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';

//new date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

import { styled } from "@mui/material/styles";

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

  //logout state
  const [anchorLogoutEl, setAnchorLogoutEl] = useState(null);
  const [dialogLogoutOpen, setDialogLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const [logoutMessage, setLogoutMessage] = useState("");

  const handleLogoutIconClick = (event) => {
    setAnchorLogoutEl(event.currentTarget);
  };

  const handleLogoutPopoverClose = () => {
    setAnchorLogoutEl(null);
  };

  const handleLogoutClick = async () => {
    const accessToken = localStorage.getItem("access_token");
    console.log(accessToken, "accc");

    if (!accessToken) {
      console.error("Access token not found!");
      return;
    }
    try {
      console.log(`Bearer ${accessToken}`, "bear");
      const response = await axios.post(
        "http://192.168.172.227:8000/auth/logout",
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
      // Extract username (e.g., from "User 'venki' logged out successfully.")
      const match = fullMessage.match(/User '(.+?)'/);
      const username = match ? match[1] : "";
      setLogoutMessage(`${username} logged out successfully`);

      console.log("Logout Successful");
      localStorage.removeItem("access_token");
      setDialogLogoutOpen(true);
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  const handleLogoutDialogClose = () => {
    setDialogLogoutOpen(false);
    navigate("/");
  };

  const popoverLogoutOpen = Boolean(anchorLogoutEl);

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  // //piechart
  // const pieData = [
  //   { name: "Group A", value: 400 },
  //   { name: "Group B", value: 300 },
  //   { name: "Group C", value: 300 },
  //   { name: "Group D", value: 200 },
  // ];

  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // //line chart
  // const lineData = [
  //   { name: "Jan", uv: 400, pv: 240 },
  //   { name: "Feb", uv: 300, pv: 456 },
  //   { name: "Mar", uv: 200, pv: 139 },
  // ];

  // //bar chart
  // const barData = [
  //   { name: "Page A", uv: 3000, pv: 1398 },
  //   { name: "Page B", uv: 2000, pv: 9800 },
  //   { name: "Page C", uv: 2780, pv: 3908 },
  // ];

  // //column chart
  // const columnData = [
  //   { name: "A", value: 120 },
  //   { name: "B", value: 98 },
  //   { name: "C", value: 86 },
  // ];

//dropdown states
  const [reportName, setReportName] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [retailer, setRetailer] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dateType, setDateType] = useState(null);

      //state for data fetching
  const [apiCountries, setApiCountries] = useState([]);
  const [apiCategories, setApiCategories] = useState([]);
  const [apiSubCategories, setApiSubCategories] = useState([]);
  const [apiModels, setApiModels] = useState([]);
  const [apiBrands, setApiBrands] = useState([]);
  const [apiRetailers, setApiRetailers] = useState([]);

    //static options for date types
    const dateTypeOptions = [
      "MTD",
      "QTD",
      "Q1",
      "Q2",
      "Q3",
      "Q4",
      "last_week",
      "last_month",
    ];

  const handleSubmit = () => {
    setSubmitLoader(true);
    setIsSubmitted(false);

    const selectedCountry = apiCountries.find((c) => c.id === country);
    const selectedCategory = apiCategories.find((c) => c.id === category);
    const selectedSubCategory = apiSubCategories.find(
      (c) => c.id === subCategory
    );
    const selectedModel = apiModels.find((p) => p.id === model); // Assuming you're using a product ID
    const selectedbrand = apiBrands.find((m) => m.id === brand);
    const selectedRetailer = apiRetailers.find((r) => r.id === retailer);

    const today = new Date();
    const start = startDate || today;
    const end = endDate || today;

    const queryParams = {
      report_name: reportName,
      country: selectedCountry?.name,
      category: selectedCategory?.name,
      subcategory: selectedSubCategory?.name,
      model: selectedModel?.model_no,
      brand: selectedbrand?.name,
      retailer: selectedRetailer?.name,
    };

    if (startDate !== null && endDate !== null) {
      queryParams.start_date = format(startDate, "yyyy-MM-dd");
      queryParams.end_date = format(endDate, "yyyy-MM-dd");
    } else if (dateType !== null) {
      queryParams.date_type = dateType;
    }

    // console.log("queryparams", queryParams);

    axios
      .get("http://192.168.172.227:8000/api/submit", { params: queryParams })
      .then((res) => {

        console.log("API Response", res.data);
        setReportData(res.data);
        setShowReportDialog(true);
        setIsSubmitted(true);

      })
      .catch((err) => {
        console.error("Failed to fetch report data:", err);
        alert("Failed to fetch report. Please try again!");
      })
      .finally(() => {
        setSubmitLoader(false); // Spinner off whether success or fail
      });

    // setSubmitLoader(false); // Hide spinner
  };

  //download csv && download pdf button
  const [anchorEl, setAnchorEl] = useState(null);

  //download button menuitem like pdf & csv
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadCSV = async () => {
    handleClose(); // Close popover first
    setDownloading(true);
    try {
      await handleDownloadCsvFile();
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadPDF = async () => {
    handleClose(); // Close popover
    setDownloading(true);
    
    try {
      await handleDownloadPdfFile();
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadExcel = async () => {
    handleClose();
    setDownloading(true);

    try {
      await handleDownloadExcelSheet();
    } finally {
      setDownloading(false);
    }
  };

  const openn = Boolean(anchorEl);

  const handleDownloadCsvFile = async () => {
    try {
      // Only send the relevant data properties to the server
      const selectedCountry = apiCountries.find((c) => c.id === country);
      const selectedCategory = apiCategories.find((c) => c.id === category);
      const selectedSubCategory = apiSubCategories.find(
        (c) => c.id === subCategory
      );
      const selectedModel = apiModels.find((p) => p.id === model); // Assuming you're using a product ID
      const selectedbrand = apiBrands.find((m) => m.id === brand);
      const selectedRetailer = apiRetailers.find((r) => r.id === retailer);

      const today = new Date();
      const start = startDate || today;
      const end = endDate || today;

      const queryParams = {
        // report_name: reportName,
        country: selectedCountry?.name,
        category: selectedCategory?.name,
        subcategory: selectedSubCategory?.name,
        model: selectedModel?.model_no,
        brand: selectedbrand?.name,
        retailer: selectedRetailer?.name,
      };

      if (startDate !== null && endDate !== null) {
        queryParams.start_date = format(startDate, "yyyy-MM-dd");
        queryParams.end_date = format(endDate, "yyyy-MM-dd");
      } else if (dateType !== null) {
        queryParams.date_type = dateType;
      }

      const response = await axios.get(
        "http://192.168.172.227:8000/api/export-csv",
        {
          params: queryParams, // Pass the data as query parameters
          responseType: "blob", // To handle the binary CSV response
        }
      );

      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      a.download = `${selectedbrand.name}_Report.csv`;

      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("CSV Download Failed", error);
    }
  };

  const handleDownloadPdfFile = async () => {
    try {
      // Only send the relevant data properties to the server
      const selectedCountry = apiCountries.find((c) => c.id === country);
      const selectedCategory = apiCategories.find((c) => c.id === category);
      const selectedSubCategory = apiSubCategories.find(
        (c) => c.id === subCategory
      );
      const selectedModel = apiModels.find((p) => p.id === model); // Assuming you're using a product ID
      const selectedbrand = apiBrands.find((m) => m.id === brand);
      const selectedRetailer = apiRetailers.find((r) => r.id === retailer);

      const today = new Date();
      const start = startDate || today;
      const end = endDate || today;

      const queryParams = {
        // report_name: reportName,
        country: selectedCountry?.name,
        category: selectedCategory?.name,
        subcategory: selectedSubCategory?.name,
        model: selectedModel?.model_no,
        brand: selectedbrand?.name,
        retailer: selectedRetailer?.name,
      };

      if (startDate !== null && endDate !== null) {
        queryParams.start_date = format(startDate, "yyyy-MM-dd");
        queryParams.end_date = format(endDate, "yyyy-MM-dd");
      } else if (dateType !== null) {
        queryParams.date_type = dateType;
      }

      const response = await axios.get(
        "http://192.168.172.227:8000/api/export-pdf",
        {
          params: queryParams, // Pass the data as query parameters
          responseType: "blob", // To handle the binary CSV response
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      a.download = `${selectedbrand.name}_Report.pdf`;

      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("CSV Download Failed", error);
    }
  };

  const handleDownloadExcelSheet = async () => {
    try {
      const selectedCountry = apiCountries.find((c) => c.id === country);
      const selectedCategory = apiCategories.find((c) => c.id === category);
      const selectedSubCategory = apiSubCategories.find(
        (c) => c.id === subCategory
      );
      const selectedModel = apiModels.find((p) => p.id === model); // Assuming you're using a product ID
      const selectedbrand = apiBrands.find((m) => m.id === brand);
      const selectedRetailer = apiRetailers.find((r) => r.id === retailer);

      const today = new Date();
      const start = startDate || today;
      const end = endDate || today;

      const queryParams = {
        // report_name: reportName,
        country: selectedCountry?.name,
        category: selectedCategory?.name,
        subcategory: selectedSubCategory?.name,
        model: selectedModel?.model_no,
        brand: selectedbrand?.name,
        retailer: selectedRetailer?.name,
      };

      if (startDate !== null && endDate !== null) {
        queryParams.start_date = format(startDate, "yyyy-MM-dd");
        queryParams.end_date = format(endDate, "yyyy-MM-dd");
      } else if (dateType !== null) {
        queryParams.date_type = dateType;
      }

      const response = await axios.get(
        "http://192.168.172.227:8000/api/export-excel",
        {
          params: queryParams, // Pass the data as query parameters
          responseType: "blob", // To handle the binary CSV response
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Build dynamic file name
      const fileName = `${selectedbrand.name}_Report.xlsx`;
      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("CSV Download Failed", error);
    }
  };

  //report list
  const [reportData, setReportData] = useState([]);
  const [showReportDialog, setShowReportDialog] = useState(false);

  //loading
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingBrands, setLoadingBrands] = useState(false);

  //download loading
  const [downloading, setDownloading] = useState(false);

  //fetch data from API for dropdowns

  const fetchCountries = async () => {
    try {
      const res = await axios.get(
        "http://192.168.172.227:8000/api/dropdown/countries"
      );
      setApiCountries(res.data);
    } catch (err) {
      console.error("Failed to fetch countries:", err);
    }
  };

  const fetchCategories = async (countryId) => {
    try {
      setLoadingCategories(true);
      const res = await axios.get(
        "http://192.168.172.227:8000/api/dropdown/categories",
        {
          params: { country_id: countryId },
        }
      );
      setApiCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const res = await axios.get(
        "http://192.168.172.227:8000/api/dropdown/subcategories",
        {
          params: { category_id: categoryId },
        }
      );
      setApiSubCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch subcategories:", err);
    }
  };

  const fetchBrands = async (categoryId, subCategoryId) => {
    try {
      setLoadingBrands(true);
      const res = await axios.get(
        "http://192.168.172.227:8000/api/dropdown/brands",
        {
          params: { category_id: categoryId, subcategory_id: subCategoryId },
        }
      );
      setApiBrands(res.data);
    } catch (err) {
      console.error("Failed to fetch brands:", err);
    } finally {
      setLoadingBrands(false);
    }
  };

  const fetchModels = async (categoryId, subCategoryId, brandId) => {
    try {
      const res = await axios.get(
        "http://192.168.172.227:8000/api/dropdown/models",
        {
          params: {
            category_id: categoryId,
            subcategory_id: subCategoryId,
            brand_id: brandId,
          },
        }
      );
      setApiModels(res.data);
    } catch (err) {
      console.error("Failed to fetch models:", err);
    }
  };

  const fetchRetailers = async (countryId) => {
    try {
      const res = await axios.get(
        "http://192.168.172.227:8000/api/dropdown/retailers",
        {
          params: { country_id: countryId },
        }
      );
      setApiRetailers(res.data);
    } catch (err) {
      console.error("Failed to fetch retailers:", err);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);


  //date type styles
  const StyledDatePicker = styled(DatePicker)({
    width: "86%",
    height: "100%",
    padding: "8px 14px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#f9f9f9",

    fontSize: "14px",
    fontFamily: "Poppins",
    outline: "none",
    transition: "all 0.3s ease",
    // transition: 'all 0.3s ease',

    // Hide placeholder on focus
    "&::placeholder": {
      fontSize: "14px",
      opacity: 0.6,
    },
    "&:focus::placeholder": {
      color: "transparent",
    },
    "&:hover": {
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)", // strong box shadow
      // transform: "scale(1.02)", // slight zoom on hover
    },
  });

  //state for after submission then only show card
  const [isSubmitted, setIsSubmitted] = useState(false);

  //submitloader
  const [submitLoader, setSubmitLoader] = useState(false);

  const [savedReportsId, setSavedReportsId] = useState([]);

  //save data
  const handleSaveReport = async () => {
    const token = localStorage.getItem("access_token"); // Get token from localStorage

    if (!token) {
      alert("User not authenticated.");
      return;
    }

    const selectedCountry = apiCountries.find((c) => c.id === country);
    const selectedCategory = apiCategories.find((c) => c.id === category);
    const selectedSubCategory = apiSubCategories.find(
      (c) => c.id === subCategory
    );
    const selectedModel = apiModels.find((p) => p.id === model); // Assuming you're using a product ID
    const selectedbrand = apiBrands.find((m) => m.id === brand);
    const selectedRetailer = apiRetailers.find((r) => r.id === retailer);

    const today = new Date();
    const start = startDate || today;
    const end = endDate || today;

    const queryParams = {
      report_name: reportName,
      // chart_type: selectedChart?.name,
      country: selectedCountry?.name,
      category: selectedCategory?.name,
      subcategory: selectedSubCategory?.name,
      model: selectedModel?.model_no,
      brand: selectedbrand?.name,
      retailer: selectedRetailer?.name,
    };

    if (startDate !== null && endDate !== null) {
      queryParams.start_date = format(startDate, "yyyy-MM-dd");
      queryParams.end_date = format(endDate, "yyyy-MM-dd");
    } else if (dateType !== null) {
      queryParams.date_type = dateType;
    }

    console.log("save query params", queryParams);

    try {
      const response = await axios.post(
        "http://192.168.172.227:8000/api/report/save",
        queryParams,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Report saved:", response.data.report_id);
      // alert(response.data.message); // Optional user feedback

      const reportId = response.data.report_id;
      console.log("reportIDset", reportId);

      if (reportId) {
        // Add the new saved report to the list!
        setSavedReportsId((prev) => [...prev, reportId]);
      }
      {
        console.log("savedreportidstate", savedReportsId);
      }

      // After saving, fetch the updated reports
      fetchReportViews();
    } catch (error) {
      console.error("Error saving report:", error);
      alert(error.response?.data?.detail || "Failed to save report.");
    }
  };

  //get call for data
  const [savedReports, setSavedReports] = useState([]);

  const fetchReportViews = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("User not authenticated.");
      return;
    }

    try {
      const response = await axios.get(
        "http://192.168.172.227:8000/api/report-views",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSavedReports(response.data);
      console.log("Fetched Reports:", response.data);
    } catch (error) {
      console.error("Error fetching report views:", error);
      alert("Failed to load reports.");
    }
  };

  useEffect(() => {
    fetchReportViews();
  }, []);

  //delete report API
  const handleDeleteReport = async (report_id) => {
    console.log("Deleting report with ID:", report_id);
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("User not authenticated.");
      return;
    }

    try {
      await axios.delete(
        `http://192.168.172.227:8000/api/reports/${report_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          // params: { report_id: report_id}
        }
      );
      // alert("Report deleted successfully!");

      // Refresh the table after deletion
      fetchReportViews();
    } catch (error) {
      console.error("Error deleting report:", error);
      alert(error.response?.data?.detail || "Failed to delete report.");
    }
  };

  //delete dialog data
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDeleteDialogOpen = (reportId) => {
    setSelectedReportId(reportId);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    if (selectedReportId) {
      handleDeleteReport(selectedReportId);
      setOpenDeleteDialog(false); // Close dialog
    }
  };

  //selected reports ID for delete icon
  const [selectedReportId, setSelectedReportId] = useState(null);

  //selected reports ID for edit icon
  const [selectedReportIdEdit, setSelectedReportIdEdit] = useState(null);

  //edit function
  const [isEditMode, setIsEditMode] = useState(false);

  const setAllFields = (data) => {
    const filters = data?.filters || {};

    setReportName(data?.report_name || "");

    setCountry(filters.country?.[0]?.id || null);
    console.log(filters?.category?.[0]?.id, "ctct");
    setCategory(filters.category?.[0]?.id || "");
    setSubCategory(filters.subCategory?.[0]?.id || "");
    setRetailer(filters.retailer?.[0]?.id || "");
    setBrand(filters.brand?.[0]?.id || "");
    console.log(category, "jkl");
    const modelValue = filters.model?.[0]?.id;
    setModel(modelValue !== null && modelValue !== undefined ? modelValue : "");

    if (filters.date_type) {
      setDateType(filters.date_type);
      setStartDate(null);
      setEndDate(null);
    } else {
      setDateType(null);
      setStartDate(filters.start_date ? new Date(filters.start_date) : null);
      setEndDate(filters.end_date ? new Date(filters.end_date) : null);
    }
  };

  //Edit report API
  const handleEditReportApi = async (report_id) => {
    console.log("repp", report_id);

    setShowForm(true);
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("User not authenticated.");
      return;
    }

    try {
      const response = await axios.get(
        `http://192.168.172.227:8000/api/report/edit/${report_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      console.log("response datas", data);

      setSelectedReportIdEdit(report_id);

      setAllFields(data);
      setIsEditMode(true);
      // setShowForm(true);

      // Refresh the table after deletion
      // fetchReportViews();
      const filters = data?.filters || {};

      // Fetch dependent data in sequence
      if (filters.country?.[0]?.id) {
        await fetchCategories(filters.country[0].id);

        if (filters.category?.[0]?.id) {
          await fetchSubCategories(filters.category[0].id);

          if (filters.subCategory?.[0]?.id && filters.brand?.[0]?.id) {
            await fetchBrands(
              filters.category[0].id,
              filters.subCategory[0].id
            );

            if (filters.model?.[0]?.id) {
              await fetchModels(
                filters.category[0].id,
                filters.subCategory[0].id,
                filters.brand[0].id
              );
            }
          }
        }

        if (filters.retailer?.[0]?.id) {
          await fetchRetailers(filters.country[0].id);
        }
      }
    } catch (error) {
      console.error("Error edit report:", error);
      alert(error.response?.data?.detail || "Failed to edit report.");
    }
  };

  const handleUpdate = async (selectedReportIdEdit) => {
    const token = localStorage.getItem("access_token");
    console.log("idddddd", selectedReportIdEdit);

    if (!token) {
      alert("User not authenticated");
      return;
    }

    try {
      // Get the actual objects from state
      const selectedCountry = apiCountries.find((c) => c.id === country);
      const selectedCategory = apiCategories.find((c) => c.id === category);
      const selectedSubCategory = apiSubCategories.find(
        (c) => c.id === subCategory
      );
      const selectedModel = apiModels.find((p) => p.id === model);
      const selectedbrand = apiBrands.find((m) => m.id === brand);
      const selectedRetailer = apiRetailers.find((r) => r.id === retailer);

      // Prepare the payload according to Swagger specification
      const payload = {
        report_name: reportName,
        country: selectedCountry?.name || "",
        category: selectedCategory?.name || "",
        subcategory: selectedSubCategory?.name || "",
        brand: selectedbrand?.name || "",
        model: selectedModel?.model_no || model || "", // Handle both object and string cases
        retailer: selectedRetailer?.name || "",
      };

      // Handle date parameters
      if (startDate !== null && endDate !== null) {
        payload.start_date = format(startDate, "yyyy-MM-dd");
        payload.end_date = format(endDate, "yyyy-MM-dd");
      } else if (dateType !== null) {
        payload.date_type = dateType;
      }

      const response = await axios.put(
        `http://192.168.172.227:8000/api/report/update/${selectedReportIdEdit}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update Success:", response.data);
      alert("Report updated successfully!");

      // Reset states
      setIsEditMode(false);
      setShowForm(false);
      setIsSubmitted(false);
      setSelectedReportIdEdit(null);

      // Refresh the reports list
      fetchReportViews();
    } catch (error) {
      console.error("Error updating report:", error);
      alert(error.response?.data?.detail || "Failed to update report.");
    }
  };

  const [viewReport, setViewReport] = useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  // const [viewReports, setViewReports] = useState
  const handleViewReport = async (report_id) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("User not authenticated.");
      return;
    }

    try {
      const response = await axios.get(
        `http://192.168.172.227:8000/api/report/view/${report_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.filters;
      console.log("viewreport", data);

      //  const parsedData = JSON.parse(data.data);

      setViewReport(data);
      setOpenViewDialog(true);
    } catch (error) {
      console.error("Error view report:", error);
      alert(error.response?.data?.detail || "Failed to view report.");
    }
  };

  //show form
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    if (showForm) {
      // setIsEditMode(false);
      // setSelectedReportIdEdit(null);
      setReportName("");
      setCountry("");
      setCategory("");
      setSubCategory("");
      setBrand("");
      setRetailer("");
      setDateType("");
      setModel("");
      setStartDate(null);
      setEndDate(null);
      setDateType("");
      setIsSubmitted(false);
      // setReportData([]);
    }
    setShowForm(!showForm);
  };

  //submitting state
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          // backgroundImage: 'linear-gradient(to bottom, #023E8A 0%, #03045E 100%)',
          backgroundImage:
            "linear-gradient( 132.6deg,  rgb(52, 130, 214) 23.3%, rgba(37,216,211,1) 84.7%);linear-gradient( 109.6deg,  rgba(30,198,198,1) 11.3%, rgba(47,127,164,1) 50.1%, rgba(6,92,147,1) 100.2% );radial-gradient( circle 950px at 2.5% 8%,  rgba(44,103,176,1) 0%, rgba(35,56,136,1) 90% );",
          backgroundColor: "transparent",
        }}
      >
        {/*#0798E0 */}
        <Toolbar disableGutters sx={{ pr: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", pl: 2 }}>
            <img
              src={companyLogo}
              alt="Logo"
              style={{ height: 40, marginRight: 8 }}
            />
            {/* <Box
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
                sx={{ fontWeight: 500, fontSize: "26px" }}
              >
                CMS
              </Typography>
            </Box> */}
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
          variant="contained"
          sx={{
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: 500,
            textTransform: "none",
            backgroundColor: "#0077B6",
          }}
        >
          Logout
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
              {logoutMessage}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            onClick={handleLogoutDialogClose}
            variant="contained"
            color="primary"
            autoFocus
            sx={{ textTransform: "none", backgroundColor: "#0077B6" }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ pt: 4, pb: 2, pr: 4 }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0077B6",
            fontFamily: "Poppins",
            textTransform: "none",
            borderRadius: 4,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 8px rgba(0, 119, 182, 0.3)",
            },
          }}
          onClick={toggleForm}
        >
          {showForm ? "Close" : " + Add Report"}
        </Button>
      </Box>

      {showForm && (
        <Card
          elevation={12}
          sx={{
            mx: "auto",
            maxWidth: 1200,
            // p: 3,
            borderRadius: 4,
            backgroundColor: "#f9f9f9",
          }}
        >
          <CardContent>
            <Grid
              container
              spacing={4.5}
              alignItems="center"
              sx={{ pl: 2, pr: 4, pb: 4, pt: 4 }}
            >
              {/* <Grid container size > */}
              {/* Report Name */}
              <Grid size={{ xs: 1.7 }}>
                <Typography
                  sx={{ fontFamily: "Poppins", transform: "translateX(30px)" }}
                >
                  Report Name
                </Typography>
              </Grid>
              <Grid size={{ xs: 2.5 }}>
                <Box
                  sx={{
                    p: "2.3px",
                    borderRadius: "8px",
                    background:
                      "linear-gradient( 132.6deg,  rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%);linear-gradient( 109.6deg,  rgba(30,198,198,1) 11.3%, rgba(47,127,164,1) 50.1%, rgba(6,92,147,1) 100.2% );radial-gradient( circle 950px at 2.5% 8%,  rgba(44,103,176,1) 0%, rgba(35,56,136,1) 90% );",
                  }}
                >
                  <TextField
                    fullWidth
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    placeholder="Enter report name"
                    size="small"
                    sx={{
                      // "& .MuiInputBase-root" : {
                      //   color: "#0077B6"
                      // },
                      //                   "& .MuiOutlinedInput-root": {
                      //   transition: "border-color 0.3s ease",
                      //   "& fieldset": {
                      //     borderColor: "#48CAE4",
                      //     transition: "border-color 0.3s ease",
                      //   },
                      //   // "&:hover fieldset": {
                      //   //   borderColor: "#0096C7",
                      //   // },
                      //   "&.Mui-focused fieldset": {
                      //     borderColor: "#023E8A",
                      //   },
                      // },
                      "& .MuiInputBase-input": {
                        fontFamily: "Poppins",
                        fontSize: "15px",
                      },
                      "& .MuiInputBase-input::placeholder": {
                        fontFamily: "Poppins",
                        fontSize: "15px",
                        // textAlign: "center",
                        // textAlign: "center",
                        opacity: 0.6, // optional, makes placeholder fully visible
                        color: "grey.700",
                      },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "6px",
                        backgroundColor: "#fff",
                        transition: "all 0.3s ease", // transition for hover
                        "&:hover": {
                          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)", // strong shadow
                          // transform: "scale(1.02)", // slight scale on hover
                        },
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none", // remove border
                      },
                      "& input:focus::placeholder": {
                        color: "transparent", // hides placeholder on focus
                      },
                    }}
                  />
                </Box>
              </Grid>

              {/* Country dropdown*/}
              <Grid size={{ xs: 1.3 }}>
                <Typography
                  sx={{ fontFamily: "Poppins", transform: "translateX(30px)" }}
                >
                  Country
                </Typography>
              </Grid>
              <Grid size={{ xs: 2.5 }}>
                <Autocomplete
                  size="small"
                  options={apiCountries}
                  getOptionLabel={(option) => option.name || ""}
                  value={apiCountries.find((c) => c.id === country) || null}
                  // onChange={(event, newValue) => {
                  //   setCountry(newValue ? newValue.id : "");
                  // }}
                  onChange={(event, newValue) => {
                    const selectedId = newValue ? newValue.id : "";
                    setCountry(selectedId);
                    console.log("sample", selectedId);

                    setCategory("");
                    setSubCategory("");
                    setBrand("");
                    setModel("");
                    setRetailer("");
                    setApiCategories([]);
                    setApiSubCategories([]);
                    setApiBrands([]);
                    setApiModels([]);
                    setApiRetailers([]);
                    if (selectedId) {
                      fetchCategories(selectedId);
                      fetchRetailers(selectedId);
                    }
                  }}
                  renderInput={(params) => (
                    <Box
                      sx={{
                        p: "2.3px",
                        // padding to simulate thick border
                        borderRadius: "8px",
                        background:
                          "linear-gradient( 132.6deg,  rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%);linear-gradient( 109.6deg,  rgba(30,198,198,1) 11.3%, rgba(47,127,164,1) 50.1%, rgba(6,92,147,1) 100.2% );radial-gradient( circle 950px at 2.5% 8%,  rgba(44,103,176,1) 0%, rgba(35,56,136,1) 90% );",
                      }}
                    >
                      <TextField
                        {...params}
                        //           label="Select Country"
                        //           sx={{
                        //             "& .MuiOutlinedInput-root": {
                        //   borderRadius: "6px",
                        //   backgroundColor: "#fff",
                        //   fontSize: "15px",
                        // },
                        //             "& .MuiInputLabel-root": {
                        //               fontFamily: "Poppins",
                        //               fontSize: "15px",

                        //             },
                        //             "& .MuiInputBase-input": {
                        //               fontFamily: "Poppins",
                        //               fontSize: "15px",
                        //             },
                        //             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        //     borderColor: "transparent", // removes blue border on focus
                        //   },
                        //           }}
                        placeholder="Select Country"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "6px",
                            backgroundColor: "#fff",
                            fontSize: "15px",
                            transition: "all 0.3s ease", // smooth transition
                            "&:hover": {
                              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)", // subtle hover effect
                              // transform: "scale(1.12)", // slightly enlarge on hover
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent",
                            },
                          },
                          "& .MuiInputBase-input": {
                            fontFamily: "Poppins",
                            fontSize: "15px",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "& input:focus::placeholder": {
                            color: "transparent",
                          },
                        }}
                      />
                    </Box>
                  )}
                  componentsProps={{
                    paper: {
                      sx: {
                        mt: 0.5,
                        "& .MuiAutocomplete-option": {
                          fontFamily: "Poppins",
                          fontSize: "15px",
                        },
                        "& .MuiAutocomplete-option:hover": {
                          backgroundColor: "#87CEEB",
                        },
                      },
                    },
                  }}
                />
              </Grid>

              {/* Categories */}
              <Grid size={{ xs: 1.5 }}>
                <Typography
                  sx={{ fontFamily: "Poppins", transform: "translateX(35px)" }}
                >
                  Categories
                </Typography>
              </Grid>
              <Grid size={{ xs: 2.5 }}>
                <Autocomplete
                  size="small"
                  fullWidth
                  options={apiCategories}
                  getOptionLabel={(option) => option.name}
                  value={
                    apiCategories.find((cat) => cat.id === category) || null
                  }
                  // onChange={(event, newValue) => {
                  //   setCategory(newValue ? newValue.id : "");
                  //   setSubCategory(""); // Reset subcategory on category change
                  // }}
                  onChange={(event, newValue) => {
                    const selectedId = newValue ? newValue.id : "";
                    setCategory(selectedId);
                    console.log("sample2", selectedId);
                    if (selectedId) {
                      fetchSubCategories(selectedId);
                    }
                  }}
                  loading={loadingCategories}
                  loadingText={
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      py={1}
                    >
                      <CircularProgress size={22} />
                    </Box>
                  }
                  renderInput={(params) => (
                    <Box
                      sx={{
                        p: "2.3px",
                        // padding to simulate thick border
                        borderRadius: "8px",
                        background:
                          "linear-gradient( 132.6deg,  rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%);linear-gradient( 109.6deg,  rgba(30,198,198,1) 11.3%, rgba(47,127,164,1) 50.1%, rgba(6,92,147,1) 100.2% );radial-gradient( circle 950px at 2.5% 8%,  rgba(44,103,176,1) 0%, rgba(35,56,136,1) 90% );",
                      }}
                    >
                      <TextField
                        {...params}
                        // label="Select Category"
                        // sx={{

                        //   "& .MuiInputLabel-root": {
                        //     fontFamily: "Poppins",
                        //     fontSize: "15px",
                        //   },
                        //   "& .MuiInputBase-input": {
                        //     fontFamily: "Poppins",
                        //     fontSize: "15px",
                        //   },
                        // }}
                        placeholder="Select Category"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "6px",
                            backgroundColor: "#fff",
                            fontSize: "15px",
                            transition: "all 0.3s ease", // smooth transition
                            "&:hover": {
                              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)", // subtle hover effect
                              // transform: "scale(1.12)", // slightly enlarge on hover
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent",
                            },
                          },
                          "& .MuiInputBase-input": {
                            fontFamily: "Poppins",
                            fontSize: "15px",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "& input:focus::placeholder": {
                            color: "transparent",
                          },
                        }}
                      />
                    </Box>
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  componentsProps={{
                    paper: {
                      mt: 0.5,
                      sx: {
                        mt: 0.5,
                        "& .MuiAutocomplete-option": {
                          fontFamily: "Poppins",
                          fontSize: "15px",
                        },
                        "& .MuiAutocomplete-option:hover": {
                          backgroundColor: "#87CEEB",
                        },
                      },
                    },
                  }}
                />
              </Grid>

              {/* {category && (
              <> */}
              <Grid size={{ xs: 1.7 }}>
                <Typography
                  sx={{ fontFamily: "Poppins", transform: "translateX(30px)" }}
                >
                  SubCategory
                </Typography>
              </Grid>
              <Grid size={{ xs: 2.5 }}>
                <Autocomplete
                  size="small"
                  fullWidth
                  options={apiSubCategories}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    apiSubCategories.find((sub) => sub.id === subCategory) ||
                    null
                  }
                  // onChange={(event, newValue) => {
                  //   setSubCategory(newValue ? newValue.id : "");
                  // }}
                  onChange={(event, newValue) => {
                    const selectedId = newValue ? newValue.id : "";
                    setSubCategory(selectedId);
                    setBrand("");
                    setModel("");
                    setApiBrands([]);
                    setApiModels([]);
                    if (category && selectedId) {
                      fetchBrands(category, selectedId);
                    }
                  }}
                  renderInput={(params) => (
                    <Box
                      sx={{
                        p: "2.4px",
                        // padding to simulate thick border
                        borderRadius: "8px",
                        background:
                          "linear-gradient( 132.6deg,  rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%);linear-gradient( 109.6deg,  rgba(30,198,198,1) 11.3%, rgba(47,127,164,1) 50.1%, rgba(6,92,147,1) 100.2% );radial-gradient( circle 950px at 2.5% 8%,  rgba(44,103,176,1) 0%, rgba(35,56,136,1) 90% );",
                      }}
                    >
                      <TextField
                        {...params}
                        // label="Select SubCategory"
                        // sx={{

                        //   "& .MuiInputLabel-root": {
                        //     fontFamily: "Poppins",
                        //     fontSize: "15px",
                        //   },
                        //   "& .MuiInputBase-input": {
                        //     fontFamily: "Poppins",
                        //     fontSize: "15px",
                        //   },
                        // }}
                        placeholder="Select SubCategory"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "6px",
                            backgroundColor: "#fff",
                            fontSize: "15px",
                            transition: "all 0.3s ease", // smooth transition
                            "&:hover": {
                              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)", // subtle hover effect
                              // transform: "scale(1.12)", // slightly enlarge on hover
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent",
                            },
                          },
                          "& .MuiInputBase-input": {
                            fontFamily: "Poppins",
                            fontSize: "14.1px",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "& input:focus::placeholder": {
                            color: "transparent",
                          },
                        }}
                      />
                    </Box>
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  componentsProps={{
                    paper: {
                      mt: 0.5,
                      sx: {
                        mt: 0.5,
                        "& .MuiAutocomplete-option": {
                          fontFamily: "Poppins",
                          fontSize: "15px",
                        },
                        "& .MuiAutocomplete-option:hover": {
                          backgroundColor: "#87CEEB",
                        },
                      },
                    },
                  }}
                />
              </Grid>
              {/* </>
            )} */}

              {/* 
{subCategory && (
  <> */}

              <Grid size={{ xs: 1.3 }}>
                <Typography
                  sx={{ fontFamily: "Poppins", transform: "translateX(30px)" }}
                >
                  Brand
                </Typography>
              </Grid>
              <Grid size={{ xs: 2.5 }}>
                <Autocomplete
                  size="small"
                  fullWidth
                  options={apiBrands}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    apiBrands.find((brandObj) => brandObj.id === brand) || null
                  }
                  // onChange={(event, newValue) => {
                  //   setBrand(newValue ? newValue.id : "");
                  // }}
                  onChange={(event, newValue) => {
                    const selectedId = newValue ? newValue.id : "";
                    setBrand(selectedId);
                    setModel("");
                    setApiModels([]);
                    if (category && subCategory && selectedId) {
                      fetchModels(category, subCategory, selectedId);
                    }
                  }}
                  loading={loadingBrands}
                  loadingText={
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      py={1}
                    >
                      <CircularProgress size={22} />
                    </Box>
                  }
                  renderInput={(params) => (
                    <Box
                      sx={{
                        p: "2.4px",
                        // padding to simulate thick border
                        borderRadius: "8px",
                        background:
                          "linear-gradient( 132.6deg,  rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%);linear-gradient( 109.6deg,  rgba(30,198,198,1) 11.3%, rgba(47,127,164,1) 50.1%, rgba(6,92,147,1) 100.2% );radial-gradient( circle 950px at 2.5% 8%,  rgba(44,103,176,1) 0%, rgba(35,56,136,1) 90% );",
                      }}
                    >
                      <TextField
                        {...params}
                        // label="Select Brand"
                        // sx={{

                        //   "& .MuiInputLabel-root": {
                        //     fontFamily: "Poppins",
                        //     fontSize: "15px",
                        //   },
                        //   "& .MuiInputBase-input": {
                        //     fontFamily: "Poppins",
                        //     fontSize: "15px",
                        //   },
                        // }}
                        placeholder="Select Brand"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "6px",
                            backgroundColor: "#fff",
                            fontSize: "15px",
                            transition: "all 0.3s ease", // smooth transition
                            "&:hover": {
                              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)", // subtle hover effect
                              // transform: "scale(1.12)", // slightly enlarge on hover
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent",
                            },
                          },
                          "& .MuiInputBase-input": {
                            fontFamily: "Poppins",
                            fontSize: "15px",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "& input:focus::placeholder": {
                            color: "transparent",
                          },
                        }}
                      />
                    </Box>
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  componentsProps={{
                    paper: {
                      sx: {
                        mt: 0.5,
                        "& .MuiAutocomplete-option": {
                          fontFamily: "Poppins",
                          fontSize: "15px",
                        },
                        "& .MuiAutocomplete-option:hover": {
                          backgroundColor: "#87CEEB",
                        },
                      },
                    },
                  }}
                />
              </Grid>

              {/* </>
)} */}

              {/* Manufacturer */}

              {/* {brand && (
  <> */}
              <Grid size={{ xs: 1.5 }}>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    transform: "translateX(35px) translateY(5px)",
                  }}
                >
                  Models
                </Typography>
              </Grid>
              <Grid size={{ xs: 2.5 }}>
                <Autocomplete
                  size="small"
                  fullWidth
                  options={apiModels}
                  getOptionLabel={(option) => option.model_no || ""}
                  value={apiModels.find((prod) => prod.id === model) || null}
                  onChange={(event, newValue) => {
                    const selectedId = newValue ? newValue.id : "";
                    setModel(selectedId);
                    if (category && subCategory && brand && selectedId) {
                      fetchModels(category, subCategory, brand, selectedId);
                    }
                  }}
                  loading={loadingBrands}
                  loadingText={
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      py={1}
                    >
                      <CircularProgress size={22} />
                    </Box>
                  }
                  renderInput={(params) => (
                    <Box
                      sx={{
                        p: "2.3px",
                        // padding to simulate thick border
                        borderRadius: "8px",
                        background:
                          "linear-gradient( 132.6deg,  rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%);linear-gradient( 109.6deg,  rgba(30,198,198,1) 11.3%, rgba(47,127,164,1) 50.1%, rgba(6,92,147,1) 100.2% );radial-gradient( circle 950px at 2.5% 8%,  rgba(44,103,176,1) 0%, rgba(35,56,136,1) 90% );",
                      }}
                    >
                      <TextField
                        {...params}
                        placeholder="Select Models"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "6px",
                            backgroundColor: "#fff",
                            fontSize: "15px",
                            transition: "all 0.3s ease", // smooth transition
                            "&:hover": {
                              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)", // subtle hover effect
                              // transform: "scale(1.12)", // slightly enlarge on hover
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent",
                            },
                          },
                          "& .MuiInputBase-input": {
                            fontFamily: "Poppins",
                            fontSize: "15px",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "& input:focus::placeholder": {
                            color: "transparent",
                          },
                        }}
                      />
                    </Box>
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  componentsProps={{
                    paper: {
                      sx: {
                        mt: 0.5,
                        "& .MuiAutocomplete-option": {
                          fontFamily: "Poppins",
                          fontSize: "15px",
                        },
                        "& .MuiAutocomplete-option:hover": {
                          backgroundColor: "#87CEEB",
                        },
                      },
                    },
                  }}
                />
              </Grid>
              {/* </>
)} */}

              {/* {model && (
  <> */}
              <Grid size={{ xs: 1.7 }}>
                <Typography
                  sx={{ fontFamily: "Poppins", transform: "translateX(30px)" }}
                >
                  Retailer
                </Typography>
              </Grid>
              <Grid size={{ xs: 2.5 }}>
                <Autocomplete
                  size="small"
                  fullWidth
                  options={apiRetailers}
                  getOptionLabel={(option) => option.name || ""}
                  value={
                    apiRetailers.find((ret) => ret.id === retailer) || null
                  }
                  onChange={(event, newValue) => {
                    setRetailer(newValue ? newValue.id : "");
                  }}
                  renderInput={(params) => (
                    <Box
                      sx={{
                        p: "2.3px",
                        // padding to simulate thick border
                        borderRadius: "8px",
                        background:
                          "linear-gradient( 132.6deg,  rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%);linear-gradient( 109.6deg,  rgba(30,198,198,1) 11.3%, rgba(47,127,164,1) 50.1%, rgba(6,92,147,1) 100.2% );radial-gradient( circle 950px at 2.5% 8%,  rgba(44,103,176,1) 0%, rgba(35,56,136,1) 90% );",
                      }}
                    >
                      <TextField
                        {...params}
                        placeholder="Select Retailer"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "6px",
                            backgroundColor: "#fff",
                            fontSize: "15px",
                            transition: "all 0.3s ease", // smooth transition
                            "&:hover": {
                              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)", // subtle hover effect
                              // transform: "scale(1.12)", // slightly enlarge on hover
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent",
                            },
                          },
                          "& .MuiInputBase-input": {
                            fontFamily: "Poppins",
                            fontSize: "15px",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "& input:focus::placeholder": {
                            color: "transparent",
                          },
                        }}
                      />
                    </Box>
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  componentsProps={{
                    paper: {
                      sx: {
                        mt: 0.5,
                        "& .MuiAutocomplete-option": {
                          fontFamily: "Poppins",
                          fontSize: "15px",
                        },
                        "& .MuiAutocomplete-option:hover": {
                          backgroundColor: "#87CEEB",
                        },
                      },
                    },
                  }}
                />
              </Grid>

              <Grid size={{ xs: 1.3 }}>
                <Typography
                  sx={{ fontFamily: "Poppins", transform: "translateX(30px)" }}
                >
                  Start Date
                </Typography>
              </Grid>
              <Grid size={{ xs: 2.5 }}>
                <Box
                  sx={{
                    pt: "2.5px",
                    pb: "2px",
                    pl: "2.5px",
                    pr: "1px",
                    borderRadius: "8px",
                    background:
                      "linear-gradient( 132.6deg,  rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%);linear-gradient( 109.6deg,  rgba(30,198,198,1) 11.3%, rgba(47,127,164,1) 50.1%, rgba(6,92,147,1) 100.2% );radial-gradient( circle 950px at 2.5% 8%,  rgba(44,103,176,1) 0%, rgba(35,56,136,1) 90% );",
                  }}
                >
                  <StyledDatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="YYYY-MM-DD"
                    maxDate={endDate}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 1.5 }}>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    transform: "translateX(35px) translateY(5px)",
                  }}
                >
                  End Date
                </Typography>
              </Grid>
              <Grid size={{ xs: 2.5 }}>
                <Box
                  sx={{
                    pt: "2.5px",
                    pb: "2px",
                    pl: "2.5px",
                    pr: "1px",
                    borderRadius: "8px",
                    background:
                      "linear-gradient( 132.6deg,  rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%);linear-gradient( 109.6deg,  rgba(30,198,198,1) 11.3%, rgba(47,127,164,1) 50.1%, rgba(6,92,147,1) 100.2% );radial-gradient( circle 950px at 2.5% 8%,  rgba(44,103,176,1) 0%, rgba(35,56,136,1) 90% );",
                  }}
                >
                  <StyledDatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="YYYY-MM-DD"
                    minDate={startDate}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 1.7 }}>
                <Typography
                  sx={{ fontFamily: "Poppins", transform: "translateX(30px)" }}
                >
                  Date Type
                </Typography>
              </Grid>
              <Grid size={{ xs: 2.5 }}>
                <Autocomplete
                  size="small"
                  options={dateTypeOptions}
                  getOptionLabel={(option) => option || ""}
                  value={dateType || null}
                  onChange={(e, newValue) => setDateType(newValue || null)}
                  renderInput={(params) => (
                    <Box
                      sx={{
                        p: "2.3px",
                        // padding to simulate thick border
                        borderRadius: "8px",
                        background:
                          "linear-gradient( 132.6deg,  rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%);linear-gradient( 109.6deg,  rgba(30,198,198,1) 11.3%, rgba(47,127,164,1) 50.1%, rgba(6,92,147,1) 100.2% );radial-gradient( circle 950px at 2.5% 8%,  rgba(44,103,176,1) 0%, rgba(35,56,136,1) 90% );",
                      }}
                    >
                      <TextField
                        {...params}
                        placeholder="Select Date Type"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "6px",
                            backgroundColor: "#fff",
                            fontSize: "15px",
                            transition: "all 0.3s ease", // smooth transition
                            "&:hover": {
                              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)", // subtle hover effect
                              // transform: "scale(1.12)", // slightly enlarge on hover
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent",
                            },
                          },
                          "& .MuiInputBase-input": {
                            fontFamily: "Poppins",
                            fontSize: "15px",
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "& input:focus::placeholder": {
                            color: "transparent",
                          },
                        }}
                      />
                    </Box>
                  )}
                  isOptionEqualToValue={(option, value) => option === value}
                  componentsProps={{
                    paper: {
                      sx: {
                        mt: 0.5,
                        "& .MuiAutocomplete-option": {
                          fontFamily: "Poppins",
                          fontSize: "15px",
                        },
                        "& .MuiAutocomplete-option:hover": {
                          backgroundColor: "#87CEEB",
                        },
                      },
                    },
                  }}
                />
              </Grid>

              {/* </>
)} */}

              {/* </DialogContent> */}

              {/* <DialogActions sx={{ px: 3, pb: 2 }}> */}
              {/* <Button
            onClick={handleCloseDialog}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button> */}
              <Grid
                size={{ xs: 12 }}
                sx={{ display: "flex", justifyContent: "flex-end", pl: 3.8 }}
              >
                <Button
                  onClick={
                    isEditMode
                      ? () => handleUpdate(selectedReportIdEdit)
                      : handleSubmit
                  }
                  // onClick={handleSubmit}
                  sx={{
                    fontFamily: "Poppins",
                    textTransform: "none",
                    backgroundColor: "#0077B6",
                    borderRadius: 4,
                    color: "white",
                  }}
                >
                  {isEditMode ? "Update" : "Submit"}
                </Button>
              </Grid>
              {/* <Grid>
              {submitLoader && (
      <Spinner 
        // classNames={{ label: "text-foreground mt-4" }} 
        // label="dots" 
        // variant="dots" 
        size="sm"
      variant="dots" 
      sx={{ 
        color: "white", // Match your button text color
        ml: 1 // Add some left margin
      }} 
      />
    )}
              </Grid> */}
              {/* </Grid> */}
            </Grid>
          </CardContent>
        </Card>
      )}
      {/* </DialogActions>
      </Dialog> */}

      {/* <Grid container spacing={2} justifyContent="center"> */}

      {/* </Grid> */}
      {/* </AccordionDetails> */}
      {/* </Accordion> */}
      {/* </Box> */}

      {isSubmitted ? (
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ p: 2 }}
        >
          {/* <Grid size = {{xs:12, md:8, lg:6}} > */}
          {/* <Grid size={{ xs: 8, md: 10, lg: 8 }} sx={{ pt: 4 }}> */}
          <Card
            elevation={5}
            sx={{
              borderRadius: 3,
              mx: 2,
              my: 3,
              width: "1200px",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                textAlign="center"
                sx={{ fontWeight: "bold", fontFamily: "Poppins", p: 2 }}
              >
                Data Overview
              </Typography>

              {Array.isArray(reportData) && reportData.length > 0 ? (
                <>
                  {reportName && (
                    <Typography
                      variant="h6"
                      gutterBottom
                      textAlign="left"
                      sx={{ fontFamily: "Poppins", p: 1, fontSize: "17px" }}
                    >
                      Report Name : {reportName}
                    </Typography>
                  )}

                  <Box sx={{ maxHeight: 428, overflow: "auto" }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {Object.keys(reportData[0]).map((key, index, arr) => (
                            <TableCell
                              key={key}
                              align="left"
                              sx={{
                                fontWeight: "bold",
                                fontFamily: "Poppins",
                                fontSize: "16px",
                                backgroundColor: "#2BB3D4",
                                color: "white",
                                position: "sticky",
                                top: 0,
                                zIndex: 1,
                                borderTopLeftRadius: index === 0 ? "12px" : 0,
                                borderTopRightRadius:
                                  index === arr.length - 1 ? "12px" : 0,
                              }}
                            >
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {reportData.map((item, index) => (
                          <TableRow key={index}>
                            {Object.keys(reportData[0]).map((key) => (
                              <TableCell
                                key={key}
                                align="left"
                                sx={{
                                  fontFamily: "Poppins",
                                  backgroundColor: "grey.200",
                                }}
                              >
                                {typeof item[key] === "object" &&
                                item[key] !== null
                                  ? item[key].name || JSON.stringify(item[key])
                                  : item[key]}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      pt: 4,
                      gap: 4,
                    }}
                  >
                    <Button
                      variant="contained"
                      size="medium"
                      onClick={handleClick}
                      disabled={downloading}
                      startIcon={
                        downloading ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : null
                      }
                      sx={{
                        textTransform: "none",
                        borderRadius: 6,
                        backgroundColor: "#0077B6",
                      }}
                    >
                      {downloading ? "Downloading..." : "Download"}
                    </Button>

                    <Button
                      variant="contained"
                      size="medium"
                      onClick={handleSaveReport}
                      sx={{
                        textTransform: "none",
                        backgroundColor: "grey.700",
                        borderRadius: 6, // MUI theme grey
                        "&:hover": {
                          backgroundColor: "grey.300",
                          color: "black",
                        },
                      }}
                    >
                      Save
                    </Button>

                    <Popover
                      open={openn}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                    >
                      <MenuList>
                        <MenuItem onClick={handleDownloadCSV}>
                          Download as CSV
                        </MenuItem>
                        <MenuItem onClick={handleDownloadPDF}>
                          Download as PDF
                        </MenuItem>
                        <MenuItem onClick={handleDownloadExcel}>
                          Download as Excel
                        </MenuItem>
                      </MenuList>
                    </Popover>
                  </Box>
                </>
              ) : (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  py={1}
                >
                  <Typography sx={{ fontFamily: "Poppins", fontSize: "16px" }}>
                    No data available
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
          {/* </Grid> */}
        </Grid>
      ) : // </Grid>
      submitLoader ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={4}>
          <CircularProgress size={50} /> {/* Show full-page spinner */}
        </Box>
      ) : null}

      {savedReports.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TableContainer
            sx={{
              borderRadius: 6, // You can adjust this value
              overflowY: "auto",
              height: 428,
              width: "1200px",
              // ml:4,
              mt: 4,
              display: "flex",
              justifyContent: "center",
              // transform: "translateX(-5px)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: "Poppins",
                      backgroundColor: "#2BB3D4",
                      color: "white",
                      fontSize: "18px",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: "Poppins",
                      backgroundColor: "#2BB3D4",
                      color: "white",
                      fontSize: "18px",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    Created
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: "Poppins",
                      backgroundColor: "#2BB3D4",
                      color: "white",
                      fontSize: "18px",
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {savedReports.map((report, index) => {
                  console.log(report, "rrrr");
                  console.log(savedReportsId, "sdsd");
                  return (
                    <TableRow key={index}>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Poppins",
                          backgroundColor: "grey.200",
                        }}
                      >
                        {report.name}
                      </TableCell>

                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Poppins",
                          backgroundColor: "grey.200",
                        }}
                      >
                        {new Date(report.created).toLocaleString()}
                      </TableCell>

                      <TableCell
                        align="left"
                        sx={{
                          backgroundColor: "grey.200",
                          transform: "translateX(-5px)",
                        }}
                      >
                        <IconButton
                          aria-label="view"
                          onClick={() => handleViewReport(report.id)}
                          key={report.iddd}
                        >
                          <img
                            src={HistoryReportViewIcon}
                            alt="Edit View"
                            style={{ width: 24, height: 24 }}
                          />
                        </IconButton>

                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEditReportApi(report.id)}
                          key={report.id}
                        >
                          <img
                            src={EditIcons}
                            style={{ width: 22, height: 22 }}
                            alt="editicon"
                          />
                        </IconButton>

                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDeleteDialogOpen(report.id)}
                          key={report.idd}
                        >
                          <DeleteIcon sx={{ color: "red" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        PaperProps={{
          sx: {
            borderRadius: 4,
            // p: 2,
            minWidth: 400,
            // maxWidth: "90%",
          },
        }}
      >

        <DialogContent sx={{ pt: 3.5, pb: 0 }}>
          <Typography sx={{ fontFamily: "Poppins" }}>
            Do you want to delete?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ pb: 2 }}>
          <Button
            variant="contained"
            sx={{
              fontFamily: "Poppins",
              textTransform: "none",
              borderRadius: 4,
              backgroundColor: "#0077B6",
              p: 0.5,
            }}
            onClick={() => handleConfirmDelete()}
          >
            Yes
          </Button>
          <Button
            color="error"
            sx={{
              fontFamily: "Poppins",
              textTransform: "none",
              borderRadius: 4,
            }}
            onClick={() => handleDeleteDialogClose()}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        maxWidth="lg"
        fullWidth
      >
        {/* <DialogTitle sx={{ fontFamily: 'Poppins', fontWeight: 'bold', textAlign: 'center' }}>
    Report View
  </DialogTitle> */}
        {/* <DialogContent> */}
        {/* <Grid display="flex" justifyContent="center" alignItems="center" sx={{ p: 2 }}> */}
        <Card
          elevation={5}
          sx={{
            borderRadius: 3,
            mx: 2,
            my: 3,
            width: "1200px",
            justifyContent: "center",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              textAlign="center"
              sx={{ fontWeight: "bold", fontFamily: "Poppins", p: 2 }}
            >
              Report View
            </Typography>

            {/* {reportName && (
            <Typography variant="h6" gutterBottom textAlign="left" sx={{ fontFamily: 'Poppins', p: 1 }}>
              {reportName}
            </Typography>
          )} */}

            {viewReport && typeof viewReport === "object" ? (
              <Box sx={{ maxHeight: 428, overflow: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {Object.keys(viewReport).map((key, index, arr) => (
                        <TableCell
                          key={key}
                          align="center"
                          sx={{
                            fontWeight: "bold",
                            fontFamily: "Poppins",
                            fontSize: "16px",
                            backgroundColor: "#2BB3D4",
                            color: "white",
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                            borderTopLeftRadius: index === 0 ? "12px" : 0,
                            borderTopRightRadius:
                              index === arr.length - 1 ? "12px" : 0,
                          }}
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {Object.keys(viewReport).map((key) => (
                        <TableCell
                          key={key}
                          align="center"
                          sx={{
                            fontFamily: "Poppins",
                            backgroundColor: "grey.200",
                          }}
                        >
                          {viewReport[key] ?? "-"}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            ) : (
              <Typography
                variant="body1"
                textAlign="center"
                sx={{ fontFamily: "Poppins", mt: 2 }}
              >
                No data available
              </Typography>
            )}
          </CardContent>
        </Card>
        {/* </Grid> */}
        {/* </DialogContent> */}
      </Dialog>
    </>
  );
};

export default DashBoard;