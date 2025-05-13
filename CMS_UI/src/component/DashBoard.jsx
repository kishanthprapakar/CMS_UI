import React, { useEffect, useState } from "react";
import { Box, Button, Grid, useScrollTrigger } from "@mui/material";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

// Import components
import AppHeader from "./AppHeader";
import LogoutDialog from "./LogoutDialog";
import ReportForm from "./ReportForm";
import ReportTable from "./ReportTable";
import SavedReports from "./SavedReports";
// import AddReportIcon from "../assets/addTask.png";
import { useRef } from "react";
import { PiPlusBold } from "react-icons/pi";

const DashBoard = () => {
  // State for logout
  const [dialogLogoutOpen, setDialogLogoutOpen] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const navigate = useNavigate();

  // State for form fields
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

  // State for API data
  const [apiCountries, setApiCountries] = useState([]);
  const [apiCategories, setApiCategories] = useState([]);
  const [apiSubCategories, setApiSubCategories] = useState([]);
  const [apiModels, setApiModels] = useState([]);
  const [apiBrands, setApiBrands] = useState([]);
  const [apiRetailers, setApiRetailers] = useState([]);

  // State for loading
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingBrands, setLoadingBrands] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);

  // State for reports
  const [reportData, setReportData] = useState([]);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedReports, setSavedReports] = useState([]);
  const [savedReportsId, setSavedReportsId] = useState([]);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [selectedReportIdEdit, setSelectedReportIdEdit] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [viewReport, setViewReport] = useState([]);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  //onmouseenter states
  const [mouseHovered, setMouseHovered] = useState(false);
  const [mouseHoveredCountry, setMouseHoveredCountry] = useState(false);
  const [mouseHoveredCategory, setMouseHoveredCategory] = useState(false);
  const [mouseHoveredSubCategory, setMouseHoveredSubCategory] = useState(false);
  const [mouseHoveredBrand, setMouseHoveredBrand] = useState(false);
  const [mouseHoveredModel, setMouseHoveredModel] = useState(false);
  const [mouseHoveredRetailer, setMouseHoveredRetailer] = useState(false);
  const [mouseHoveredStartDate, setMouseHoveredStartDate] = useState(false);
  const [mouseHoveredEndDate, setMouseHoveredEndDate] = useState(false);
  const [mouseHoveredDateType, setMouseHoveredDateType] = useState(false);

  // Static options for date types
  const dateTypeOptions = [
    "MTD",
    "QTD",
    "Q1",
    "Q2",
    "Q3",
    "Q4",
    "last_week",
    "last_month",
    "current_day",
  ];

  // Logout handler
  const handleLogoutClick = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      console.error("Access token not found!");
      return;
    }
    try {
      const response = await axios.post(
        `${baseURL}/auth/logout`,
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
    } catch (error) {
      console.log("Logout error", error);
    }
  };

  const handleLogoutDialogClose = () => {
    setDialogLogoutOpen(false);
    navigate("/");
  };

  // Form submission handler
  const handleSubmit = () => {
    setSubmitLoader(true);
    setIsSubmitted(false);

    const selectedCountry = apiCountries.find((c) => c.id === country);
    const selectedCategory = apiCategories.find((c) => c.id === category);
    const selectedSubCategory = apiSubCategories.find((c) => c.id === subCategory);
    const selectedModel = apiModels.find((p) => p.id === model);
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

    axios
      .get(`${baseURL}/api/submit`, { params: queryParams })
      .then((res) => {
        setReportData(res.data);
        setShowReportDialog(true);
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.error("Failed to fetch report data:", err);
        alert("Failed to fetch report. Please try again!");
      })
      .finally(() => {
        setSubmitLoader(false);
      });
  };

  // Download handlers
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadCSV = async () => {
    handleClose();
    setDownloading(true);
    try {
      await handleDownloadCsvFile();
    } finally {
      setDownloading(false);
    }
  };

  const handleDownloadPDF = async () => {
    handleClose();
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

  const handleDownloadCsvFile = async () => {
    try {
      const selectedCountry = apiCountries.find((c) => c.id === country);
      const selectedCategory = apiCategories.find((c) => c.id === category);
      const selectedSubCategory = apiSubCategories.find((c) => c.id === subCategory);
      const selectedModel = apiModels.find((p) => p.id === model);
      const selectedbrand = apiBrands.find((m) => m.id === brand);
      const selectedRetailer = apiRetailers.find((r) => r.id === retailer);

      const today = new Date();
      const start = startDate || today;
      const end = endDate || today;

      const queryParams = {
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
        `${baseURL}/api/export-csv`,
        {
          params: queryParams,
          responseType: "blob",
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
      const selectedCountry = apiCountries.find((c) => c.id === country);
      const selectedCategory = apiCategories.find((c) => c.id === category);
      const selectedSubCategory = apiSubCategories.find((c) => c.id === subCategory);
      const selectedModel = apiModels.find((p) => p.id === model);
      const selectedbrand = apiBrands.find((m) => m.id === brand);
      const selectedRetailer = apiRetailers.find((r) => r.id === retailer);

      const today = new Date();
      const start = startDate || today;
      const end = endDate || today;

      const queryParams = {
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
        `${baseURL}/api/export-pdf`,
        {
          params: queryParams,
          responseType: "blob",
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
      console.error("PDF Download Failed", error);
    }
  };

  const handleDownloadExcelSheet = async () => {
    try {
      const selectedCountry = apiCountries.find((c) => c.id === country);
      const selectedCategory = apiCategories.find((c) => c.id === category);
      const selectedSubCategory = apiSubCategories.find((c) => c.id === subCategory);
      const selectedModel = apiModels.find((p) => p.id === model);
      const selectedbrand = apiBrands.find((m) => m.id === brand);
      const selectedRetailer = apiRetailers.find((r) => r.id === retailer);

      const today = new Date();
      const start = startDate || today;
      const end = endDate || today;

      const queryParams = {
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
        `${baseURL}/api/export-excel`,
        {
          params: queryParams,
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const fileName = `${selectedbrand.name}_Report.xlsx`;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Excel Download Failed", error);
    }
  };

  // Report save handler
  const handleSaveReport = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("User not authenticated.");
      return;
    }

    const selectedCountry = apiCountries.find((c) => c.id === country);
    const selectedCategory = apiCategories.find((c) => c.id === category);
    const selectedSubCategory = apiSubCategories.find((c) => c.id === subCategory);
    const selectedModel = apiModels.find((p) => p.id === model);
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

    try {
      const response = await axios.post(
        `${baseURL}/api/report/save`,
        queryParams,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reportId = response.data.report_id;
      if (reportId) {
        setSavedReportsId((prev) => [...prev, reportId]);
      }
      fetchReportViews();
    } catch (error) {
      console.error("Error saving report:", error);
      alert(error.response?.data?.detail || "Failed to save report.");
    }
  };

  // API data fetching functions
  const fetchCountries = async () => {
    try {
      const res = await axios.get(
        `${baseURL}/api/dropdown/countries`
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
        `${baseURL}/api/dropdown/categories`,
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
        `${baseURL}/api/dropdown/subcategories`,
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
        `${baseURL}/api/dropdown/brands`,
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
        `${baseURL}/api/dropdown/models`,
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
        `${baseURL}/api/dropdown/retailers`,
        {
          params: { country_id: countryId },
        }
      );
      setApiRetailers(res.data);
    } catch (err) {
      console.error("Failed to fetch retailers:", err);
    }
  };

  const fetchReportViews = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("User not authenticated.");
      return;
    }

    try {
      const response = await axios.get(
        `${baseURL}/api/report-views`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSavedReports(response.data);
    } catch (error) {
      console.error("Error fetching report views:", error);
      alert("Failed to load reports.");
    }
  };

  // Report CRUD operations
  const handleDeleteReport = async (report_id) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("User not authenticated.");
      return;
    }

    try {
      await axios.delete(
        `${baseURL}/api/reports/${report_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchReportViews();
    } catch (error) {
      console.error("Error deleting report:", error);
      alert(error.response?.data?.detail || "Failed to delete report.");
    }
  };

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
      setOpenDeleteDialog(false);
    }
  };

  const setAllFields = (data) => {
    const filters = data?.filters || {};
    setReportName(data?.report_name || "");
    setCountry(filters.country?.[0]?.id || null);
    setCategory(filters.category?.[0]?.id || "");
    setSubCategory(filters.subCategory?.[0]?.id || "");
    setRetailer(filters.retailer?.[0]?.id || "");
    setBrand(filters.brand?.[0]?.id || "");
    setModel(filters.model?.[0]?.id || "");
    // const modelValue = filters.model?.[0]?.id;
    // setModel(modelValue !== null && modelValue !== undefined ? modelValue : "");

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

  const handleEditReportApi = async (report_id) => {
    setShowForm(true);
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("User not authenticated.");
      return;
    }

    try {
      const response = await axios.get(
        `${baseURL}/api/report/edit/${report_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      setSelectedReportIdEdit(report_id);
      setAllFields(data);
      setIsEditMode(true);

      const filters = data?.filters || {};
      if (filters.country?.[0]?.id) {
        await fetchCategories(filters.country[0].id);
        if (filters.category?.[0]?.id) {
          await fetchSubCategories(filters.category[0].id);
          if (filters.subCategory?.[0]?.id && filters.brand?.[0]?.id) {
            await fetchBrands(filters.category[0].id, filters.subCategory[0].id);
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

      // if (filters.country?.[0]?.id) {
      //   await fetchCategories(filters.country[0].id);
      
      //   if (filters.retailer?.[0]?.id) {
      //     await fetchRetailers(filters.country[0].id);
      //   }
      
      //   if (filters.category?.[0]?.id) {
      //     await fetchSubCategories(filters.category[0].id);
      
      //     if (filters.subCategory?.[0]?.id) {
      //       await fetchBrands(filters.category[0].id, filters.subCategory[0].id);
      
      //       if (filters.brand?.[0]?.id) {
      //         await fetchModels(
      //           filters.category[0].id,
      //           filters.subCategory[0].id,
      //           filters.brand[0].id
      //         );
      //       }
      //     }
      //   }
      // }
      
      if (formRef.current) {
        window.scrollTo({
          top: formRef.current.offsetTop - 130, // Adjust for navbar height
          behavior: "smooth",
        });
      }
    } catch (error) {
      console.error("Error edit report:", error);
      alert(error.response?.data?.detail || "Failed to edit report.");
    }
  };

  const handleUpdate = async (selectedReportIdEdit) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("User not authenticated");
      return;
    }

    try {
      const selectedCountry = apiCountries.find((c) => c.id === country);
      const selectedCategory = apiCategories.find((c) => c.id === category);
      const selectedSubCategory = apiSubCategories.find((c) => c.id === subCategory);
      const selectedModel = apiModels.find((p) => p.id === model);
      const selectedbrand = apiBrands.find((m) => m.id === brand);
      const selectedRetailer = apiRetailers.find((r) => r.id === retailer);

      const payload = {
        report_name: reportName,
        country: selectedCountry?.name || "",
        category: selectedCategory?.name || "",
        subcategory: selectedSubCategory?.name || "",
        brand: selectedbrand?.name || "",
        model: selectedModel?.model_no || "",
        retailer: selectedRetailer?.name || "",
      };

      if (startDate !== null && endDate !== null) {
        payload.start_date = format(startDate, "yyyy-MM-dd");
        payload.end_date = format(endDate, "yyyy-MM-dd");
      } else if (dateType !== null) {
        payload.date_type = dateType;
      }

      const response = await axios.put(
        `${baseURL}/api/report/update/${selectedReportIdEdit}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update Success:", response.data);
      // alert("Report updated successfully!");

      setIsEditMode(false);
      setShowForm(false);
      setIsSubmitted(false);
      setSelectedReportIdEdit(null);
      fetchReportViews();
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
    } catch (error) {
      console.error("Error updating report:", error);
      alert(error.response?.data?.detail || "Failed to update report.");
    }
  };

  const handleViewReport = async (report_id) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("User not authenticated.");
      return;
    }

    try {
      const response = await axios.get(
        `${baseURL}/api/report/view/${report_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.filters;
      setViewReport(data);
      setOpenViewDialog(true);
    } catch (error) {
      console.error("Error view report:", error);
      alert(error.response?.data?.detail || "Failed to view report.");
    }
  };

  const toggleForm = () => {
    if (showForm) {
      setIsEditMode(false);
      setSelectedReportIdEdit(null);
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
      setIsSubmitted(false);
    }
    setShowForm(!showForm);
  };

  // Initial data fetch
  useEffect(() => {
    fetchCountries();
    fetchReportViews();
  }, []);

  //useRef
  const formRef = useRef(null);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  //baseURL
  const baseURL = "http://192.168.223.227:8000";
  return (
    <Box 
    sx={{minHeight: "100vh", background: "linear-gradient(to top right, #c3dff7 0%, #ffffff 77%)",}}>
    <>
      <AppHeader 
        handleLogoutClick={handleLogoutClick} 
      />
      
      <LogoutDialog 
        open={dialogLogoutOpen} 
        onClose={handleLogoutDialogClose} 
        message={logoutMessage} 
      />

      <Box display="flex" justifyContent="flex-end" sx={{ pt: 4, pb: 2, pr: 4 }}>
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
          {showForm ? ( 
            "Close" 
          ) : 
          (
            <Box display="flex" alignItems="center" gap={0.5}>

    {/* <img src={AddReportIcon} alt="Add Report" style={{ width: "22px",height : "22px"}} /> */}
    <PiPlusBold size={20} color="white" />
    Add Report
  </Box>
          )}
        </Button>
      </Box>

      {showForm && (
        <Box ref={formRef}> 
        <ReportForm 
          reportName={reportName}
          setReportName={setReportName}
          country={country}
          setCountry={setCountry}
          category={category}
          setCategory={setCategory}
          subCategory={subCategory}
          setSubCategory={setSubCategory}
          model={model}
          setModel={setModel}
          brand={brand}
          setBrand={setBrand}
          retailer={retailer}
          setRetailer={setRetailer}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          dateType={dateType}
          setDateType={setDateType}
          apiCountries={apiCountries}
          apiCategories={apiCategories}
          apiSubCategories={apiSubCategories}
          apiModels={apiModels}
          apiBrands={apiBrands}
          apiRetailers={apiRetailers}
          loadingCategories={loadingCategories}
          loadingBrands={loadingBrands}
          setApiBrands={setApiBrands}
          setApiModels={setApiModels}
          dateTypeOptions={dateTypeOptions}
          fetchCategories={fetchCategories}
          fetchSubCategories={fetchSubCategories}
          fetchBrands={fetchBrands}
          fetchModels={fetchModels}
          fetchRetailers={fetchRetailers}
          handleSubmit={handleSubmit}
          isEditMode={isEditMode}
          handleUpdate={handleUpdate}
          selectedReportIdEdit={selectedReportIdEdit}
          showForm={showForm}
          toggleForm={toggleForm}
          mouseHovered={mouseHovered}
          setMouseHovered={setMouseHovered}
          mouseHoveredCountry={mouseHoveredCountry}
          setMouseHoveredCountry={setMouseHoveredCountry}
          mouseHoveredCategory={mouseHoveredCategory}
          setMouseHoveredCategory={setMouseHoveredCategory}
          mouseHoveredSubCategory={mouseHoveredSubCategory}
          setMouseHoveredSubCategory={setMouseHoveredSubCategory}
          mouseHoveredBrand={mouseHoveredBrand}
          setMouseHoveredBrand={setMouseHoveredBrand}
          mouseHoveredModel={mouseHoveredModel}
          setMouseHoveredModel={setMouseHoveredModel}
          mouseHoveredRetailer={mouseHoveredRetailer}
          setMouseHoveredRetailer={setMouseHoveredRetailer}
          mouseHoveredStartDate={mouseHoveredStartDate}
          setMouseHoveredStartDate={setMouseHoveredStartDate}
          mouseHoveredEndDate={mouseHoveredEndDate}
          setMouseHoveredEndDate={setMouseHoveredEndDate}
          mouseHoveredDateType={mouseHoveredDateType}
          setMouseHoveredDateType={setMouseHoveredDateType}

        />
        </Box>
      )}

      {isSubmitted ? (
        <Grid display="flex" justifyContent="center" alignItems="center" sx={{ p: 2 }}>
          <ReportTable 
            reportData={reportData}
            reportName={reportName}
            downloading={downloading}
            anchorEl={anchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
            handleDownloadCSV={handleDownloadCSV}
            handleDownloadPDF={handleDownloadPDF}
            handleDownloadExcel={handleDownloadExcel}
            handleSaveReport={handleSaveReport}
            isSubmitted={isSubmitted}
            submitLoader={submitLoader}
            />
        </Grid>
      )
      //  : submitLoader ? (
      //   <Box display="flex" justifyContent="center" alignItems="center" py={4}>
      //     <CircularProgress size={50} />
      //   </Box>
      // ) 
      : null}

      <SavedReports 
        savedReports={savedReports}
        handleViewReport={handleViewReport}
        handleEditReportApi={handleEditReportApi}
        handleDeleteDialogOpen={handleDeleteDialogOpen}
        openDeleteDialog={openDeleteDialog}
        handleDeleteDialogClose={handleDeleteDialogClose}
        handleConfirmDelete={handleConfirmDelete}
        openViewDialog={openViewDialog}
        setOpenViewDialog={setOpenViewDialog}
        viewReport={viewReport}
      />
      </>
    </Box>
  );
};

export default DashBoard;