import { useEffect, useState } from "react"

const UseAllOrderDetail = allOrderId => {
    const [allOrder, setAllOrder] = useState({});
    useEffect(() => {
        const url = `http://localhost:5000/api/v1/allOrders/${allOrderId}`;
        fetch(url, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        },
        )
            .then(res => res.json())
            .then(data => setAllOrder(data));
    }, [allOrderId]);
    return [allOrder, setAllOrder];
}

export default UseAllOrderDetail;