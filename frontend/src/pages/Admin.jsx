import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../services/api";
import hospitalIcon from "../assets/hospital.png";

function Admin() {
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem(
    "adminLoggedIn"
  );

  if (!isAdmin) {
    return (
      <Navigate
        to="/admin-login"
        replace
      />
    );
  }

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/api/patients?search=${search}`
      );

      setPatients(response.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [search]);

  const filteredPatients = patients.filter((patient) => {
    if (department === "All") {
      return true;
    }

    return patient.department === department;
  });

  const todayPatients = patients.filter((patient) => {
    if (!patient.created_at) return false;

    const today = new Date().toDateString();

    return (
      new Date(
        patient.created_at
      ).toDateString() === today
    );
  }).length;

  const departmentCount = new Set(
    patients.map(
      (patient) => patient.department
    )
  ).size;

  const handleLogout = () => {
    localStorage.removeItem(
      "adminLoggedIn"
    );

    navigate("/admin-login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        padding: "20px"
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto"
        }}
      >
        {/* Header */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "25px"
          }}
        >
          <img
            src={hospitalIcon}
            alt="Hospital"
            style={{
              width: "70px",
              height: "70px",
              objectFit: "contain",
              marginBottom: "10px"
            }}
          />

          <h1
            style={{
              color: "#2563eb"
            }}
          >
            Admin Dashboard
          </h1>

          <p
            style={{
              color: "#6b7280",
              marginBottom: "15px"
            }}
          >
            Manage patient registrations and tokens
          </p>

          <button
            onClick={handleLogout}
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>

        {/* Statistics */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "25px"
          }}
        >
          <div style={statCard}>
            <h3>Total Patients</h3>

            <h1
              style={{
                color: "#2563eb"
              }}
            >
              {patients.length}
            </h1>
          </div>

          <div style={statCard}>
            <h3>Today's Registrations</h3>

            <h1
              style={{
                color: "#16a34a"
              }}
            >
              {todayPatients}
            </h1>
          </div>

          <div style={statCard}>
            <h3>Departments</h3>

            <h1
              style={{
                color: "#7c3aed"
              }}
            >
              {departmentCount}
            </h1>
          </div>
        </div>

        {/* Filters */}

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
            marginBottom: "25px"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: "15px"
            }}
          >
            <input
              type="text"
              placeholder="🔍 Search Patient Name"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={inputStyle}
            />

            <select
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              style={inputStyle}
            >
              <option>All</option>
              <option>General Medicine</option>
              <option>Cardiology</option>
              <option>Orthopedics</option>
              <option>Dermatology</option>
              <option>Pediatrics</option>
            </select>
          </div>
        </div>

        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "30px"
            }}
          >
            <h3>Loading Patients...</h3>
          </div>
        )}

        {!loading && (
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              overflowX: "auto",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.08)"
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse"
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#2563eb",
                    color: "white"
                  }}
                >
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Age</th>
                  <th style={thStyle}>Gender</th>
                  <th style={thStyle}>Mobile</th>
                  <th style={thStyle}>Department</th>
                  <th style={thStyle}>Token</th>
                  <th style={thStyle}>Registered At</th>
                </tr>
              </thead>

              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      style={{
                        textAlign: "center",
                        padding: "25px"
                      }}
                    >
                      No patients found
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map(
                    (patient) => (
                      <tr key={patient.id}>
                        <td style={tdStyle}>
                          {patient.name}
                        </td>

                        <td style={tdStyle}>
                          {patient.age}
                        </td>

                        <td style={tdStyle}>
                          {patient.gender}
                        </td>

                        <td style={tdStyle}>
                          {patient.mobile}
                        </td>

                        <td style={tdStyle}>
                          {patient.department}
                        </td>

                        <td
                          style={{
                            ...tdStyle,
                            color: "#2563eb",
                            fontWeight: "bold"
                          }}
                        >
                          {patient.token}
                        </td>

                        <td style={tdStyle}>
                          {patient.created_at
                            ? new Date(
                                patient.created_at
                              ).toLocaleString()
                            : "N/A"}
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const statCard = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow:
    "0 4px 15px rgba(0,0,0,0.08)"
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "15px"
};

const thStyle = {
  padding: "14px"
};

const tdStyle = {
  padding: "12px",
  borderBottom:
    "1px solid #e5e7eb"
};

export default Admin;