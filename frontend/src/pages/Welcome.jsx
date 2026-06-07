import { useNavigate } from "react-router-dom";
import hospitalIcon from "../assets/hospital.png";

function Welcome() {
  const navigate = useNavigate();

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
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          textAlign: "center"
        }}
      >
        {/* Hospital Icon */}

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
          Patient Self Check-In Kiosk
        </h1>

        <p
          style={{
            color: "#6b7280",
            marginBottom: "30px",
            fontSize: "18px"
          }}
        >
          Welcome to our healthcare facility.
          Please register to receive your consultation token.
        </p>

        <button
          onClick={() => navigate("/register")}
          style={{
            width: "100%",
            padding: "15px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer",
            marginBottom: "15px"
          }}
        >
          Start Registration
        </button>

        <button
          onClick={() => navigate("/admin")}
          style={{
            width: "100%",
            padding: "15px",
            background: "#374151",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          Admin Dashboard
        </button>
      </div>
    </div>
  );
}

export default Welcome;