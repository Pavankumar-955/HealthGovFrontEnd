import React, { use, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { getPrograms } from "../../api/ProgramApi.js";
import { createEnrollment, getEnrollments } from "../../api/enrollmentApi.js";
import { programEnrollment } from "../../api/citizenApi.js";
import { toast } from "react-hot-toast";
import { MdCalendarToday, MdPeople, MdCheckCircle, MdInfo, MdLocalHospital } from 'react-icons/md';
import { useAuth } from "../../context/AuthContext.jsx";
const CitizenDashboard = () => {
  const [programs, setPrograms] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // ✅ Get citizen ID from token
  const getCitizenIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded.userId || decoded.id || decoded.citizenId || decoded.citizenID;
    } catch {
      console.error("Invalid token");
      return null;
    }
  };

  const citizenId = getCitizenIdFromToken();

  // ✅ Load programs and enrollments
  const loadData = async () => {
    try {
      setLoading(true);

      const progRes = await getPrograms();
      console.log("📍 Programs:", progRes.data);

      const allPrograms = Array.isArray(progRes.data)
        ? progRes.data
        : progRes.data?.data || [];

      setPrograms(allPrograms);

      const enrollRes = await getEnrollments();
      console.log("📍 Enrollments:", enrollRes.data);

      const allEnrollments = Array.isArray(enrollRes.data)
        ? enrollRes.data
        : enrollRes.data?.data || [];

      const filteredEnrollments = citizenId
        ? allEnrollments.filter(
            (e) => Number(e.citizenId) === Number(citizenId)
          )
        : [];

      setEnrollments(filteredEnrollments);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const { user } = useAuth();
  // ✅ ✅ FIXED ENROLL FUNCTION
  const handleEnroll = async (programId) => {

    if (!citizenId) {
      toast.error("Login required");
      return;
    }

    // ✅ Prevent duplicate enrollment
    if (isEnrolled(programId)) {
      toast("Already enrolled");
      return;
    }

    try {
      const enrollmentData = {
        citizenId: Number(citizenId),
        programId: Number(programId),
        date: new Date().toISOString(),
        status:"ACTIVE"
      };

      console.log("📤 Sending:", enrollmentData);

      const response = await programEnrollment(enrollmentData);
      console.log("📍 Enrollment response:", response.data);

      if (response.status >= 200 && response.status < 300) {
        toast.success("✅ Enrolled successfully!");
        await loadData();
      }

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Enrollment failed");
    }
  };

  // ✅ ✅ FIXED type-safe check
  const isEnrolled = (programId) => {
    return enrollments.some(
      (e) => Number(e.programId) === Number(programId)
    );
  };

  useEffect(() => {
    loadData();
    console.log("User Data",user.userId,user.name,user.email);
    
  }, [location.search]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Citizen Dashboard
      </h1>

      {/* PROGRAMS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {programs.map((program) => {
          const programId = program.id || program.programId || program._id;
          const enrolled = isEnrolled(programId);

          return (
            <ProgramCard
              key={programId}
              program={program}
              enrolled={enrolled}
              onEnroll={() => {
                console.log("🟢 Clicked:", programId);
                handleEnroll(programId);
              }}
            />
          );
        })}

      </div>

      {/* ENROLLMENTS */}
      <div className="mt-10">

        <h2 className="text-xl font-bold mb-4">
          My Enrollments
        </h2>

        {enrollments.length === 0 ? (
          <p>No enrollments yet</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {enrollments.map((e) => (
              <div key={e.enrollmentId} className="p-4 border rounded">
                <h3 className="font-semibold">
                  Program ID: {e.programId}
                </h3>
                <p>Status: {e.status}</p>
                <p>Date: {e.date}</p>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};

// ✅ PROGRAM CARD
const ProgramCard = ({ program, enrolled, onEnroll }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow border">

      <span className={`text-xs px-2 py-1 rounded ${
        enrolled ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
      }`}>
        {enrolled ? "ENROLLED" : "AVAILABLE"}
      </span>

      <h3 className="font-bold text-lg mt-2">{program.title}</h3>

      <p className="text-sm text-gray-600 mt-2">
        {program.description}
      </p>

      <div className="mt-4">
        {enrolled ? (
          <span className="text-green-600 flex items-center">
            <MdCheckCircle className="mr-1" /> Enrolled
          </span>
        ) : (
          <button
            onClick={() => {
              console.log("🟢 Button clicked:", program.id);
              onEnroll();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Enroll Now
          </button>
        )}
      </div>

    </div>
  );
};

export default CitizenDashboard;