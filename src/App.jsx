import { Toaster } from "react-hot-toast";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Auth Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Citizen Pages
import CitizenDashboard from "./pages/dashboard/CitizenDashboard";
import CitizenProfile from "./pages/citizen/CitizenProfile";
import CitizenHealthRecords from "./pages/citizen/CitizenHealthRecords";
import CitizenNotifications from "./pages/citizen/CitizenNotifications";

// Admin Pages
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Users from "./pages/admin/Users";
import AddUser from "./pages/admin/AddUser";
import Analytics from "./pages/admin/Analytics";

// Researcher Pages
import ResearcherDashboard from "./pages/researcher/ResearcherDashboard";
import ResearcherProjects from "./pages/researcher/ResearcherProjects";

// Manager Pages
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerApplications from "./pages/manager/Project/ManagerApplications";
import HealthPrograms from "./pages/manager/HealthProgram/HealthPrograms";
import ManagerProjectReport from "./pages/manager/Project/ManagerProjectReport";
// ✅ Program Manager Page
// import ProgramManagerDashboard from "./pages/programsdash/ProgramManagerDashboard";


// ✅ HealthCare Provider Pages
import ProviderDashboard from "./pages/dashboard/ProviderDashboard";
import ProviderLayout from "./layouts/ProviderLayout";
import ProgramsPage from "./pages/provider/ProgramsPage";
import ProgramDetailsPage from "./pages/provider/ProgramDetailsPage";


// Layouts
import CitizenLayout from "./layouts/CitizenLayout";
import AdminLayout from "./layouts/AdminLayout";


// Components
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import About from "./components/layout/About";
import Program from "./components/layout/Program";
import Research from "./components/layout/Research";
import Contact from "./components/layout/Contact";
import Body from "./components/ui/Body";
import ComplianceLayout from "./layouts/ComplianceLayout";
import ComplianceList from "./pages/compliance/ComplianceList";
import Dashboard from "./pages/compliance/Dasboard";
import ErrorBoundary from './components/feedbacks/ErrorBoundary';

function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* COMPLIANCE ROUTES */}
        <Route path="/compliance" element={<ComplianceLayout />} />
        <Route path="/compliance/list" element={<ComplianceList />} />
        <Route path="/compliance/dashboard" element={<Dashboard />} />

        {/* CITIZEN ROUTES */}
        <Route path="/citizen" element={
          <ProtectedRoute requiredRole="CITIZEN">
            <CitizenLayout />
          </ProtectedRoute>
        }>
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
              {/* <ProgramManagerDashboard /> */}
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