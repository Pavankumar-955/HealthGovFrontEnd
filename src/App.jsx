import "./App.css"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

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

function App() {
  const { isAuthenticated, user } = useAuth()

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/compliance"
          element={
            <ProtectedRoute requiredRole="COMPLIANCE">
              <ComplianceLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        <Route
          path="/compliance-dashboard"
          element={
            <ProtectedRoute requiredRole="COMPLIANCE">
              <ComplianceLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ComplianceDashboard />} />
        </Route>

        <Route
          path="/compliance-reports"
          element={
            <ProtectedRoute requiredRole="COMPLIANCE">
              <ComplianceLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ComplianceReports />} />
        </Route>

        <Route
          path="/compliance-analytics"
          element={
            <ProtectedRoute requiredRole="COMPLIANCE">
              <ComplianceLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ComplianceAnalytics />} />
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

        {/* Admin Routes */}
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

        {/* Legacy Dashboard Route - Redirect based on role */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {user?.role === 'ADMIN' ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/citizen/dashboard" replace />
              )}
            </ProtectedRoute>
          }
        />

        {/* Home / Public Pages with Navbar */}
        <Route
          path="/"
          element={
            <>
              <div className="pt-16">
                <Navbar />
                <Body />
                <Footer />
              </div>
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <div className="pt-16">
                <Navbar />
                <About />
                <Footer />
              </div>
            </>
          }
        />

        <Route
          path="/programs"
          element={
            <>
              <div className="pt-16">
                <Navbar />
                <Program />
                <Footer />
              </div>
            </>
          }
        />

        <Route
          path="/research"
          element={
            <>
              <div className="pt-16">
                <Navbar />
                <Research />
                <Footer />
              </div>
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <div className="pt-16">
                <Navbar />
                <Contact />
                <Footer />
              </div>
            </>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App