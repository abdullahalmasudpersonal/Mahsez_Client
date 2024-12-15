import { useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { verifyToken } from "../../../utils/verifyToken";
import {
  selectCurrentUser,
  setUser,
  TUser,
} from "../../../redux/features/auth/authSlice";
import PageTitle from "../../shared/PageTitle/PageTitle";
import DemoCredentials from "./DemoCredentials";
import socket from "../../../utils/Socket";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [passVisible, setPassVisible] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onFinish: SubmitHandler<FormValues> = async (data) => {
    try {
      const userInfo = {
        email: data?.email,
        password: data?.password,
      };

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      const toastId = toast.loading("Logging in...");
      toast.success("Logged in successfully!", { id: toastId, duration: 2000 });

      navigate(from, { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Please check your credentials.");
      toast.error("Something went wrong!");
    }
  };

  socket.emit("userOnline", user?.userId);

  let errorElement;
  if (error) {
    errorElement = <p className="text-danger m-0 text-center">{error}</p>;
  }

  return (
    <div className="container-xxl my-5 ">
      <PageTitle pageTitle="Login" />
      <div className="register">
        <div className="register-dev">
          <h4 className="text-center pt-4" style={{ fontFamily: "Algerian" }}>
            Login
          </h4>
          <div className="register-form-dev">
            <form onSubmit={handleSubmit(onFinish)}>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
              </div>

              <div>
                <input
                  type={passVisible ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <span
                  className="login-pass-show"
                  onClick={() => setPassVisible(!passVisible)}
                >
                  <small>{passVisible ? "Hide" : "Show"}</small>
                </span>
              </div>
              <div className="pb-2">
                <small className="pass-reset-btn">Reset Password</small>
              </div>
              <div>
                <input
                  className="reg-submit-input"
                  type="submit"
                  value="Login"
                  required
                />
              </div>
            </form>
          </div>
          {errorElement}
          <p className="text-center">
            <small>
              Alrady have an account?
              <Link to="/register" style={{ textDecoration: "none" }}>
                <span style={{ color: "purple" }}> Register</span>
              </Link>
            </small>
          </p>
        </div>
      </div>
      <DemoCredentials />
    </div>
  );
};

export default Login;
