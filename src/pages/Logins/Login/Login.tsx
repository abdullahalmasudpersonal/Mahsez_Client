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
// import DemoCredentials from "./DemoCredentials";
import socket from "../../../utils/Socket";
// import logo from "../../../../public/assets/img/logo/mahsez.png";

type FormValues = {
  email: string;
  password: string;
};

const demoCredentials = {
  admin: {
    email: "abdullah@gmail.com",
    password: "123456",
  },
  buyer: {
    email: "taki@gmail.com",
    password: "123456",
  },
};


const Login = () => {
  const { register, handleSubmit, setValue } = useForm<FormValues>();
  const [passVisible, setPassVisible] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const fillDemoCredentials = (role: "admin" | "buyer") => {
    setValue("email", demoCredentials[role].email);
    setValue("password", demoCredentials[role].password);
  };


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
    <div className="container-xxl">
      <PageTitle pageTitle="Login" />
      <div className="register">
        <div className="register-dev">
          {/* <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={logo} height="50px" alt="" />
          </div> */}
          <h4 className="text-center pt-3" style={{ fontFamily: "Algerian" }}>
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
          <Link to="/" style={{ textDecoration: "none", color: "orange" }}>
            <h6
              style={{
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              Continue to home
            </h6>
          </Link>
        </div>
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px", justifyContent: "center" }}>
          <button
            type="button"
            onClick={() => fillDemoCredentials("admin")}
            style={{ padding: "6px 12px", cursor: "pointer",borderRadius:'5px',border:'1px solid gray' }}
          >
            Demo Admin
          </button>
          <button
            type="button"
            onClick={() => fillDemoCredentials("buyer")}
            style={{ padding: "6px 12px", cursor: "pointer",borderRadius:'5px',border:'1px solid gray' }}
          >
            Demo Buyer
          </button>
        </div>
      </div>


    </div>
  );
};

export default Login;
