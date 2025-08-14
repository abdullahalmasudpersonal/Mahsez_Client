// import { useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { logout, selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Navigate, useLocation } from "react-router-dom";

const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();
  const dispatch = useAppDispatch();

  if (!user || user.role !== "admin") {
    dispatch(logout());
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAdmin;
