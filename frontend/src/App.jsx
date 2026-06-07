import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Token from "./pages/Token";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Welcome Screen */}
        <Route
          path="/"
          element={<Welcome />}
        />

        {/* Patient Registration */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Token Screen */}
        <Route
          path="/token"
          element={<Token />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={<Admin />}
        />

        {/* Fallback Route */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
