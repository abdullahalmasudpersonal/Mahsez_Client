// import React from 'react';
// import auth from '../../../firebase.init';
import { Link } from "react-router-dom";
import PageTitle from "../../shared/PageTitle/PageTitle";
import "./Register.css";
// import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import UseToken from '../../../Hooks/UseToken/UseToken';
// import PageTitle from '../../Shared/PageTitle/PageTitle';

const Register = () => {
  // const [
  //     createUserWithEmailAndPassword,
  //     user,
  //     loading,
  //     error,
  // ] = useCreateUserWithEmailAndPassword(auth);
  // const [updateProfile, updating, UpdateError] = useUpdateProfile(auth);

  // const [token] = UseToken(user);

  // const navigate = useNavigate();
  // const location = useLocation();
  // let from = location.state?.from?.pathname || '/';

  // if (token) {
  //     navigate(from, { replace: true });
  // }

  // const handleRegister = async (event) => {
  //     event.preventDefault();
  //     const fullName = event.target.firstName.value;
  //     //  const lustName = event.target.lustName.value;
  //     const email = event.target.email.value;
  //     const password = event.target.password.value;
  //     await createUserWithEmailAndPassword(email, password);
  //     await updateProfile({ displayName: fullName });

  //    // console.log(updateProfile)
  // }

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
            <form /* onSubmit={handleRegister} */>
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="firstName"
                  required
                />
              </div>
              {/* <div>
                                <input type='text' placeholder='Lust Name' name='lustName' required />
                            </div> */}
              <div>
                <input type="email" placeholder="Email" name="email" required />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                />
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
          {/* <p className='text-center m-0 p-0'><small>{errorElement}</small></p> */}
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
