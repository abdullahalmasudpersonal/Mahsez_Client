import AdminLayout from "@/layout/AdminLayout";
import AuthLayout from "@/layout/AuthLayout";
import BuyerLayout from "@/layout/BuyerLayout";
import CommonLayout from "@/layout/CommonLayout";
import AboutUs from "@/pages/AboutUs/AboutUs";
import CreateBlog from "@/pages/admin/blogs/createBlog/CreateBlog";
import ListBlogs from "@/pages/admin/blogs/listBlogs/ListBlogs";
import UpdateBlog from "@/pages/admin/blogs/updateBlog/UpdateBlog";
import HomeAdmin from "@/pages/admin/homeAdmin/HomeAdmin";
import VisitorList from "@/pages/admin/homeAdmin/visitorList/VisitorList";
import ListOrders from "@/pages/admin/orders/listOrders/ListOrders";
import OrderDetails from "@/pages/admin/orders/orderDetails/OrderDetails";
import CreateProduct from "@/pages/admin/products/createProduct/CreateProduct";
import ListProducts from "@/pages/admin/products/listProducts/ListProducts";
import UpdateProduct from "@/pages/admin/products/updateProduct/UpdateProduct";
import AllAdmin from "@/pages/admin/users/allAdmin/AllAdmin";
import AllBuyer from "@/pages/admin/users/allBuyer/AllBuyer";
import BlogDetails from "@/pages/Blogs/blogDetails/BlogDetails";
import Blogs from "@/pages/Blogs/Blogs/Blogs";
import BuyerProfile from "@/pages/buyer/profile/BuyerProfile";
import BagsWatchCategore from "@/pages/Categories/bags&Watchs/bags&WatchCategore/BagsWatchCategore";
import Categore from "@/pages/Categories/Categore/Categore/Categore";
import ComputersCategore from "@/pages/Categories/computerAccessories/ComputersCategore/ComputersCategore";
import DressesJewelleryCategore from "@/pages/Categories/dresses&Jewellery/dresses&JewelleryCategore/DressesJewelleryCategore";
import ElectronicsTVCategore from "@/pages/Categories/electronice&TV/Electronics&TVCategore/ElectronicsTVCategore";
import GroceriesFoodsCategore from "@/pages/Categories/groceries&Foods/groceries&FoodsCategore/GroceriesFoodsCategore";
import HealthBeautyCategore from "@/pages/Categories/health&Beauty/health&BeautyCategore/HealthBeautyCategore";
import HomeAppliencesCategore from "@/pages/Categories/homeAppliences/homeAppliencesCategore/HomeAppliencesCategore";
import IslamicCategore from "@/pages/Categories/IslamicAccessories/lslamicCategore/IslamicCategore";
import KidsAccessoriesCategore from "@/pages/Categories/kidsAccessories/kidsAccessoriesCategore/KidsAccessoriesCategore";
import SportsOutdoorsCategore from "@/pages/Categories/sports&Outdoors/sports&OutdoorsCategore/SportsOutdoorsCategore";
import CheckOut from "@/pages/checkOut/CheckOut";
import Invoice from "@/pages/dashboard/myOrder/Invoice";
import MyOrder from "@/pages/dashboard/myOrder/MyOrder";
import MyOrderDetails from "@/pages/dashboard/myOrder/MyOrderDetails";
import MyPayment from "@/pages/dashboard/myPayment/MyPayment";
import SuccessPayment from "@/pages/dashboard/myPayment/SuccessPayment";
import Profile from "@/pages/dashboard/Profile/Profile";
import Home from "@/pages/Home/Home/Home";
import Login from "@/pages/Logins/Login/Login";
import Register from "@/pages/Logins/Register/Register";
import Offers from "@/pages/Offers/Offers";
import PrivacyPolicy from "@/pages/PrivacyPolicy/PrivacyPolicy";
import ProductDetails from "@/pages/ProductDetails/ProductDetails/ProductDetails";
import SearchBerResult from "@/pages/shared/navber/SearchBerResult/SearchBerResult";
import Notfound from "@/pages/shared/Notfound/Notfound";
import ProtectedRoute from "@/pages/shared/protectedRoute/ProtectedRoute";
import RequireAdmin from "@/pages/shared/protectedRoute/RequireAdmin";
import ShoppingCart from "@/pages/shoppingCart/ShoppingCart";
import TermsCondition from "@/pages/Terms&Condition/Terms&Condition";

const routes = [
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "categore",
        element: <Categore />,
        children: [
          { path: "search-results", element: <SearchBerResult /> },
          { path: "health-beauty", element: <HealthBeautyCategore /> },
          { path: "bag-watch", element: <BagsWatchCategore /> },
          { path: "computer-accessories", element: <ComputersCategore /> },
          { path: "dress-jewellery", element: <DressesJewelleryCategore /> },
          { path: "electronics-tv", element: <ElectronicsTVCategore /> },
          { path: "homeApplience", element: <HomeAppliencesCategore /> },
          { path: "kidsAccessories", element: <KidsAccessoriesCategore /> },
          { path: "groceries-foods", element: <GroceriesFoodsCategore /> },
          { path: "islamic", element: <IslamicCategore /> },
          { path: "sports-outdoors", element: <SportsOutdoorsCategore /> },
          { path: "product/:productId", element: <ProductDetails /> },
        ],
      },
      { path: "checkout", element: (<ProtectedRoute><CheckOut /></ProtectedRoute>) },
      { path: "blogs", element: <Blogs /> },
      { path: "blog/:blogId", element: <BlogDetails /> },
      { path: "offers", element: <Offers /> },
      { path: "aboutUs", element: <AboutUs /> },
      { path: "shopping_cart", element: <ShoppingCart /> },
      { path: "privacy_policy", element: <PrivacyPolicy /> },
      { path: "terms_condition", element: <TermsCondition /> },
      { path: "*", element: <Notfound /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
  {
    path: "/buyer",
    // element: <BuyerLayout />,
    element: <ProtectedRoute><BuyerLayout /></ProtectedRoute>,
    children: [
      { path: "", element: <BuyerProfile /> },
      { path: "my-order", element: <MyOrder /> },
      { path: "my-order-details/:orderId", element: <MyOrderDetails /> },
      { path: "my-payment", element: <MyPayment /> },
      { path: "payment-success", element: <SuccessPayment /> },
      { path: "invoice", element: <Invoice /> },
      { path: "*", element: <Notfound /> },
    ],
  },
  {
    path: "/admin",
    element: <RequireAdmin><AdminLayout /></RequireAdmin>,
    children: [
      { path: '', element: <HomeAdmin /> },
      { path: "product-list", element: <ListProducts /> },
      { path: "product-create", element: <CreateProduct /> },
      { path: "update-product/:productId", element: <UpdateProduct /> },
      { path: "order-list", element: <ListOrders /> },
      { path: "order-details/:orderId", element: <OrderDetails /> },
      { path: "blog-list", element: <ListBlogs /> },
      { path: "blog-create", element: <CreateBlog /> },
      { path: "blog-update/:blogId", element: <UpdateBlog /> },
      { path: "visitor-list", element: <VisitorList /> },
      { path: "admin-list", element: <AllAdmin /> },
      { path: "admin-create", element: <AllAdmin /> },
      { path: "buyer-list", element: <AllBuyer /> },
      // { path: "buyer-list", element: <AllBuyer /> },
      { path: 'profile', element: <Profile /> },
      { path: "*", element: <Notfound /> },
    ],
  },
];

export default routes;