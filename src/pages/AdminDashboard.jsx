// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Logout() {
  localStorage.clear();
  window.location = "/login";
  return null;
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [meds, setMeds] = useState([]);
  const [patientForm, setPatientForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    address: "",
    doctorId: "",
    hospitalName: "",
    complaint: "",
  });
  const [newMed, setNewMed] = useState({
    name: "",
    genericName: "",
    strength: "",
    type: "Tablet",
    company: "",
  });
  const [doctorForm, setDoctorForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    phone: "",
    hospitalName: "",
  });

  useEffect(() => {
    loadDoctors();
    loadMeds();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await API.get("/admin/doctors");
      setDoctors(res.data || []);
    } catch (err) {
      console.error(err);
      alert("failed to load doctors");
    }
  };

  const loadMeds = async () => {
    try {
      const res = await API.get("/admin/medicines");
      setMeds(res.data || []);
    } catch (err) {
      console.error(err);
      alert("failed to load medicines");
    }
  };

  const addMedicine = async (e) => {
    e.preventDefault();
    try {
      await API.post("/admin/medicines", newMed);
      setNewMed({
        name: "",
        genericName: "",
        strength: "",
        type: "Tablet",
        company: "",
      });
      loadMeds();
      alert("medicine added successfully");
    } catch (err) {
      console.error(err);
      alert("failed to add medicine");
    }
  };

  const createDoctor = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/create-doctor", doctorForm);
      alert("doctor created successfully");
      setDoctorForm({
        name: "",
        email: "",
        password: "",
        specialization: "",
        phone: "",
        hospitalName: "",
      });
      loadDoctors();
    } catch (err) {
      console.error(err);
      alert("failed to create doctor");
    }
  };

  const registerPatient = async (e) => {
    e.preventDefault();
    try {
      await API.post("/admin/patients", {
        ...patientForm,
        doctorId: patientForm.doctorId,
      });
      alert("patient registered for opd successfully");
      setPatientForm({
        name: "",
        age: "",
        gender: "Male",
        phone: "",
        address: "",
        doctorId: "",
        hospitalName: "",
        complaint: "",
      });
    } catch (err) {
      console.error(err);
      alert("failed to register patient");
    }
  };

  const inputClass =
    "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm";
  const buttonClass =
    "w-full px-4 py-2 rounded-lg font-semibold text-white transition transform hover:scale-[1.02] active:scale-95 shadow";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className=" px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                manage doctors, medicines, and patients
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm shadow"
                onClick={() => navigate("/admin/patients")}
              >
                all patients
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm shadow"
                onClick={Logout}
              >
                logout
              </button>
            </div>
          </div>
        </div>

        {/* top grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create Doctor Section */}
          <section className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                create doctor
              </h2>
            </div>
            <form onSubmit={createDoctor} className="space-y-3">
              <input
                className={inputClass}
                placeholder="full name"
                value={doctorForm.name}
                onChange={(e) =>
                  setDoctorForm({ ...doctorForm, name: e.target.value })
                }
                required
              />
              <input
                className={inputClass}
                type="email"
                placeholder="email address"
                value={doctorForm.email}
                onChange={(e) =>
                  setDoctorForm({ ...doctorForm, email: e.target.value })
                }
                required
              />
              <input
                className={inputClass}
                type="password"
                placeholder="password (optional)"
                value={doctorForm.password}
                onChange={(e) =>
                  setDoctorForm({ ...doctorForm, password: e.target.value })
                }
              />
              <input
                className={inputClass}
                placeholder="specialization"
                value={doctorForm.specialization}
                onChange={(e) =>
                  setDoctorForm({
                    ...doctorForm,
                    specialization: e.target.value,
                  })
                }
                required
              />
              <input
                className={inputClass}
                placeholder="phone number"
                value={doctorForm.phone}
                onChange={(e) =>
                  setDoctorForm({ ...doctorForm, phone: e.target.value })
                }
                required
              />
              <input
                className={inputClass}
                placeholder="hospital name"
                value={doctorForm.hospitalName}
                onChange={(e) =>
                  setDoctorForm({
                    ...doctorForm,
                    hospitalName: e.target.value,
                  })
                }
                required
              />
              <button
                type="submit"
                className={`${buttonClass} bg-green-600 hover:bg-green-700`}
              >
                create doctor
              </button>
            </form>
          </section>

          {/* Add Medicine Section */}
          <section className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                add medicine
              </h2>
            </div>
            <form onSubmit={addMedicine} className="space-y-3">
              <input
                className={inputClass}
                placeholder="medicine name"
                value={newMed.name}
                onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                required
              />
              <input
                className={inputClass}
                placeholder="generic name"
                value={newMed.genericName}
                onChange={(e) =>
                  setNewMed({ ...newMed, genericName: e.target.value })
                }
                required
              />
              <input
                className={inputClass}
                placeholder="strength (e.g., 500mg)"
                value={newMed.strength}
                onChange={(e) =>
                  setNewMed({ ...newMed, strength: e.target.value })
                }
                required
              />
              <select
                className={inputClass}
                value={newMed.type}
                onChange={(e) => setNewMed({ ...newMed, type: e.target.value })}
              >
                <option>Tablet</option>
                <option>Capsule</option>
                <option>Syrup</option>
                <option>Injection</option>
              </select>
              <input
                className={inputClass}
                placeholder="company name"
                value={newMed.company}
                onChange={(e) =>
                  setNewMed({ ...newMed, company: e.target.value })
                }
                required
              />
              <button
                type="submit"
                className={`${buttonClass} bg-blue-600 hover:bg-blue-700`}
              >
                add medicine
              </button>
            </form>

            {meds.length > 0 && (
              <div className="mt-5">
                <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                  available medicines ({meds.length})
                </h3>
                <div className="max-h-52 overflow-y-auto bg-gray-50 rounded-lg p-3">
                  <ul className="space-y-2 text-sm">
                    {meds.map((m) => (
                      <li
                        key={m._id}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <span className="text-blue-600">•</span>
                        <span className="font-medium break-all">{m.name}</span>
                        <span className="text-gray-500 text-xs">
                          ({m.type})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Register Patient Section */}
        <section className="bg-white rounded-xl shadow-md p-4 sm:p-6 mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              register patient (today only)
            </h2>
          </div>
          <form
            onSubmit={registerPatient}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              className={inputClass}
              placeholder="patient name"
              value={patientForm.name}
              onChange={(e) =>
                setPatientForm({ ...patientForm, name: e.target.value })
              }
              required
            />
            <input
              className={inputClass}
              type="number"
              placeholder="age"
              value={patientForm.age}
              onChange={(e) =>
                setPatientForm({ ...patientForm, age: e.target.value })
              }
              required
            />
            <select
              className={inputClass}
              value={patientForm.gender}
              onChange={(e) =>
                setPatientForm({ ...patientForm, gender: e.target.value })
              }
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input
              className={inputClass}
              placeholder="phone number"
              value={patientForm.phone}
              onChange={(e) =>
                setPatientForm({ ...patientForm, phone: e.target.value })
              }
              required
            />
            <input
              className={inputClass}
              placeholder="address"
              value={patientForm.address}
              onChange={(e) =>
                setPatientForm({ ...patientForm, address: e.target.value })
              }
              required
            />
            <select
              className={inputClass}
              value={patientForm.doctorId}
              onChange={(e) =>
                setPatientForm({ ...patientForm, doctorId: e.target.value })
              }
              required
            >
              <option value="">select doctor</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name} - {d.specialization}
                </option>
              ))}
            </select>
            <input
              className={inputClass}
              placeholder="hospital name"
              value={patientForm.hospitalName}
              onChange={(e) =>
                setPatientForm({
                  ...patientForm,
                  hospitalName: e.target.value,
                })
              }
              required
            />
            <input
              className={inputClass}
              placeholder="chief complaint"
              value={patientForm.complaint}
              onChange={(e) =>
                setPatientForm({ ...patientForm, complaint: e.target.value })
              }
              required
            />
            <button
              type="submit"
              className={`${buttonClass} bg-purple-600 hover:bg-purple-700 md:col-span-2`}
            >
              register patient
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
