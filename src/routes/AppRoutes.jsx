import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Citizen Pages
import CitizenDashboard from "../pages/dashboard/CitizenDashboard";
import CitizenProfile from "../pages/citizen/CitizenProfile";
import CitizenHealthRecords from "../pages/citizen/CitizenHealthRecords";
import CitizenSetup from "../pages/citizen/CitizenSetup";
import DocVerification from "../pages/provider/DocVerification";

// Admin Pages
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import Users from "../pages/admin/Users";
import AddUser from "../pages/admin/AddUser";
import Analytics from "../pages/admin/Analytics";

// Researcher Pages
import ResearcherDashboard from "../pages/researcher/ResearcherDashboard";
import ResearcherProjects from "../pages/researcher/ResearcherProjects";

// Manager Pages
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ManagerApplications from "../pages/manager/Project/ManagerApplications";
import HealthPrograms from "../pages/manager/HealthProgram/HealthPrograms";
import ManagerProjectReport from "../pages/manager/Project/ManagerProjectReport";
import Enrollments from "../pages/manager/Enrollments/Enrollments";

// Layouts
import CitizenLayout from "../layouts/CitizenLayout";
import AdminLayout from "../layouts/AdminLayout";
import ComplianceLayout from "../layouts/ComplianceLayout";
import AuditLayout from "../layouts/AuditLayout";

// Provider Pages
import ProviderLayout from "../layouts/ProviderLayout";
import ProviderDashboard from "../pages/dashboard/ProviderDashboard";
import ProgramsPage from "../pages/provider/ProgramsPage";
import ProgramDetailsPage from "../pages/provider/ProgramDetailsPage";
import ProviderHealthRecords from "../pages/provider/ProviderHealthRecords";

// Compliance
import ComplianceDashboard from "../pages/compliance/ComplianceDasboard";
import ComplianceReports from "../pages/compliance/ComplianceReports";
import ComplianceAnalytics from "../pages/compliance/ComplianceAnalytics";

// Audit 
import AuditDashboard from "../pages/auditor/AuditDashboard";
import AuditReports from "../pages/auditor/AuditReports";
import AuditAnalytics from "../pages/auditor/AuditAnalytics";

// Components
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import About from "../components/About";
import Program from "../components/Program";
import Research from "../components/Research";
import Contact from "../components/Contact";
import Body from "../components/Body";
export const AppRoutes = () => {

const { user } = useAuth();
  return (
    <Routes>

        {/*  AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/*  COMPLIANCE */}
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

        {/*  AUDIT */}
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

        {/*  CITIZEN */}
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
        </Route>

        {/*  ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
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
        <Route path="/manager/reports/project" element={<ProtectedRoute requiredRole="MANAGER"><ManagerProjectReport /></ProtectedRoute>} />
        <Route path="/manager/enrollments" element={<ProtectedRoute requiredRole="MANAGER"><Enrollments /></ProtectedRoute>} />

        {/* PROVIDER ROUTES */}
        <Route path="/provider"
          element={
            <ProtectedRoute requiredRole="PROVIDER">
              <ProviderLayout />
            </ProtectedRoute>
          }
        >
          {/*  Dashboard */}
          <Route path="dashboard" element={<ProviderDashboard />} />
          {/*  Programs List */}
          <Route path="programs" element={<ProgramsPage />} />
          {/*  Program Details (Infra + Resource inside tabs) */}
          <Route path="programs/:id" element={<ProgramDetailsPage />} />
          {/*  Health Records */}
          {/* <Route path="HealthRecords" element={<ProviderHealthRecords />} /> */}
          <Route path="health-records" element={<ProviderHealthRecords />} />
          {/* <Route path="doc-verification" element={<DocVerification />} /> */}
        </Route>

        {/*  ROLE REDIRECT */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {user?.role === "ADMIN" ? (
                <Navigate to="/admin/dashboard" replace />
              ) : user?.role === "COMPLIANCE" ? (
                <Navigate to="/compliance-dashboard" replace />
              ) : user?.role === "AUDITOR" ? (
                <Navigate to="/audit-dashboard" replace />
              ) : user?.role === "RESEARCHER" ? (
                <Navigate to="/researcher/dashboard" replace />
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

        {/*  PUBLIC ROUTES */}
        <Route
          path="/"
          element={<div className="pt-16"><Navbar /><Body /><Footer /></div>}
        />
        <Route
          path="/about"
          element={<div className="pt-16"><Navbar /><About /><Footer /></div>}
        />
        <Route
          path="/programs"
          element={<div className="pt-16"><Navbar /><Program /><Footer /></div>}
        />
        <Route
          path="/research"
          element={<div className="pt-16"><Navbar /><Research /><Footer /></div>}
        />
        <Route
          path="/contact"
          element={<div className="pt-16"><Navbar /><Contact /><Footer /></div>}
        />

        {/*  FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
  )
}
