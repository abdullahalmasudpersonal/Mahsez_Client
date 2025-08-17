import { ReactNode } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { selectCurrentUser, logout } from "@/redux/features/auth/authSlice";
import { useLocation, Navigate } from "react-router-dom";

const RequireRole = ({ children, role }: { children: ReactNode; role: "admin" | "buyer" }) => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();
  const dispatch = useAppDispatch();

  // // এখনো user লোড হয়নি
  // if (user === null) {
  //   return <div>Loading...</div>; // বা <Spin/> 
  // }

  // role mismatch হলে
  if (user?.role !== role) {
    dispatch(logout());
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireRole;
