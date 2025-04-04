import "./NewArrivals.css";
import { useGetProductsWithSearchFilterQuery } from "../../../redux/features/product/productApi";
import "../Home/HomeProducts.css";
import { TProduct } from "../../../types/product.types";
import Loader from "../../shared/loader/Loader";
import HomeProduct from "../HomeProduct/HomeProduct";

const NewArrivals = () => {
  const { data: productDta, isLoading } = useGetProductsWithSearchFilterQuery({
    limit: 6,
  });

  return (
    <div className="mb-2">
      <h5 className="homefeaturedCategore-title">NEW ARRIVALS</h5>
      <hr style={{ marginTop: "10px" }}></hr>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "380px",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className="homeProducts newArrival-dev">
          {productDta?.data.map((product: TProduct, index: number) => (
            <div
              key={product._id}
              className="delayProductItem"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <HomeProduct {...product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewArrivals;
