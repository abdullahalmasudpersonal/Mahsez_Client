// import { useState } from 'react';
// import Banner from '../Banner/Banner';
import "./home.css";
// import HomeFeaturedCategory from '../HomeFeaturedCategory/HomeFeaturedCategory';
// import HomeBlogs from '../HomeBlogs/HomeBlogs';
// import NewArrivals from '../NewArrivals/NewArrivals';
import PageTitle from "../../shared/PageTitle/PageTitle";
import HomeHeaders from "../../shared/Header/HomeHeaders/HomeHeaders";
import Banner from "../Banner/Banner";
import HomeFeaturedCategory from "../HomeFeaturedCategory/HomeFeaturedCategory";
import NewArrivals from "../NewArrivals/NewArrivals";
import HomeProductOnes from "../HomeProductOnes/HomeProductOnes/HomeProductOnes";
import Banner2 from "../Banner/Banner2";
import HomeProductTwos from "../HomeProductTwos/HomeProductTwos/HomeProductTwos";
import HomeFeaturedProducts from "../HomeFeaturedProducts/HomeFeaturedProducts/HomeFeaturedProducts";
// import HomeFeaturedProducts from '../HomeFeaturedProducts/HomeFeaturedProducts/HomeFeaturedProducts';
// import HomeProductOnes from '../HomeProductOnes/HomeProductOnes/HomeProductOnes';
// import HomeProductTwos from '../HomeProductTwos/HomeProductTwos/HomeProductTwos';
// import HomeHeader from '../../Shared/Header/HomeHeaders/HomeHeader';
// import HomeHeaders from '../../Shared/Header/HomeHeaders/HomeHeaders';
const Home = () => {
  // const [selected, setSelected] = useState("males");
  // const changeHandler = e => {
  //     setSelected(e.target.value);
  // };

  return (
    <div className="home-bg pb-5 px-0">
      <PageTitle pageTitle="" />
      <div className="container-xxl d-flex p-0">
        {/*    <HomeHeader/> */}
        <HomeHeaders />
        <Banner />
      </div>
      {/* ----------------- special class ----------------------------- */}
      <div className="container-xxl home-div-responsive mobile-responsive-featured-category my-5">
        <HomeFeaturedCategory />
      </div>
      <div className="container-xxl home-div-responsive mt-4 mb-5">
        <NewArrivals />
      </div>
      {/* ----------------- special class ----------------------------- */}
      <div className="container-xxl home-div-responsive pc-responsive-featured-category">
        <HomeFeaturedCategory />
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

      {/*     <div className="container-xxl home-div-responsive">
        <HomeBlogs />
      </div>  */}
    </div>
  );
};

export default Home;
