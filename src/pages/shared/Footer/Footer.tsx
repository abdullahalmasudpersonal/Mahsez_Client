import "./Footer.css";
import img from "../../../assets/img/logo/mahsez.png";
import bkash from "../../../assets/img/payment/bkash.png";
import nagod from "../../../assets/img/payment/nagod.png";
import rocket from "../../../assets/img/payment/rocket.png";
import sureCash from "../../../assets/img/payment/sureCash.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer2-bg">
        <footer className="text-center text-lg-start container-xxl">
          <section className="d-flex justify-content-center justify-content-lg-between py-4 border-bottom">
            <div className=" d-none d-lg-block d-flex align-items-center">
              <span>Get connected with us on social networks:</span>
            </div>
            <div className="footer-socila-media">
              <a
                href="https://www.facebook.com/m.mahsezs"
                target="noopener"
                className=" text-reset"
                style={{ padding: "6px 13px", backgroundColor: "	#4267B2" }}
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.youtube.com/@Mahsez"
                target="noopener"
                className=" text-reset"
                style={{ padding: "6px 9px", backgroundColor: "	#FF0000" }}
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a
                href="https://twitter.com/m_mahsez"
                target="noopener"
                className=" text-reset"
                style={{ padding: "6px 10px", backgroundColor: "#1DA1F2" }}
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com/m.mahsez"
                target="noopener"
                className=" text-reset instagram-footer-bd-color"
                style={{ padding: "6px 11px", backgroundColor: "	#feda75 " }}
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="linkedIn.com"
                className=" text-reset"
                target="noopener"
                style={{ padding: "6px 11px", backgroundColor: "	#0072b1 " }}
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </section>
          <section className="">
            <div className=" text-center text-md-start mt-5">
              <div className="row">
                <div className="col-md-3 col-lg-4 col-xl-3 ms-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    <img width="140px" src={img} alt="" />
                  </h6>
                  <p>
                    Here islamic clothing, beauty, perfume, halal food, bags,
                    computers, electronics, sports and other sunnat products.
                  </p>
                </div>

                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                  <p>
                    <a className="text-reset">Apple</a>
                  </p>
                  <p>
                    <a className="text-reset">Micorsofet</a>
                  </p>
                  <p>
                    <a className="text-reset">Lenovo</a>
                  </p>
                  <p>
                    <a className="text-reset">Laravel</a>
                  </p>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                  <p>
                    <Link
                      to="/privacy_policy"
                      style={{ textDecoration: "none", color: "white" }}
                      target="_black"
                    >
                      <a>Privacy Policy</a>
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/terms_condition"
                      style={{ textDecoration: "none", color: "white" }}
                      target="_blank"
                    >
                      <a>Terms & Conditions</a>
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="aboutUs"
                      style={{ textDecoration: "none", color: "white" }}
                      target="_blank"
                    >
                      <a>About Us</a>
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="blogs"
                      style={{ textDecoration: "none", color: "white" }}
                      target="_blank"
                    >
                      <a>Blogs</a>
                    </Link>
                  </p>
                </div>
                <div className="col-md-4 col-lg-3 col-xl-3 me-0 mb-4 px-0">
                  <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                  <p>
                    <i className="fas fa-home me-3"></i>South Jatrabari,
                    Dhaka-1204
                  </p>
                  <p>
                    <i className="fas fa-envelope me-3"></i>
                    m.mahsez@gmail.com
                  </p>
                  <p>
                    <i className="fas fa-phone me-3"></i> + 880 1737906772
                  </p>
                  <p>
                    <i className="fas fa-phone me-3"></i> + 880 1445678999
                  </p>
                </div>
              </div>
            </div>
          </section>
        </footer>
        <div className="text-center p-3 footer-bottem-part ">
          <div className="container-xxl footer-bottem-part-dev">
            <div className="d-flex align-items-center">
              <a>Copyright &#169; 2023 mahsez.com || All Rights Reserved</a>
            </div>
            <div className="footer-payment-cart">
              <img src={bkash} alt="" />
              <img src={nagod} alt="" />
              <img src={rocket} alt="" />
              <img src={sureCash} alt="" />
              <img src={bkash} alt="" />
              <img src={nagod} alt="" />
              <img src={rocket} alt="" />
              <img src={sureCash} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
