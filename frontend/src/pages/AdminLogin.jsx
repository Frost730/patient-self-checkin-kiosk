import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hospitalIcon from "../assets/hospital.png";

function AdminLogin() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (password === "admin123") {
      localStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      navigate("/admin");
    } else {
      setError("Invalid Password");
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
          maxWidth: "450px",
          padding: "40px",
          borderRadius: "16px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
          textAlign: "center"
        }}
      >
        <img
          src={hospitalIcon}
          alt="Hospital"
          style={{
            width: "80px",
            height: "80px",
            objectFit: "contain",
            marginBottom: "15px"
          }}
        />

        <h1
          style={{
            color: "#2563eb",
            marginBottom: "10px"
          }}
        >
          Admin Login
        </h1>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "25px"
          }}
        >
          Enter administrator password to
          access the dashboard.
        </p>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            marginBottom: "15px",
            fontSize: "15px",
            boxSizing: "border-box"
          }}
        />

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
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          Login
        </button>

        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            padding: "12px",
            background: "#374151",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "10px"
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;