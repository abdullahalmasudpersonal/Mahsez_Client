import { useGetProductsWithSearchFilterQuery } from "../../../redux/features/product/productApi";
import { TProduct } from "../../../types/product.types";
import Loader from "../../shared/loader/Loader";
import HomeProduct from "../HomeProduct/HomeProduct";

const HomeProductTwos = () => {
  const { data: productDta, isLoading } = useGetProductsWithSearchFilterQuery({
    sort: "-soldQuantity",
    limit: 12,
  });

  return (
    <div>
      <h5 className="homefeaturedCategore-title">BESTSELLING PRODUCTS</h5>
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
        <div className="homeProducts">
          {productDta?.data.map((product: TProduct, index: number) => (
            <div
              key={product._id}
              className="delayProductItem"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <HomeProduct key={product._id} {...product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeProductTwos;
