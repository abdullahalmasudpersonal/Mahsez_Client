import AdminLayout from "@/layout/AdminLayout";
import AuthLayout from "@/layout/AuthLayout";
import BuyerLayout from "@/layout/BuyerLayout";
import CommonLayout from "@/layout/CommonLayout";
import AboutUs from "@/pages/AboutUs/AboutUs";
import BlogList from "@/pages/admin/blogs/blogList/BlogList";
import CreateBlog from "@/pages/admin/blogs/createBlog/CreateBlog";
import UpdateBlog from "@/pages/admin/blogs/updateBlog/UpdateBlog";
import HomeAdmin from "@/pages/admin/homeAdmin/HomeAdmin";
import VisitorList from "@/pages/admin/homeAdmin/visitorList/VisitorList";
import OrderDetails from "@/pages/admin/orders/orderDetails/OrderDetails";
import OrderList from "@/pages/admin/orders/orderList/OrderList";
import CreateProduct from "@/pages/admin/products/createProduct/CreateProduct";
import ProductList from "@/pages/admin/products/productList/ProductList";
import UpdateProduct from "@/pages/admin/products/updateProduct/UpdateProduct";
import AdminProfile from "@/pages/admin/profile/AdminProfile";
import AdminList from "@/pages/admin/users/admin/AdminList";
import CreateAdmin from "@/pages/admin/users/admin/CreateAdmin";
import BuyerList from "@/pages/admin/users/buyer/BuyerList";
import BlogDetails from "@/pages/Blogs/blogDetails/BlogDetails";
import Blogs from "@/pages/Blogs/Blogs/Blogs";
import BuyerPayment from "@/pages/buyer/payment/BuyerPayment";
import SuccessPayment from "@/pages/buyer/payment/SuccessPayment";
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
import Home from "@/pages/Home/Home/Home";
import Login from "@/pages/Logins/Login/Login";
import Register from "@/pages/Logins/Register/Register";
import Unauthorized from "@/pages/Logins/Unauthorized";
import Offers from "@/pages/Offers/Offers";
import PrivacyPolicy from "@/pages/PrivacyPolicy/PrivacyPolicy";
import ProductDetails from "@/pages/ProductDetails/ProductDetails/ProductDetails";
import SearchBerResult from "@/pages/shared/navber/SearchBerResult/SearchBerResult";
import Notfound from "@/pages/shared/Notfound/Notfound";
import RequiredBuyer from "@/pages/shared/protectedRoute/RequiredBuyer";
import RequireRole from "@/pages/shared/protectedRoute/RequireRole";
import ShoppingCart from "@/pages/shoppingCart/ShoppingCart";
import TermsCondition from "@/pages/Terms&Condition/Terms&Condition";

interface RouteType {
  path?: string;
  index?: true;
  element: React.ReactNode;
  children?: RouteType[];
}

const routes: RouteType[]  = [
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      { index: true, element: <Home />},
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
      { path: "checkout", element: (<RequiredBuyer><CheckOut /></RequiredBuyer>) },
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
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "*", element: <Notfound /> },
    ],
  },
  {
    path: "/buyer",
    element: <RequireRole allowedRoles={["buyer"]}><BuyerLayout /></RequireRole>,
    children: [
      { index: true, element: <BuyerProfile /> },
      { path: "my-order", element: <MyOrder /> },
      { path: "my-order-details/:orderId", element: <MyOrderDetails /> },
      { path: "my-payment", element: <BuyerPayment /> },
      { path: "payment-success", element: <SuccessPayment /> },
      { path: "invoice", element: <Invoice /> },
      { path: "*", element: <Notfound /> },
    ],
  },
  {
    path: "/admin",
    element: <RequireRole allowedRoles={["admin"]}><AdminLayout /></RequireRole>,
    children: [
      { index: true, element: <HomeAdmin /> },
      { path: "product-list", element: <ProductList /> },
      { path: "product-create", element: <CreateProduct /> },
      { path: "update-product/:productId", element: <UpdateProduct /> },
      { path: "order-list", element: <OrderList /> },
      { path: "order-details/:orderId", element: <OrderDetails /> },
      { path: "blog-list", element: <BlogList /> },
      { path: "blog-create", element: <CreateBlog /> },
      { path: "blog-update/:blogId", element: <UpdateBlog /> },
      { path: "visitor-list", element: <VisitorList /> },
      { path: "admin-list", element: <AdminList /> },
      { path: "admin-create", element: <CreateAdmin /> },
      { path: "buyer-list", element: <BuyerList /> },
      { path: 'profile', element: <AdminProfile /> },
      { path: "*", element: <Notfound /> },
    ],
  },
];

export default routes;