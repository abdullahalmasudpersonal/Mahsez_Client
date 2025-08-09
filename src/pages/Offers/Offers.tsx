import { useGetProductsWithSearchFilterQuery } from "../../redux/features/product/productApi";
import { TProduct } from "../../types/product.types";
import HomeProduct from "../Home/HomeProduct/HomeProduct";
import Loader from "../shared/loader/Loader";
import "./Offers.css";

const Offers = () => {
  const { data: productDta, isLoading } = useGetProductsWithSearchFilterQuery({
    sort: "-soldQuantity",
    limit: 24,
  });

  return (
    <div className="container-xxl offers">
      <div>
        <h5 className="homefeaturedCategore-title mt-5">OFFER PRODUCTS</h5>
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
            {productDta?.data?.filter((product:TProduct)=> !!product?.offerPrice)?.map((product: TProduct, index: number) => (
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
    </div>
  );
};

export default Offers;
