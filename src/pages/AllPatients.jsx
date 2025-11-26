// // src/pages/AllPatients.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// export default function AllPatients() {
//   const navigate = useNavigate();
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     loadPatients();
//   }, []);

//   const loadPatients = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await API.get("/admin/patients"); // <-- fetch all patients
//       setPatients(res.data || []);
//     } catch (err) {
//       console.error(err);
//       setError("failed to fetch patients");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredPatients = patients.filter((p) => {
//     const term = search.toLowerCase();
//     return (
//       p.name?.toLowerCase().includes(term) ||
//       p.phone?.toLowerCase().includes(term) ||
//       p.hospitalName?.toLowerCase().includes(term)
//     );
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="px-4 py-6">
//         {/* header */}
//         <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//                 all patients
//               </h1>
//               <p className="text-gray-600 text-sm sm:text-base mt-1">
//                 list of registered opd patients
//               </p>
//             </div>
//             <div className="flex flex-wrap gap-2">
//               <button
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm shadow text-white"
//                 onClick={() => navigate("/admin")}
//               >
//                 back to dashboard
//               </button>
//             </div>
//           </div>

//           <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <input
//               type="text"
//               placeholder="search by name, phone, or hospital"
//               className="w-full sm:max-w-xs px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <button
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm shadow hover:bg-blue-700"
//               onClick={loadPatients}
//             >
//               refresh
//             </button>
//           </div>
//         </div>

//         {/* content */}
//         <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
//           {loading && <p className="text-gray-600 text-sm">loading...</p>}

//           {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

//           {!loading && !error && filteredPatients.length === 0 && (
//             <p className="text-gray-600 text-sm">no patients found.</p>
//           )}

//           {!loading && filteredPatients.length > 0 && (
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-left text-xs sm:text-sm">
//                 <thead>
//                   <tr className="border-b bg-gray-50">
//                     <th className="py-2 px-2 sm:px-3 font-semibold text-gray-700">
//                       name
//                     </th>
//                     <th className="py-2 px-2 sm:px-3 font-semibold text-gray-700">
//                       age / gender
//                     </th>
//                     <th className="py-2 px-2 sm:px-3 font-semibold text-gray-700">
//                       phone
//                     </th>
//                     <th className="py-2 px-2 sm:px-3 font-semibold text-gray-700">
//                       hospital
//                     </th>
//                     <th className="py-2 px-2 sm:px-3 font-semibold text-gray-700">
//                       complaint
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredPatients.map((p) => (
//                     <tr
//                       key={p._id}
//                       className="border-b last:border-0 hover:bg-gray-50"
//                     >
//                       <td className="py-2 px-2 sm:px-3">
//                         <div className="font-medium text-gray-800 break-all">
//                           {p.name}
//                         </div>
//                       </td>
//                       <td className="py-2 px-2 sm:px-3 text-gray-700">
//                         {p.age || "-"}{" "}
//                         <span className="text-gray-500">
//                           / {p.gender || "-"}
//                         </span>
//                       </td>
//                       <td className="py-2 px-2 sm:px-3 text-gray-700 break-all">
//                         {p.phone || "-"}
//                       </td>
//                       <td className="py-2 px-2 sm:px-3 text-gray-700 break-all">
//                         {p.hospitalName || "-"}
//                       </td>
//                       <td className="py-2 px-2 sm:px-3 text-gray-700 break-all max-w-xs">
//                         {p.complaint || "-"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {/* mobile hint */}
//               <p className="mt-3 text-[11px] text-gray-400 sm:hidden">
//                 tip: swipe left/right to see all columns.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// src/pages/AllPatients.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AllPatients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/admin/patients"); // <-- fetch all patients
      setPatients(res.data || []);
    } catch (err) {
      console.error(err);
      setError("failed to fetch patients");
    } finally {
      setLoading(false);
    }
  };

  // helper to safely get doctor name from different possible shapes
  const getDoctorName = (p) => {
    if (!p) return "";
    if (p.doctorName) return p.doctorName;
    if (typeof p.doctor === "string") return p.doctor;
    if (p.doctor && p.doctor.name) return p.doctor.name;
    return "";
  };

  const filteredPatients = patients.filter((p) => {
    const term = search.toLowerCase();
    const doctorName = getDoctorName(p).toLowerCase();

    return (
      p.name?.toLowerCase().includes(term) ||
      p.phone?.toLowerCase().includes(term) ||
      p.hospitalName?.toLowerCase().includes(term) ||
      doctorName.includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="px-4 py-6">
        {/* header */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                all patients
              </h1>
              <p className="text-gray-600 text-sm sm:text-base mt-1">
                list of registered opd patients
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm shadow text-white"
                onClick={() => navigate("/admin")}
              >
                back to dashboard
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="text"
              placeholder="search by name, phone, hospital, or doctor"
              className="w-full sm:max-w-xs px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm shadow hover:bg-blue-700"
              onClick={loadPatients}
            >
              refresh
            </button>
          </div>
        </div>

        {/* content */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          {loading && <p className="text-gray-600 text-sm">loading...</p>}

          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          {!loading && !error && filteredPatients.length === 0 && (
            <p className="text-gray-600 text-sm">no patients found.</p>
          )}

          {!loading && filteredPatients.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="py-2 px-2 sm:px-3 font-semibold text-gray-700">
                      name
                    </th>
                    <th className="py-2 px-2 sm:px-3 font-semibold text-gray-700">
                      age / gender
                    </th>
                    <th className="py-2 px-2 sm:px-3 font-semibold text-gray-700">
                      phone
                    </th>
                    <th className="py-2 px-2 sm:px-3 font-semibold text-gray-700">
                      hospital
                    </th>
                    <th className="py-2 px-2 sm:px-3 font-semibold text-gray-700">
                      doctor
                    </th>
                    <th className="py-2 px-2 sm:px-3 font-semibold text-gray-700">
                      complaint
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((p) => {
                    const doctorName = getDoctorName(p);
                    return (
                      <tr
                        key={p._id}
                        className="border-b last:border-0 hover:bg-gray-50"
                      >
                        <td className="py-2 px-2 sm:px-3">
                          <div className="font-medium text-gray-800 break-all">
                            {p.name}
                          </div>
                        </td>
                        <td className="py-2 px-2 sm:px-3 text-gray-700">
                          {p.age || "-"}{" "}
                          <span className="text-gray-500">
                            / {p.gender || "-"}
                          </span>
                        </td>
                        <td className="py-2 px-2 sm:px-3 text-gray-700 break-all">
                          {p.phone || "-"}
                        </td>
                        <td className="py-2 px-2 sm:px-3 text-gray-700 break-all">
                          {p.hospitalName || "-"}
                        </td>
                        <td className="py-2 px-2 sm:px-3 text-gray-700 break-all">
                          {doctorName || "-"}
                        </td>
                        <td className="py-2 px-2 sm:px-3 text-gray-700 break-all max-w-xs">
                          {p.complaint || "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* mobile hint */}
              <p className="mt-3 text-[11px] text-gray-400 sm:hidden">
                tip: swipe left/right to see all columns.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
