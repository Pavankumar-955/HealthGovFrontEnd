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

function App() {


  return (
    <>
    <div className="pt-16">
      <Navbar />
      
 <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/about" element={<About />} />
          <Route path="/programs" element={<Program />} />
          <Route path="/research" element={<Research />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>

      <Footer />
    </div>
    </>
  )
}

export default App