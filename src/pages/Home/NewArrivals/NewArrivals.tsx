import "./NewArrivals.css";
import { useGetProdcutsQuery } from "../../../redux/features/product/productApi";
import HomeProduct from "../homeProduct/HomeProduct";
import "../home/HomeProducts.css";
import { TProduct } from "../../../types/product.types";

const NewArrivals = () => {
  const { data: productDta } = useGetProdcutsQuery({});
  console.log(productDta, "p[ordds");
  return (
    <div className="mb-2">
      <h5 className="homefeaturedCategore-title">NEW ARRIVALS</h5>
      <hr style={{ marginTop: "10px" }}></hr>
      <div className="homeProducts newArrival-dev">
        {productDta?.data
          .slice(0 - 6)
          .reverse()
          .map((product: TProduct) => (
            <HomeProduct key={product._id} {...product} />
          ))}
      </div>
    </div>
  );
};

export default NewArrivals;
