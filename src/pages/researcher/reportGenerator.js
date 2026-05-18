import jsPDF from "jspdf";

export const downloadOverallReportPDF = (report) => {
  const doc = new jsPDF();

  // HEADER
  doc.setFillColor(34, 153, 84);
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("Researcher Report", 20, 18);

  // RESET
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);

  let y = 50;

  // USER INFO BOX
  doc.rect(20, y - 10, 170, 28);

  // ID
  doc.setFont(undefined, "bold");
  doc.setTextColor(0, 0, 0);                
  doc.text("Researcher ID:", 25, y);

  doc.setFont(undefined, "normal");
  doc.text(`${report.researcherId || "N/A"}`, 80, y);
  y += 10;

  // EMAIL
  doc.setFont(undefined, "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Email:", 25, y);

  doc.setFont(undefined, "normal");
  doc.text(`${report.email || "N/A"}`, 80, y);
  y += 20;

  // SECTION TITLE
  doc.setFont(undefined, "bold");
  doc.setFontSize(13);
  doc.text("Project Summary", 20, y);
  y += 10;

  doc.setFontSize(11);

  // SUMMARY BOX
  doc.rect(20, y - 5, 170, 55);

  const offset = 5;
  const gap = 9;

  // TOTAL
  doc.setFont(undefined, "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Total Projects:", 25, y + offset);

  doc.setFont(undefined, "normal");
  doc.text(`${report.totalProjects ?? 0}`, 90, y + offset);
  y += gap;

  // PENDING
  doc.setFont(undefined, "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Pending:", 25, y + offset);

  doc.setFont(undefined, "normal");
  doc.text(`${report.pending ?? 0}`, 90, y + offset);
  y += gap;

  // APPROVED
  doc.setFont(undefined, "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Approved:", 25, y + offset);

  doc.setFont(undefined, "normal");
  doc.setTextColor(0, 0, 0);            
  doc.text(`${report.approved ?? 0}`, 90, y + offset);
  y += gap;

  // REJECTED
  doc.setFont(undefined, "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Rejected:", 25, y + offset);

  doc.setFont(undefined, "normal");
  doc.setTextColor(0, 0, 0);
  doc.text(`${report.rejected ?? 0}`, 90, y + offset);
  y += gap;

  // TOTAL GRANTS
  doc.setFont(undefined, "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Total Grants:", 25, y + offset);

  doc.setFont(undefined, "normal");
  doc.setTextColor(0, 128, 0);
  doc.text(
    `Rs ${Number(report.totalGrants ?? 0).toLocaleString("en-IN")}`,
    90,
    y + offset
  );

  // RESET COLOR
  doc.setTextColor(0, 0, 0);

  doc.save("Researcher_Report.pdf");
};


 // Generate Individual Project Report PDF

export const downloadProjectReportPDF = (project) => {
  const doc = new jsPDF();

  // GREEN HEADER
  doc.setFillColor(34, 153, 84);
  doc.rect(0, 0, 210, 30, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.text("Project Report", 20, 18);

  // Reset color
  doc.setTextColor(0, 0, 0);

  // PROJECT INFO BOX
  doc.setFontSize(12);
  doc.rect(20, 40, 170, 35);

  // Bold Labels
  doc.setFont(undefined, "bold");
  doc.text("Project ID:", 25, 50);
  doc.text("Title:", 25, 60);
  doc.text("Status:", 25, 70);

  // Normal Values
  doc.setFont(undefined, "normal");
  doc.text(`${project?.projectId || "N/A"}`, 60, 50);
  doc.text(`${project?.title || "N/A"}`, 60, 60);

  // STATUS COLOR LOGIC
  if (project?.status === "APPROVED") {
    doc.setTextColor(0, 128, 0); // green
  } else if (project?.status === "REJECTED") {
    doc.setTextColor(200, 0, 0); // red
  } else {
    doc.setTextColor(255, 165, 0); // yellow/orange for pending
  }

  doc.text(`${project?.status || "N/A"}`, 60, 70);

  // Reset color
  doc.setTextColor(0, 0, 0);

  // DESCRIPTION SECTION
  const description = project?.description || "N/A";
  const splitDesc = doc.splitTextToSize(description, 160);

  doc.setFont(undefined, "bold");
  doc.setFontSize(13);
  doc.text("Description", 20, 90);

  const descHeight = Math.max(20, splitDesc.length * 5);
  doc.rect(20, 95, 170, descHeight);

  doc.setFont(undefined, "normal");
  doc.setFontSize(11);
  doc.text(splitDesc, 25, 105);

  let y = 95 + descHeight;

  // DETAILS SECTION
  doc.setFont(undefined, "bold");
  doc.setFontSize(13);
  doc.text("Details", 20, y + 15);

  doc.rect(20, y + 20, 170, 25);

  doc.setFont(undefined, "normal");
  doc.setFontSize(11);

  // CONDITIONAL COLORS
  if (project?.status === "APPROVED") {
    doc.setTextColor(0, 128, 0); // green
    doc.text(
      `Grant Amount: Rs ${Number(project.amount ?? 0).toLocaleString("en-IN")}`,
      25,
      y + 35
    );
  } 
  else if (project?.status === "REJECTED") {
    doc.setTextColor(200, 0, 0); // red
    doc.text(
      `Reason: ${project.reason || "Not provided"}`,
      25,
      y + 35
    );
  } 
  else {
    doc.setTextColor(255, 165, 0); // yellow
    doc.text("Status Pending - No details available", 25, y + 35);
  }

  doc.save("Project_Report.pdf");
};