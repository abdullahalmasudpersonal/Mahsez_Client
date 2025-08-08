import "./BottemHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBlog,
  faGifts,
  faHome,
  // faShoppingCart,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import profileImg from "../../../../../public/assets/img/profile/profile.png";
import { useAppSelector } from "../../../../redux/hooks";
import { selectCurrentUser } from "../../../../redux/features/auth/authSlice";

// The BottemHeader Only mobile views /////////////////////////////
const BottemHeader = () => {
  const user = useAppSelector(selectCurrentUser);
  // const cartLength = useAppSelector((state) => state.shopping.cart.length);

  return (
    <>
      <>
        <div className="bottemHeader sticky-bottom">
          <div className="bottemHeader-dev">
            <Link to="/" className="header-buttom-btn">
              <div>
                <div>
                  <FontAwesomeIcon icon={faHome} />
                </div>
                <p className="m-0 p-0">
                  <small>Home</small>
                </p>
              </div>
            </Link>
            <Link to="/offers" className="header-buttom-btn">
              <div>
                <div>
                  <FontAwesomeIcon icon={faGifts} />
                </div>
                <p className="m-0 p-0">
                  <small>Offers</small>
                </p>
              </div>
            </Link>
            <Link to="/blogs" className="header-buttom-btn">
              <div>
                <div>
                  <FontAwesomeIcon icon={faBlog} />
                </div>
                <p className="m-0 p-0">
                  <small>Blogs</small>
                </p>
              </div>
            </Link>
            {/* <Link to="/shopping_cart" className="header-buttom-btn">
              <div className="position-relative">
                <span className="header-buttom-cart-quantity">
                  {cartLength}
                </span>
                <div>
                  <FontAwesomeIcon icon={faShoppingCart} />
                </div>

                <p className="m-0 p-0">
                  <small>Cart</small>
                </p>
              </div>
            </Link> */}
            {user ? (
              <Link to="/dashboard" className="header-buttom-btn">
                <div>
                  <div>
                    <img width="18px" src={profileImg} alt="" />
                  </div>
                  <p className="m-0 p-0 mt-0 pt-0">
                    <small className="mt-0 pt-0">Profile</small>
                  </p>
                </div>
              </Link>
            ) : (
              <Link to="/login" className="header-buttom-btn">
                <div>
                  <div>
                    <FontAwesomeIcon icon={faUserAlt} />
                  </div>
                  <p className="m-0 p-0 ">
                    <small>Account</small>
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default BottemHeader;
