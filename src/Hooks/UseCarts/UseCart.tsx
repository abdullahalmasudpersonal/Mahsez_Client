import { useEffect, useState } from "react";
import { getStoredCart } from "../../utils/fakedb";
import { Product } from "../../Context/Context";

// Product টাইপ ডেফিনেশন
// export interface Product {
//   _id: string;
//   quantity?: number;
//   [key: string]: unknown;
// }

// // types.ts
// export type Product = {
//   _id: string;
//   name: string;
//   category: string;
//   brand: string;
//   availableQuantity: number; // পরিবর্তন করুন: string থেকে number
//   stockStatus: string;
//   price: number; // পরিবর্তন করুন: string থেকে number
//   regularPrice: number; // পরিবর্তন করুন: string থেকে number
//   offerPrice: number; // পরিবর্তন করুন: string থেকে number
//   description: string;
//   size: string;
//   image1: string;
//   quantity?: number; // কার্টে ব্যবহারের জন্য
// };

const UseCart = (): [
  Product[],
  React.Dispatch<React.SetStateAction<Product[]>>
] => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = getStoredCart() as Record<string, number>;
    const savedCart: Product[] = [];
    const keys = Object.keys(storedCart);

    fetch("http://localhost:5000/api/v1/products/productsByKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(keys),
    })
      .then((res) => res.json())
      .then((attars: Product[]) => {
        for (const _id in storedCart) {
          const addedProduct = attars.find((attar) => attar._id === _id);
          if (addedProduct) {
            const quantity = storedCart[_id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
          }
        }
        setCart(savedCart);
      });
  }, []);

  return [cart, setCart];
};

export default UseCart;

// import { useEffect, useState } from "react";
// import { getStoredCart } from "../../utils/fakedb";

// const UseCart = () => {
//     const [cart, setCart] = useState([]);

//     useEffect(() => {
//         const storedCart = getStoredCart();
//         const savedCart = [];
//         const keys = Object.keys(storedCart);

//         fetch('http://localhost:5000/api/v1/products/productsByKeys', {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(keys)
//         })
//             .then(res => res.json())
//             .then(attars => {
//                 for (const _id in storedCart) {
//                     const addedProduct = attars.find(attar => attar._id === _id);
//                     if (addedProduct) {
//                         const quantity = storedCart[_id];
//                         addedProduct.quantity = quantity;
//                         savedCart.push(addedProduct);
//                     }
//                 }
//                 setCart(savedCart)
//             })
//     }, []);

//     return [cart, setCart];
// }

// export default UseCart;
