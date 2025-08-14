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
import { Route, Routes } from "react-router-dom";
import "./index.css";
import { useEffect } from "react";
import Aos from "aos";
import socket from "./utils/Socket";
import { useAppSelector } from "./redux/hooks";
import { selectCurrentUser } from "./redux/features/auth/authSlice";
import routes from "./routes/routes";
// import ScrollManager from "./pages/shared/ScrollManager/ScrollManager";
// import ScrollingBtn from "./pages/shared/ScrollingBtn/ScrollingBtn";

function App() {
  const user = useAppSelector(selectCurrentUser);

  // //////// must /////////////
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  socket.on("connect", () => {
    socket.emit("userOnline", user?.userId);
  });

  interface RouteType {
    path?: string;
    element: React.ReactNode;
    children?: RouteType[];
  }
  const renderRoutes = (routes: RouteType[]) =>
    routes.map(({ path, element, children }, i) => (
      <Route key={i} path={path} element={element}>
        {children && renderRoutes(children)}
      </Route>
    ));

  return (
    <>

      <div>
         {/* <ScrollManager />
         <ScrollingBtn /> */}
        <Routes>{renderRoutes(routes)}</Routes>
      </div>
    </>
  );
}

export default App;
