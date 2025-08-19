import { ReactNode, useEffect } from "react";
import { logout, selectCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";

const RequiredAdmin = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (!user || user.role !== "admin") {
      dispatch(logout());
      navigate("/auth/login", { state: { from: location }, replace: true });
    }
  }, [user, dispatch, navigate, location]);


  if (!user || user.role !== "admin") {
    return null;
  }
  return children;
};

export default RequiredAdmin;
