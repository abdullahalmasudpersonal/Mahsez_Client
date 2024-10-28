import { Route, Routes } from "react-router-dom";
import "./index.css";
import Footer from "./pages/shared/Footer/Footer";
import Navber from "./pages/shared/navber/navber/Navber";
import Login from "./pages/Logins/Login/Login";
import Register from "./pages/Logins/Register/Register";

function App() {
  return (
    <>
      <div className="apps">
        <Navber />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
        {/* <Login /> */}
      </div>
    </>
  );
}

export default App;
