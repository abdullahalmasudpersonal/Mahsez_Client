import "./Dashboard.css";
import profileImg from "../../../../public/assets/img/profile/profile.png";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { useGetMyProfileQuery } from "../../../redux/features/user/userApi";
import logo from "../../../../public/assets/img/logo/mahsez.png";
import { Typography } from "antd";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { data: userData } = useGetMyProfileQuery({});
  const { role } = userData?.data?.user || {};
  const admin = role === "admin";
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="dashboardNavber">
        <div className="container-xxl px-0">
          <div
            className="dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", height: "60px" }}
            >
              <Link to="/">
                <img src={logo} alt="log" height="45px" />
              </Link>
            </div>
            <div>
              <Typography
                style={{
                  color: "rgb(255, 123, 0)",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                Dashboard
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className="breadcrumb-bg">
        <div className="container-xxl">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 ">
              <li className="breadcrumb-item">
                <Link to="/">
                  <FontAwesomeIcon
                    icon={faHome}
                    className="breadcrumb-home-btn"
                  />
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="home-bg">
        <div className="container-xxl px-0 py-4">
          <div className="dashboard">
            <div className="dashboard-dev1">
              <img width="60px" src={profileImg} alt="" />
              <h5 className="text-center mt-2 " style={{ color: "black" }}>
                {userData?.data?.name}
              </h5>
              <Link to="/dashboard">
                <button
                  className={location.pathname === "/dashboard" ? "active" : ""}
                >
                  My Profile
                </button>
              </Link>
              {admin && (
                <Link to="/admin">
                  <button
                    className={location.pathname === "/admin" ? "active" : ""}
                    style={{ color: "gray" }}
                  >
                    Admin Panel
                  </button>
                </Link>
              )}
              <Link to="/dashboard/my-order">
                <button
                  className={
                    location.pathname === "/dashboard/my-order" ? "active" : ""
                  }
                >
                  My Order
                </button>
              </Link>
              <Link to="/dashboard/my-payment">
                <button
                  className={
                    location.pathname === "/dashboard/my-payment"
                      ? "active"
                      : ""
                  }
                >
                  My Payment
                </button>
              </Link>
              {/*   <button>My Reviews</button>
              <button>Transactions</button>
              <button>Your Messages</button>
              <button>Accounts Settings</button> */}
              <button onClick={handleLogout}>Logout</button>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
