import { Route, Routes } from "react-router-dom";
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
// import Home from "./pages/Homes/Home/Home";
import Categore from "./pages/Categories/Categore/Categore/Categore";
import ProductDetails from "./pages/ProductDetails/ProductDetails/ProductDetails";
import Home from "./pages/home/home/Home";
import ShoppingCart from "./pages/shoppingCart/ShoppingCart";
import ProtectedRoute from "./pages/shared/protectedRoute/ProtectedRoute";
import CheckOut from "./pages/checkOut/CheckOut";
import Admin from "./pages/admin/admin/Admin";
import CreateProduct from "./pages/admin/createProduct/CreateProduct";
import HomeAdmin from "./pages/admin/homeAdmin/HomeAdmin";
// import ShoppingCart from "./pages/shoppingCart/ShoppingCart";
//  import Home from "./pages/Home/Home/Home";
// import Categore from "./pages/Categories/Categore/Categore/Categore";
// import ProductDetails from "./pages/ProductDetails/ProductDetails/ProductDetails";
//////////////// ant design & react-quill css /////////////////////////////
import "antd/dist/reset.css";
import "react-quill/dist/quill.snow.css";
import Prodcuts from "./pages/admin/products/Prodcuts";
import ListProducts from "./pages/admin/products/listProducts/ListProducts";

function App() {
  return (
    <>
      <div className="apps">
        <Navber />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categore" element={<Categore />}>
            <Route path="products/:productId" element={<ProductDetails />} />
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
            <Route path="products" element={<Prodcuts />} />
            <Route path="list-products" element={<ListProducts />} />
            <Route path="create-product" element={<CreateProduct />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
