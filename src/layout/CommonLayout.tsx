import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import Navber from "@/pages/shared/navber/navber/Navber";
import Footer from "@/pages/shared/Footer/Footer";
import BottemHeader from "@/pages/shared/navber/BottemHeader/BottemHeader";

const CommonLayout = () => {
  return (
    <Layout>
      <Navber />
      <Content>
        <Outlet />
      </Content>
      <Footer />
      <BottemHeader />
    </Layout>
  );
};

export default CommonLayout;
