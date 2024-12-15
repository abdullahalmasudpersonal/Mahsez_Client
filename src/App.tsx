import "./global.css";
//////////////// ant design & react-quill css /////////////////////////////
import "antd/dist/reset.css";
import "react-quill/dist/quill.snow.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min";
/* slick-carousel */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// aos css
import "aos/dist/aos.css";
//////////////// ant design & react-quill css /////////////////////////////
import { Route, Routes, useLocation } from "react-router-dom";
import "./index.css";
import Footer from "./pages/shared/Footer/Footer";
import Navber from "./pages/shared/navber/navber/Navber";
import Login from "./pages/Logins/Login/Login";
import Register from "./pages/Logins/Register/Register";
import Dashboard from "./pages/dashboard/dashboard/Dashboard";
import Profile from "./pages/dashboard/profile/Profile";
import AboutUs from "./pages/AboutUs/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "./pages/Terms&Condition/Terms&Condition";
import Notfound from "./pages/shared/Notfound/Notfound";
import Categore from "./pages/Categories/Categore/Categore/Categore";
import ProductDetails from "./pages/ProductDetails/ProductDetails/ProductDetails";
import Home from "./pages/home/home/Home";
import ShoppingCart from "./pages/shoppingCart/ShoppingCart";
import ProtectedRoute from "./pages/shared/protectedRoute/ProtectedRoute";
import CheckOut from "./pages/checkOut/CheckOut";
import Admin from "./pages/admin/admin/Admin";
import HomeAdmin from "./pages/admin/homeAdmin/HomeAdmin";
import ListProducts from "./pages/admin/products/listProducts/ListProducts";
import MyOrder from "./pages/dashboard/myOrder/MyOrder";
import ListOrders from "./pages/admin/orders/listOrders/ListOrders";
import Blogs from "./pages/Blogs/Blogs/Blogs";
import Offers from "./pages/Offers/Offers";
import CreateBlog from "./pages/admin/blogs/createBlog/CreateBlog";
import BlogDetails from "./pages/Blogs/blogDetails/BlogDetails";
import ListBlogs from "./pages/admin/blogs/listBlogs/ListBlogs";
import MyPayment from "./pages/dashboard/myPayment/MyPayment";
import ScrollingBtn from "./pages/shared/ScrollingBtn/ScrollingBtn";
import UpdateBlog from "./pages/admin/blogs/updateBlog/UpdateBlog";
import UpdateProduct from "./pages/admin/products/updateProduct/UpdateProduct";
import CreateProduct from "./pages/admin/products/createProduct/CreateProduct";
import OrderDetails from "./pages/admin/orders/orderDetails/OrderDetails";
import MyOrderDetails from "./pages/dashboard/myOrder/MyOrderDetails";
import AllAdmin from "./pages/admin/users/allAdmin/AllAdmin";
import AllBuyer from "./pages/admin/users/allBuyer/AllBuyer";
import Invoice from "./pages/dashboard/myOrder/Invoice";
import { useEffect } from "react";
import Aos from "aos";
import SearchBerResult from "./pages/shared/navber/SearchBerResult/SearchBerResult";
import IslamicCategore from "./pages/Categories/IslamicAccessories/lslamicCategore/IslamicCategore";
import HealthBeautyCategore from "./pages/Categories/health&Beauty/health&BeautyCategore/HealthBeautyCategore";
import BagsWatchCategore from "./pages/Categories/bags&Watchs/bags&WatchCategore/BagsWatchCategore";
import ComputersCategore from "./pages/Categories/computerAccessories/ComputersCategore/ComputersCategore";
import DressesJewelleryCategore from "./pages/Categories/dresses&Jewellery/dresses&JewelleryCategore/DressesJewelleryCategore";
import SportsOutdoorsCategore from "./pages/Categories/sports&Outdoors/sports&OutdoorsCategore/SportsOutdoorsCategore";
import GroceriesFoodsCategore from "./pages/Categories/groceries&Foods/groceries&FoodsCategore/GroceriesFoodsCategore";
import ElectronicsTVCategore from "./pages/Categories/electronice&TV/Electronics&TVCategore/ElectronicsTVCategore";
import KidsAccessoriesCategore from "./pages/Categories/kidsAccessories/kidsAccessoriesCategore/KidsAccessoriesCategore";
import HomeAppliencesCategore from "./pages/Categories/homeAppliences/homeAppliencesCategore/HomeAppliencesCategore";
import ScrollManager from "./pages/shared/ScrollManager/ScrollManager";
import socket from "./utils/Socket";
import { useAppSelector } from "./redux/hooks";
import { selectCurrentUser } from "./redux/features/auth/authSlice";

function App() {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();
  const hideNavAndFooterPaths = ["/login", "/register", "/dashboard", "/admin"];
  const shouldHideNavAndFooter = hideNavAndFooterPaths.some(
    (path) =>
      location.pathname === path || location.pathname.startsWith(`${path}/`)
  );

  // //////// must /////////////
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  socket.on("connect", () => {
    socket.emit("userOnline", user?.userId);
  });

  return (
    <>
      <div className="apps">
        <ScrollManager />
        <ScrollingBtn />
        {!shouldHideNavAndFooter && <Navber />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categore" element={<Categore />}>
            <Route path="search-results" element={<SearchBerResult />} />
            <Route path="health-beauty" element={<HealthBeautyCategore />} />
            <Route path="bag-watch" element={<BagsWatchCategore />} />
            <Route
              path="computer-accessories"
              element={<ComputersCategore />}
            />
            <Route
              path="dress-jewellery"
              element={<DressesJewelleryCategore />}
            />
            <Route path="electronics-tv" element={<ElectronicsTVCategore />} />
            <Route path="homeApplience" element={<HomeAppliencesCategore />} />
            <Route
              path="kidsAccessories"
              element={<KidsAccessoriesCategore />}
            />
            <Route
              path="groceries-foods"
              element={<GroceriesFoodsCategore />}
            />
            <Route path="islamic" element={<IslamicCategore />} />
            <Route
              path="sports-outdoors"
              element={<SportsOutdoorsCategore />}
            />

            <Route path="product/:productId" element={<ProductDetails />} />
          </Route>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Profile />} />
            <Route path="my-order" element={<MyOrder />} />
            <Route
              path="my-order-details/:orderId"
              element={<MyOrderDetails />}
            />
            <Route path="my-payment" element={<MyPayment />} />
            <Route path="invoice" element={<Invoice />} />
          </Route>

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckOut />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:blogId" element={<BlogDetails />} />
          <Route path="/shopping_cart" element={<ShoppingCart />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route path="/terms_condition" element={<TermsCondition />} />
          <Route path="*" element={<Notfound />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomeAdmin />} />
            <Route path="list-orders" element={<ListOrders />} />
            <Route path="order-details/:orderId" element={<OrderDetails />} />
            <Route path="list-products" element={<ListProducts />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route
              path="update-product/:productId"
              element={<UpdateProduct />}
            />
            <Route path="list-blogs" element={<ListBlogs />} />
            <Route path="create-blog" element={<CreateBlog />} />
            <Route path="update-blog/:blogId" element={<UpdateBlog />} />
            <Route path="all-admin" element={<AllAdmin />} />
            <Route path="all-buyer" element={<AllBuyer />} />
          </Route>
        </Routes>
        {/* <Footer /> */}
        {!shouldHideNavAndFooter && <Footer />}
      </div>
    </>
  );
}

export default App;
