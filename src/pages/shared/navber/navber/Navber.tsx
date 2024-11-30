import "./Navber.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../../public/assets/img/logo/mahsez.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAlignJustify,
  faCaretDown,
  faClose,
  faHeadset,
  faHeart,
  faSearch,
  faShoppingCart,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  logout,
  selectCurrentUser,
} from "../../../../redux/features/auth/authSlice";
import profileImg from "../../../../../public/assets/img/profile/profile.png";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import MobileSideber from "../MobileSideber/MobileSideber";
import PcSearchBer from "../pcSearchBer/PcSearchBer";
import { Dropdown, MenuProps, Typography } from "antd";

const Navber = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [shadow, setShadow] = useState(false);
  const navigate = useNavigate();

  const cartLength = useAppSelector((state) => state.shopping.cart.length);

  const changeShadow = () => {
    if (window.scrollY >= 80) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };
  window.addEventListener("scroll", changeShadow);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const items: MenuProps["items"] = [
    {
      key: "2",
      label: (
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          Dashboard
        </Link>
      ),
    },
    {
      key: "3",
      label: <Typography onClick={handleLogout}>Logout</Typography>,
    },
  ];

  const isAdmin = user?.role === "admin";

  if (isAdmin) {
    items.push({
      key: "1",
      label: (
        <Link to="/admin" style={{ textDecoration: "none" }}>
          Admin Panel
        </Link>
      ),
    });
  }

  return (
    <>
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
                  <li>SIGN IN</li>
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
              <p className="m-0">Call us now : (+88) 01737-906772</p>
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
                    <MobileSideber />
                  </div>
                </div>
              </div>
              <div>
                <Link to="/">
                  <img width="105px" src={logo} alt="" />
                </Link>
              </div>
              <div className="mobile-screen-top-part pt-1">
                {cartLength > 0 ? (
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
                        {cartLength}
                      </span>
                    </button>
                  </Link>
                ) : (
                  <button
                    className="position-relative p-0 pe-3"
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "auto",
                    }}
                    title="No cart items!"
                  >
                    <FontAwesomeIcon
                      className="top-right-btn"
                      icon={faShoppingCart}
                    />
                    <span
                      className="position-absolute translate-middle badge rounded-pill"
                      style={{ color: "", backgroundColor: "orangered" }}
                    >
                      {cartLength}
                    </span>
                  </button>
                )}
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
          <PcSearchBer />
          {/* ------------------ end pc search ber  ------------------------------ */}

          <div className="header2-lust-part pe-2">
            <FontAwesomeIcon className="heart-cart" icon={faHeart} />
            {cartLength > 0 ? (
              <Link to="/shopping_cart" className="ms-3">
                <FontAwesomeIcon
                  className="shopping-cart"
                  icon={faShoppingCart}
                />
                <span className="position-absolute translate-middle badge rounded-pill cart-quantity-badge py-1 px-2 mt-1 ">
                  {cartLength}
                </span>
              </Link>
            ) : (
              <Link to="" className="ms-3" title="No Cart Items!">
                <FontAwesomeIcon
                  className="shopping-cart"
                  icon={faShoppingCart}
                />
                <span className="position-absolute translate-middle badge rounded-pill cart-quantity-badge py-1 px-2 mt-1 ">
                  {cartLength}
                </span>
              </Link>
            )}

            {user ? (
              // <Link to="/dashboard" className="ms-3">
              //   <img width="32px" src={profileImg} alt="" />
              // </Link>
              <Dropdown
                menu={{ items }}
                placement="bottomRight"
                arrow
                className="ms-3"
              >
                <img
                  width="32px"
                  height="32px"
                  src={profileImg}
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </Dropdown>
            ) : (
              <Link to="/login" className="ms-3">
                <FontAwesomeIcon className="shopping-cart" icon={faUserAlt} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navber;
