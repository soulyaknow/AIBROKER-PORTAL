import React, { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../utils/Token";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const location = useLocation();
  const token = getToken();

  return token ? (
    element
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
