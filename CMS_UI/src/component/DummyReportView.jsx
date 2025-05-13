import React, { useState } from "react";
import ReportTable from "./ReportTable";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const dummyReportData = [
  {
    Country: "Australia",
    Category: "SNACK MAKERS",
    Subcategory: "Omelette",
    Brand: "BREVILLE",
    Model: "LEG250GRY",
    Retailer: "Amazon AU",
    Price: "$79.95",
    Reference_date: "20250323",
  },
  {
    Country: "Australia",
    Category: "SNACK MAKERS",
    Subcategory: "Omelette",
    Brand: "BREVILLE",
    Model: "LEG250GRY",
    Retailer: "Amazon AU",
    Price: "$78.00",
    Reference_date: "20250324",
  },
  {
    Country: "Australia",
    Category: "SNACK MAKERS",
    Subcategory: "Omelette",
    Brand: "BREVILLE",
    Model: "LEG250GRY",
    Retailer: "Amazon AU",
    Price: "$73.00",
    Reference_date: "20250325",
  },
  {
    Country: "Australia",
    Category: "SNACK MAKERS",
    Subcategory: "Omelette",
    Brand: "BREVILLE",
    Model: "LEG250GRY",
    Retailer: "Amazon AU",
    Price: "$83.00",
    Reference_date: "20250326",
  },
  {
    Country: "Australia",
    Category: "SNACK MAKERS",
    Subcategory: "Omelette",
    Brand: "BREVILLE",
    Model: "LEG250GRY",
    Retailer: "Amazon AU",
    Price: "$82.00",
    Reference_date: "20250328",
  },
  {
    Country: "Australia",
    Category: "SNACK MAKERS",
    Subcategory: "Omelette",
    Brand: "BREVILLE",
    Model: "LEG250GRY",
    Retailer: "Amazon AU",
    Price: "$83.00",
    Reference_date: "20250402",
  },
  {
    Country: "Australia",
    Category: "SNACK MAKERS",
    Subcategory: "Omelette",
    Brand: "BREVILLE",
    Model: "LEG250GRY",
    Retailer: "Amazon AU",
    Price: "$88.00",
    Reference_date: "20250404",
  },
];

const DummyReportView = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleDownloadCSV = () => {
    const csvRows = [
      Object.keys(dummyReportData[0]).join(","), // header
      ...dummyReportData.map((row) =>
        Object.values(row)
          .map((val) => `"${val}"`)
          .join(",")
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dummyReportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "report.xlsx");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Report", 20, 10);
    const headers = [Object.keys(dummyReportData[0])];
    const rows = dummyReportData.map((row) => Object.values(row));
    doc.autoTable({
      head: headers,
      body: rows,
    });
    doc.save("report.pdf");
  };

  const handleSaveReport = () => {
    alert("Dummy save triggered.");
  };

  return (
    <ReportTable
      reportData={dummyReportData}
      reportName="Amazon"
      downloading={downloading}
      anchorEl={anchorEl}
      handleClick={handleClick}
      handleClose={handleClose}
      handleDownloadCSV={handleDownloadCSV}
      handleDownloadPDF={handleDownloadPDF}
      handleDownloadExcel={handleDownloadExcel}
      handleSaveReport={handleSaveReport}
    />
  );
};

export default DummyReportView;
