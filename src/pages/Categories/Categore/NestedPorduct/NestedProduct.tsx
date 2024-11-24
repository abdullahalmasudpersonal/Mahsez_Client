import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "../NestedPorductsCSS/NestedProduct.css";
import { TProduct } from "../../../../types/product.types";

const NestedProduct = (product: TProduct) => {
  const {
    _id,
    name,
    image,
    availableQuantity,
    regularPrice,
    price,
    offerPrice,
  } = product;
  const navigate = useNavigate();

  const navigateToProductDetails = (_id: string) => {
    navigate(`/categore/product/${_id}`);
  };

  return (
    <div className="nestedProduct">
      <div className="nestedProductImg">
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
          className="nestedProductName text-center pb-1 m-0 p-0"
          onClick={() => navigateToProductDetails(_id)}
          data-toggle="tooltip"
          data-placement="right"
          title={name}
        >
          {name.length > 35 ? name.slice(0, 35) + "..." : name}
        </h6>
      </div>
      <div className="nestedProductReview">
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
      <div className="nestedProductPrice">
        <p className="text-center">
          {offerPrice ? (
            <p>
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
                ৳ {price}.00
              </span>
            </p>
          ) : (
            <p>
              <span
                style={{
                  fontSize: "14px",
                  fontFamily: "Optima",
                  fontWeight: "bold",
                }}
              >
                ৳
              </span>
              <span>{price}.00 &nbsp;</span>

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
          )}
        </p>
      </div>
      <>
        {availableQuantity < 1 ? (
          <div className="nestedProductOutOfCart">
            <button disabled>Out Of Stock</button>
          </div>
        ) : (
          <div className="nestedProductAddCart">
            <button /* onClick={() => handleAddToCard(nestedProduct)} */>
              <FontAwesomeIcon icon={faShoppingCart} />
              &nbsp; Add to Cart
            </button>
          </div>
        )}
      </>
    </div>
  );
};

export default NestedProduct;
