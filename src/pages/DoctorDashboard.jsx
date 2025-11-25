import React, { useEffect, useState } from "react";
import API from "../api";

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const [selected, setSelected] = useState(null);
  const [meds, setMeds] = useState([]);
  const [presList, setPresList] = useState([
    { medicine: "", dosage: "", duration: "", notes: "" },
  ]);

  useEffect(() => {
    loadTodayPatients();
    loadMeds();
  }, []);

  const loadTodayPatients = async () => {
    const res = await API.get("/doctor/patients/today");
    setPatients(res.data);
  };

  const loadMeds = async () => {
    const res = await API.get("/doctor/medicines");
    setMeds(res.data);
  };

  const openPatient = async (p) => {
    const res = await API.get(`/doctor/patient/${p._id}`);
    setSelected(res.data);
    // Reset prescription list when opening a new patient
    setPresList([{ medicine: "", dosage: "", duration: "", notes: "" }]);
  };

  const addPresRow = () =>
    setPresList([
      ...presList,
      { medicine: "", dosage: "", duration: "", notes: "" },
    ]);

  const removePresRow = (idx) => {
    if (presList.length > 1) {
      const copy = presList.filter((_, i) => i !== idx);
      setPresList(copy);
    }
  };

  const updateRow = (idx, k, v) => {
    const copy = [...presList];
    copy[idx][k] = v;
    setPresList(copy);
  };

  const savePres = async () => {
    const payload = { prescriptions: presList.filter((p) => p.medicine) };
    if (payload.prescriptions.length === 0) {
      alert("Please add at least one medicine");
      return;
    }
    await API.post(`/doctor/patient/${selected._id}/prescriptions`, payload);
    alert("Prescription saved successfully");
    setSelected(null);
    setPresList([{ medicine: "", dosage: "", duration: "", notes: "" }]);
    loadTodayPatients();
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm";
  const selectClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm bg-white";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className=" p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Doctor Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Today's Patients - {new Date().toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => {
                localStorage.clear();
                window.location = "/login";
              }}
              className="px-5 py-2 bg-red-600 text-black rounded-lg hover:bg-red-700 transition shadow-md"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patients List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Patient Queue ({patients.length})
              </h3>
            </div>

            {patients.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg font-semibold mb-2">
                  No patients registered for today
                </p>
                <p>Patients will appear here once registered.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                {patients.map((p) => (
                  <div
                    key={p._id}
                    className={`p-4 rounded-lg border-2 transition cursor-pointer ${
                      selected?._id === p._id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
                    }`}
                    onClick={() => openPatient(p)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-lg text-gray-800">
                          {p.name}
                        </h4>
                        <div className="flex gap-3 text-sm text-gray-600 mt-1">
                          <span>Age: {p.age} years</span>
                          <span>Gender: {p.gender}</span>
                        </div>
                      </div>
                      {selected?._id === p._id && (
                        <span className="px-3 py-1 bg-blue-500 text-black text-xs rounded-full">
                          Selected
                        </span>
                      )}
                    </div>

                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Complaint:</span>{" "}
                        {p.complaint}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Registered at:{" "}
                        {new Date(p.registrationDate).toLocaleTimeString()}
                      </p>
                    </div>

                    <button
                      className="mt-3 w-full py-2 bg-blue-600 text-black rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        openPatient(p);
                      }}
                    >
                      Open Prescription
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Prescription Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {selected ? (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    Write Prescription
                  </h3>
                </div>

                {/* Patient Info Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6 border border-blue-200">
                  <h4 className="font-bold text-lg text-gray-800 mb-2">
                    {selected.name}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    <div>
                      <span className="font-semibold">Age:</span> {selected.age}{" "}
                      years
                    </div>
                    <div>
                      <span className="font-semibold">Gender:</span>{" "}
                      {selected.gender}
                    </div>
                    <div className="col-span-2">
                      <span className="font-semibold">Complaint:</span>{" "}
                      {selected.complaint}
                    </div>
                  </div>
                </div>

                {/* Prescription Entries */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Medicines
                  </h4>
                  <div className="space-y-4 max-h-[calc(100vh-500px)] overflow-y-auto pr-2">
                    {presList.map((row, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-semibold text-sm text-gray-700">
                            Medicine #{idx + 1}
                          </span>
                          {presList.length > 1 && (
                            <button
                              onClick={() => removePresRow(idx)}
                              className="text-red-600 hover:text-red-700 text-sm font-semibold"
                            >
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="space-y-3">
                          <select
                            className={selectClass}
                            value={row.medicine}
                            onChange={(e) =>
                              updateRow(idx, "medicine", e.target.value)
                            }
                          >
                            <option value="">Select medicine</option>
                            {meds.map((m) => (
                              <option key={m._id} value={m._id}>
                                {m.name} - {m.strength} ({m.type})
                              </option>
                            ))}
                          </select>

                          <input
                            className={inputClass}
                            placeholder="Dosage (e.g., 1-0-1, twice daily)"
                            value={row.dosage}
                            onChange={(e) =>
                              updateRow(idx, "dosage", e.target.value)
                            }
                          />

                          <input
                            className={inputClass}
                            placeholder="Duration (e.g., 5 days, 2 weeks)"
                            value={row.duration}
                            onChange={(e) =>
                              updateRow(idx, "duration", e.target.value)
                            }
                          />

                          <input
                            className={inputClass}
                            placeholder="Notes (e.g., after meals, with water)"
                            value={row.notes}
                            onChange={(e) =>
                              updateRow(idx, "notes", e.target.value)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={addPresRow}
                    className="flex-1 px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold"
                  >
                    Add Medicine
                  </button>
                  <button
                    onClick={savePres}
                    className="flex-1 px-4 py-3 bg-green-600 text-black rounded-lg hover:bg-green-700 transition font-semibold shadow-md"
                  >
                    Save Prescription
                  </button>
                </div>

                <button
                  onClick={() => {
                    setSelected(null);
                    setPresList([
                      { medicine: "", dosage: "", duration: "", notes: "" },
                    ]);
                  }}
                  className="w-full mt-3 px-4 py-2 text-gray-600 text-white hover:text-gray-800 transition text-sm"
                >
                  Back to Patient List
                </button>
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                <h3 className="text-xl font-semibold mb-2">Select a patient</h3>
                <p>Click on a patient from the list to write a prescription.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
