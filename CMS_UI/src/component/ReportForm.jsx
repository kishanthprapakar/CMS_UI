import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Card,
  CardContent
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { styled } from "@mui/material/styles";
import { width } from "@mui/system";

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
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
  "&::placeholder": {
    fontSize: "14px",
    opacity: 0.6,
  },
  "&:focus::placeholder": {
    color: "transparent",
  },
  "&:hover": {
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
  },
  [theme.breakpoints.down("md")] : {
    width: "163%"
  },
  [theme.breakpoints.down("sm")] : {
    width: "84%"
  }
}));

const ReportForm = ({
  reportName,
  setReportName,
  country,
  setCountry,
  category,
  setCategory,
  subCategory,
  setSubCategory,
  model,
  setModel,
  brand,
  setBrand,
  retailer,
  setRetailer,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  dateType,
  setDateType,
  apiCountries,
  apiCategories,
  apiSubCategories,
  apiModels,
  apiBrands,
  apiRetailers,
  setApiBrands,
  setApiModels,
  loadingCategories,
  loadingBrands,
  dateTypeOptions,
  fetchCategories,
  fetchSubCategories,
  fetchBrands,
  fetchModels,
  fetchRetailers,
  handleSubmit,
  isEditMode,
  handleUpdate,
  selectedReportIdEdit,
  showForm,
  toggleForm,
  mouseHovered,
  setMouseHovered,
  mouseHoveredCountry, 
  setMouseHoveredCountry,
  mouseHoveredCategory, 
  setMouseHoveredCategory,
  mouseHoveredSubCategory, 
  setMouseHoveredSubCategory,
  mouseHoveredBrand, 
  setMouseHoveredBrand,
  mouseHoveredModel, 
  setMouseHoveredModel,
  mouseHoveredRetailer, 
  setMouseHoveredRetailer,
  mouseHoveredStartDate, 
  setMouseHoveredStartDate,
  mouseHoveredEndDate, 
  setMouseHoveredEndDate,
  mouseHoveredDateType, 
  setMouseHoveredDateType,
  submitLoader,
  
}) => {
  
  return (

    <>
    {/* <MessageListener/> */}

    <Card
      elevation={12}
      sx={{
        mx: "auto",
        maxWidth: 1200,
        borderRadius: 4,
        backgroundColor: "#f9f9f9",
        mb:4
      }}
    >
      <CardContent>
        <Grid
          container
          spacing={{md: 4.5, xs: 3 }}
          alignItems="center"
          sx={{ pl: {md:2, xs: 1}, pr: {md: 4, xs: 1} , pb: {md: 4, xs: 1}, pt: {md: 4, xs: 2} }}
        >
          {/* Report Name */}
          
          <Grid size={{ xs:5,  md: 1.7 }}
          // sx={{
          //   position: 'relative',
          //   '&:hover .hover-typography': {
          //     fontSize: '17px',
          //     background:
          //       'linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)',
          //     WebkitBackgroundClip: 'text',
          //     WebkitTextFillColor: 'transparent',
          //   },
          // }}
          sx={{
            position: "relative",
            "& .hover-typography": {
              fontFamily: "Poppins",
              transform: "translateX(30px)",
              fontSize: "16px",
              transition: "all 0.3s ease",
              color: "#000",
            },
            // When TextField is hovered, apply animation to .hover-typography
            "&:has(+ .textfield-wrapper:hover) .hover-typography": {
              fontSize: "17px",
              background:
                "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            },
          }}

          >
            <Typography 
            //  sx={{ fontFamily: "Poppins", 
            //   transform: "translateX(30px)",
            //   transition: mouseHovered ? "all 0.3s ease" : "",
            //   fontSize: mouseHovered ? "17px" : "16px",
            //   background: mouseHovered
            //   ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)"
            //   : "none",
            // WebkitBackgroundClip: mouseHovered ? "text" : "unset",
            // WebkitTextFillColor: mouseHovered ? "transparent" : "#000",
            //   // color: mouseHovered ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)" : "#000",
            //   // color: mouseHovered ? "blue" : "",
            //   // fontWeight: mouseHovered ? "bold" : "normal"
            //    }}
            className="hover-typography"
               >
              Report Name
            </Typography>
          </Grid>
          <Grid size={{ xs: 7, md: 2.5 }} className="textfield-wrapper">
            <Box
              sx={{
                p: "2.3px",
                borderRadius: "8px",
                background: "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)",
              }}
            >
              <TextField
                fullWidth
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                // onMouseEnter={() => setMouseHovered(true)}
                // onMouseLeave={() => setMouseHovered(false)}
                placeholder="Enter report name"
                size="small"
                sx={{
                  "& .MuiInputBase-input": { fontFamily: "Poppins", fontSize: "15px" },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "6px",
                    backgroundColor: "#fff",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    "&:hover": { boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
                  },
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "& input:focus::placeholder": { color: "transparent" },
                }}
              />
            </Box>
          </Grid>
          

          {/* Country dropdown*/}
          <Grid size={{xs: 5, md: 1.3 }}
          sx={{
            position: "relative",
            "& .hover-typography": {
              fontFamily: "Poppins",
              transform: "translateX(30px)",
              fontSize: "16px",
              color: "#000",
              transition: "all 0.3s ease",
            },
            "&:has(+ .autocomplete-wrapper:hover) .hover-typography": {
              fontSize: "17px",
              background:
                "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            },
          }}
          >
            <Typography 
            // sx={{ fontFamily: "Poppins", 
            //   transform: "translateX(30px)",
            //   transition: mouseHoveredCountry? "all 0.3s ease" : "",
            //   fontSize: mouseHoveredCountry ? "17px" : "16px",
            //   background: mouseHoveredCountry
            //   ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)"
            //   : "none",
            // WebkitBackgroundClip: mouseHoveredCountry ? "text" : "unset",
            // WebkitTextFillColor: mouseHoveredCountry ? "transparent" : "#000",
            //   // color: mouseHovered ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)" : "#000",
            //   // color: mouseHovered ? "blue" : "",
            //   // fontWeight: mouseHovered ? "bold" : "normal"
            //    }}
            className="hover-typography"
               >
              Country
            </Typography>
          </Grid>
          <Grid size={{ xs: 7, md: 2.5 }} className="autocomplete-wrapper">
            <Autocomplete
              size="small"
              options={apiCountries}
              getOptionLabel={(option) => option.name || ""}
              value={apiCountries.find((c) => c.id === country) || null}
              onChange={(event, newValue) => {
                const selectedId = newValue ? newValue.id : "";
                setCountry(selectedId);
                setCategory("");
                setSubCategory("");
                setBrand("");
                setModel("");
                setRetailer("");
                if (selectedId) {
                  fetchCategories(selectedId);
                  fetchRetailers(selectedId);
                }
              }}
              renderInput={(params) => (
                <Box sx={{ p: "2.3px", borderRadius: "8px", background: "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)" }}>
                  <TextField
                    {...params}
                    placeholder="Select Country"
          //           onMouseEnter={() => setMouseHoveredCountry(true)}
          // onMouseLeave={() => setMouseHoveredCountry(false)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "6px",
                        backgroundColor: "#fff",
                        fontSize: "15px",
                        transition: "all 0.3s ease",
                        "&:hover": { boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)" },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
                      },
                      "& .MuiInputBase-input": { fontFamily: "Poppins", fontSize: "15px" },
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      "& input:focus::placeholder": { color: "transparent" },
                    }}
                  />
                </Box>
              )}
              componentsProps={{
                paper: {
                  sx: {
                    mt: 0.5,
                    "& .MuiAutocomplete-option": { fontFamily: "Poppins", fontSize: "15px" },
                    "& .MuiAutocomplete-option:hover": { backgroundColor: "#87CEEB" },
                  },
                },
              }}
            />
          </Grid>


                        {/* Categories */}
                        <Grid size={{xs: 5,  md: 1.5 }} 
                        sx={{
      position: "relative",
      "& .hover-typography": {
        fontFamily: "Poppins",
        transform: "translateX(30px)",
        fontSize: "16px",
        color: "#000",
        transition: "all 0.3s ease",
      },
      "&:has(+ .autocomplete-wrapper:hover) .hover-typography": {
        fontSize: "17px",
        background:
          "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
    }}>
                          <Typography
                            // sx={{ fontFamily: "Poppins", 
                            //   transform: "translateX(30px)",
                            //   transition: mouseHoveredCategory? "all 0.3s ease" : "",
                            //   fontSize: mouseHoveredCategory ? "17px" : "16px",
                            //   background: mouseHoveredCategory
                            //   ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)"
                            //   : "none",
                            // WebkitBackgroundClip: mouseHoveredCategory ? "text" : "unset",
                            // WebkitTextFillColor: mouseHoveredCategory? "transparent" : "#000",
                            //   // color: mouseHovered ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)" : "#000",
                            //   // color: mouseHovered ? "blue" : "",
                            //   // fontWeight: mouseHovered ? "bold" : "normal"
                            //    }}
                          className="hover-typography"
                          >
                            Categories
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 7, md: 2.5 }} className="autocomplete-wrapper">
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
          //                         onMouseEnter={() => setMouseHoveredCategory(true)}
          // onMouseLeave={() => setMouseHoveredCategory(false)}
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
                                  "& .MuiAutocomplete-option.Mui-focused": {
  backgroundColor: "rgba(71,139,214,1)",
  color: "#fff",
},
                                },
                              },
                            }}
                          />
                        </Grid>
          
                        {/* {category && (
                        <> */}
                        <Grid size={{xs:5, md: 1.7 }} 
                        sx={{
                          position: "relative",
                          "& .hover-typography": {
                            fontFamily: "Poppins",
                            transform: "translateX(30px)",
                            fontSize: "16px",
                            color: "#000",
                            transition: "all 0.3s ease",
                          },
                          "&:has(+ .autocomplete-wrapper:hover) .hover-typography": {
                            fontSize: "17px",
                            background:
                              "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          },
                        }}
                        >
                          <Typography
                            // sx={{ fontFamily: "Poppins", 
                            //   transform: "translateX(30px)",
                            //   transition: mouseHoveredSubCategory? "all 0.3s ease" : "",
                            //   fontSize: mouseHoveredSubCategory? "17px" : "16px",
                            //   background: mouseHoveredSubCategory
                            //   ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)"
                            //   : "none",
                            // WebkitBackgroundClip: mouseHoveredSubCategory ? "text" : "unset",
                            // WebkitTextFillColor: mouseHoveredSubCategory? "transparent" : "#000",
                            //   // color: mouseHovered ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)" : "#000",
                            //   // color: mouseHovered ? "blue" : "",
                            //   // fontWeight: mouseHovered ? "bold" : "normal"
                            //    }}
                          className="hover-typography"
                          >
                            SubCategory
                          </Typography>
                        </Grid>
                        <Grid size={{xs: 7, md: 2.5 }} className="autocomplete-wrapper">
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
          //                         onMouseEnter={() => setMouseHoveredSubCategory(true)}
          // onMouseLeave={() => setMouseHoveredSubCategory(false)}
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
      //                             "& .MuiAutocomplete-option[aria-selected='true']": {
      //   backgroundColor: "rgba(71,139,214,1)",
      //   color: "#fff",
      // },
                                  "& .MuiAutocomplete-option:hover": {
                                    backgroundColor: "rgba(71,139,214,1)", // your desired hover color
                                    color: "#fff",
                                  },
                                  "& .MuiAutocomplete-option.Mui-focused": {
  backgroundColor: "rgba(71,139,214,1)",
  color: "#fff",
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
          
                        <Grid size={{xs: 5,  md: 1.3 }} 
                        sx={{
                          position: "relative",
                          "& .hover-typography": {
                            fontFamily: "Poppins",
                            transform: "translateX(30px)",
                            fontSize: "16px",
                            color: "#000",
                            transition: "all 0.3s ease",
                          },
                          "&:has(+ .autocomplete-wrapper:hover) .hover-typography": {
                            fontSize: "17px",
                            background:
                              "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          },
                        }}
                        >
                          <Typography
                            // sx={{ fontFamily: "Poppins", 
                            //   transform: "translateX(30px)",
                            //   transition: mouseHoveredBrand? "all 0.3s ease" : "",
                            //   fontSize: mouseHoveredBrand ? "17px" : "16px",
                            //   background: mouseHoveredBrand
                            //   ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)"
                            //   : "none",
                            // WebkitBackgroundClip: mouseHoveredBrand ? "text" : "unset",
                            // WebkitTextFillColor: mouseHoveredBrand ? "transparent" : "#000",
                            //   // color: mouseHovered ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)" : "#000",
                            //   // color: mouseHovered ? "blue" : "",
                            //   // fontWeight: mouseHovered ? "bold" : "normal"
                            //    }}
                            className="hover-typography"
                          >
                            Brand
                          </Typography>
                        </Grid>
                        <Grid size={{ xs: 7, md: 2.5 }} className="autocomplete-wrapper">
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
          //                         onMouseEnter={() => setMouseHoveredBrand(true)}
          // onMouseLeave={() => setMouseHoveredBrand(false)}
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
                        <Grid size={{ xs: 5, md: 1.5 }} 
                        sx={{
                          position: "relative",
                          "& .hover-typography": {
                            fontFamily: "Poppins",
                            transform: "translateX(30px)",
                            fontSize: "16px",
                            color: "#000",
                            transition: "all 0.3s ease",
                          },
                          "&:has(+ .autocomplete-wrapper:hover) .hover-typography": {
                            fontSize: "17px",
                            background:
                              "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          },
                        }}
                        >
                          <Typography
                            
                            // sx={{ fontFamily: "Poppins", 
                            //   transform: "translateX(35px) translateY(5px)",
                            //   transition: mouseHoveredModel? "all 0.3s ease" : "",
                            //   fontSize: mouseHoveredModel ? "17px" : "16px",
                            //   background: mouseHoveredModel
                            //   ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)"
                            //   : "none",
                            // WebkitBackgroundClip: mouseHoveredModel ? "text" : "unset",
                            // WebkitTextFillColor: mouseHoveredModel ? "transparent" : "#000",
                            //   // color: mouseHovered ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)" : "#000",
                            //   // color: mouseHovered ? "blue" : "",
                            //   // fontWeight: mouseHovered ? "bold" : "normal"
                            //    }}
                            className="hover-typography"
                          >
                            Models
                          </Typography>
                        </Grid>
                        <Grid size={{xs: 7,  md: 2.5 }} className="autocomplete-wrapper">
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
          //                         onMouseEnter={() => setMouseHoveredModel(true)}
          // onMouseLeave={() => setMouseHoveredModel(false)}
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
                        <Grid size={{xs: 5, md: 1.7 }} 
                        sx={{
                          position: "relative",
                          "& .hover-typography": {
                            fontFamily: "Poppins",
                            transform: "translateX(30px)",
                            fontSize: "16px",
                            color: "#000",
                            transition: "all 0.3s ease",
                          },
                          "&:has(+ .autocomplete-wrapper:hover) .hover-typography": {
                            fontSize: "17px",
                            background:
                              "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          },
                        }}
                        >
                          <Typography
                            // sx={{ fontFamily: "Poppins", 
                            //   transform: "translateX(30px)",
                            //   transition: mouseHoveredRetailer? "all 0.3s ease" : "",
                            //   fontSize: mouseHoveredRetailer ? "17px" : "16px",
                            //   background: mouseHoveredRetailer
                            //   ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)"
                            //   : "none",
                            // WebkitBackgroundClip: mouseHoveredRetailer ? "text" : "unset",
                            // WebkitTextFillColor: mouseHoveredRetailer? "transparent" : "#000",
                            //   // color: mouseHovered ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)" : "#000",
                            //   // color: mouseHovered ? "blue" : "",
                            //   // fontWeight: mouseHovered ? "bold" : "normal"
                            //    }}
                            className="hover-typography"
                          >
                            Retailer
                          </Typography>
                        </Grid>
                        <Grid size={{xs: 7, md: 2.5 }} className="autocomplete-wrapper">
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
          //                         onMouseEnter={() => setMouseHoveredRetailer(true)}
          // onMouseLeave={() => setMouseHoveredRetailer(false)}
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
          
                        <Grid size={{xs:5, md: 1.3 }}
                        sx={{
                          position: "relative",
                          "& .hover-typography": {
                            fontFamily: "Poppins",
                            transform: "translateX(30px)",
                            fontSize: "16px",
                            color: "#000",
                            transition: "all 0.3s ease",
                          },
                          "&:has(+ .autocomplete-wrapper:hover) .hover-typography": {
                            fontSize: "17px",
                            background:
                              "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          },
                        }}
                        >
                          <Typography
                            // sx={{ fontFamily: "Poppins", 
                            //   transform: "translateX(30px)",
                            //   transition: mouseHoveredStartDate? "all 0.3s ease" : "",
                            //   fontSize: mouseHoveredStartDate ? "17px" : "16px",
                            //   background: mouseHoveredStartDate
                            //   ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)"
                            //   : "none",
                            // WebkitBackgroundClip: mouseHoveredStartDate ? "text" : "unset",
                            // WebkitTextFillColor: mouseHoveredStartDate ? "transparent" : "#000",
                            //   // color: mouseHovered ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)" : "#000",
                            //   // color: mouseHovered ? "blue" : "",
                            //   // fontWeight: mouseHovered ? "bold" : "normal"
                            //    }}
                            className="hover-typography"
                          >
                            Start Date
                          </Typography>
                        </Grid>
                        <Grid size={{ xs:7, md: 2.5 }} className="autocomplete-wrapper">
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
                              // onFocus={() => setMouseHoveredStartDate(true)}
                              // onBlur={() => setMouseHoveredStartDate(false)}
                            />
                          </Box>
                        </Grid>
          
                        <Grid size={{xs: 5,  md: 1.5 }} 
                        sx={{
                          position: "relative",
                          "& .hover-typography": {
                            fontFamily: "Poppins",
                            transform: "translateX(30px)",
                            fontSize: "16px",
                            color: "#000",
                            transition: "all 0.3s ease",
                          },
                          "&:has(+ .autocomplete-wrapper:hover) .hover-typography": {
                            fontSize: "17px",
                            background:
                              "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          },
                        }}
                        >
                          <Typography
                            
                            // sx={{ fontFamily: "Poppins", 
                            //   transform: "translateX(35px) translateY(5px)",
                            //   transition: mouseHoveredEndDate? "all 0.3s ease" : "",
                            //   fontSize: mouseHoveredEndDate? "17px" : "16px",
                            //   background: mouseHoveredEndDate
                            //   ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)"
                            //   : "none",
                            // WebkitBackgroundClip: mouseHoveredEndDate ? "text" : "unset",
                            // WebkitTextFillColor: mouseHoveredEndDate ? "transparent" : "#000",
                            //   // color: mouseHovered ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)" : "#000",
                            //   // color: mouseHovered ? "blue" : "",
                            //   // fontWeight: mouseHovered ? "bold" : "normal"
                            //    }}
                            className="hover-typography"
                            
                          >
                            End Date
                          </Typography>
                        </Grid>
                        <Grid size={{xs: 7,  md: 2.5 }} className="autocomplete-wrapper">
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
                              // onFocus={() => setMouseHoveredEndDate(true)}
                              // onBlur={() => setMouseHoveredEndDate(false)}
                            />
                          </Box>
                        </Grid>
          
                        <Grid size={{xs: 5,  md: 1.7 }} sx={{
      position: "relative",
      "& .hover-typography": {
        fontFamily: "Poppins",
        transform: "translateX(30px)",
        fontSize: "16px",
        color: "#000",
        transition: "all 0.3s ease",
      },
      "&:has(+ .autocomplete-wrapper:hover) .hover-typography": {
        fontSize: "17px",
        background:
          "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      },
    }}>
                          <Typography
                            // sx={{ fontFamily: "Poppins", 
                            //   transform: "translateX(30px)",
                            //   transition: mouseHoveredDateType? "all 0.3s ease" : "",
                            //   fontSize: mouseHoveredDateType ? "17px" : "16px",
                            //   background: mouseHoveredDateType
                            //   ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)"
                            //   : "none",
                            // WebkitBackgroundClip: mouseHoveredDateType ? "text" : "unset",
                            // WebkitTextFillColor: mouseHoveredDateType ? "transparent" : "#000",
                            //   // color: mouseHovered ? "linear-gradient(132.6deg, rgba(71,139,214,1) 23.3%, rgba(37,216,211,1) 84.7%)" : "#000",
                            //   // color: mouseHovered ? "blue" : "",
                            //   // fontWeight: mouseHovered ? "bold" : "normal"
                            //    }}
                            className="hover-typography"
                          >
                            Date Type
                          </Typography>
                        </Grid>
                        <Grid size={{xs: 7, md: 2.5 }} className="autocomplete-wrapper">
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
                                  // onMouseEnter={() => setMouseHoveredDateType(true)}
                                  // onMouseLeave={() => setMouseHoveredDateType(false)}
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

          <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "flex-end", pl: {md: 3.8, xs: 0} }}>
            <Button
              onClick={isEditMode ? () => handleUpdate(selectedReportIdEdit) : handleSubmit}
              sx={{
                fontFamily: "Poppins",
                textTransform: "none",
                backgroundColor: "#0077B6",
                borderRadius: 4,
                px: 2,
          py: 1,
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
              }}
              disabled={submitLoader}
            >
              {isEditMode ? "Update" : "Submit"}
              {submitLoader && (
          <CircularProgress
            size={20}
            sx={{ color: "white" }}
          />
        )}
            </Button>
          </Grid>

          {/* <ActionIcons /> */}
        
        </Grid>
      </CardContent>
    </Card>

    </>
  );
};

export default ReportForm;