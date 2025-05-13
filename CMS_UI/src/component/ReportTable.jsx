import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Button,
  CircularProgress,
  Popover,
  MenuList,
  MenuItem,
  TableContainer,
  Pagination
} from "@mui/material";

const ReportTable = ({
  reportData,
  reportName,
  downloading,
  anchorEl,
  handleClick,
  handleClose,
  handleDownloadCSV,
  handleDownloadPDF,
  handleDownloadExcel,
  handleSaveReport,
}) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 7;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate current page data
  const paginatedData = reportData?.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  return (
    <Card
      elevation={5}
      sx={{
        borderRadius: 10,
        mx: 2,
        my: 3,
        width: "1200px",
        justifyContent: "center",
        boxShadow: 8
      }}
    >
      <CardContent sx={{background: "linear-gradient(to top right, #c3dff7 0%, #ffffff 77%)"}}>
        <Typography
          variant="h6"
          gutterBottom
          textAlign="center"
          sx={{ fontWeight: "bold", fontFamily: "Poppins", p: 2, fontSize: "22px"}}
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
                sx={{ fontFamily: "Poppins", p: 1, fontSize: "17px",ml:3.5  }}
              >
                Report Name : {reportName}
              </Typography>
            )}

            {/* <Box sx={{ maxHeight: 428, overflow: "auto" }}> */}
            <TableContainer
              sx={{
                              borderRadius: 6,
                              boxShadow: 8,
                              // overflowY: "auto",
                              // height: 600,
                              // width: "1200px",
                              // mt: 4,
                              // display: "flex",
                              // justifyContent: "center",
                              width: "1100px",
                              mx: "auto",
                              // p:2
                            }}
                >
              <Table>
                <TableHead>
                  <TableRow>
                    {Object.keys(reportData[0]).map((key, index, arr) => (
                      <TableCell
                        key={key}
                        align="left"
                        sx={{
                          // fontWeight: "bold",
                          fontFamily: "Poppins",
                          fontSize: "18px",
                          backgroundColor: "#F1F3F8",
                          color: "black",
                          position: "sticky",
                          top: 0,
                          zIndex: 1,
                          borderTopLeftRadius: index === 0 ? "16px" : 0,
                          borderTopRightRadius: index === arr.length - 1 ? "16px" : 0,
                        }}
                      >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paginatedData.map((item, index) => (
                    <TableRow key={index}>
                      {Object.keys(reportData[0]).map((key, colIndex, arr) => (
                        <TableCell
                          key={key}
                          align="left"
                          sx={{
                            fontFamily: "Poppins",
                            // backgroundColor: index % 2 === 0 ? "		#F5F5F5" : "#ffffff",
                            backgroundColor: "white",
                            borderBottomLeftRadius:
          index === reportData.length - 1 && colIndex === 0 ? "16px" : 0,
        borderBottomRightRadius:
          index === reportData.length - 1 && colIndex === arr.length - 1 ? "16px" : 0,
          color: colIndex === 0 ? "#0077B6" : colIndex === 6 ? "#4B0082" : colIndex === 7 ?  "#32CD32" : "black",
          
                            // border: "none"
                          }}
                        >
                          {typeof item[key] === "object" && item[key] !== null
                            ? item[key].name || JSON.stringify(item[key])
                            : item[key]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </TableContainer>
              <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={Math.ceil(reportData.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                color="primary"
                // shape="rounded"
              />
            </Box>
            {/* </Box> */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                // pt: 4,
                gap: 4,
                pl:4
              }}
            >
              <Button
                variant="contained"
                size="medium"
                onClick={handleClick}
                disabled={downloading}
                startIcon={
                  downloading ? <CircularProgress size={16} color="inherit" /> : null
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
                  borderRadius: 6,
                  "&:hover": {
                    backgroundColor: "grey.300",
                    color: "black",
                  },
                }}
              >
                Save
              </Button>

              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <MenuList>
                  <MenuItem onClick={handleDownloadCSV}>Download as CSV</MenuItem>
                  <MenuItem onClick={handleDownloadPDF}>Download as PDF</MenuItem>
                  <MenuItem onClick={handleDownloadExcel}>Download as Excel</MenuItem>
                </MenuList>
              </Popover>
            </Box>
          </>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" py={1}>
            <Typography sx={{ fontFamily: "Poppins", fontSize: "16px" }}>
              No data available
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportTable;
