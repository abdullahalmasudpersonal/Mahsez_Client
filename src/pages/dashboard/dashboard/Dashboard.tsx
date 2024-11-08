import "./Dashboard.css";
import profileImg from "../../../assets/img/profile/profile.png";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { useGetMyProfileQuery } from "../../../redux/features/user/userApi";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { data: userData } = useGetMyProfileQuery({});
  const { role } = userData?.data?.user || {};
  const admin = role === "admin";

  // const [user] = useAuthState(auth);
  // const user = useAppSelector(selectCurrentUser);
  // const [admin] = UseAdmin(user);
  // const navigate = useNavigate();
  // const logout = () => {
  //   signOut(auth);
  //   navigate('/');
  //   localStorage.removeItem('accessToken');

  const handleLogout = () => {
    dispatch(logout());
  };

  // }

  return (
    <>
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
              {/* <h5 className='text-center mt-2'>{user.displayName}</h5> */}
              <Link to="/dashboard">
                <button>My Profile</button>
              </Link>
              {/* <Link to="/dashboard/address">
                <button>Address</button>
              </Link>
              <Link to="/dashboard/myOrders">
                <button>My Orders</button>
              </Link> */}
              {admin && (
                <Link to="/admin">
                  <button style={{ backgroundColor: "purple" }}>
                    Admin Panel
                  </button>
                </Link>
              )}
              {/* <Link to="/shopping_Cart">
                <button>View Cart</button>
              </Link> */}
              <Link to="/dashboard/my-orders">
                <button>My Order</button>
              </Link>
              <button>My Reviews</button>
              <button>Transactions</button>
              <button>Your Messages</button>
              <button>Accounts Settings</button>
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
