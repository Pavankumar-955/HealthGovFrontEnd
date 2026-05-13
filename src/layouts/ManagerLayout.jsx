import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

export default function ManagerLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#eef3f8]">
      
      {/* NAVBAR AT TOP */}
      <Navbar />

      {/* MAIN CONTENT - Accounts for navbar height */}
      <main className="flex-grow mt-16">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}