import UseProducts from "../../../Hooks/UseProducts/UseProducts";
import HomeProduct from "../homeProduct/HomeProduct";

const HomeProductOnes = () => {
  const [products] = UseProducts();
  return (
    <div>
      <h5 className="homefeaturedCategore-title">POPULAR ATTAR</h5>
      <hr style={{ marginTop: "10px" }}></hr>
      <div className="homeProducts">
        {products
          .filter((categore) => categore.category === "Attar")
          .slice(0, 12)
          .map((product) => (
            <HomeProduct key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default HomeProductOnes;
