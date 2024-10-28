import "./Header.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../Assets/img/logo/mahsez (2).png";
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

const Navber = () => {
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

              <Link to="/login" style={{ textDecoration: "none" }}>
                <li>SIGN IN</li>
              </Link>

              {/*   {user ? (
              <li style={{ cursor: "pointer" }} onClick={logout}>
                SIGN OUT
              </li>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <li>SIGN IN</li>
              </Link>
            )} */}
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
                      {/* {cart.length} */}
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
          {/* <PcSearchber /> */}
          {/* ------------------ end pc search ber  ------------------------------ */}

          <div className="header2-lust-part pe-2">
            <FontAwesomeIcon className="heart-cart" icon={faHeart} />
            <Link to="/shopping_cart" className="ms-3">
              <FontAwesomeIcon
                className="shopping-cart"
                icon={faShoppingCart}
              />
              <span className="position-absolute translate-middle badge rounded-pill cart-quantity-badge py-1 px-2 mt-1 ">
                {/* {cart.length} */}
                {/*  {cart.map(products=> <>{products.quantity}</>)} */}
              </span>
            </Link>
            {/* {user ? (
              <Link to="/dashboard" className="ms-3">
                <img width="32px" src={profileImg} alt="" />
              </Link>
            ) : (
              <Link to="/login" className="ms-3">
                <FontAwesomeIcon className="shopping-cart" icon={faUserAlt} />
              </Link>
            )} */}
            <Link to="/login" className="ms-3">
              <FontAwesomeIcon className="shopping-cart" icon={faUserAlt} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navber;
