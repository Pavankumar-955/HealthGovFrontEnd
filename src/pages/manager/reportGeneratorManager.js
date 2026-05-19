import jsPDF from "jspdf";

export const downloadOverallReportPDF = (report) => {
  const doc = new jsPDF(); // Creates new PDF

  // GREEN HEADER
  doc.setFillColor(34, 153, 84);
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("Manager Report", 20, 18);

  // RESET COLOR
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  let y = 50;
  // USER INFO BOX
  doc.rect(20, y - 10, 170, 25);

  // ID
  doc.setFont(undefined, "bold");
  doc.text("Manager ID:", 25, y);
  doc.setFont(undefined, "normal");
  doc.text(`${report.managerId || "N/A"}`, 80, y);
  y += 10;

  // EMAIL
  doc.setFont(undefined, "bold");
  doc.text("Email:", 25, y);
  doc.setFont(undefined, "normal");
  doc.text(`${report.email || "N/A"}`, 80, y);
  y += 20;

  // SECTION TITLE
  doc.setFont(undefined, "bold");
  doc.setFontSize(13);
  doc.text("Application Summary", 20, y);
  y += 10;

  doc.setFontSize(11);

  // TOTAL
  doc.rect(20, y - 5, 170, 48);

  // consistent offset
  const offset = 5;
  const gap = 9;

  // TOTAL
  doc.setFont(undefined, "bold");
  doc.text("Total Applications:", 25, y + offset);
  doc.setFont(undefined, "normal");
  doc.text(`${report.total ?? 0}`, 90, y + offset);
  y += gap;

  // PENDING
  doc.setFont(undefined, "bold");
  doc.text("Pending:", 25, y + offset);
  doc.setFont(undefined, "normal");
  doc.text(`${report.pending ?? 0}`, 90, y + offset);
  y += gap;

  // APPROVED
  doc.setFont(undefined, "bold");
  doc.text("Approved:", 25, y + offset);
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, "normal");
  doc.text(`${report.approved ?? 0}`, 90, y + offset);
  doc.setTextColor(0, 0, 0);
  y += gap;

  // REJECTED
  doc.setFont(undefined, "bold");
  doc.text("Rejected:", 25, y + offset);
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, "normal");
  doc.text(`${report.rejected ?? 0}`, 90, y + offset);
  doc.setTextColor(0, 0, 0);

y += gap;

doc.setFont(undefined, "bold");
doc.text("Total Grants:", 25, y + offset);

doc.setFont(undefined, "normal");
doc.text(
  `Rs ${Number(report.totalGrants ?? 0).toLocaleString("en-IN")}`,
  90,
  y + offset
);


  doc.save("Manager_Report.pdf");
};

// MANAGER INDIVIDUAL PROJECT REPORT

export const downloadProjectReportPDF = (project) => {
  const doc = new jsPDF();

  // HEADER
  doc.setFillColor(34, 153, 84);
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("Project Report", 20, 18);

  // RESET
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  let y = 40;

  // PROJECT INFO BOX
  doc.rect(20, y, 170, 50);

  let lineY = y + 10;

  // PROJECT ID
  doc.setFont(undefined, "bold");
  doc.text("Project ID:", 25, lineY);
  doc.setFont(undefined, "normal");
  doc.text(`${project?.projectId || "N/A"}`, 80, lineY);
  lineY += 10;

  // TITLE
  doc.setFont(undefined, "bold");
  doc.text("Title:", 25, lineY);
  doc.setFont(undefined, "normal");
  doc.text(`${project?.title || "N/A"}`, 80, lineY);
  lineY += 10;

  // RESEARCHER
  doc.setFont(undefined, "bold");
  doc.text("Researcher:", 25, lineY);
  doc.setFont(undefined, "normal");
  doc.text(`${project?.researcherName || "N/A"}`, 80, lineY);
  lineY += 10;

  // STATUS
  doc.setFont(undefined, "bold");
  doc.text("Status:", 25, lineY);

  if (project?.status === "APPROVED") {
    doc.setTextColor(0, 128, 0);
  } else if (project?.status === "REJECTED") {
    doc.setTextColor(200, 0, 0);
  } else {
    doc.setTextColor(255, 165, 0);
  }

  doc.setFont(undefined, "normal");
  doc.text(`${project?.status || "N/A"}`, 80, lineY);

  doc.setTextColor(0, 0, 0);

  // DESCRIPTION SECTION
  y = y + 60;

  doc.setFont(undefined, "bold");
  doc.setFontSize(13);
  doc.text("Description", 20, y);

  const desc = doc.splitTextToSize(project?.description || "N/A", 160);

  const descHeight = Math.max(20, desc.length * 6);

  doc.rect(20, y + 5, 170, descHeight);

  doc.setFont(undefined, "normal");
  doc.setFontSize(11);
  doc.text(desc, 25, y + 12);

  // NEXT SECTION POSITION
  y = y + descHeight + 20;

  // DATES BOX
  doc.rect(20, y, 170, 15);

  doc.setFont(undefined, "bold");
  doc.text("Start:", 25, y + 10);
  doc.setFont(undefined, "normal");
  doc.text(project.startDate?.split("T")[0] || "N/A", 50, y + 10);

  doc.setFont(undefined, "bold");
  doc.text("End:", 120, y + 10);
  doc.setFont(undefined, "normal");
  doc.text(project.endDate?.split("T")[0] || "N/A", 140, y + 10);

  // DETAILS SECTION
  y += 25;

  doc.setFont(undefined, "bold");
  doc.setFontSize(13);
  doc.text("Details", 20, y);

  doc.rect(20, y + 5, 170, 20);

  doc.setFont(undefined, "normal");
  doc.setFontSize(11);

  if (project?.status === "APPROVED") {
    doc.setTextColor(0, 128, 0);
    doc.text(
      `Grant Amount: Rs ${Number(project.amount ?? 0).toLocaleString("en-IN")}`,
      25,
      y + 15
    );
  }
  else if (project?.status === "REJECTED") {
    doc.setTextColor(200, 0, 0);
    doc.text(
      `Reason: ${project.reason || "Not provided"}`,
      25,
      y + 15
    );
  }
  else {
    doc.setTextColor(255, 165, 0);
    doc.text("Status Pending - No details available", 25, y + 15);
  }

  doc.save("Project_Report.pdf");
};