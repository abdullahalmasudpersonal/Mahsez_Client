import "./NewArrivals.css";
import HomeProduct from "../HomeProduct/HomeProduct";
import UseProducts from "../../../Hooks/UseProducts/UseProducts";

const NewArrivals = () => {
  const [products] = UseProducts();

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
