import {
  Button,
  Col,
  Form,
  Row,
  Select,
  Table,
  TableColumnsType,
  Typography,
} from "antd";
import PageTitle from "../../../shared/PageTitle/PageTitle";
import { Link, useParams } from "react-router-dom";
import { TOrderItem, TOrderItemCoustom } from "../../../../types/order.types";
import { TProduct } from "../../../../types/product.types";
import {
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
} from "../../../../redux/features/order/orderApi";
import { useGetProductsQuery } from "../../../../redux/features/product/productApi";
import { formatDate } from "../../../../utils/formatDate";
import { FieldValues } from "react-hook-form";

const { Option } = Select;
const OrderDetails = () => {
  const { orderId: orderNumber } = useParams();
  const { data: orderDetails } = useGetSingleOrderQuery(orderNumber);
  const { data: products } = useGetProductsQuery({});
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const {
    orderStatus,
    orderId,
    paymentNumber,
    name,
    address,
    district,
    contactNumber,
    subTotal,
    grandTotal,
    deliveryCharge,
    paymentStatus,
    items = [],
    createdAt,
    confirmOrder,
    confirmOrderDate,
    deliveredOrder,
    deliveredOrderDate,
    cancelOrder,
    cancelOrderDate,
    fakeOrder,
    fakeOrderDate,
  } = orderDetails?.data || {};

  let orderProducts: {
    product_id: string;
    image: string;
    name: string;
    price: number;
    quantity: number;
    total_price: number;
  }[] = [];

  if (Array.isArray(items)) {
    orderProducts = items.map((orderItem: TOrderItem) => {
      const productDetail = products?.data?.find(
        (item: TProduct) => item._id === orderItem.product_id
      );
      console.log(productDetail);
      return {
        product_id: orderItem.product_id,
        image: productDetail?.image || "No image available",
        name: productDetail?.name || "Unknown Product",
        price:
          productDetail?.offerPrice ||
          productDetail?.price ||
          productDetail?.offerPrice,
        quantity: orderItem.quantity,
        total_price: orderItem.total_price,
      };
    });
  } else {
    console.warn("Items is not an array.");
  }

  const dataTable = orderProducts.map((orderItem) => ({
    product_id: orderItem.product_id,
    image: orderItem.image,
    name: orderItem.name,
    price: orderItem.price,
    quantity: orderItem.quantity,
    total_price: orderItem.total_price,
  }));

  const columns: TableColumnsType<TOrderItemCoustom> = [
    {
      title: "Product Name",
      key: "name",
      width: 300,
      render: (item) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={item.image?.[0]}
            alt={item.name}
            style={{
              width: "50px",
              height: "50px",
              marginRight: "10px",
              borderRadius: "5px",
            }}
          />
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/categore/product/${item.product_id}`}
          >
            <span>
              {item.name.length > 50
                ? `${item.name.slice(0, 50)} ...`
                : item.name}
            </span>
          </Link>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      width: 100,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      width: 120,
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "orderStatus",
      align: "center",
      width: 110,
    },
  ];

  ///////// Handle update order /////////////////
  const [form] = Form.useForm();

  const handleUpdateOrderStatus = async (data: FieldValues) => {
    let updateOrderStatusData;
    // const updateOrderStatusData = data?.orderStatus;
    if (data?.orderStatus === "Confirm") {
      updateOrderStatusData = { confirmOrder: true };
    } else if (data?.orderStatus === "Delivered") {
      updateOrderStatusData = { deliveredOrder: true };
    } else if (data?.orderStatus === "Canceled") {
      updateOrderStatusData = { cancelOrder: true };
    } else if (data?.orderStatus === "Fake") {
      updateOrderStatusData = { fakeOrder: true };
    }

    const res = await updateOrderStatus({ updateOrderStatusData, orderNumber });

    console.log(res, "order res", updateOrderStatusData);
  };

  return (
    <>
      <div className="dashboard-dev2" style={{ padding: "10px" }}>
        <PageTitle pageTitle="Order Details || Admin" />
        <Row>
          {/* প্রথম ডিভ */}
          <Col xs={24} md={24} lg={16} className="orderInfoDiv">
            <Col
              style={{
                padding: "10px",
                color: "black",
                borderRadius: "3px",
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              }}
            >
              <Col style={{ padding: "10px", textAlign: "center" }}>
                <h5 style={{ marginBottom: "0" }}>Order Information</h5>
                <Typography
                  style={
                    {
                      // display: "inline-block",
                    }
                  }
                >
                  {orderStatus} Order
                </Typography>
                <Typography
                  style={
                    {
                      // display: "inline-block",
                    }
                  }
                >
                  Order #{orderId}
                </Typography>
                {paymentNumber ? (
                  <Typography
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      // display: "inline-block",
                    }}
                  >
                    Payment Number: {paymentNumber}
                  </Typography>
                ) : (
                  ""
                )}
              </Col>
              <Row
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "3px",
                  backgroundColor: "rgb(230, 230, 230)",
                }}
              >
                <Col xs={24} md={12} lg={12} style={{ paddingRight: "10px" }}>
                  <h6 style={{ marginBottom: "16px" }}>Shipping Address</h6>
                  <Typography
                    style={{ fontWeight: "600", marginBottom: "5px" }}
                  >
                    {name}
                  </Typography>
                  <Typography
                    style={{ fontWeight: "600", marginBottom: "5px" }}
                  >
                    {address}
                  </Typography>
                  <Typography
                    style={{ fontWeight: "600", marginBottom: "5px" }}
                  >
                    District: {district}
                  </Typography>
                  <Typography
                    style={{ fontWeight: "700", marginBottom: "5px" }}
                  >
                    Contact Number: {contactNumber}
                  </Typography>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  lg={12}
                  className="orderInfoDivOrderSummary"
                >
                  <h6>Order Summary</h6>
                  <table
                    className="table bordelrless"
                    style={{ fontWeight: "600", marginBottom: "5px" }}
                  >
                    <tbody>
                      <tr>
                        <td
                          className="ps-0 pb-0 border-0"
                          style={{ background: "none" }}
                        >
                          Sub-Total:
                        </td>
                        <td
                          className="ps-0 pb-0 border-0 text-end"
                          style={{ background: "none" }}
                        >
                          {subTotal}{" "}
                          <span
                            style={{
                              fontSize: "15px",
                              fontFamily: "monospace",
                            }}
                          >
                            ৳
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="ps-0 pb-0 border-0"
                          style={{ background: "none" }}
                        >
                          Home Delivery:
                        </td>
                        <td
                          className="ps-0 pb-0 text-end border-0"
                          style={{ background: "none" }}
                        >
                          {deliveryCharge}
                          <span
                            style={{
                              fontSize: "15px",
                              fontFamily: "monospace",
                            }}
                          >
                            ৳
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="ps-0 pb-0 border-0"
                          style={{ background: "none" }}
                        >
                          Total:
                        </td>
                        <td
                          className="ps-0 pb-0 border-0 text-end"
                          style={{ background: "none" }}
                        >
                          {grandTotal}
                          <span
                            style={{
                              fontSize: "15px",
                              fontFamily: "monospace",
                            }}
                          >
                            ৳
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="ps-0 pb-0 border-0 "
                          style={{ background: "none" }}
                        >
                          Paid:
                        </td>
                        <td
                          className="ps-0 pb-1 border-0 text-end"
                          style={{ color: "green", background: "none" }}
                        >
                          {paymentStatus === "UNPAID" ? 0 : grandTotal}
                          <span
                            style={{
                              fontSize: "15px",
                              fontFamily: "monospace",
                            }}
                          >
                            ৳
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td
                          className="ps-0 pb-0 "
                          style={{
                            background: "none",
                            borderTop: "1px solid gray",
                          }}
                        >
                          Deu:
                        </td>
                        <td
                          className="ps-0 pb-0 text-end  "
                          style={{
                            color: "red",
                            background: "none",
                            borderTop: "1px solid gray",
                          }}
                        >
                          {paymentStatus === "UNPAID" ? grandTotal : 0}
                          <span
                            style={{
                              fontSize: "15px",
                              fontFamily: "monospace",
                            }}
                          >
                            ৳
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
            </Col>

            <Col
              style={{
                width: "100%",
                marginTop: "20px",
                borderRadius: "3px",
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              }}
            >
              <h5 style={{ paddingLeft: "15px", paddingTop: "20px" }}>
                Products
              </h5>
              <Table
                columns={columns}
                dataSource={dataTable}
                pagination={false}
                scroll={{ x: true }}
                style={{ width: "100%" }}
                sticky
              />
            </Col>
          </Col>

          {/* দ্বিতীয় ডিভ */}
          <Col xs={24} md={24} lg={8} className="orderHistoryDiv">
            <Col
              style={{
                padding: "10px",
                borderRadius: "3px",
                boxShadow:
                  "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              }}
            >
              <Form
                form={form}
                onFinish={handleUpdateOrderStatus}
                style={{ display: "flex", gap: "10px" }}
              >
                <Form.Item
                  name="orderStatus"
                  rules={[{ required: true }]}
                  style={{ width: "100%" }}
                >
                  <Select>
                    <Option value="Confirm">Confirm</Option>
                    <Option value="Delivered">Delivered</Option>
                    <Option value="Canceled">Canceled</Option>
                    <Option value="Fake">Fake</Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{
                      backgroundColor: "#ff6347",
                      borderColor: "#ff6347",
                      color: "#ffffff",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Update Status
                  </Button>
                </Form.Item>
              </Form>

              <h5>Order History</h5>
              <div className="mt-4 ps-2">
                {/* {
                        orderDetails.deliveredOrderStatus ?
                            <div className='order-status-graph'>
                                <h6>{orderDetails.deliveredOrderStatus}</h6>
                                <p className='m-0'>{orderDetails.deliveredOrderDate}&nbsp;{orderDetails.deliveredOrderTime}</p>
                            </div>
                            :
                            ""
                    } */}
                {/* {
                        orderDetails.confirmOrderStatus ?
                            <div className='order-status-graph'>
                                <h6>{orderDetails.confirmOrderStatus}</h6>
                                <p className='m-0'>{orderDetails.confirmOrderDate}&nbsp;{orderDetails.confirmorderTime}</p>
                            </div>
                            :
                            ""
                    }
                    {
                        orderDetails.fakeOrderStatus ?
                            <div className='order-status-graph'>
                                <h6>{orderDetails.fakeOrderStatus}</h6>
                                <p className='m-0'>{orderDetails.fakeOrderDate}&nbsp;{orderDetails.fakeOrderTime}</p>
                            </div>
                            :
                            ""
                    }
                    {
                        orderDetails.cancelOrderStatus ?
                            <div className='order-status-graph'>
                                <h6>{orderDetails.cancelOrderStatus}</h6>
                                <p className='m-0'>{orderDetails.cancelOrderDate}&nbsp;{orderDetails.cancelOrderTime}</p>
                            </div>
                            :
                            ""
                    } */}
                {/* {orderStatus === "Pneding" ? (
                  <div className="order-status-graph">
                    <h6>{orderStatus}</h6>
                    <p className="m-0">{formatDate(createdAt)}</p>
                  </div>
                ) : (
                  ""
                )} */}

                {deliveredOrder ? (
                  <div className="order-status-graph">
                    <h6>Delivered Order</h6>
                    <p className="m-0">{formatDate(deliveredOrderDate)}</p>
                  </div>
                ) : (
                  ""
                )}
                {confirmOrder ? (
                  <div className="order-status-graph">
                    <h6>Confirm Order</h6>
                    <p className="m-0">{formatDate(confirmOrderDate)}</p>
                  </div>
                ) : (
                  ""
                )}
                {fakeOrder ? (
                  <div className="order-status-graph">
                    <h6>Fake Order</h6>
                    <p className="m-0">{formatDate(fakeOrderDate)}</p>
                  </div>
                ) : (
                  ""
                )}
                {cancelOrder ? (
                  <div className="order-status-graph">
                    <h6>Cancel Order</h6>
                    <p className="m-0">{formatDate(cancelOrderDate)}</p>
                  </div>
                ) : (
                  ""
                )}
                <div className="order-status-graph">
                  <h6>Pending</h6>
                  <p className="m-0">{formatDate(createdAt)}</p>
                </div>
              </div>
            </Col>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderDetails;
