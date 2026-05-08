import  "./App.css"
import Navbar from "./components/ui/Navbar"
import Footer from "./components/ui/Footer"
import About from "./components/layout/About"
import Program from "./components/layout/Program"
import Research from "./components/layout/Research"
import Contact from "./components/layout/Contact"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Body from "./components/ui/Body"
import ComplianceLayout from "./layouts/ComplianceLayout"
import ComplianceList from "./pages/compliance/ComplianceList"
import Dashboard from "./pages/compliance/Dasboard"
import AdminLayout from "./layouts/AdminLayout"
import AuditLayout from "./layouts/AuditLayout"


import ErrorBoundary from './components/feedbacks/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <div className="pt-16">
      <Navbar />
      
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Program />} />
          <Route path="/research" element={<Research />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/compliance" element={<ComplianceLayout />} />
          <Route path="/compliance/list" element={<ComplianceList />} />
          <Route path="/compliance/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminLayout />} />
          <Route path="/audit" element={<AuditLayout />} />
          <Route path="/signup" element={<Register />} />
        </Routes>

      <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App