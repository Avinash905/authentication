import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;

  const roles = decoded?.UserInfo?.roles || [];

  return roles.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate
      to="/unauthorized"
      state={{ from: location }} // navigate to where they were kicked off after login
      replace
    />
  ) : (
    <Navigate
      to="/login"
      state={{ from: location }} // navigate to where they were kicked off after login
      replace
    />
  );
};

export default RequireAuth;
