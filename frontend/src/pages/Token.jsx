import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Token() {
  const location = useLocation();
  const navigate = useNavigate();

  const patient = location.state;

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [navigate]);

  if (!patient) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f7fa"
        }}
      >
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "16px",
            textAlign: "center",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
          }}
        >
          <h2>No Token Found</h2>

          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

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
          padding: "40px",
          borderRadius: "18px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          textAlign: "center"
        }}
      >
        <div
          style={{
            fontSize: "60px",
            marginBottom: "15px"
          }}
        >
          ✅
        </div>

        <h1
          style={{
            color: "#16a34a",
            marginBottom: "20px"
          }}
        >
          Registration Successful
        </h1>

        <div
          style={{
            background: "#eff6ff",
            border: "2px dashed #2563eb",
            borderRadius: "15px",
            padding: "25px",
            marginBottom: "25px"
          }}
        >
          <h3
            style={{
              color: "#6b7280",
              marginBottom: "10px"
            }}
          >
            TOKEN NUMBER
          </h3>

          <h1
            style={{
              fontSize: "48px",
              color: "#2563eb",
              marginBottom: "10px"
            }}
          >
            {patient.token}
          </h1>
        </div>

        <div
          style={{
            textAlign: "left",
            marginBottom: "25px",
            lineHeight: "2"
          }}
        >
          <p>
            <strong>Patient Name:</strong>{" "}
            {patient.name}
          </p>

          <p>
            <strong>Department:</strong>{" "}
            {patient.department}
          </p>

          <p>
            <strong>Registration Time:</strong>{" "}
            {new Date(
              patient.created_at
            ).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => window.print()}
          style={{
            width: "100%",
            padding: "14px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          🖨 Print Token
        </button>

        <p
          style={{
            color: "#6b7280"
          }}
        >
          Returning to Home Screen in {countdown} seconds...
        </p>
      </div>
    </div>
  );
}

export default Token;