import { useGetProductsQuery } from "../../../redux/features/product/productApi";
import { TProduct } from "../../../types/product.types";
import Loader from "../../shared/loader/Loader";
import HomeProduct from "../homeProduct/HomeProduct";

const HomeFeaturedProducts = () => {
  const { data: productDta, isLoading } = useGetProductsQuery({});

  return (
    <div className="">
      <h5 className="homefeaturedCategore-title">FEATURED PRODUCTS</h5>
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
        <div className="homeProducts delayProductItem">
          {productDta?.data
            ?.slice(0, 24)
            ?.map((product: TProduct, index: number) => (
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

export default HomeFeaturedProducts;
