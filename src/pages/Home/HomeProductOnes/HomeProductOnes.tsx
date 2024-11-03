import { useGetProdcutsQuery } from "../../../redux/features/product/productApi";
import { TProduct } from "../../interface/product.Interface";
import HomeProduct from "../homeProduct/HomeProduct";

const HomeProductOnes = () => {
  const { data: productDta } = useGetProdcutsQuery({});
  return (
    <div>
      <h5 className="homefeaturedCategore-title">POPULAR ATTAR</h5>
      <hr style={{ marginTop: "10px" }}></hr>
      <div className="homeProducts">
        {productDta?.data?.slice(0, 12).map((product: TProduct) => (
          <HomeProduct key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default HomeProductOnes;
