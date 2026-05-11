import "./App.css"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

// Auth
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ForgotPassword from "./pages/auth/ForgotPassword"
import ResetPassword from "./pages/auth/ResetPassword"

// Citizen
import CitizenDashboard from "./pages/dashboard/CitizenDashboard"
import CitizenProfile from "./pages/citizen/CitizenProfile"
import CitizenHealthRecords from "./pages/citizen/CitizenHealthRecords"
import CitizenNotifications from "./pages/citizen/CitizenNotifications"

// Admin
import AdminDashboard from "./pages/dashboard/AdminDashboard"
import Users from "./pages/admin/Users"
import AddUser from "./pages/admin/AddUser"
import Analytics from "./pages/admin/Analytics"

// Researcher
import ResearcherDashboard from "./pages/researcher/ResearcherDashboard"
import ResearcherProjects from "./pages/researcher/ResearcherProjects"

// Manager
import ManagerDashboard from "./pages/manager/ManagerDashboard"
import ManagerApplications from "./pages/manager/ManagerApplications" // ✅ ADD THIS

// Layouts
import CitizenLayout from "./layouts/CitizenLayout"
import AdminLayout from "./layouts/AdminLayout"

// Components
import ProtectedRoute from "./components/ProtectedRoute"

// Public
import Navbar from "./components/ui/Navbar"
import Footer from "./components/ui/Footer"
import About from "./components/layout/About"
import Program from "./components/layout/Program"
import Research from "./components/layout/Research"
import Contact from "./components/layout/Contact"
import Body from "./components/ui/Body"
import ComplianceLayout from "./layouts/ComplianceLayout"
import ComplianceList from "./pages/compliance/ComplianceList"
import Dashboard from "./pages/compliance/Dasboard"




import ErrorBoundary from './components/feedbacks/ErrorBoundary'

function App() {
  const { user } = useAuth()

  return (
    <>
      <Routes>

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
         <Route path="/compliance" element={<ComplianceLayout />} />
          <Route path="/compliance/list" element={<ComplianceList />} />
          <Route path="/compliance/dashboard" element={<Dashboard />} />

        {/* CITIZEN */}
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

        {/* ADMIN */}
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

        {/* RESEARCHER */}
        <Route path="/researcher/dashboard"
          element={<ProtectedRoute requiredRole="RESEARCHER">
            <ResearcherDashboard />
          </ProtectedRoute>}
        />

        <Route path="/researcher/projects"
          element={<ProtectedRoute requiredRole="RESEARCHER">
            <ResearcherProjects />
          </ProtectedRoute>}
        />

        {/* MANAGER */}
        <Route path="/manager/dashboard"
          element={<ProtectedRoute requiredRole="MANAGER">
            <ManagerDashboard />
          </ProtectedRoute>}
        />

        <Route path="/manager/applications"
          element={<ProtectedRoute requiredRole="MANAGER">
            <ManagerApplications />
          </ProtectedRoute>}
        />

        {/* REDIRECT */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            {user?.role === "ADMIN" ? (
              <Navigate to="/admin/dashboard" replace />
            ) : user?.role === "RESEARCHER" ? (
              <Navigate to="/researcher/dashboard" replace />
            ) : user?.role === "MANAGER" ? (
              <Navigate to="/manager/dashboard" replace />
            ) : (
              <Navigate to="/citizen/dashboard" replace />
            )}
          </ProtectedRoute>
        }/>

        {/* PUBLIC */}
        <Route path="/" element={<div className="pt-16"><Navbar /><Body /><Footer /></div>} />
        <Route path="/about" element={<div className="pt-16"><Navbar /><About /><Footer /></div>} />
        <Route path="/programs" element={<div className="pt-16"><Navbar /><Program /><Footer /></div>} />
        <Route path="/research" element={<div className="pt-16"><Navbar /><Research /><Footer /></div>} />
        <Route path="/contact" element={<div className="pt-16"><Navbar /><Contact /><Footer /></div>} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </>
  )
}

export default App;