import HomeHeaders from "../../shared/Header/HomeHeaders/HomeHeaders";
import PageTitle from "../../shared/PageTitle/PageTitle";
import Banner from "../Banner/Banner";
import Banner2 from "../Banner/Banner2";
import HomeBlogs from "../HomeBlogs/HomeBlogs";
import HomeFeaturedCategory from "../HomeFeaturedCategory/HomeFeaturedCategory";
import HomeFeaturedProducts from "../homeFeaturedProducts/HomeFeaturedProducts";
import HomeProductOnes from "../HomeProductOnes/HomeProductOnes";
import HomeProductTwos from "../HomeProductTwos/HomeProductTwos";
import NewArrivals from "../newArrivals/NewArrivals";
import "./home.css";

const Home = () => {
  return (
    <div className="home-bg pb-5 px-0">
      <PageTitle pageTitle="Home" />
      <div className="container-xxl d-flex p-0">
        {/*    <HomeHeader/> */}
        <HomeHeaders />
        <Banner />
      </div>
      {/* ----------------- special class ----------------------------- */}
      <div className="container-xxl home-div-responsive mobile-responsive-featured-category my-5">
        <HomeFeaturedCategory />
      </div>
      {/* ----------------- special class ----------------------------- */}
      <div className="container-xxl home-div-responsive pc-responsive-featured-category">
        <HomeFeaturedCategory />
      </div>
      <div className="container-xxl home-div-responsive mt-4 mb-5">
        <NewArrivals />
      </div>
      <div className="container-xxl home-div-responsive mt-5">
        <HomeProductOnes />
      </div>
      <div className="container-xxl home-div-responsive mb-5 mt-5">
        <Banner2 />
      </div>
      <div className="container-xxl home-div-responsive my-5">
        <HomeProductTwos />
      </div>
      <div className="container-xxl home-div-responsive my-5">
        <HomeFeaturedProducts />
      </div>

      <div className="container-xxl home-div-responsive mb-5 mt-4">
        <Banner2 />
      </div>

      <div className="container-xxl home-div-responsive">
        <HomeBlogs />
      </div>
    </div>
  );
};

export default Home;
