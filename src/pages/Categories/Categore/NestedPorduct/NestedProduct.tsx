import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "../NestedPorductsCSS/NestedProduct.css";
import { TProduct } from "../../../../types/product.types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { addToCart, removeProduct } from "@/redux/features/shoppingCart/shoppingCartSlice";
import { useState } from "react";

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
  const dispatch = useAppDispatch();
  const [quantity] = useState(1);
  const navigateToProductDetails = (_id: string) => {
    navigate(`/categore/product/${_id}`);
  };

  const cart = useAppSelector((state) => state.shopping.cart);
  const isInCart = cart.some((item: { _id: string }) => item._id === _id);

  const handleCartToggle = () => {
    if (isInCart) {
      // Remove from cart
      dispatch(removeProduct(_id));
      toast.success("Product removed from cart!", {
        position: "top-right",
        duration: 1500,
      });
    } else {
      // Add to cart
      if (quantity < availableQuantity && quantity <= 10) {
        dispatch(addToCart({ _id, quantity }));
        toast.success("Product added to cart!", {
          position: "top-right",
          duration: 1500,
        });
      } else {
        toast.error("Cannot add more products!", {
          position: "top-right",
          duration: 1500,
        });
      }
    }
  };

  return (
    <div className="nestedProduct" data-aos="fade-zoom-in">
      <div className="nestedProductImg">
        {image && image.length > 0 ? (
          <>
            {image?.slice(0, 1).map((img: string) => (
              <img
                src={
                  img.includes("res.cloudinary.com")
                    ? img.replace("/upload/", "/upload/f_auto,q_auto/w_245/")
                    : img
                }
                alt=""
                loading="lazy"
                className="img-fluid"
                style={{ borderRadius: "2px 2px 0 0" }}
              />
            ))}
          </>
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
            <button style={{backgroundColor: isInCart ? "rgba(255, 72, 0, 1)" : "",}}
              className={`${isInCart ? `remove-from-cart` : "add-to-cart"}`}
              onClick={handleCartToggle}
            >   <FontAwesomeIcon icon={faShoppingCart} /> &nbsp;
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        )}
      </>
    </div>
  );
};

export default NestedProduct;
