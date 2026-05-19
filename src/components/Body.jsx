import { useState } from "react";
import { Link } from "react-router-dom";
 
const slides = [
  {
    title: "National Health Mission",
    description:
      "Strengthening primary health care and digital access for every Indian citizen.",
    image:
      "https://d3lzcn6mbbadaf.cloudfront.net/media/details/ANI-20251004101933.jpg?width=1200&height=800&mode=crop&quality=80%22",
    tag: "National Initiative",
  },
  {
    title: "Ayushman Bharat Expansion",
    description:
      "Delivering quality healthcare, hospital coverage and wellness outreach across rural and urban areas.",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80",
    tag: "Healthcare Coverage",
  },
  {
    title: "Digital Health Empowerment",
    description:
      "Building secure e-health records, teleconsultation and citizen-centered service delivery.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    tag: "Digital Transformation",
  },
];
 
export default function Body() {
  const [currentSlide, setCurrentSlide] = useState(0);
 
  const prevSlide = () =>
    setCurrentSlide((value) => (value === 0 ? slides.length - 1 : value - 1));
  const nextSlide = () =>
    setCurrentSlide((value) => (value === slides.length - 1 ? 0 : value + 1));
 
  return (
    <main className="bg-sky-50/40 min-h-screen w-full py-8 antialiased">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        {/* Balanced 3-Column Desktop Grid Layout */}
        <div className="grid gap-6 lg:grid-cols-[280px_1fr_320px] items-start">
          {/* ================= LEFT COLUMN: NAVIGATION & SERVICES ================= */}
          <aside className="lg:sticky lg:top-8 flex flex-col justify-between rounded-3xl border border-sky-100 bg-white p-5 shadow-sm">
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center rounded-md bg-sky-50 px-2.5 py-0.5 text-[10px] font-semibold text-sky-700 ring-1 ring-inset ring-sky-600/20 uppercase tracking-wider">
                  HealthGov Portal
                </span>
                <h2 className="mt-3 text-xl font-bold tracking-tight text-slate-900">
                  India's Unified Platform
                </h2>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  A citizen-first initiative providing scheme access, health
                  records, and real-time support channels.
                </p>
              </div>
 
              <div className="space-y-3">
                <div className="rounded-xl border border-sky-100/60 bg-sky-50/30 p-3.5">
                  <p className="text-xs font-semibold text-sky-950 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                    Core Services
                  </p>
 
                  <ul className="mt-2 space-y-1 text-[13px] text-slate-700 pl-6 list-disc marker:text-slate-500">
                    <li>Health ID Enrollment</li>
                    <li>Scheme Benefit Tracker</li>
                    <li>Telemedicine Portal</li>
                  </ul>
                </div>
 
                <div className="rounded-xl border border-sky-100/60 bg-sky-50/30 p-3.5">
                  <p className="text-xs font-semibold text-sky-950 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Campaigns
                  </p>
                  <ul className="mt-2 space-y-1 text-[13px] text-slate-700 pl-6 list-disc marker:text-slate-500">
                    <li>Ayushman Outreach</li>
                    <li>Mental Health Scheme</li>
                    <li>Swasthya Mitra Care</li>
                  </ul>
                </div>
              </div>
            </div>
 
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
              <button className="w-full inline-flex justify-center items-center rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700">
                Explore Programs
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button className="inline-flex justify-center rounded-xl border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-medium text-slate-700 transition hover:bg-slate-50">
                  Learn More
                </button>
                <Link
                  to="/forgot-password"
                  className="inline-flex justify-center items-center rounded-xl bg-slate-100 px-2 py-1.5 text-[11px] font-medium text-slate-700 transition hover:bg-slate-200 text-center"
                >
                  Forgot Pass?
                </Link>
              </div>
            </div>
          </aside>
 
          {/* ================= CENTER COLUMN: CAROUSEL & MAIN MESSAGES ================= */}
          <div className="space-y-6">
            {/* Expanded & Restructured Carousel Container */}
            <section className="relative group overflow-hidden rounded-3xl border border-sky-100 bg-slate-900 shadow-md">
              {/* Size Increased: Elevated min-height restrictions on large viewport profiles */}
              <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/8] lg:min-h-[500px] w-full overflow-hidden">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="h-full w-full object-cover transition-all duration-750 ease-out"
                />
                {/* Visual Gradient protection for typography legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              </div>
 
              {/* Text Layer overlays */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-12 text-white z-10">
                <span className="inline-flex items-center rounded-md bg-blue-500/40 px-3 py-1 text-xs font-medium text-blue-100 backdrop-blur-md mb-3 ring-1 ring-inset ring-blue-400/30">
                  {slides[currentSlide].tag}
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {slides[currentSlide].title}
                </h2>
                <p className="mt-3 max-w-2xl text-xs sm:text-sm lg:text-base text-slate-200/90 leading-relaxed">
                  {slides[currentSlide].description}
                </p>
              </div>
 
              {/* Arrow Controls: Enlarged, re-indexed, pointer events forced active */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-30 pointer-events-none">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-white/90 text-blue-900 hover:bg-white shadow-xl pointer-events-auto transition hover:scale-105 active:scale-95 group-hover:opacity-100 sm:opacity-0"
                  aria-label="Previous Slide"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-white/90 text-blue-900 hover:bg-white shadow-xl pointer-events-auto transition hover:scale-105 active:scale-95 group-hover:opacity-100 sm:opacity-0"
                  aria-label="Next Slide"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
 
              {/* Stepper Indicator Dots */}
              <div className="absolute bottom-6 right-8 flex gap-2 z-20">
                {slides.map((slide, index) => (
                  <button
                    key={slide.title}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? "w-8 bg-blue-400"
                        : "w-2 bg-white/40 hover:bg-white"
                    }`}
                    aria-label={`Maps to index item ${index + 1}`}
                  />
                ))}
              </div>
            </section>
 
            {/* Middle Row Text Information */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-2 mb-2">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Prime Minister's Message
                </h3>
                <p className="text-xs italic leading-5 text-slate-600">
                  "HealthGov empowers citizens through transparent access to
                  national healthcare programs, real-time health account
                  updates, and guided public health tracking systems built to
                  protect and elevate localized Indian communities."
                </p>
              </div>
 
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    Our Mission
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Healthy citizens, resilient digital support, and universally
                    reliable welfare structures.
                  </p>
                </div>
                <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    Our Vision
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Universal clinical parity, high digital healthcare
                    inclusion, and complete resource accessibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
 
          {/* ================= RIGHT COLUMN: EXCLUSIVE CONTENT & IMAGES ================= */}
          <aside className="space-y-4 lg:sticky lg:top-8">
            {/* Visual Spotlight Grid Component */}
            <div className="rounded-3xl border border-sky-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 pl-1">
                Live Impact Gallery
              </p>
 
              <div className="grid gap-3">
                {/* Photo 1 */}
                <div className="group relative overflow-hidden rounded-2xl h-28 bg-slate-100 border border-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=500&q=80"
                    alt="Clinical Infrastructure"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-3">
                    <p className="text-[11px] font-semibold text-white tracking-wide">
                      Community Healthcare Centers
                    </p>
                  </div>
                </div>
 
                {/* Photo 2 */}
                <div className="group relative overflow-hidden rounded-2xl h-28 bg-slate-100 border border-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=500&q=80"
                    alt="Medical Lab Access"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-3">
                    <p className="text-[11px] font-semibold text-white tracking-wide">
                      Advanced Digital Lab Infrastructure
                    </p>
                  </div>
                </div>
              </div>
            </div>
 
            {/* Quick Metrics & Real-time Feeds */}
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/30 p-4 shadow-sm">
              <span className="inline-flex items-center rounded-full bg-emerald-100 text-[9px] font-bold text-emerald-800 uppercase tracking-wider mb-2">
                Live Portal Stats
              </span>
              <div className="space-y-2 mt-1">
                <div>
                  <p className="text-[10px] text-emerald-700/80 uppercase font-semibold">
                    Digital Health IDs Generated
                  </p>
                  <p className="text-xl font-bold text-slate-900 tracking-tight">
                    524,891,040+
                  </p>
                </div>
                <div className="pt-2 border-t border-emerald-100">
                  <p className="text-[10px] text-emerald-700/80 uppercase font-semibold">
                    Verified Teleconsultations
                  </p>
                  <p className="text-sm font-semibold text-slate-800">
                    28.4 Million Cases
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}