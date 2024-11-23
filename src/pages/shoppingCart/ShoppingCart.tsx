import React from "react";
import { useDispatch } from "react-redux";
import PageTitle from "../shared/PageTitle/PageTitle";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./ShoppingCart.css";
import {
  decrementQuantity,
  incrementQuantity,
  removeProduct,
} from "../../redux/features/shoppingCart/shoppingCartSlice";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import { TProduct } from "../../types/product.types";

const ShoppingCart: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.shopping.cart);
  const { data: products } = useGetProductsQuery({});

  const cartDetails = cart.map((cartItem) => {
    const product = products?.data.find(
      (item: TProduct) => item._id === cartItem._id
    );
    return {
      ...cartItem,
      ...product,
    };
  });

  const handleRemoveProduct = (_id: string) => {
    dispatch(removeProduct(_id));
  };

  const handleIncrement = (id: string) => {
    dispatch(incrementQuantity(id));
  };
  const handleDecrement = (id: string) => {
    dispatch(decrementQuantity(id));
  };

  const subTotal = cartDetails.reduce((total, item) => {
    const itemPrice = item.offerPrice
      ? Number(item.offerPrice)
      : Number(item.price);
    return total + itemPrice * (item.quantity || 0);
  }, 0);

  const delivaryCharge = 100;
  const grandTotal = subTotal + delivaryCharge;

  const disabled = cartDetails?.length < 1;

  return (
    <>
      <div className="home-bg py-3">
        <PageTitle pageTitle="Shopping Cart"></PageTitle>
        <div className="container-xxl cart-bg p-3">
          <h4 className="mb-4">Shopping Cart</h4>
          <div className="table-responsive-sm">
            {cart?.length === 0 ? (
              <p>No item in cart</p>
            ) : (
              <table className="table  table-hover">
                <thead className="cart-table-head">
                  <tr>
                    <th scope="col" className="mobile-cart">
                      Image
                    </th>
                    <th scope="col">Product Name</th>
                    <th scope="col" className="mobile-cart">
                      Brand
                    </th>
                    <th scope="col" className="text-center">
                      Price
                    </th>
                    <th scope="col" className="text-center">
                      Quantity
                    </th>
                    <th scope="col" className="text-center">
                      Remove
                    </th>
                    <th scope="col" className="text-end mobile-cart">
                      Unit
                    </th>
                    <th scope="col" className="text-end">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody className="cart-table-body">
                  {cartDetails.map((product) => (
                    <tr key={product._id}>
                      <th scope="row" className="mobile-cart">
                        <img
                          src={product?.image?.[0]}
                          alt=""
                          width="50px"
                          height="50px"
                        />
                      </th>
                      <td className="align-middle">
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={`/categore/product/${product?._id}`}
                        >
                          <span style={{ cursor: "pointer" }}>
                            {product.name}
                          </span>
                        </Link>
                      </td>
                      <td className="mobile-cart">{product?.brand}</td>
                      <td className="mobile-cart">
                        {product?.offerPrice
                          ? product?.offerPrice
                          : product?.price}
                      </td>

                      <td className="align-middle">
                        <div className="d-flex justify-content-center">
                          <div className="attar-detail-quantity-counter">
                            <div className="attar-detail-quantity-counter-p">
                              <p
                                style={{ color: "gray" }}
                                className="m-0 fw-bold"
                              >
                                {product?.quantity}
                              </p>
                            </div>
                            <div className="d-grid attar-detail-quantity-counter-dev">
                              <button
                                onClick={() => handleIncrement(product?._id)}
                                className="p-0"
                                disabled={product?.quantity === 10}
                              >
                                <i
                                  style={{ color: "gray" }}
                                  className="fa fa-angle-up px-2 "
                                ></i>
                              </button>
                              <button
                                onClick={() => handleDecrement(product?._id)}
                                className="p-0"
                                disabled={product?.quantity === 1}
                              >
                                <i
                                  style={{ color: "gray" }}
                                  className="fa fa-angle-down px-2"
                                ></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="text-center align-middle">
                        <button
                          style={{
                            border: "none",
                            background: "none",
                            padding: "0",
                          }}
                          onClick={() => handleRemoveProduct(product?._id)}
                        >
                          <FontAwesomeIcon
                            className="cart-product-remove"
                            icon={faTrashAlt}
                          />
                        </button>
                      </td>
                      <td className="text-end mobile-cart align-middle">
                        {product.quantity}
                      </td>
                      <td className="text-end align-middle">
                        {product?.quantity *
                          Number(
                            product?.offerPrice
                              ? product?.offerPrice
                              : product?.price
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="">
            <h6 className="justify-content-end h5 d-flex">
              {" "}
              Sub Total:{" "}
              <article
                className="text-end"
                style={{ width: "150px", color: "rgb(13, 0, 44)" }}
              >
                {subTotal}
                <span
                  style={{
                    fontFamily: "Sans-Serif",
                    fontWeight: "bold",
                    fontSize: "17px",
                  }}
                >
                  ৳
                </span>
              </article>
            </h6>
            <h6 className="justify-content-end h5 d-flex">
              Condition Charge:{" "}
              <article
                className="text-end"
                style={{ width: "150px", color: "rgb(13, 0, 44)" }}
              >
                {delivaryCharge}
                <span
                  style={{
                    fontFamily: "Sans-Serif",
                    fontWeight: "bold",
                    fontSize: "17px",
                  }}
                >
                  ৳
                </span>
              </article>
            </h6>
            <h6 className="justify-content-end h5 d-flex">
              {" "}
              Grand Total:{" "}
              <article
                className="text-end"
                style={{ width: "150px", color: "rgb(13, 0, 44)" }}
              >
                {grandTotal}
                <span
                  style={{
                    fontFamily: "Sans-Serif",
                    fontWeight: "bold",
                    fontSize: "17px",
                  }}
                >
                  ৳
                </span>
              </article>
            </h6>
          </div>

          <div className="d-flex flex-row-reverse mt-4">
            <Link to="/checkout">
              <button
                className={disabled ? "checkout-btn-disabled" : "checkout-btn"}
                disabled={cartDetails?.length < 1}
              >
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
