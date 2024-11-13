import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../../utils/formatDate";
import Loader from "../../shared/loader/Loader";
import PageTitle from "../../shared/PageTitle/PageTitle";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { useGetProdcutsQuery } from "../../../redux/features/product/productApi";
import { useGetBuyerOrderQuery } from "../../../redux/features/order/orderApi";
import { TProduct } from "../../../types/product.types";
import { TOrder } from "../../../types/order.types";
import { Button } from "antd";

const MyPayment = () => {
  const { data: myOrderData, isLoading: myOrderDataLoading } =
    useGetBuyerOrderQuery({});
  const { data: getProducts } = useGetProdcutsQuery({});

  return (
    <div className="dashboard-dev2">
      <PageTitle pageTitle="My Payments " />
      <div className="pt-4 px-4">
        <h5 className="fw-bold ">My Payments</h5>
      </div>
      <hr />
      <div className="p-3">
        {myOrderData?.data?.length < 1 ? (
          <div>
            <h5 className="text-center">Your order is empty</h5>
          </div>
        ) : (
          <>
            {myOrderDataLoading ? (
              <Loader />
            ) : (
              <>
                {myOrderData?.data?.map((order: TOrder) => (
                  <div className="my-single-order mb-3">
                    <div className="px-3 pt-3 pb-2 d-flex justify-content-between">
                      <div>
                        <h6 className="m-0 fw-bold">Order# {order?.orderId}</h6>
                        <p className="m-0">
                          Date:{" "}
                          {order?.createdAt ? formatDate(order.createdAt) : ""}
                        </p>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <h6 className="m-0">
                          <FontAwesomeIcon
                            icon={faMoneyCheck}
                            style={{ color: "orange" }}
                          />
                          &nbsp;
                          <span
                            className=""
                            style={{ color: "rgb(255, 77, 7)" }}
                          >
                            {order?.paymentStatus}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <hr className="m-0" />
                    <div className="mySingleOrderInfoDev">
                      <div>
                        {order?.items?.slice(0, 1)?.map((item) => {
                          const product = getProducts?.data?.find(
                            (prod: TProduct) => prod._id === item.product_id
                          );
                          return (
                            <>
                              <img
                                src={product?.image[0]}
                                width="50px"
                                height="50px"
                                alt={product?.name}
                              />
                              &nbsp;&nbsp;
                              <td>
                                {product?.name}
                                <br />
                                {order?.items?.length > 1 ? (
                                  <span style={{ color: "purple" }}>
                                    {order?.items?.length}&nbsp;Items
                                  </span>
                                ) : (
                                  <></>
                                )}
                              </td>
                            </>
                          );
                        })}
                      </div>
                      <div className="mySingleOrderInfoDevSecond">
                        <td
                          className="text-end align-middle fw-bold h5 mb-0"
                          style={{ border: "0" }}
                        >
                          {order.grandTotal}
                          <span style={{ fontSize: "22px" }}>৳</span>
                        </td>
                        <td
                          className="text-end p-0 align-middle"
                          style={{ border: "0", width: "70px" }}
                        >
                          <Button
                            color="default"
                            variant="solid"
                            style={{
                              backgroundColor: "rgba(255, 117, 25, 0.801)",
                            }}
                            // onClick={() => navigateToOrderDetail(order._id)}
                          >
                            Pay
                          </Button>
                        </td>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyPayment;

/* 
  <div className="p-3">
        {paymentData?.data?.length < 1 ? (
          <div>
            <h5 className="text-center">Your order is empty</h5>
          </div>
        ) : (
          <>
            {paymentDataLoading ? (
              <Loader />
            ) : (
              <>
                {paymentData?.data?.map((payment: TPayment) => (
                  <div className="my-single-order mb-3">
                    <div className="px-3 pt-3 pb-2 d-flex justify-content-between">
                      <div>
                        <h6 className="m-0 fw-bold">
                          Order# {payment?.orderId}
                        </h6>
                        <p className="m-0">
                          Date:{" "}
                          {payment?.createdAt
                            ? formatDate(payment.createdAt)
                            : ""}
                        </p>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <h6 className="m-0">
                          <FontAwesomeIcon
                            icon={faClock}
                            style={{ color: "orange" }}
                          />
                          &nbsp;
                          <span className="" style={{ color: "purple" }}>
                            {payment?.orderStatus}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <hr className="m-0" />
                    <div className="mySingleOrderInfoDev">
                      <div>
                        {payment?.items?.slice(0, 1)?.map((item) => {
                          return (
                            <>
                              <img
                                src={item?.image}
                                width="50px"
                                height="50px"
                                alt={item?.name}
                              />
                              &nbsp;&nbsp;
                              <td>
                                {item?.name}
                                <br />
                                {payment?.items?.length > 1 ? (
                                  <span style={{ color: "purple" }}>
                                    {payment?.items?.length}&nbsp;Items
                                  </span>
                                ) : (
                                  <></>
                                )}
                              </td>
                            </>
                          );
                        })}
                      </div>
                      <div className="mySingleOrderInfoDevSecond">
                        <td
                          className="text-end align-middle fw-bold h5 mb-0"
                          style={{ border: "0" }}
                        >
                          {payment.amount}
                          <span style={{ fontSize: "22px" }}>৳</span>
                        </td>
                        <td
                          className="text-end p-0 align-middle"
                          style={{ border: "0", width: "70px" }}
                        >
                          <button type="button" className="btn btn-info">
                            View
                          </button>
                        </td>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>

*/
