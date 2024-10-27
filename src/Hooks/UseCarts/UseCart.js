import { useEffect, useState } from "react";
import { getStoredCart } from "../../utilities/fakedb";

const UseCart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        const keys = Object.keys(storedCart);

        fetch('http://localhost:5000/api/v1/products/productsByKeys', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(keys)
        })
            .then(res => res.json())
            .then(attars => {
                for (const _id in storedCart) {
                    const addedProduct = attars.find(attar => attar._id === _id);
                    if (addedProduct) {
                        const quantity = storedCart[_id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                    }
                }
                setCart(savedCart)
            })
    }, []);

    return [cart, setCart];
}

export default UseCart;