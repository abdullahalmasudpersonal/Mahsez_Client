import { Route, Routes } from "react-router-dom";
import "./index.css";
import Footer from "./pages/shared/Footer/Footer";
import Navber from "./pages/shared/navber/navber/Navber";
import Login from "./pages/Logins/Login/Login";
import Register from "./pages/Logins/Register/Register";
import Dashboard from "./pages/dashboard/dashboard/Dashboard";
import Profile from "./pages/dashboard/Profile/Profile";
import AboutUs from "./pages/AboutUs/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "./pages/Terms&Condition/Terms&Condition";
import Notfound from "./pages/shared/Notfound/Notfound";
import Home from "./pages/Home/Home/Home";

function App() {
  return (
    <>
      <div className="apps">
        <Navber />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route path="/terms_condition" element={<TermsCondition />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
