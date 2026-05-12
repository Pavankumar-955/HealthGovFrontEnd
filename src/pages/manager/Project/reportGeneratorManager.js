import jsPDF from "jspdf";

/**
 * ✅ MANAGER OVERALL REPORT
 */
export const downloadOverallReportPDF = (report) => {
  const doc = new jsPDF();

  // ✅ GREEN HEADER
  doc.setFillColor(34, 153, 84);
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("Manager Report", 20, 18);

  // ✅ RESET COLOR
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  let y = 50;

  // ✅ ID
  doc.setFont(undefined, "bold");
  doc.text("Manager ID:", 20, y);
  doc.setFont(undefined, "normal");
  doc.text(`${report.managerId || "N/A"}`, 80, y);
  y += 10;

  // ✅ EMAIL
  doc.setFont(undefined, "bold");
  doc.text("Email:", 20, y);
  doc.setFont(undefined, "normal");
  doc.text(`${report.email || "N/A"}`, 80, y);
  y += 20;

  // ✅ SECTION TITLE
  doc.setFont(undefined, "bold");
  doc.setFontSize(13);
  doc.text("Application Summary", 20, y);
  y += 10;

  doc.setFontSize(11);

  // ✅ TOTAL
  doc.setFont(undefined, "bold");
  doc.text("Total Applications:", 20, y);
  doc.setFont(undefined, "normal");
  doc.text(`${report.total ?? 0}`, 90, y);
  y += 10;

  // ✅ PENDING
  doc.setFont(undefined, "bold");
  doc.text("Pending:", 20, y);
  doc.setFont(undefined, "normal");
  doc.text(`${report.pending ?? 0}`, 90, y);
  y += 10;

  // ✅ APPROVED (GREEN)
  doc.setFont(undefined, "bold");
  doc.text("Approved:", 20, y);
  doc.setTextColor(0, 128, 0);
  doc.setFont(undefined, "normal");
  doc.text(`${report.approved ?? 0}`, 90, y);
  doc.setTextColor(0, 0, 0);
  y += 10;

  // ✅ REJECTED (RED)
  doc.setFont(undefined, "bold");
  doc.text("Rejected:", 20, y);
  doc.setTextColor(200, 0, 0);
  doc.setFont(undefined, "normal");
  doc.text(`${report.rejected ?? 0}`, 90, y);
  doc.setTextColor(0, 0, 0);

  doc.save("Manager_Report.pdf");
};


/**
 * ✅ MANAGER INDIVIDUAL PROJECT REPORT
 */
export const downloadProjectReportPDF = (project) => {
  const doc = new jsPDF();

  // ✅ HEADER
  doc.setFillColor(34, 153, 84);
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("Project Report", 20, 18);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  let y = 50;

  // ✅ PROJECT ID
  doc.setFont(undefined, "bold");
  doc.text("Project ID:", 20, y);
  doc.setFont(undefined, "normal");
  doc.text(`${project?.projectId || "N/A"}`, 80, y);
  y += 10;

  // ✅ TITLE
  doc.setFont(undefined, "bold");
  doc.text("Title:", 20, y);
  doc.setFont(undefined, "normal");
  doc.text(`${project?.title || "N/A"}`, 80, y);
  y += 10;

  // ✅ RESEARCHER
  doc.setFont(undefined, "bold");
  doc.text("Researcher:", 20, y);
  doc.setFont(undefined, "normal");
  doc.text(`${project?.researcherName || "N/A"}`, 80, y);
  y += 10;

  // ✅ STATUS
  doc.setFont(undefined, "bold");
  doc.text("Status:", 20, y);

  if (project?.status === "APPROVED") {
    doc.setTextColor(0, 128, 0);
  } else if (project?.status === "REJECTED") {
    doc.setTextColor(200, 0, 0);
  } else {
    doc.setTextColor(255, 165, 0);
  }

  doc.setFont(undefined, "normal");
  doc.text(`${project?.status || "N/A"}`, 80, y);

  doc.setTextColor(0, 0, 0);
  y += 15;

  // ✅ DESCRIPTION
  doc.setFont(undefined, "bold");
  doc.setFontSize(13);
  doc.text("Description", 20, y);
  y += 10;

  const desc = doc.splitTextToSize(project?.description || "N/A", 160);

  doc.setFont(undefined, "normal");
  doc.setFontSize(11);
  doc.text(desc, 20, y);

  y += desc.length * 6 + 10;

  // ✅ DATES
  doc.setFont(undefined, "bold");
  doc.text("Start:", 20, y);
  doc.setFont(undefined, "normal");
  doc.text(project.startDate?.split("T")[0] || "N/A", 50, y);

  doc.setFont(undefined, "bold");
  doc.text("End:", 120, y);
  doc.setFont(undefined, "normal");
  doc.text(project.endDate?.split("T")[0] || "N/A", 140, y);

  y += 15;

  // ✅ DETAILS
  doc.setFont(undefined, "bold");
  doc.setFontSize(13);
  doc.text("Details", 20, y);
  y += 10;

  doc.setFont(undefined, "normal");
  doc.setFontSize(11);

  if (project?.status === "APPROVED") {
    doc.setTextColor(0, 128, 0);
    doc.text(
      `Grant Amount: ₹${(project.amount ?? 0).toLocaleString("en-IN")}`,
      20,
      y
    );
  } else if (project?.status === "REJECTED") {
    doc.setTextColor(200, 0, 0);
    doc.text(`Reason: ${project.reason || "Not provided"}`, 20, y);
  } else {
    doc.setTextColor(255, 165, 0);
    doc.text("Status Pending - No details available", 20, y);
  }

  doc.save("Project_Report.pdf");
};