import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import Navber from "@/pages/shared/navber/navber/Navber";
import Footer from "@/pages/shared/Footer/Footer";

const CommonLayout = () => {
  return (
    <Layout>
      <Navber />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default CommonLayout;
