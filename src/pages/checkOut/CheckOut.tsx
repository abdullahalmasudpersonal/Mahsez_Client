import { Link, useNavigate } from "react-router-dom";
import "./CheckOut.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "../shared/PageTitle/PageTitle";
import { useGetMyProfileQuery } from "../../redux/features/user/userApi";
import District from "./District";
import { useEffect, useState } from "react";
import { TProduct } from "../interface/product.Interface";
import { useAppSelector } from "../../redux/hooks";
import { useGetProdcutsQuery } from "../../redux/features/product/productApi";
import {
  Card,
  Radio,
  Form,
  Typography,
  Col,
  Row,
  Input,
  Select,
  Modal,
} from "antd";
import { useCreateOrderMutation } from "../../redux/features/order/orderApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/shoppingCart/shoppingCartSlice";
import { TOrder } from "../../types/order.types";

const { Paragraph } = Typography;

const CheckOut = () => {
  const [form] = Form.useForm();
  const [district, setDistrict] = useState("");
  const [shipping, setShipping] = useState("60");
  const { data: userData } = useGetMyProfileQuery({});
  const { name, email } = userData?.data || {};
  const cart = useAppSelector((state) => state.shopping.cart);
  const { data: products } = useGetProdcutsQuery({});
  const [paymentMethod, setPaymentMethod] =
    useState<string>("Cash On Delivery");
  const [createOrder] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //// set default values
  useEffect(() => {
    form.setFieldsValue({
      name: name,
      email: email,
      district: district,
      paymentMethod: paymentMethod,
      shipping: shipping,
    });
  }, [name, email, district, paymentMethod, shipping, form]);

  /////////// set delivery charge
  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    if (value === "Dhaka") {
      setShipping("60");
    } else {
      setShipping("100");
    }
  };

  ////// map cartItems
  const cartDetails = cart.map((cartItem) => {
    const product = products?.data.find(
      (item: TProduct) => item._id === cartItem._id
    );
    return {
      ...cartItem,
      ...product,
    };
  });

  const cartItems = cartDetails.map((item) => {
    const unit_price = item?.offerPrice ? item?.offerPrice : item?.price;
    return {
      product_id: item._id,
      quantity: item.quantity,
      unit_price: unit_price,
      total_price: unit_price * item.quantity,
    };
  });

  const subTotal = cartDetails.reduce((total, item) => {
    const itemPrice = item.offerPrice
      ? Number(item.offerPrice)
      : Number(item.price);
    return total + itemPrice * (item.quantity || 0);
  }, 0);
  const delivaryCharge = Number(shipping);
  const grandTotal = subTotal + delivaryCharge;

  /////////// Payment method description
  const paymentDescriptions: Record<string, string> = {
    "Cash On Delivery":
      "আপনার অর্ডারটি আপনার ঠিকানায় পৌঁছানোর পর নগদ অর্থে পেমেন্ট করুন।",
    "Online Payment":
      "ক্রেডিট কার্ড, ডেবিট কার্ড বা ব্যাংক অ্যাকাউন্ট ব্যবহার করে অনলাইনে পেমেন্ট করুন।",
    "Mobile Banking":
      "বিকাশ, রকেট বা নগদ ব্যবহার করে মোবাইল ব্যাংকিংয়ের মাধ্যমে পেমেন্ট করুন।",
  };

  const onFinish = async (values: TOrder) => {
    Modal.confirm({
      title: "Are you sure you want to submit the order?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          const orderData = {
            name: values?.name,
            email: values?.email,
            district: district,
            contactNumber: values?.contactNumber,
            address: values?.address,
            comment: values?.comment,
            items: cartItems,
            paymentType: paymentMethod,
            deliveryCharge: delivaryCharge,
            subTotal: subTotal,
            grandTotal: grandTotal,
          };

          const result = await createOrder(orderData).unwrap();
          if (result?.success === true) {
            toast.success(result?.message, { position: "top-right" });
            form.resetFields();
            dispatch(clearCart());
            navigate("/dashboard/my-order");
          }
        } catch (error) {
          if (error && typeof error === "object" && "data" in error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const errorData = (error as any).data;
            if (
              errorData &&
              typeof errorData === "object" &&
              "message" in errorData
            ) {
              toast.error(errorData.message, { position: "top-right" });
              form.resetFields();
              console.log(errorData.message);
            }
          } else {
            console.log("An unknown error occurred");
          }
        }
      },
    });
  };

  return (
    <>
      <div className="breadcrumb-bg">
        <div className="container-xxl">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 ">
              <li className="breadcrumb-item">
                <Link to="/">
                  <FontAwesomeIcon
                    icon={faHome}
                    className="breadcrumb-home-btn"
                  />
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/shopping_cart" className="breadcrumbItem">
                  Shopping Cart
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Checkout
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* ----------------------------------------------------------------------------------- */}
      <div className="home-bg">
        <div className="container-xxl checkout-top">
          <PageTitle pageTitle="Checkout" />
          <h3 className="mb-3">Checkout</h3>

          <Form form={form} onFinish={onFinish} layout="vertical">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Card
                  title="Customer Information"
                  styles={{
                    body: {
                      padding: "14px 20px",
                    },
                  }}
                >
                  <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your full name",
                      },
                    ]}
                  >
                    <Input placeholder="Full Name" />
                  </Form.Item>
                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email",
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    label="Select District"
                    name="district"
                    rules={[
                      {
                        required: true,
                        message: "Please select your district",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select District"
                      onChange={handleDistrictChange}
                      value={district}
                    >
                      {District().map((districtName) => (
                        <Select.Option key={districtName} value={districtName}>
                          {districtName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Contact Number"
                    name="contactNumber"
                    rules={[
                      { required: true, message: "Please enter phone number" },
                    ]}
                  >
                    <Input
                      type="number"
                      maxLength={11}
                      onInput={(e: React.FormEvent<HTMLInputElement>) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.slice(0, 11);
                      }}
                      placeholder="Phone Number"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Full Address"
                    name="address"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Full Address" />
                  </Form.Item>
                  <Form.Item label="Comments" name="comment">
                    <Input.TextArea
                      maxLength={120}
                      placeholder="Any additional comments"
                    />
                  </Form.Item>
                </Card>
              </Col>

              <Col xs={24} md={16}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Card title="Payment Method" style={{ height: "100%" }}>
                      <Paragraph>Select a payment method</Paragraph>
                      <Form.Item name="paymentMethod">
                        <Radio.Group
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          value={paymentMethod}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Radio value="Cash On Delivery">
                            Cash On Delivery
                          </Radio>
                          <Radio value="Online Payment">Online Payment</Radio>
                          <Radio value="Mobile Banking">Mobile Banking</Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Card
                        style={{
                          marginTop: "20px",
                          backgroundColor: "#f6f6f6",
                          textAlign: "center",
                        }}
                        bordered={false}
                      >
                        <Paragraph>
                          {paymentDescriptions[paymentMethod]}
                        </Paragraph>
                      </Card>
                    </Card>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Card title="Delivery Method" style={{ height: "100%" }}>
                      <Paragraph>Select a delivery method</Paragraph>
                      <Form.Item name="shipping">
                        <Radio.Group
                          onChange={(e) => setShipping(e.target.value)}
                          value={shipping}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Radio value="60" disabled={district !== "Dhaka"}>
                            Inside of Dhaka 60৳
                          </Radio>
                          <Radio value="100" disabled={district === "Dhaka"}>
                            Outside of Dhaka 100৳
                          </Radio>
                          <Radio value="150">Request Express - 150৳</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Card>
                  </Col>
                </Row>

                <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                  <Col span={24}>
                    <Card title="Order Overview">
                      <table className="table table-responsive">
                        <thead>
                          <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col" className="text-center">
                              Quantity
                            </th>
                            <th scope="col" className="text-end">
                              Unit Price
                            </th>
                            <th scope="col" className="text-end">
                              Total Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartDetails.map((product) => (
                            <tr key={product._id}>
                              <td>{product?.name}</td>
                              <td className="text-center">
                                {product?.quantity}
                              </td>
                              <td className="text-end">
                                {product.offerPrice || product.price}
                              </td>
                              <td className="text-end">
                                {product.quantity *
                                  (product.offerPrice || product.price)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div>
                        <h6 className="text-end h5">
                          Sub Total: {subTotal} Tk
                        </h6>
                        <h6 className="text-end h5">
                          Home Delivery: {delivaryCharge} Tk
                        </h6>
                        <h6 className="text-end h5 fw-bold">
                          Grand Total: {grandTotal} Tk
                        </h6>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr className="my-4"></hr>
            <div className="place-order-btn mb-3">
              <button type="submit">Place Order</button>
            </div>
          </Form>

          {/*  <Form form={form} onFinish={onFinish}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Card
                  styles={{
                    body: {
                      padding: "14px 20px",
                    },
                  }}
                  title="Customer Information"
                  style={{ height: "100%", padding: 0 }}
                >
                  <div className="checkout-user-data">
                    <div>
                      <p>Full Name*</p>
                      <input
                        type="text"
                        placeholder="Full Name"
                        name="fullName"
                        defaultValue={name}
                        required
                      />
                    </div>
                    <div>
                      <p>Email Address*</p>
                      <input
                        placeholder="Email"
                        name="email"
                        defaultValue={email}
                        required
                      />
                    </div>
                    <div>
                      <p>Select District*</p>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        required
                      >
                        <District />
                      </select>
                    </div>
                    <div>
                      <p>Phone Number*</p>
                      <input
                        type="number"
                        name="phoneNumber"
                        onInput={(e: React.FormEvent<HTMLInputElement>) => {
                          const target = e.target as HTMLInputElement;
                          target.value = target.value.slice(0, 11);
                        }}
                        required
                      />
                    </div>
                    <div>
                      <p>Full Address*</p>
                      <input type="text" name="address" required />
                    </div>
                    <div>
                      <p>Commects</p>
                      <textarea maxLength={120} name="comment" />
                    </div>
                  </div>
                </Card>
              </Col>

              <Col xs={24} md={16}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Card title="Payment Method">
                      <Typography style={{ marginBottom: "13px" }}>
                        Select a payment method
                      </Typography>
                      <Radio.Group
                        onChange={handlePaymentChange}
                        value={paymentMethod}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <Radio value="COD">Cash On Delivery</Radio>
                        <Radio value="ONLINE">Online Payment</Radio>
                        <Radio value="MOBILE">Mobile Banking</Radio>
                      </Radio.Group>

                      <Card
                        style={{
                          marginTop: "20px",
                          backgroundColor: "#f6f6f6",
                          textAlign: "center",
                        }}
                        bordered={false}
                      >
                        <Paragraph>
                          {paymentDescriptions[paymentMethod]}
                        </Paragraph>
                      </Card>
                    </Card>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Card title="Delivery Method">
                      <Typography style={{ marginBottom: "13px" }}>
                        Select a delivery method
                      </Typography>
                      <Radio.Group
                        onChange={(e) => setShipping(e.target.value)}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <Radio value="COD">In Side of Dhaka 60৳</Radio>
                        <Radio value="ONLINE">OutSide of Dhaka 100৳</Radio>
                        <Radio value="MOBILE">Request Express - 150৳</Radio>
                      </Radio.Group>
                    </Card>
                  </Col>
                </Row>

                <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
                  <Col span={24}>
                    <Card title="Order Overview">
                      <table className="table table-responsive">
                        <thead>
                          <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col" className="text-center">
                              Quantity
                            </th>
                            <th scope="col" className="text-end">
                              Unit Price
                            </th>
                            <th scope="col" className="text-end">
                              Total Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartDetails.map((product) => (
                            <tr key={product._id}>
                              <td>{product?.name}</td>
                              <td className="text-center">
                                {product?.quantity}
                              </td>
                              <td className="text-end">
                                {product?.price
                                  ? product.offerPrice
                                  : product.price}
                              </td>
                              <td className="text-end">
                                {product.quantity *
                                  (product.price
                                    ? product.offerPrice
                                    : product.price)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div>
                        <h6 className="text-end h5">
                          Sub Total: {subTotal} <span>Tk</span>
                        </h6>
                        <h6 className="text-end h5">
                          Home Delivery: {delivaryCharge} <span>Tk</span>
                        </h6>
                        <h6 className="text-end h5 fw-bold">
                          {" "}
                          Grand Total: {grandTotal} Tk
                        </h6>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr className="my-4"></hr>
            <div className="place-order-btn mb-3">
              <button type="submit">Place Order</button>
            </div>
          </Form> */}
        </div>
      </div>
      {/* -------------------------------------------------------------------------------------- */}
    </>
  );
};

export default CheckOut;
