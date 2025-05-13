import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Tooltip,
  Pagination
} from "@mui/material";
import DeleteIcons from "../assets/deleteIconRed.svg";
import { styled } from '@mui/material/styles';
import { tooltipClasses } from "@mui/material/Tooltip";
import EditBlueIcon from "../assets/editIconBlue.svg";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

// Custom tooltip
const CustomTooltipView = styled(({ className, ...props }) => (
  <Tooltip {...props} placement="top" PopperProps={{
    modifiers: [{ name: 'offset', options: { offset: [0, -7] } }],
  }} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#25D8D3',
    color: 'white',
    fontSize: 10.5,
    fontFamily: 'Poppins',
    borderRadius: 14,
    padding: '7px 6px',
    boxShadow: theme.shadows[2],
  },
}));

const CustomTooltipEdit = styled(({ className, ...props }) => (
  <Tooltip {...props} placement="top" PopperProps={{
    modifiers: [{ name: 'offset', options: { offset: [0, -7] } }],
  }} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#61b4f7',
    color: 'white',
    fontSize: 10.5,
    fontFamily: 'Poppins',
    borderRadius: 14,
    padding: '7px 6px',
    boxShadow: theme.shadows[2],
  },
}));

const CustomTooltipDelete = styled(({ className, ...props }) => (
  <Tooltip {...props} placement="top" PopperProps={{
    modifiers: [{ name: 'offset', options: { offset: [0, -7] } }],
  }} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f97070',
    color: 'white',
    fontSize: 10.5,
    fontFamily: 'Poppins',
    borderRadius: 14,
    padding: '7px 6px',
    boxShadow: theme.shadows[2],
  },
}));


