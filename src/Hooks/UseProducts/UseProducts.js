import { useEffect, useState } from "react"

const UseProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect( () =>{
        fetch('http://localhost:5000/api/v1/products')
        .then(res => res.json())
        .then(data => setProducts(data));
    },[]);
    return [products, setProducts];
}

export default UseProducts;
