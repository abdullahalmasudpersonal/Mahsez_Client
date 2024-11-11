import "./HomeProduct.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { TProduct } from "../../../types/product.types";

const HomeProduct = (product: TProduct) => {
  const navigate = useNavigate();

  const {
    _id,
    // brand,
    name,
    // availableQuantity,
    offerPrice,
    // weight1,
    regularPrice,
    image,
  } = product;

  const navigateToProductDetails = (_id: string) => {
    navigate(`/categore/product/${_id}`);
  };

  return (
    <div className="homeProduct">
      <div className="homeProductImg">
        {image && image.length > 0 ? (
          <img
            src={image[0]}
            alt=""
            className="img-fluid"
            style={{ borderRadius: "2px 2px 0 0" }}
          />
        ) : (
          <p>No image available</p>
        )}
      </div>
      <div className="px-2 pt-2">
        <h6
          className="homeProductName text-center mb-1 mt-2 m-0 p-0"
          onClick={() => navigateToProductDetails(_id)}
          data-toggle="tooltip"
          data-placement="right"
          title={name}
        >
          {name.length > 45 ? name.slice(0, 45) + "..." : name}
        </h6>
      </div>
      <div className="homeProductReview">
        <p className="text-center m-0">
          <small>4.5 </small>
          <FontAwesomeIcon
            icon={faStar}
            style={{ color: "rgb(255, 119, 0)", width: "13px" }}
          />
          <FontAwesomeIcon
            icon={faStar}
            style={{ color: "rgb(255, 119, 0)", width: "13px" }}
          />
          <FontAwesomeIcon
            icon={faStar}
            style={{ color: "rgb(255, 119, 0)", width: "13px" }}
          />
          <FontAwesomeIcon
            icon={faStar}
            style={{ color: "rgb(255, 119, 0)", width: "13px" }}
          />
          <FontAwesomeIcon
            icon={faStar}
            style={{ color: "rgb(255, 119, 0)", width: "13px" }}
          />
          <small> (27)</small>
        </p>
      </div>
      <div className="homeProductPrice">
        <p className="text-center m-0">
          {offerPrice ? (
            <p className="">
              <span
                style={{
                  fontSize: "14px",
                  fontFamily: "Optima",
                  fontWeight: "bold",
                }}
              >
                ৳
              </span>
              <span>{offerPrice}.00 &nbsp;</span>

              <span
                style={{
                  fontSize: "13px",
                  fontFamily: "Optima",
                  fontWeight: "bold",
                  color: "gray",
                  textDecoration: "line-through 1px",
                }}
              >
                ৳ {regularPrice}.00
              </span>
            </p>
          ) : (
            <p>
              <span>
                <span
                  style={{
                    fontSize: "15px",
                    fontFamily: "Optima",
                    fontWeight: "bold",
                  }}
                >
                  ৳
                </span>
                {regularPrice}.00
              </span>
            </p>
          )}
        </p>
      </div>
    </div>
  );
};

export default HomeProduct;
