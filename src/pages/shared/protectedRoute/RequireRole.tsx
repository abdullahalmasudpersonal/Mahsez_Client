import { useAppSelector, } from "@/redux/hooks";
import { selectCurrentUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useLocation, Navigate } from "react-router-dom";

interface RequireRoleProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RequireRole = ({ children, allowedRoles }: RequireRoleProps) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  if (!token || !user ) {
    // if (location.pathname.startsWith("/admin") || location.pathname.startsWith("/buyer")) {
    // return <Navigate to="/" replace />;
    // }
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if(!allowedRoles.includes(user.role)){
      return <Navigate to="/auth/unauthorized" replace />;
  }

  return children;
};

export default RequireRole;



  // const dispatch = useAppDispatch();

  // const isLoading = !token && !user; 

  //  if (isLoading) {
  //   return <div>Loading...</div>; // অথবা spinner
  // }
