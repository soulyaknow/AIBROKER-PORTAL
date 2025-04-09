import { Routes, Route } from "react-router-dom";
import Signin from "../views/pages/Signin";
import Dashboard from "../views/pages/Dashboard";
import Applications from "../views/pages/Applications";
import Signup from "../views/pages/Singup";
import PrivateRoute from "./PrivateRoutes";
import PublicRoute from "./PublicRoutes"; // ✅

function RoutesComponent() {
  return (
    <Routes>
      {/* Public Routes (wrapped with PublicRoute) */}
      <Route path="/" element={<PublicRoute element={<Signin />} />} />
      <Route path="/signup" element={<PublicRoute element={<Signup />} />} />

      {/* Private Routes */}
      <Route
        path="/dashboard"
        element={<PrivateRoute element={<Dashboard />} />}
      />
      <Route
        path="/applications"
        element={<PrivateRoute element={<Applications />} />}
      />
    </Routes>
  );
}

export default RoutesComponent;
