import { Button, Result } from "antd";
import { Link, useSearchParams } from "react-router-dom";


const SuccessPayment = () => {
    const [searchParams] = useSearchParams();


    const tranId = searchParams.get("tran_id");
    const amount = searchParams.get("amount");

    return (
        <div style={{
            minHeight: 'calc(100vh - 104px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <Result style={{ color: 'white' }}
                status="success"
                title={<span style={{ color: "white", fontSize: '28px' }}>Your payment was successful</span>}
                subTitle={<div style={{ color: "white", width: '350px' }}>
                    TransactionId: <b style={{ color: '#f06d31ff' }}>{tranId}</b><br />
                    Amount: <b>{amount} TK</b> <br /><br />
                    <span style={{ color: '#37ff51ff', fontWeight: '700', fontSize: '15px' }}>Thank you for your payment. we will be in contact with more details shortly</span>
                </div>}
                extra={[
                    <Link to="/buyer/my-payment" key="go-payment">
                        <Button type="primary">View Details</Button>
                    </Link>,
                ]}
            />
        </div>
    );
};

export default SuccessPayment;