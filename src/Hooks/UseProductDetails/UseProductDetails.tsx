import { useEffect, useState } from "react";
import { ProductDetails } from "../../pages/ProductDetails/ProductDetails/product.Interface";

const UseProductDetails = (
  productId: string | undefined
): [
  ProductDetails | null,
  React.Dispatch<React.SetStateAction<ProductDetails | null>>
] => {
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );
  useEffect(() => {
    const url = `http://localhost:5000/api/v1/products/${productId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProductDetails(data));
  }, [productId]);
  return [productDetails, setProductDetails];
};

export default UseProductDetails;
