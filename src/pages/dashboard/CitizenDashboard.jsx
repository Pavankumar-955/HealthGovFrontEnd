import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPrograms } from "../../api/ProgramApi.js";
import { getEnrollments } from "../../api/enrollmentApi.js";
import { programEnrollment } from "../../api/citizenApi.js";
import { toast } from "react-hot-toast";
import { MdCheckCircle } from "react-icons/md";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext.jsx";
 
/* ✅ SLIDES */
const slides = [
  {
    title: "Welcome 👋",
    desc: "Explore healthcare programs.",
    img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Quick Enrollment ⚡",
    desc: "Join with one click.",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=60",
  },
  {
    title: "Track Activity 📊",
    desc: "Manage enrollments easily.",
    img: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?auto=format&fit=crop&w=800&q=60",
  },
];
 
const CitizenDashboard = () => {
  const [programs, setPrograms] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slideIndex, setSlideIndex] = useState(0);
 
  const location = useLocation();
  const { user } = useAuth();
 
  /* ✅ AUTO SLIDE */
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);
 
  const getCitizenIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
 
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded.userId || decoded.id || decoded.citizenId || decoded.sub;
    } catch {
      return null;
    }
  };
 
  const citizenId = getCitizenIdFromToken();
 
  const getProgramId = (program) =>
    program?.id || program?.programId || program?._id;
 
  const loadData = async () => {
    try {
      setLoading(true);
 
      const progRes = await getPrograms();
      const allPrograms = Array.isArray(progRes.data)
        ? progRes.data
        : progRes.data?.data || [];
      setPrograms(allPrograms);
 
      const enrollRes = await getEnrollments();
      const allEnrollments = Array.isArray(enrollRes.data)
        ? enrollRes.data
        : enrollRes.data?.data || [];
 
      const filtered = citizenId
        ? allEnrollments.filter(
            (e) => Number(e.citizenId) === Number(citizenId)
          )
        : [];
 
      setEnrollments(filtered);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };
 
  const isEnrolled = (programId) =>
    enrollments.some((e) => Number(e.programId) === Number(programId));
 
  const enrolledPrograms = programs.filter((program) =>
    isEnrolled(getProgramId(program))
  );
  const ongoingPrograms = programs.filter((program) =>
    !isEnrolled(getProgramId(program))
  );
 
  const handleEnroll = async (programId) => {
    if (!citizenId) return toast.error("Please login");
    if (isEnrolled(programId)) return toast("Already enrolled");
 
    try {
      await programEnrollment({
        citizenId: Number(citizenId),
        programId: Number(programId),
        date: new Date().toISOString(),
        status: "ACTIVE",
      });
 
      toast.success("Enrolled successfully!");
      await loadData();
    } catch {
      toast.error("Enrollment failed");
    }
  };
 
  useEffect(() => {
    loadData();
  }, [location.search, citizenId]);
 
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        Loading...
      </div>
    );
 
  return (
    <div className="grid grid-cols-12 gap-6 p-6 bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-3xl">
 
      {/* ✅ LEFT CAROUSEL */}
      <div className="col-span-3">
        <div className="relative h-[320px] rounded-2xl overflow-hidden shadow-lg">
 
          {/* ✅ IMAGE */}
          <img
            src={
              slides[slideIndex].img ||
              "https://via.placeholder.com/400x300"
            }
            className="w-full h-full object-cover"
            alt="carousel"
          />
 
          {/* ✅ OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
 
          {/* ✅ TEXT */}
          <div className="absolute bottom-0 p-5 text-white">
            <h2 className="text-xl font-bold">
              {slides[slideIndex].title}
            </h2>
            <p className="text-sm">
              {slides[slideIndex].desc}
            </p>
          </div>
 
          {/* ✅ CONTROLS */}
          <div className="absolute top-3 right-3 flex gap-2">
            <button
              onClick={() =>
                setSlideIndex(
                  (slideIndex - 1 + slides.length) % slides.length
                )
              }
              className="p-2 bg-white/80 rounded-full"
            >
              <FiArrowLeft />
            </button>
 
            <button
              onClick={() =>
                setSlideIndex((slideIndex + 1) % slides.length)
              }
              className="p-2 bg-white/80 rounded-full"
            >
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
 
      {/* ✅ RIGHT CONTENT */}
      <div className="col-span-9">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name || "Citizen"} 👋
        </h1>
 
        <div className="space-y-10 mt-6">
          {/* ONGOING PROGRAMS */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">Ongoing Programs</h2>
                <p className="text-sm text-slate-500">
                  {ongoingPrograms.length} program{ongoingPrograms.length !== 1 ? 's' : ''} available to enroll
                </p>
              </div>
            </div>
            {ongoingPrograms.length === 0 ? (
              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-8 text-center">
                <p className="text-blue-700 font-semibold">No ongoing programs available right now.</p>
                <p className="text-sm text-blue-600 mt-2">Check back later for new opportunities.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ongoingPrograms.map((program) => {
                  const pId = getProgramId(program);
                  return (
                    <ProgramCard
                      key={pId}
                      program={program}
                      enrolled={false}
                      onEnroll={() => handleEnroll(pId)}
                    />
                  );
                })}
              </div>
            )}
          </div>
 
          {/* ENROLLED PROGRAMS */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">Enrolled Programs</h2>
                <p className="text-sm text-slate-500">
                  {enrolledPrograms.length} program{enrolledPrograms.length !== 1 ? 's' : ''} you're enrolled in
                </p>
              </div>
            </div>
            {enrolledPrograms.length === 0 ? (
              <div className="rounded-2xl border border-green-100 bg-green-50 p-8 text-center">
                <p className="text-green-700 font-semibold">You haven't enrolled in any programs yet.</p>
                <p className="text-sm text-green-600 mt-2">Choose an ongoing program above to get started.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledPrograms.map((program) => {
                  const pId = getProgramId(program);
                  return (
                    <ProgramCard
                      key={pId}
                      program={program}
                      enrolled={true}
                      onEnroll={() => {}}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
 
/* ✅ CARD */
const ProgramCard = ({ program, enrolled, onEnroll }) => {
  const [expanded, setExpanded] = useState(false);
 
  return (
    <div className="bg-white rounded-2xl p-5 shadow border flex flex-col h-[280px]">
 
      <span
        className={`text-xs px-3 py-1 rounded-full w-fit ${
          enrolled
            ? "bg-green-100 text-green-700"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {enrolled ? "Enrolled" : "Available"}
      </span>
 
      <h3 className="font-semibold mt-3 line-clamp-2">
        {program.title}
      </h3>
 
      <div className="mt-2 flex-grow">
        <p className={`text-sm ${expanded ? "" : "line-clamp-3"}`}>
          {program.description}
        </p>
 
        {program.description?.length > 100 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 text-xs mt-1"
          >
            {expanded ? "View Less" : "View More"}
          </button>
        )}
      </div>
 
      <div className="mt-4">
        {enrolled ? (
          <div className="flex justify-center items-center gap-2 text-green-600 border rounded py-2 bg-green-50">
            <MdCheckCircle /> Enrolled
          </div>
        ) : (
          <button
            onClick={onEnroll}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Enroll Now
          </button>
        )}
      </div>
    </div>
  );
};
 
export default CitizenDashboard;