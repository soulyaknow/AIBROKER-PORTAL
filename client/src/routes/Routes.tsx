import { Routes, Route } from "react-router-dom";
import Signin from "../views/pages/Signin";
import Dashboard from "../views/pages/Dashboard";
import Applications from "../views/pages/Applications";
import Signup from "../views/pages/Singup";

function RoutesComponent() {
  return (
    <Routes>
      {/* public endpoint */}
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/applications" element={<Applications />}></Route>
    </Routes>
  );
}

export default RoutesComponent;
