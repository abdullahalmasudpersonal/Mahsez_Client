// import { useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/hooks";

const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  // const [admin, adminLoading] = useAdmin(user);
  // const location = useLocation();

  console.log(user, "user");

  // if (loading || adminLoading) {
  //     return <Loading />
  // }

  // if (!user || !admin) {
  //     logout(auth);
  //     return <Navigate to="/login" state={{ from: location }} replace />;
  // }
  return children;
};

export default RequireAdmin;
