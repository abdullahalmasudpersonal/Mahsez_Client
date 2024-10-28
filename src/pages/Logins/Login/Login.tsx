/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
// import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import auth from "../../../firebase.init";
// import Loading from "../../Shared/Loading/Loading";
import "./Login.css";
import PageTitle from "../../shared/PageTitle/PageTitle";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { verifyToken } from "../../../utils/verifyToken";
import { setUser, TUser } from "../../../redux/features/auth/authSlice";
// import UseToken from "../../../Hooks/UseToken/UseToken";
// import PageTitle from "../../Shared/PageTitle/PageTitle";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [passVisible, setPassVisible] = useState(false);

  // const [signInWithEmailAndPassword, user, loading, error] =
  //   useSignInWithEmailAndPassword(auth);
  // const [token] = UseToken(user);

  // const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  // if (loading) {
  //   return <Loading />;
  // }

  // if (token) {
  //   navigate(from, { replace: true });
  // }

  // const handleLogin = async (event) => {
  //   event.preventDefault();
  //   const email = emailRef.current.value;
  //   const password = passwrodRef.current.value;

  //   await signInWithEmailAndPassword(email, password);
  // };

  // let errorElement;
  // if (error) {
  //   errorElement = (
  //     <p className="text-danger m-0 text-center"> Error: {error.message}</p>
  //   );
  // }
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  // const handleLogin = async (event: any) => {
  //   event.preventDefault();
  //   console.log(event, "data");
  //   // const toastId = toast.loading("login");
  //   try {
  //     // const userInfo = {
  //     //   email: data.email,
  //     //   password: data.password,
  //     // };
  //     // console.log(userInfo);
  //     // const res = await login(userInfo).unwrap();
  //     // console.log(res, "res");
  //     // const user = verifyToken(res.data.accessToken) as TUser;
  //     // dispatch(setUser({ user: user, token: res.data.accessToken }));
  //     // toast.success("Loged in", { id: toastId, duration: 2000 });
  //     //  navigate(`/${user.role}/dashboard`);
  //   } catch (err: any) {
  //     toast.error(err);
  //     // toast.error("Something went wrong!!!");
  //   }
  // };
  const { register, handleSubmit } = useForm<FormValues>();

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
      navigate(`/`);
      //  navigate(`/${user.role}/dashboard`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Please check your credentials.");
      toast.error("Something went wrong!");
    }
  };

  let errorElement;
  if (error) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    </div>
  );
};

export default Login;
