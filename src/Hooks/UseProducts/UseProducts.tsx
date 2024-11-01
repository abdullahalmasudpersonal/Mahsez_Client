import { useEffect, useState } from "react";

export type productsType = {
  _id: string;
  name: string;
  category: string;
  brand: string;
  availableQuantity: string;
  stockStatus: string;
  price: string;
  regularPrice: string;
  offerPrice: string;
  description: string;
  size: string;
  image1: string;
};

const UseProducts = () => {
  const [products, setProducts] = useState<productsType[]>([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/v1/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return [products, setProducts] as const;
};

export default UseProducts;
