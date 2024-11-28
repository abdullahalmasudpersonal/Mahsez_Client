import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Register.css";
import PageTitle from "../../shared/PageTitle/PageTitle";
import { toast } from "sonner";
import { useState } from "react";
// import { TUser } from "../../../redux/features/auth/authSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useLoginMutation,
  useRegistrationBuyerMutation,
} from "../../../redux/features/auth/authApi";
import { verifyToken } from "../../../utils/verifyToken";
import { setUser, TUser } from "../../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";

type FormValues = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [, setError] = useState<string | null>(null);
  const [passVisible, setPassVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [createBuyer] = useRegistrationBuyerMutation();
  const [login] = useLoginMutation();

  const onFinish: SubmitHandler<FormValues> = async (data) => {
    try {
      const userInfo = {
        password: data?.password,
        buyer: {
          name: data?.name,
          email: data?.email,
        },
      };

      const res = await createBuyer(userInfo).unwrap();
      if (res.success) {
        const loginData = {
          email: res?.data?.email,
          password: data?.password,
        };
        const result = await login(loginData).unwrap();
        const user = verifyToken(result?.data?.accessToken) as TUser;
        dispatch(setUser({ user: user, token: result?.data?.accessToken }));
        const toastId = toast.loading("Logging in...");
        toast.success("Logged in successfully!", {
          id: toastId,
          duration: 2000,
        });
        navigate(from, { replace: true });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Please check your credentials.");
      toast.error("Something went wrong!");
    }
  };

  // let errorElement;
  // if (error) {
  //     errorElement =
  //         <p className='text-danger m-0'>Error: {error?.message.split(' ')[123]} </p>
  //        // console.log('masud',errorElement)
  // }

  return (
    <div className="container-xxl my-5 ">
      <PageTitle pageTitle="Registration" />
      <div className="register">
        <div className="register-dev">
          <h4 className="text-center pt-4" style={{ fontFamily: "Algerian" }}>
            New Account
          </h4>

          <div className="register-form-dev">
            <form onSubmit={handleSubmit(onFinish)}>
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name", { required: true })}
                />
              </div>

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
              <div>
                <input
                  className="reg-submit-input"
                  type="submit"
                  value="Create Account"
                  required
                />
              </div>
            </form>
          </div>
          <p className="text-center m-0 p-0">
            {/* <small>{errorElement}</small> */}
          </p>
          <p className="text-center">
            <small>
              Alrady have an account?
              <Link to="/login" style={{ textDecoration: "none" }}>
                <span style={{ color: "purple" }}> Login</span>
              </Link>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
