import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";

const UseGetAllOrder = ()=>{
    const [user] = useAuthState(auth);
    const [allOrder, setAllOrder] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/allOrders?email=${user.email}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth);
                Navigate('/');
                localStorage.removeItem('accessToken');
            }
            return res.json()
        })
        .then(data => {
            setAllOrder(data);
        });

    }, [allOrder]);

    return [allOrder, setAllOrder];
}
export default UseGetAllOrder;