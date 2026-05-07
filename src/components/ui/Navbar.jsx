import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const mainNavigation = [
  { name: "About", to: "/about" },
  { name: "Programs", to: "/programs" },
  { name: "Research", to: "/research" },
  { name: "Contact", to: "/contact" },
];

const authNavigation = [
  { name: "Login", to: "/login" },
  { name: "Register", to: "/signup" },
];

export default function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="fixed top-0 left-0 z-40 w-full bg-[#009933] shadow-md"
    >
      <div className="mx-auto max-w-7xl px-4">
        
        {/* ✅ FLEX FIX */}
        <div className="flex h-16 items-center justify-between">

          {/* LEFT → LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/images/web_Icon.png"
              alt="logo"
              className="h-9"
            />
            <span className="text-lg font-bold text-white">
              HealthGov
            </span>
          </Link>

          {/* CENTER → NAV LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {mainNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-lg font-medium text-white hover:text-gray-200 transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* RIGHT → AUTH */}
          <div className="hidden md:flex items-center gap-4">
            {authNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                  item.name === "Register"
                    ? "bg-white text-green-700"
                    : "text-white hover:bg-white/10"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* MOBILE MENU */}
          <div className="md:hidden">
            <DisclosureButton className="text-white">
              <Bars3Icon className="h-6 w-6" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      {/* ✅ MOBILE PANEL */}
      <DisclosurePanel className="md:hidden bg-[#009933]">
        <div className="px-4 py-3 space-y-3">
          {[...mainNavigation, ...authNavigation].map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="block text-white text-base font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}