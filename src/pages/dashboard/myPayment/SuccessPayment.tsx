import { useLocation } from "react-router-dom";
import PageTitle from "../../shared/PageTitle/PageTitle";
import { Button } from "antd";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

const SuccessPayment = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const location = useLocation(); // Current URL পাবে
  const queryParams = new URLSearchParams(location.search);
  const transactionId = queryParams.get("tran_id");
  const amount = queryParams.get("amount");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <div
      className="dashboard-dev2"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Confetti width={innerWidth} height={innerHeight} /> */}
      {showConfetti && <Confetti />}
      <PageTitle pageTitle="Payments Successful" />

      <div style={{ textAlign: "center" }}>
        <i
          className="fa fa-check-circle"
          style={{ fontSize: "70px", color: "rgb(0, 172, 0)" }}
          aria-hidden="true"
        ></i>
        {/* <h5>Pyament Success</h5>
        <h6>Amount: {amount}</h6>
        <h6>TransactionId: {transactionId}</h6> */}
        <div style={{ marginTop: "15px", color: "rgb(35, 0, 131)" }}>
          <h3> Your payment was successful </h3>
          <h6>TransactionId: {transactionId}</h6>
          <h6>Amount: {amount} TK</h6>
        </div>
        <p
          style={{
            marginTop: "50px",
            fontWeight: "700",
            color: "rgb(255, 94, 0)",
          }}
        >
          Thank you for your payment. we will be in <br /> contact with more
          details shortly
        </p>
        <Button>View Details</Button>
      </div>

      {/*  <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="message-box _success">
            <i className="fa fa-check-circle" aria-hidden="true"></i>
            <h2> Your payment was successful </h2>
            <p>
              Thank you for your payment. we will <br />
              be in contact with more details shortly{" "}
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SuccessPayment;
