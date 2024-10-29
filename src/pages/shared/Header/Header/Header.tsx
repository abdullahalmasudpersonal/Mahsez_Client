import { useState } from "react";
import "./Header.css";
import logo from "../../../../Assets/img/logo/mahsez (2).png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignJustify,
  faHeadset,
  faShoppingCart,
  faCaretDown,
  //   faUserAlt,
  faSearch,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
// import profileImg from "../../../../Assets/img/profile/profile.png";
import { Link } from "react-router-dom";
import {
  logout,
  selectCurrentUser,
} from "../../../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
// import { useAuthState } from 'react-firebase-hooks/auth';
// import auth from '../../../../firebase.init';
// import MobileSideber from '../MobileSideber/MobileSideber';
// import { signOut } from 'firebase/auth';
// import { ProductContext } from '../../../../App';
// import PcSearchber from '../PcSearchber/PcSearchber';
// import useAdmin from '../../../../Hooks/UseAdmin/UseAdmin';
// import { Context } from '../../../../Context/AppContext';

const Header = () => {
  const user = useAppSelector(selectCurrentUser);
  console.log(user, "users");
  // const [user] = useAuthState(auth);
  // const [admin] = useAdmin(user);
  // const {cart, products } = useContext(Context);
  //   const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());

    // navigate("/");
  };

  /*     const countPendingOrder = allOrder.filter(status => status.status === 'Pending').length; */

  /* header scrolling */
  const [shadow, setShadow] = useState(false);
  const changeShadow = () => {
    if (window.scrollY >= 80) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };
  window.addEventListener("scroll", changeShadow);

  return (
    <>
      {/* <div className='text-center fw-bold' style={{ background: 'red', color: 'white' }}>
                <p className='m-0 p-0'>The website is a work in progress. It is not in service yet.</p>
            </div> */}
      {/* ---------Part 1 ----------- */}
      <div
        className={shadow ? "sticky-top  header-shadow " : "header-bg-color"}
      >
        <div
          className="container-xxl d-flex justify-content-between align-items-center responsive-header"
          style={{ padding: "5px " }}
        >
          <div>
            <Link to="/">
              <img width="130px" src={logo} alt="" />
            </Link>
          </div>
          <div>
            <ul
              className="header-p1-ul m-0 p-0"
              style={{ listStyleType: "none" }}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                <li>HOME</li>
              </Link>
              <Link to="/offers" style={{ textDecoration: "none" }}>
                <li>OFFERS</li>
              </Link>
              <li>FEATURES</li>
              <Link to="/blogs" style={{ textDecoration: "none" }}>
                <li>BLOGS</li>
              </Link>
              {user ? (
                <li style={{ cursor: "pointer" }} onClick={handleLogout}>
                  SIGN OUT
                </li>
              ) : (
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <li>SIGN INss</li>
                </Link>
              )}
            </ul>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <FontAwesomeIcon
                style={{
                  height: "48px",
                  width: "30px",
                  marginRight: "10px",
                  color: "#FF5733",
                }}
                icon={faHeadset}
              />
            </div>
            <div>
              <p className="m-0">Call us now : (+88) 01737-90677211</p>
              <p className="m-0">Email : m.mahsez@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="header-small-screen">
          <div className={shadow ? "sticky-top  header-shadow " : ""}>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ padding: "9px" }}
            >
              <div>
                <button
                  style={{
                    background: "none",
                    color: "black",
                    border: "none",
                    outline: "none",
                  }}
                  className=" mobile-collapse-btn"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasExample"
                  aria-controls="offcanvasExample"
                >
                  <FontAwesomeIcon
                    icon={faAlignJustify}
                    fontSize="20px"
                    style={{ padding: "0" }}
                  />
                </button>
                <div
                  style={{ width: "300px" }}
                  className="offcanvas offcanvas-start"
                  tabIndex={-1}
                  id="offcanvasExample"
                  aria-labelledby="offcanvasExampleLabel"
                >
                  <div className="offcanvas-header pb-0">
                    <button
                      type="button"
                      className="mobile-collapse-close-btn"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    >
                      <FontAwesomeIcon icon={faClose} />
                    </button>
                  </div>
                  <div className="offcanvas-body py-0 px-0">
                    {/* <MobileSideber /> */}
                  </div>
                </div>
              </div>
              <div>
                <Link to="/">
                  <img width="105px" src={logo} alt="" />
                </Link>
              </div>
              <div className="mobile-screen-top-part pt-1">
                <Link to="/shopping_cart">
                  <button
                    className="position-relative p-0 pe-3"
                    style={{ border: "none", background: "none" }}
                  >
                    <FontAwesomeIcon
                      className="top-right-btn"
                      icon={faShoppingCart}
                    />
                    <span
                      className="position-absolute translate-middle badge rounded-pill"
                      style={{ color: "", backgroundColor: "orangered" }}
                    >
                      {/* {cart.length}  */}
                    </span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="header2-part-2">
              <div className="header2-part-2-search">
                <input
                  className="header2-part2-search-ber"
                  placeholder="Looking your products"
                />
                <FontAwesomeIcon
                  className="header2-part-2-search-icon-mobile"
                  icon={faSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Header part 2 start ---------------- */}
      <div className="header-part2">
        <div className="container-xxl header-part2-dev">
          <div className="header2-catagories">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon className="" icon={faAlignJustify} />
              <h6 className=" ps-2">ALL CATAGORIES</h6>
            </div>
            <div>
              <FontAwesomeIcon className="caretdowncircle" icon={faCaretDown} />
            </div>
          </div>

          {/* ------------------ start pc search ber  ------------------------------ */}
          {/* <PcSearchber />   */}
          {/* ------------------ end pc search ber  ------------------------------ */}

          <div className="header2-lust-part pe-2">
            <FontAwesomeIcon className="heart-cart" icon={faHeart} />
            <Link to="/shopping_cart" className="ms-3">
              <FontAwesomeIcon
                className="shopping-cart"
                icon={faShoppingCart}
              />
              <span className="position-absolute translate-middle badge rounded-pill cart-quantity-badge py-1 px-2 mt-1 ">
                {/* {cart.length}  */}
                {/*  {cart.map(products=> <>{products.quantity}</>)} */}
              </span>
            </Link>
            {/* {
                            user ?
                                <Link to='/dashboard' className='ms-3'>
                                    <img width='32px' src={profileImg} alt='' />
                                </Link>
                                :
                                <Link to='/login' className='ms-3'>
                                    <FontAwesomeIcon className='shopping-cart' icon={faUserAlt} />
                                </Link>
                        } */}
          </div>
        </div>
      </div>

      {/* ---------------- Header part 2 responsive start ---------------- */}
      {/*  <div className='header2-part-2'>
                <div className='header2-part-2-search'>
                    <input className='header2-part2-search-ber' placeholder='Looking your products' />
                    <FontAwesomeIcon className='header2-part-2-search-icon-mobile' icon={faSearch} />
                </div>
            </div> */}
      {/* ---------------- Header part 2 responsive end ---------------- */}
    </>
  );
};

export default Header;
