import React, { useEffect, useState } from "react";
import { downloadOverallReportPDF } from "./reportGeneratorManager";
import { getManagerProjects } from "../../api/managerApi";

const ManagerProjectReport = () => {

  const [projects, setProjects] = useState([]); // State to hold project data

  useEffect(() => {
    fetchProjects();
  }, []);

  // fetch projects from API
  const fetchProjects = async () => {
    const res = await getManagerProjects("");
    setProjects(res.data);
  };

  const totalGrants = projects
    .filter(p => p.status === "APPROVED")
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  // Get user from token
  const handleDownload = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(atob(token.split(".")[1]));

    const report = {
      managerId: user.userId,
      email: user.sub,
      total: projects.length,
      pending: projects.filter(p => p.status === "PENDING").length,
      approved: projects.filter(p => p.status === "APPROVED").length,
      rejected: projects.filter(p => p.status === "REJECTED").length,
      totalGrants
    };

    downloadOverallReportPDF(report);
  };

  return (
    <div className="p-6 ml-64">

      <h2 className="text-2xl font-semibold mb-4">
        📊 Project Application Report
      </h2>

      <div className="bg-white p-4 rounded shadow w-96">

        <p><strong>Total Applications:</strong> {projects.length}</p>
        <p><strong>Pending:</strong> {projects.filter(p => p.status === "PENDING").length}</p>
        <p><strong>Approved:</strong> {projects.filter(p => p.status === "APPROVED").length}</p>
        <p><strong>Rejected:</strong> {projects.filter(p => p.status === "REJECTED").length}</p>
        <p><strong>Total Grants:</strong> Rs {totalGrants.toLocaleString("en-IN")}</p>

        <button
          onClick={handleDownload}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Download PDF 📄
        </button>

      </div>

    </div>
  );
};

export default ManagerProjectReport;