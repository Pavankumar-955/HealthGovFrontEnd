import React, { useEffect, useState } from "react";
import Footer from "../../components/ui/Footer.jsx";
import { getPrograms, registerForProgram } from "../../api/ProgramApi.js";
import { getCitizenEnrollments } from "../../api/citizenApi.js";
import { toast } from "react-hot-toast";

const CitizenDashboard = () => {
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [myEnrollments, setMyEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Decode citizenId from token
  const token = localStorage.getItem("token");
  let citizenId = null;

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      citizenId = decoded.userId; // ✅ adjust if backend uses different key
    } catch {
      console.error("Invalid token");
    }
  }

  // ✅ Load Data
  const loadData = async () => {
    try {
      setLoading(true);
      const progRes = await getPrograms();
      const enrollRes = await getCitizenEnrollments();

      setAvailablePrograms(
        Array.isArray(progRes.data) ? progRes.data : progRes.data?.data || []
      );

      setMyEnrollments(
        Array.isArray(enrollRes.data) ? enrollRes.data : enrollRes.data?.data || []
      );
    } catch (err) {
      console.error("Error loading dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ✅ REGISTER FUNCTION (FULL PAYLOAD)
  const handleRegister = async (programId) => {
    try {
      const payload = {
        citizenId,
        programId,
        date: new Date().toISOString().split("T")[0], // ✅ today's date
        status: "ACTIVE",
      };

      await registerForProgram(payload);

      toast.success("✅ You are registered in this program!");

      loadData(); // refresh UI
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <div className="ml-64 p-8 min-h-screen bg-[#f3f7fa]">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900">
              Hello, Citizen 👋
            </h1>
            <p className="text-slate-500 mt-2">
              Manage your health registrations and explore new initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT - PROGRAMS */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold text-slate-800">
                Available Health Programs
              </h2>

              {loading ? (
                <p className="text-slate-500">Loading...</p>
              ) : availablePrograms.length === 0 ? (
                <p className="text-slate-400">No programs available.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availablePrograms.map((prog) => {
                    const programId =
                      prog._id || prog.id || prog.programId;

                    // ✅ Check if already registered
                    const registered = myEnrollments.some(
                      (e) => e.programId === programId
                    );

                    return (
                      <ProgramCard
                        key={programId}
                        program={prog}
                        onRegister={handleRegister}
                        isRegistered={registered}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIGHT - MY ENROLLMENTS */}
            <div className="bg-white rounded-2xl p-6 shadow border h-fit">
              <h2 className="text-xl font-bold mb-6">
                ✅ My Enrollments
              </h2>

              {myEnrollments.length === 0 ? (
                <p className="text-gray-400">
                  You haven’t enrolled in any programs yet.
                </p>
              ) : (
                myEnrollments.map((item) => (
                  <div
                    key={item.programId}
                    className="p-3 bg-green-50 rounded mb-2"
                  >
                    <p className="font-bold text-green-800">
                      {item.program?.title || "Program"}
                    </p>
                    <p className="text-xs text-green-600">
                      ✅ Registered
                    </p>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

// ✅ PROGRAM CARD COMPONENT
const ProgramCard = ({ program, onRegister, isRegistered }) => {
  const programId = program._id || program.id || program.programId;

  return (
    <div className="bg-white p-5 rounded-xl shadow border">

      <h3 className="font-bold text-lg mb-2">{program.title}</h3>

      <p className="text-sm text-gray-600 mb-4">
        {program.description}
      </p>

      <div className="flex justify-between items-center">

        {/* DATE */}
        <span className="text-xs text-gray-400">
          📅 {new Date().toLocaleDateString()}
        </span>

        {/* ✅ REGISTER BUTTON / STATUS */}
        {isRegistered ? (
          <div className="text-right">
            <span className="text-green-600 font-bold text-xs">
              ✅ Registered
            </span>
            <p className="text-[10px] text-gray-400">
              Already enrolled
            </p>
          </div>
        ) : (
          <button
            onClick={() => onRegister(programId)}
            className="bg-blue-600 text-white px-4 py-2 text-xs rounded"
          >
            Register
          </button>
        )}

      </div>
    </div>
  );
};

export default CitizenDashboard;