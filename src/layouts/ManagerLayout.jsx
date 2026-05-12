import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

export default function ManagerLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-grow pt-16 container">
        {children}
      </main>

      <Footer />

    </div>
  );
}