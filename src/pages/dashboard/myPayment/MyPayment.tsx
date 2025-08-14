import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../../utils/formatDate";
import Loader from "../../shared/loader/Loader";
import PageTitle from "../../shared/PageTitle/PageTitle";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { useGetProductsQuery } from "../../../redux/features/product/productApi";
import { useGetBuyerOrderQuery } from "../../../redux/features/order/orderApi";
import { TProduct } from "../../../types/product.types";
import { TOrder } from "../../../types/order.types";
import { Button, Spin } from "antd";
import { useInitPaymentMutation } from "../../../redux/features/payment/paymentApi";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const MyPayment = () => {
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const {
    data: myOrderData,
    isLoading: myOrderDataLoading,
    refetch,
  } = useGetBuyerOrderQuery({
    pollingInterval: 2000,
    skipPollingIfUnfocused: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 2000);
    return () => clearInterval(interval);
  }, [refetch]);

  const { data: getProducts } = useGetProductsQuery({});
  const [initPayment] = useInitPaymentMutation({});

  const handlePayment = async (orderId: string) => {
    setLoadingStates((prev) => ({ ...prev, [orderId]: true }));
    try {
      const res = await initPayment(orderId).unwrap();
      window.open(`${res?.data?.paymentUrl}`, "_blank");
    } catch (error) {
      console.error("Payment Error:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  return (
    <div className="dashboard-dev2">
      <PageTitle pageTitle="My Payments " />
      <div className="py-4 px-4" style={{ backgroundColor: '#002952ff',borderRadius:'5px 5px 0 0' }}>
        <h5 className="fw-bold m-0" style={{ color: 'white' }}>My Payments</h5>
      </div>
      {/* <hr /> */}
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
                  <div className="my-single-order mb-3" data-aos="fade-zoom-in" >
                    <div className="px-3 pt-3 pb-2 d-flex justify-content-between" style={{ color: 'white',backgroundColor: '#1c548dff', borderRadius:'5px 5px 0 0' }}>
                      <div>
                        <h6 className="m-0 fw-bold">Order# {order?.orderId}</h6>
                        <p className="m-0">
                          Date:{" "}
                          {order?.createdAt ? formatDate(order.createdAt) : ""}
                        </p>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <h6 className="m-0">
                          {order?.paymentStatus === "PAID" ? (
                            <>
                              <FontAwesomeIcon
                                icon={faMoneyCheck}
                                style={{ color: "rgb(15, 175, 0)" }}
                              />
                            </>
                          ) : (
                            <FontAwesomeIcon
                              icon={faMoneyCheck}
                              style={{ color: "rgb(255, 114, 58)" }}
                            />
                          )}
                          &nbsp;
                          <span>
                            {order?.paymentStatus === "PAID" ? (
                              /*  <Button
                                style={{
                                  backgroundColor: "rgb(138, 0, 218)",
                                  color: "#fff",
                                  border: "none",
                                }}
                              >
                                Details
                              </Button> */
                              <span style={{ color: "rgb(15, 175, 0)" }}>
                                {order?.paymentStatus}
                              </span>
                            ) : (
                              /*  <span style={{ color: "rgb(15, 175, 0)" }}>
                                {order?.paymentStatus}
                              </span> */
                              <span style={{ color: "rgb(255, 77, 7)" }}>
                                {order?.paymentStatus}
                              </span>
                            )}
                          </span>
                        </h6>
                      </div>
                    </div>
                    {/* <hr className="m-0" /> */}
                    <div className="mySingleOrderInfoDev">
                      <div>
                        {order?.items?.slice(0, 1)?.map((item) => {
                          const product = getProducts?.data?.find(
                            (prod: TProduct) => prod._id === item.product_id
                          );
                          return (
                            <>
                              {product?.image
                                ?.slice(0, 1)
                                .map((img: string) => (
                                  <img
                                    src={
                                      img.includes("res.cloudinary.com")
                                        ? img.replace(
                                            "/upload/",
                                            "/upload/f_auto,q_auto/w_50/"
                                          )
                                        : img
                                    }
                                    alt={product?.name}
                                    loading="lazy"
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      marginRight: "10px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                ))}
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
                          {order?.paymentStatus === "PAID" ? (
                            <Button
                              color="default"
                              variant="solid"
                              style={{
                                color: "white",
                                backgroundColor: "rgb(13, 160, 0)",
                              }}
                              disabled={order?.paymentStatus === "PAID"}
                            >
                              PAID
                            </Button>
                          ) : (
                            <Button
                              disabled={loadingStates[order.orderId]}
                              color="default"
                              variant="solid"
                              style={{
                                backgroundColor: "rgba(255, 117, 25, 0.801)",
                              }}
                              onClick={() => handlePayment(order.orderId)}
                            >
                              {loadingStates[order.orderId] && (
                                <Spin
                                  indicator={
                                    <LoadingOutlined color="white" spin />
                                  }
                                  size="small"
                                />
                              )}
                              Pay
                            </Button>
                          )}
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
