import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";
// import ProductDetailReVe from "../ProductDetailReVe/ProductDetailReVe";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import PageTitle from "../../shared/PageTitle/PageTitle";
import CreateReview from "./CreateReview";
import ProductDesWR from "../ProductDesWR/ProductDesWR";
import { useAppDispatch } from "../../../redux/hooks";
import { addToCart } from "../../../redux/features/shoppingCart/shoppingCartSlice";
import { toast } from "sonner";
import { useGetSingleProdcutQuery } from "../../../redux/features/product/productApi";

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const { data: productDetails } = useGetSingleProdcutQuery(productId);

  const {
    _id,
    name,
    category,
    brand,
    image,
    availableQuantity,
    price,
    offerPrice,
    regularPrice,
    weight1,
  } = productDetails?.data || {};

  const handleIncrement = () => {
    if (quantity < availableQuantity && quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = (_id: string) => {
    if (quantity < availableQuantity && quantity < 10) {
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
  };

  return (
    <div className="productDetail">
      <PageTitle pageTitle={`${name}`} />
      <div className="productDetailDev">
        <div className="productDetailDevFrist">
          <Carousel className="text-center pro-detail-casual">
            {image?.map((img: string, index: number) => (
              <div key={index}>
                <img src={img} />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="productDetailDevSecond">
          <p className="mb-0">{category}</p>
          <h4 className="mb-2">{name}</h4>
          <p className=" mb-0">
            <small>4.5 </small>
            <FontAwesomeIcon
              icon={faStar}
              style={{ color: "gray", width: "13px" }}
            />
            <FontAwesomeIcon
              icon={faStar}
              style={{ color: "gray", width: "13px" }}
            />
            <FontAwesomeIcon
              icon={faStar}
              style={{ color: "gray", width: "13px" }}
            />
            <FontAwesomeIcon
              icon={faStar}
              style={{ color: "gray", width: "13px" }}
            />
            <FontAwesomeIcon
              icon={faStar}
              style={{ color: "gray", width: "13px" }}
            />
            <small> (27) </small>
            <small>
              &nbsp;{" "}
              <span
                data-bs-toggle="modal"
                data-bs-target="#writeAReview"
                className="review-btn"
              >
                Write a reviews
              </span>
            </small>
            {productDetails && <CreateReview productDetails={productDetails} />}
          </p>

          <p className="product-dev-p pt-2">
            {offerPrice ? (
              <h4>
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
              </h4>
            ) : (
              <h4>
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

                {regularPrice ? (
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
                ) : (
                  ""
                )}
              </h4>
            )}
          </p>

          <div className="attar-detail-dev-table">
            <div className="d-flex ">
              <div className="">
                <p>Brand:</p>
                <p>Weight:</p>
                <p>Availability:</p>
              </div>
              <div style={{ marginLeft: "120px" }}>
                <p>{brand}</p>
                <p>{weight1} ML</p>
                <p>{availableQuantity} Pcs</p>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <p className="mb-2">Quantity:</p>
            <div className="attar-detail-quantity-counter">
              <div className="attar-detail-quantity-counter-p">
                <p style={{ color: "gray" }} className="m-0 fw-bold">
                  {quantity}
                </p>
              </div>
              <div className="d-grid attar-detail-quantity-counter-dev">
                <button
                  onClick={handleIncrement}
                  className="p-0"
                  disabled={quantity === 10}
                >
                  <i
                    style={{ color: "gray" }}
                    className="fa fa-angle-up px-2 "
                  ></i>
                </button>
                <button
                  onClick={handleDecrement}
                  className="p-0"
                  disabled={quantity === 1}
                >
                  <i
                    style={{ color: "gray" }}
                    className="fa fa-angle-down px-2"
                  ></i>
                </button>
              </div>
            </div>
          </div>

          {availableQuantity < 1 ? (
            <div className="mt-4">
              <button className="outOfStock-btn" disabled>
                Out Of Stock
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <Link to="/shopping_cart">
                <button className="add-to-cart mb-3">Buy Now</button>
              </Link>{" "}
              &nbsp; &nbsp; &nbsp;
              <button
                className="add-to-cart"
                onClick={() => handleAddToCart(_id)}
              >
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
      <ProductDesWR /* productDetails={productDetails} */ />
      {/*    <ProductDetailReVe /> */}
    </div>
  );
};

export default ProductDetails;
