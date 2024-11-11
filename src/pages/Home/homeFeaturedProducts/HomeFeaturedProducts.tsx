import { useGetProdcutsQuery } from "../../../redux/features/product/productApi";
import { TProduct } from "../../../types/product.types";
import HomeProduct from "../homeProduct/HomeProduct";

const HomeFeaturedProducts = () => {
  const { data: productDta } = useGetProdcutsQuery({});

  return (
    <div className="">
      <h5 className="homefeaturedCategore-title">FEATURED PRODUCTS</h5>
      <hr style={{ marginTop: "10px" }}></hr>
      <div className="homeProducts">
        {productDta?.data?.map((product: TProduct) => (
          <HomeProduct key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default HomeFeaturedProducts;
