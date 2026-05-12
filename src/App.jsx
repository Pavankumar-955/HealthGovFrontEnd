import { Toaster } from "react-hot-toast";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Pages
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"
import CitizenDashboard from "./pages/dashboard/CitizenDashboard"
import CitizenProfile from "./pages/citizen/CitizenProfile"
import CitizenHealthRecords from "./pages/citizen/CitizenHealthRecords"
import CitizenNotifications from "./pages/citizen/CitizenNotifications"
import AdminDashboard from "./pages/dashboard/AdminDashboard"
import Users from "./pages/admin/Users"
import AddUser from "./pages/admin/AddUser"
import Analytics from "./pages/admin/Analytics"
import ComplianceLayout from "./layouts/ComplianceLayout"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import ComplianceRecords from "./pages/compliance/ComplianceRecords"
import ComplianceReports from "./pages/compliance/ComplianceReports"

// Layouts
import CitizenLayout from "./layouts/CitizenLayout"
import AdminLayout from "./layouts/AdminLayout"

// Components
import ProtectedRoute from "./components/ProtectedRoute"
import Navbar from "./components/ui/Navbar"
import Footer from "./components/ui/Footer"
import About from "./components/layout/About"
import Program from "./components/layout/Program"
import Research from "./components/layout/Research"
import Contact from "./components/layout/Contact"
import Body from "./components/ui/Body"
import ComplianceAnalytics from "./pages/compliance/ComplianceAnalytics"
import ComplianceDashboard from "./pages/compliance/ComplianceDasboard"
import AuditDashboard from "./pages/auditor/AuditDashboard"
import AuditAnalytics from "./pages/auditor/AuditAnalytics"
import AuditReports from "./pages/auditor/AuditReports"
import AuditLayout from "./layouts/AuditLayout"

function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

         
         /* ✅ COMPLIANCE GROUP */
        <Route
          element={
            <ProtectedRoute requiredRole="COMPLIANCE">
              <ComplianceLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/compliance-dashboard" element={<ComplianceDashboard />} />
          <Route path="/compliance-reports" element={<ComplianceReports />} />
          <Route path="/compliance-analytics" element={<ComplianceAnalytics />} />
        </Route>


        /* ✅ AUDIT GROUP */
        <Route
          element={
            <ProtectedRoute requiredRole="AUDITOR">
              <AuditLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/audit-dashboard" element={<AuditDashboard />} />
          <Route path="/audit-reports" element={<AuditReports />} />
          <Route path="/audit-analytics" element={<AuditAnalytics />} />
        </Route>


        {/* Citizen Routes */}
        <Route
          path="/citizen"
          element={
            <ProtectedRoute requiredRole="CITIZEN">
              <CitizenLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<CitizenDashboard />} />
          <Route path="profile" element={<CitizenProfile />} />
          <Route path="health-records" element={<CitizenHealthRecords />} />
          <Route path="notifications" element={<CitizenNotifications />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* RESEARCHER ROUTES */}
        <Route path="/researcher/dashboard" element={<ProtectedRoute requiredRole="RESEARCHER"><ResearcherDashboard /></ProtectedRoute>} />
        <Route path="/researcher/projects" element={<ProtectedRoute requiredRole="RESEARCHER"><ResearcherProjects /></ProtectedRoute>} />

        {/* MANAGER ROUTES */}
        <Route path="/manager/dashboard" element={<ProtectedRoute requiredRole="MANAGER"><ManagerDashboard /></ProtectedRoute>} />
        <Route path="/manager/applications" element={<ProtectedRoute requiredRole="MANAGER"><ManagerApplications /></ProtectedRoute>} />
        <Route path="/manager/health-programs" element={<ProtectedRoute requiredRole="MANAGER"><HealthPrograms /></ProtectedRoute>} />
        <Route path="/manager/reports/project" element={<ManagerProjectReport />} />

        {/* ================= PROGRAM MANAGER ROUTES ================= */}
        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute requiredRole="MANAGER">
              <ProgramManagerDashboard />
            </ProtectedRoute>
          }
        />


        {/* HealthCare Provider */}

        <Route
          path="/provider"
          element={
            <ProtectedRoute requiredRole="PROVIDER">
              <ProviderLayout />
            </ProtectedRoute>
          }
        >
          {/* ✅ Dashboard */}
          <Route path="dashboard" element={<ProviderDashboard />} />

          {/* ✅ Programs List */}
          <Route path="programs" element={<ProgramsPage />} />

          {/* ✅ Program Details (Infra + Resource inside tabs) */}
          <Route path="programs/:id" element={<ProgramDetailsPage />} />
        </Route>

        {/* ROLE-BASED REDIRECTION */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {user?.role === "ADMIN" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : user?.role === "MANAGER" ? (
                <Navigate to="/manager/dashboard" replace />
              ) : user?.role === "PROVIDER" ? (
                <Navigate to="/provider/dashboard" replace />
              ) : (
                <Navigate to="/citizen/dashboard" replace />
              )}
            </ProtectedRoute>
          }
        />

        {/* PUBLIC ROUTES */}
        <Route path="/about" element={<div className="pt-16"><Navbar /><About /><Footer /></div>} />
        <Route path="/programs" element={<div className="pt-16"><Navbar /><Program /><Footer /></div>} />
        <Route path="/research" element={<div className="pt-16"><Navbar /><Research /><Footer /></div>} />
        <Route path="/contact" element={<div className="pt-16"><Navbar /><Contact /><Footer /></div>} />
        <Route path="/" element={<div className="pt-16"><Navbar /><Body /><Footer /></div>} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;