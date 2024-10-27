import { signOut } from "firebase/auth";
import { useEffect, useState } from "react"
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";

const UseOrderDetails = myOrderId =>{
    const [orderDetails, setOrderDetails] = useState([]);
    const navigate = useNavigate();
    useEffect( () =>{
        const url = `http://localhost:5000/api/v1/myOrders/${myOrderId}`;
        fetch(url, {
            method:'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth);
                navigate('/');
                localStorage.removeItem('accessToken');
            }
            return res.json()
        })
        .then(data => setOrderDetails(data));
    }, [myOrderId]);
    return [orderDetails, setOrderDetails];
}

export default UseOrderDetails;