import "./App.css";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import About from "./components/layout/About";
import Program from "./components/layout/Program";
import Research from "./components/layout/Research";
import Contact from "./components/layout/Contact";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Body from "./components/ui/Body";
import Dashboard from "./pages/researcher/Dashboard";
import ManagerDashboard from "./pages/manager/Dashboard";

function App() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Main Content (grows to push footer down) */}
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Program />} />
          <Route path="/research" element={<Research />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/researcher" element={<Dashboard />} />
          <Route path="/manager" element={<ManagerDashboard />} />
        </Routes>
      </main>

      {/* ✅ Footer always at bottom */}
      <Footer />

    </div>
  );
}

export default App;