import "./NewArrivals.css";
import HomeProduct from "../HomeProduct/HomeProduct";
import UseProducts from "../../../Hooks/UseProducts/UseProducts";
import { useGetProdcutsQuery } from "../../../redux/features/product/productApi";

const NewArrivals = () => {
  const [products] = UseProducts();
  const { data: productDta } = useGetProdcutsQuery({});
  console.log(productDta, "prodcutData");
  return (
    <div className="mb-2">
      <h5 className="homefeaturedCategore-title">NEW ARRIVALS</h5>
      <hr style={{ marginTop: "10px" }}></hr>
      <div className="homeProducts newArrival-dev">
        {products
          .slice(0 - 6)
          .reverse()
          .map((product) => (
            <HomeProduct key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default NewArrivals;
