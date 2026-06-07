import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    mobile: "",
    address: "",
    department: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return setError("Full Name is required");
    }

    if (!form.gender) {
      return setError("Please select a gender");
    }

    if (form.age < 1 || form.age > 120) {
      return setError("Age must be between 1 and 120");
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      return setError(
        "Mobile number must contain exactly 10 digits"
      );
    }

    if (!form.department) {
      return setError("Please select a department");
    }

    setError("");
    setLoading(true);

    try {
      const response = await api.post(
        "/api/patients",
        form
      );

      navigate("/token", {
        state: response.data
      });

    } catch (err) {

      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Registration failed");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <div
        style={{
          background: "white",
          width: "100%",
          maxWidth: "700px",
          padding: "35px",
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            marginBottom: "10px"
          }}
        >
          Patient Registration
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "25px"
          }}
        >
          Please enter your details to generate a token
        </p>

        <form onSubmit={handleSubmit}>

          <label>
            Full Name *
          </label>

          <input
            name="name"
            value={form.name}
            placeholder="Enter Full Name"
            onChange={handleChange}
            style={inputStyle}
          />

          <label>
            Age *
          </label>

          <input
            name="age"
            type="number"
            value={form.age}
            placeholder="Enter Age"
            onChange={handleChange}
            style={inputStyle}
          />

          <label>
            Gender *
          </label>

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">
              Select Gender
            </option>

            <option>
              Male
            </option>

            <option>
              Female
            </option>

            <option>
              Other
            </option>

          </select>

          <label>
            Mobile Number *
          </label>

          <input
            name="mobile"
            value={form.mobile}
            placeholder="10 Digit Mobile Number"
            onChange={handleChange}
            style={inputStyle}
          />

          <label>
            Address
          </label>

          <input
            name="address"
            value={form.address}
            placeholder="Address (Optional)"
            onChange={handleChange}
            style={inputStyle}
          />

          <label>
            Department *
          </label>

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">
              Select Department
            </option>

            <option>
              General Medicine
            </option>

            <option>
              Cardiology
            </option>

            <option>
              Orthopedics
            </option>

            <option>
              Dermatology
            </option>

            <option>
              Pediatrics
            </option>

          </select>

          {error && (
            <div
              style={{
                background: "#fee2e2",
                color: "#dc2626",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "15px"
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading
                ? "#9ca3af"
                : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            {loading
              ? "Generating Token..."
              : "Generate Token"}
          </button>

        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "16px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "15px"
};

export default Register;