const SavedReports = ({
  savedReports,
  handleViewReport,
  handleEditReportApi,
  handleDeleteDialogOpen,
  openDeleteDialog,
  handleDeleteDialogClose,
  handleConfirmDelete,
  openViewDialog,
  setOpenViewDialog,
  viewReport
}) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 6;

  const handleChangePage = (_, value) => setPage(value);

  const paginatedReports = savedReports.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const pageCount = Math.ceil(savedReports.length / rowsPerPage);

  return (
    <>
      {savedReports.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Card
            sx={{
              // mt: 4,
              mb:4,
              width: "1200px",
              borderRadius: 10,
              boxShadow: 8,
              overflow: "hidden",
              // backgroundColor: "#fdfdfd"
            }}
          >
            <CardContent sx={{
    // background: "linear-gradient(to right,rgb(241, 242, 243) 50%, #f1f3f8 100%)",
    background: "linear-gradient(to top right, #c3dff7 0%, #ffffff 77%)"
    // background: "white"
    // backgroundColor: "grey.300"
    // background: "linear-gradient( 132.6deg,  rgba(71,139,214,0.5) 23.3%, rgba(37,216,211,0.5) 84.7%);linear-gradient( 109.6deg,  rgba(30,198,198,1) 11.3%, rgba(47,127,164,1) 50.1%, rgba(6,92,147,1) 100.2% );radial-gradient( circle 950px at 2.5% 8%,  rgba(44,103,176,1) 0%, rgba(35,56,136,1) 90% );"
    // background:           "linear-gradient( 132.6deg,  rgba(71,139,214,0.8) 23.3%, rgba(37,216,211,0.8) 84.7%);linear-gradient( 109.6deg,  rgba(30,198,198,1) 11.3%, rgba(47,127,164,1) 50.1%, rgba(6,92,147,1) 100.2% );radial-gradient( circle 950px at 2.5% 8%,  rgba(44,103,176,1) 0%, rgba(35,56,136,1) 90% );"
    // background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)"

    
  }}>
              <Typography variant="h6" sx={{ fontFamily: "Poppins", mt:4,mb:2, fontWeight: "bold", ml:5}}>
                My Reports
              </Typography>
              <TableContainer
              sx={{
                              borderRadius: 6,
                              // boxShadow: 8,
                              // overflowY: "auto",
                              // height: 428,
                              // width: "1200px",
                              // mt: 4,
                              // display: "flex",
                              // justifyContent: "center",
                              // width: "1100px",
                              width: {
                                xs: "100%",
                                sm: "1100px"
                              },
                              mx: "auto",
                              // p:2
                            }}
                >
                <Table>
                  <TableHead>
                    <TableRow sx={{backgroundColor: "#F1F3F8"}}>
                      <TableCell align="left" sx={headerStyle}>Report Name</TableCell>
                      <TableCell align="left" sx={headerStyle}>Created</TableCell>
                      <TableCell align="center" sx={{fontFamily: "Poppins",
  // backgroundColor: "#F1F3F8",
backgroundColor: "#F1F3F8",
  color: "black",
  fontSize: "18px",
  position: "sticky",
  top: 0,
  zIndex: 1,
  transform: "translateX(-15.5px)",
  }}
  >
    Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedReports.map((report, index) => (
                      <TableRow key={index}>
                        <TableCell align="left" sx={{fontFamily: "Poppins",
  // backgroundColor: index % 2 === 0 ? "#ffffff" : "#F5F5F5",
  backgroundColor: "#ffffff",
  // border: "none",
color:"#0077B6",
}}
  >
                          {report.name}
                        </TableCell>
                        <TableCell align="left" sx={rowStyle(index)}>
                          {new Date(report.created).toLocaleString()}
                        </TableCell>
                        <TableCell align="center" sx={{ ...rowStyle(index), display: "flex", justifyContent: "center",alignItems: "center", gap: 2 }}>
                          <CustomTooltipView title="View Report">
                            {/* <Box
                              component="img"
                              src={}
                              alt="View"
                              sx={{ width: 22, height: 20, cursor: "pointer" }}
                              onClick={() => handleViewReport(report.id)}
                            /> */}
                            <RemoveRedEyeOutlinedIcon sx={{color: "#25D8D3", cursor: "pointer"}} onClick= {() => handleViewReport(report.id)}/>
                          </CustomTooltipView>
                          <CustomTooltipEdit title="Edit Report">
                            <Box
                              component="img"
                              src={EditBlueIcon}
                              alt="Edit"
                              sx={{ width: 22, height: 22, cursor: "pointer", pt: "1.5px" }}
                              onClick={() => handleEditReportApi(report.id)}
                            />
                          </CustomTooltipEdit>
                          <CustomTooltipDelete title="Delete Report">
                            <Box
                              component="img"
                              src={DeleteIcons}
                              alt="Delete"
                              sx={{ width: 22, height: 22, cursor: "pointer", pt: "1px" }}
                              onClick={() => handleDeleteDialogOpen(report.id)}
                            />
                          </CustomTooltipDelete>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ display: "flex", justifyContent: "center", mt:2 }}>
                <Pagination count={pageCount} page={page} onChange={handleChangePage} color="primary" />
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleDeleteDialogClose}
        PaperProps={{ sx: { borderRadius: 4, minWidth: 400 } }}
      >
        <DialogContent sx={{ pt: 3.5, pb: 0 }}>
          <Typography sx={{ fontFamily: "Poppins" }}>
            Do you want to delete?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ pb: 2 }}>
          <Button
            variant="contained"
            sx={{ fontFamily: "Poppins", textTransform: "none", borderRadius: 4, backgroundColor: "#0077B6", p: 0.5 }}
            onClick={handleConfirmDelete}
          >
            Yes
          </Button>
          <Button
            color="error"
            sx={{ fontFamily: "Poppins", textTransform: "none", borderRadius: 4 }}
            onClick={handleDeleteDialogClose}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Report Dialog */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="lg" fullWidth>
        <Card elevation={5} sx={{ borderRadius: 3, mx: 2, my: 3, width: "1200px", justifyContent: "center" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom textAlign="center" sx={{ fontWeight: "bold", fontFamily: "Poppins", p: 2 }}>
              Report View
            </Typography>
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
                            borderTopRightRadius: index === arr.length - 1 ? "12px" : 0,
                          }}
                        >
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {Object.values(viewReport).map((value, i) => (
                        <TableCell key={i} align="center" sx={{ fontFamily: "Poppins", backgroundColor: "grey.200" }}>
                          {value ?? "-"}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            ) : (
              <Typography variant="body1" textAlign="center" sx={{ fontFamily: "Poppins", mt: 2 }}>
                No data available
              </Typography>
            )}
          </CardContent>
        </Card>
      </Dialog>
    </>
  );
};

const headerStyle = {
  fontFamily: "Poppins",
  // backgroundColor: "#F1F3F8",
backgroundColor: "#F1F3F8",
  color: "black",
  fontSize: "18px",
  position: "sticky",
  top: 0,
  zIndex: 1,
};

const rowStyle = (index) => ({
  fontFamily: "Poppins",
  // backgroundColor: index % 2 === 0 ? "#ffffff" : "#F5F5F5",
  backgroundColor: "#ffffff",
  // border: "none",
});

export default SavedReports;
