// src/routes/PublicRoute.tsx
import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/Token";

interface PublicRouteProps {
  element: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const token = getToken();

  return token ? <Navigate to="/dashboard" replace /> : element;
};

export default PublicRoute;
